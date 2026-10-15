"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Archive,
  ArrowLeft,
  Eye,
  ImagePlus,
  Save,
  Send,
  Trash2,
} from "lucide-react";

import {
  articleTypes,
  categories,
  type Article,
  type ArticleInput,
  type ArticleStatus,
  type ArticleType,
} from "@/lib/cms/types";
import { slugify } from "@/lib/cms/schema";
import {
  EMPTY_TIPTAP_DOC,
  type AIMetadata,
} from "@/lib/cms/rich-text-types";
import {
  chunkForAI,
  markdownToDoc,
} from "@/lib/cms/rich-text-utils";
import RichTextEditor from "@/components/studio/RichTextEditor";
import type { RichTextChange } from "@/components/studio/RichTextEditor";
import RichTextRenderer from "@/components/content/RichTextRenderer";
import RTEStyles from "@/components/content/RTEStyles";
import TableOfContents from "@/components/content/TableOfContents";

function initialArticle(article?: Article): ArticleInput {
  if (article) {
    return {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content || "",
      category: article.category,
      tags: article.tags || [],
      type: article.type,
      status: article.status,
      cover_image: article.cover_image || "",
      featured: article.featured,
      seo_title: article.seo_title || "",
      seo_description: article.seo_description || "",
      content_json:
        article.content_json ||
        (article.content
          ? markdownToDoc(article.content)
          : EMPTY_TIPTAP_DOC),
      content_format: "tiptap",
      reading_time: article.reading_time || 1,
      word_count: article.word_count || 0,
      toc: article.toc || [],
      ai_metadata: article.ai_metadata || {
        embeddingStatus: "not_ready",
        chunkStrategy: "headings",
      },
      content_version: article.content_version || 1,
    };
  }

  return {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Mine Planning",
    tags: [],
    type: "field_note",
    status: "draft",
    cover_image: "",
    featured: false,
    seo_title: "",
    seo_description: "",
    content_json: EMPTY_TIPTAP_DOC,
    content_format: "tiptap",
    reading_time: 1,
    word_count: 0,
    toc: [],
    ai_metadata: {
      embeddingStatus: "not_ready",
      chunkStrategy: "headings",
    },
    content_version: 1,
  };
}

