import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpenText, Clock3 } from "lucide-react";
import type { Article } from "@/lib/cms/types";
import ReadingProgress from "@/components/reader/ReadingProgress";
import ReaderTableOfContents from "@/components/reader/ReaderTableOfContents";
import ShareActions from "@/components/reader/ShareActions";
import RelatedNotes from "@/components/reader/RelatedNotes";
import ArticleNavigation from "@/components/reader/ArticleNavigation";

function formatDate(value: string | null) {
  if (!value) return "UNSCHEDULED";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
    .format(new Date(value))
    .toUpperCase();
}

export default function ArticleReader({
  article,
  newer,
  older,
  related,
  children,
}: {
  article: Article;
  newer: Article | null;
  older: Article | null;
  related: Article[];
  children: ReactNode;
}) {
  return (
    <main className="reader-v2">
      <ReadingProgress />

      <article data-reader-article>
        <header className="reader-hero">
          <Link href="/writing" className="reader-back">
            <ArrowLeft /> BACK TO FIELD NOTES
          </Link>

          <div className="reader-kicker">
            <span>{article.category}</span>
            <span>{article.type.replaceAll("_", " ")}</span>
          </div>

          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>

          <div className="reader-meta">
            <div>
              <BookOpenText />
              <span>CHANDRA RIADY</span>
            </div>
            <div>
              <Clock3 />
              <span>{article.reading_time || 1} MIN READ</span>
            </div>
            <div>
              <span>{formatDate(article.published_at)}</span>
            </div>
          </div>

          {(article.tags || []).length > 0 && (
            <div className="reader-tags">
              {article.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          )}
        </header>

        {article.cover_image && (
          <figure className="reader-cover">
            <img src={article.cover_image} alt={article.title} />
          </figure>
        )}

        <div className="reader-layout">
          <div className="reader-body">
            <div className="reader-content">{children}</div>
            <ShareActions
  title={article.title}
  slug={article.slug}
/>
          </div>

          <aside className="reader-side">
            <ReaderTableOfContents items={article.toc || []} />
            <div className="reader-side-card">
              <span>FIELD NOTE DATA</span>
              <dl>
                <div>
                  <dt>WORDS</dt>
                  <dd>{article.word_count || 0}</dd>
                </div>
                <div>
                  <dt>READING</dt>
                  <dd>{article.reading_time || 1} MIN</dd>
                </div>
                <div>
                  <dt>TOPIC</dt>
                  <dd>{article.category}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        <ArticleNavigation newer={newer} older={older} />
        <RelatedNotes notes={related} />
      </article>
    </main>
  );
}
