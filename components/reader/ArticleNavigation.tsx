import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Article } from "@/lib/cms/types";

export default function ArticleNavigation({
  newer,
  older,
}: {
  newer: Article | null;
  older: Article | null;
}) {
  if (!newer && !older) return null;

  return (
    <nav className="reader-article-nav" aria-label="Article navigation">
      {newer ? (
        <Link href={`/writing/${newer.slug}`} className="reader-nav-newer">
          <ArrowLeft />
          <div>
            <span>NEWER FIELD NOTE</span>
            <strong>{newer.title}</strong>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {older ? (
        <Link href={`/writing/${older.slug}`} className="reader-nav-older">
          <div>
            <span>OLDER FIELD NOTE</span>
            <strong>{older.title}</strong>
          </div>
          <ArrowRight />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
