"use client";

import { useMemo, useState } from "react";
import type { Article } from "@/lib/cms/types";
import WritingHero from "@/components/writing/WritingHero";
import WritingFilters from "@/components/writing/WritingFilters";
import FeaturedArticle from "@/components/writing/FeaturedArticle";
import ArticleRow from "@/components/writing/ArticleRow";
import EmptyWritingState from "@/components/writing/EmptyWritingState";

export default function WritingExplorer({
  articles,
  loadError,
}: {
  articles: Article[];
  loadError?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL");

  const categories = useMemo(
    () => [
      "ALL",
      ...Array.from(
        new Set(articles.map((article) => article.category).filter(Boolean))
      ).sort((a, b) => a.localeCompare(b)),
    ],
    [articles]
  );

  const topicCount = Math.max(0, categories.length - 1);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return articles.filter((article) => {
      const categoryMatch =
        category === "ALL" || article.category === category;
      const searchable = [
        article.title,
        article.excerpt,
        article.category,
        article.type,
        ...(article.tags || []),
      ]
        .join(" ")
        .toLowerCase();
      const queryMatch = !normalized || searchable.includes(normalized);

      return categoryMatch && queryMatch;
    });
  }, [articles, category, query]);

  const featured = useMemo(
    () => filtered.find((article) => article.featured) || filtered[0],
    [filtered]
  );

  const latest = useMemo(
    () => filtered.filter((article) => article.id !== featured?.id),
    [filtered, featured]
  );

  function reset() {
    setQuery("");
    setCategory("ALL");
  }

  return (
    <div className="writing-shell">
      <WritingHero noteCount={articles.length} topicCount={topicCount} />

      <WritingFilters
        query={query}
        onQueryChange={setQuery}
        categories={categories}
        selectedCategory={category}
        onCategoryChange={setCategory}
      />

      {loadError && (
        <div className="writing-data-warning">
          Published notes could not be loaded: {loadError}
        </div>
      )}

      {!loadError && !filtered.length ? (
        <EmptyWritingState onReset={reset} />
      ) : (
        <>
          {featured && <FeaturedArticle article={featured} />}

          <section className="writing-latest-section">
            <div className="writing-section-head">
              <span>LATEST FIELD NOTES</span>
              <b>{String(latest.length).padStart(3, "0")} ENTRIES</b>
            </div>

            <div className="writing-list">
              {latest.map((article, index) => (
                <ArticleRow
                  article={article}
                  index={index}
                  key={article.id}
                />
              ))}

              {!latest.length && featured && (
                <div className="writing-single-note">
                  The featured note is currently the only published entry in
                  this view.
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
