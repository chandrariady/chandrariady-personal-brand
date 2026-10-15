import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/cms/types";

function typeLabel(value: Article["type"]) {
  return value.replaceAll("_", " ").toUpperCase();
}

function dateLabel(value: string | null) {
  if (!value) return "UNSCHEDULED";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(new Date(value))
    .toUpperCase();
}

export default function ArticleRow({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  return (
    <Link href={`/writing/${article.slug}`} className="writing-row">
      <span className="writing-row-number">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="writing-row-copy">
        <div className="writing-row-category">
          <span>{article.category}</span>
          <span>{typeLabel(article.type)}</span>
        </div>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>

        <div className="writing-tags">
          {(article.tags || []).slice(0, 5).map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </div>

      <div className="writing-row-meta">
        <span>{article.reading_time || 1} MIN READ</span>
        <span>{dateLabel(article.published_at)}</span>
        <ArrowUpRight />
      </div>
    </Link>
  );
}