export default function ArticleEditor({
  article,
}: {
  article?: Article;
}) {
  const [form, setForm] = useState<ArticleInput>(() =>
    initialArticle(article)
  );
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [saveState, setSaveState] = useState("Saved");
  const [dirty, setDirty] = useState(false);

  const router = useRouter();
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  function field<K extends keyof ArticleInput>(
    key: K,
    value: ArticleInput[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
    setDirty(true);
    setSaveState("Unsaved changes");
  }

  useEffect(() => {
    if (!article && form.title && !form.slug) {
      field("slug", slugify(form.title));
    }
  }, [article, form.title, form.slug]);

  const payload = useMemo(
    () => ({
      ...form,
      tags: form.tags.filter(Boolean),
      cover_image: form.cover_image || null,
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
      ai_metadata: {
        ...form.ai_metadata,
        chunks: chunkForAI(form.content_json),
      },
    }),
    [form]
  );

  const persist = useCallback(
    async (status?: ArticleStatus, silent = false) => {
      setBusy(!silent);
      setSaveState("Saving...");

      if (!silent) {
        setMessage("");
      }

      const finalPayload = {
        ...payload,
        status: status || payload.status,
      };

      const url = article
        ? `/api/cms/articles/${article.id}`
        : "/api/cms/articles";

      try {
        const response = await fetch(url, {
          method: article ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalPayload),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Could not save article");
        }

        setDirty(false);
        setSaveState("Saved");

        if (!silent) {
          if (finalPayload.status === "published") {
            setMessage("Published successfully.");
          } else if (finalPayload.status === "archived") {
            setMessage("Article archived.");
          } else {
            setMessage("Draft saved successfully.");
          }
        }

        if (!article && result.article?.id) {
          router.replace(`/studio/articles/${result.article.id}`);
        }

        router.refresh();
      } catch (error) {
        setSaveState("Save failed");

        if (!silent) {
          setMessage(
            error instanceof Error ? error.message : "Save failed"
          );
        }
      } finally {
        setBusy(false);
      }
    },
    [article, payload, router]
  );

  useEffect(() => {
    if (!article || !dirty) return;

    if (autosaveTimer.current) {
      clearTimeout(autosaveTimer.current);
    }

    autosaveTimer.current = setTimeout(() => {
      void persist(undefined, true);
    }, 2500);

    return () => {
      if (autosaveTimer.current) {
        clearTimeout(autosaveTimer.current);
      }
    };
  }, [article, dirty, persist]);

  function handleRichTextChange(change: RichTextChange) {
    setForm((current) => ({
      ...current,
      content_json: change.json,
      content_format: "tiptap",
      content: change.html,
      word_count: change.words,
      reading_time: change.minutes,
      toc: change.toc,
      content_version: (current.content_version || 1) + 1,
    }));
    setDirty(true);
    setSaveState("Unsaved changes");
  }

  async function upload(file: File): Promise<string | null> {
    const body = new FormData();
    body.append("file", file);

    const response = await fetch("/api/cms/media", {
      method: "POST",
      body,
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || "Upload failed");
      return null;
    }

    return result.url as string;
  }

  async function remove() {
    if (!article) return;

    const confirmed = window.confirm(
      "Delete this article permanently?"
    );

    if (!confirmed) return;

    await fetch(`/api/cms/articles/${article.id}`, {
      method: "DELETE",
    });

    router.replace("/studio/articles");
    router.refresh();
  }

  function updateAIMetadata<K extends keyof AIMetadata>(
    key: K,
    value: AIMetadata[K]
  ) {
    field("ai_metadata", {
      ...form.ai_metadata,
      [key]: value,
    });
  }

  return (
    <>
      <RTEStyles />

      <div className="editor-root">
        <header className="editor-head">
          <Link href="/studio/articles">
            <ArrowLeft />
            Articles
          </Link>

          <div>
            <button
              type="button"
              onClick={() => setPreview((current) => !current)}
            >
              <Eye />
              {preview ? "Edit" : "Preview"}
            </button>

            {article && (
              <button
                type="button"
                onClick={() => void persist("archived")}
                disabled={busy}
              >
                <Archive />
                Archive
              </button>
            )}

            <button
              type="button"
              onClick={() => void persist("draft")}
              disabled={busy}
            >
              <Save />
              Save draft
            </button>

            <button
              type="button"
              className="publish"
              onClick={() => void persist("published")}
              disabled={busy}
            >
              <Send />
              Publish
            </button>
          </div>
        </header>

        {message && (
          <div className="editor-message">{message}</div>
        )}

        <div className="editor-layout">
          <section className="editor-main">
            {preview ? (
              <article className="editor-preview">
                <small>
                  {form.category} · {form.type.replace("_", " ")} ·{" "}
                  {form.reading_time} min read
                </small>

                <h1>{form.title || "Untitled"}</h1>
                <p className="lead">{form.excerpt}</p>

                {form.cover_image && (
                  <img
                    src={form.cover_image}
                    alt="Cover preview"
                  />
                )}

                <TableOfContents items={form.toc} />

                <RichTextRenderer
                  content={form.content_json || EMPTY_TIPTAP_DOC}
                />
              </article>
            ) : (
              <>
                <label className="title-field">
                  TITLE
                  <input
                    value={form.title}
                    onChange={(event) =>
                      field("title", event.target.value)
                    }
                    placeholder="Article title"
                  />
                </label>

                <label>
                  SLUG
                  <div className="slug-field">
                    <span>/writing/</span>
                    <input
                      value={form.slug}
                      onChange={(event) =>
                        field("slug", slugify(event.target.value))
                      }
                    />
                  </div>
                </label>

                <label>
                  EXCERPT
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={form.excerpt}
                    onChange={(event) =>
                      field("excerpt", event.target.value)
                    }
                  />
                  <small>{form.excerpt.length}/500</small>
                </label>

                <RichTextEditor
                  value={form.content_json || EMPTY_TIPTAP_DOC}
                  onChange={handleRichTextChange}
                  onUpload={upload}
                  status={saveState}
                />
              </>
            )}
          </section>

          <aside className="editor-side">
            <div className="editor-panel">
              <h3>Publishing</h3>

              <label>
                STATUS
                <select
                  value={form.status}
                  onChange={(event) =>
                    field(
                      "status",
                      event.target.value as ArticleStatus
                    )
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </label>

              <label className="check">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) =>
                    field("featured", event.target.checked)
                  }
                />
                Featured article
              </label>
            </div>

            <div className="editor-panel">
              <h3>Classification</h3>

              <label>
                CATEGORY
                <select
                  value={form.category}
                  onChange={(event) =>
                    field("category", event.target.value)
                  }
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                TYPE
                <select
                  value={form.type}
                  onChange={(event) =>
                    field(
                      "type",
                      event.target.value as ArticleType
                    )
                  }
                >
                  {articleTypes.map((articleType) => (
                    <option
                      value={articleType.value}
                      key={articleType.value}
                    >
                      {articleType.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                TAGS
                <input
                  value={form.tags.join(", ")}
                  onChange={(event) =>
                    field(
                      "tags",
                      event.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                    )
                  }
                  placeholder="planning, nickel, AI"
                />
              </label>
            </div>

            <div className="editor-panel">
              <h3>Cover image</h3>

              {form.cover_image && (
                <img
                  className="editor-cover"
                  src={form.cover_image}
                  alt="Cover"
                />
              )}

              <label className="upload-button">
                <ImagePlus />
                Upload image
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;

                    const url = await upload(file);
                    if (url) {
                      field("cover_image", url);
                    }
                  }}
                />
              </label>

              <label>
                OR IMAGE URL
                <input
                  value={form.cover_image || ""}
                  onChange={(event) =>
                    field("cover_image", event.target.value)
                  }
                />
              </label>
            </div>

            <div className="editor-panel">
              <h3>SEO</h3>

              <label>
                SEO TITLE
                <input
                  maxLength={70}
                  value={form.seo_title || ""}
                  onChange={(event) =>
                    field("seo_title", event.target.value)
                  }
                />
              </label>

              <label>
                SEO DESCRIPTION
                <textarea
                  rows={3}
                  maxLength={170}
                  value={form.seo_description || ""}
                  onChange={(event) =>
                    field("seo_description", event.target.value)
                  }
                />
              </label>
            </div>

            <div className="editor-panel ai-panel">
              <h3>AI-ready metadata</h3>

              <label>
                SUMMARY
                <textarea
                  rows={3}
                  value={form.ai_metadata.summary || ""}
                  onChange={(event) =>
                    updateAIMetadata("summary", event.target.value)
                  }
                />
              </label>

              <label>
                KEYWORDS
                <input
                  value={(form.ai_metadata.keywords || []).join(
                    ", "
                  )}
                  onChange={(event) =>
                    updateAIMetadata(
                      "keywords",
                      event.target.value
                        .split(",")
                        .map((keyword) => keyword.trim())
                        .filter(Boolean)
                    )
                  }
                />
              </label>

              <label>
                SOURCE NOTES
                <textarea
                  rows={3}
                  value={(form.ai_metadata.sourceNotes || []).join(
                    "\n"
                  )}
                  onChange={(event) =>
                    updateAIMetadata(
                      "sourceNotes",
                      event.target.value
                        .split("\n")
                        .filter(Boolean)
                    )
                  }
                />
              </label>

              <small>
                Prepared for future embeddings and cited RAG. No AI
                provider is called yet.
              </small>
            </div>

            {article && (
              <button
                type="button"
                className="danger-button"
                onClick={() => void remove()}
                disabled={busy}
              >
                <Trash2 />
                Delete permanently
              </button>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
