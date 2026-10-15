import Link from "next/link";
import { ArrowUpRight, Image as ImageIcon } from "lucide-react";
import type { Article } from "@/lib/cms/types";

function formatType(value: Article["type"]) {
  return value.replaceAll("_", " ").toUpperCase();
}

function formatDate(value: string | null) {
  if (!value) return "UNSCHEDULED";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(new Date(value))
    .toUpperCase();
}

export default function FeaturedArticle({ article }: { article: Article }) {
  return (
    <section className="writing-featured-section">
      <div className="writing-section-head">
        <span>FEATURED NOTE</span>
        <b>FEATURED / 001</b>
      </div>

      <Link
        href={`/writing/${article.slug}`}
        className={`writing-featured ${
          article.cover_image ? "has-cover" : "no-cover"
        }`}
      >
        {article.cover_image ? (
          <div className="writing-featured-image">
            <img src={article.cover_image} alt="" />
          </div>
        ) : (
          <div className="writing-featured-placeholder" aria-hidden="true">
            <ImageIcon />
            <span>FIELD NOTE / FEATURED</span>
          </div>
        )}

        <div className="writing-featured-copy">
          <div className="writing-featured-meta">
            <span>{article.category}</span>
            <span>{formatType(article.type)}</span>
          </div>
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>

          <div className="writing-tags">
            {(article.tags || []).slice(0, 4).map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>

          <footer>
            <span>
              {article.reading_time || 1} MIN READ ·{" "}
              {formatDate(article.published_at)}
            </span>
            <strong>
              READ FIELD NOTE <ArrowUpRight />
            </strong>
          </footer>
        </div>
      </Link>
    </section>
  );
}
