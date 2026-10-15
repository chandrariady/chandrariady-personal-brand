"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics/events";

export default function ArticleAnalytics({ slug, title, category }: { slug: string; title: string; category: string }) {
  const sent = useRef(new Set<number>());

  useEffect(() => {
    trackEvent("article_view", { article_slug: slug, article_title: title, article_category: category });

    function onScroll() {
      const root = document.querySelector<HTMLElement>("[data-reader-article]");
      if (!root) return;
      const start = root.offsetTop;
      const total = Math.max(1, root.offsetHeight - window.innerHeight);
      const percent = Math.min(100, Math.max(0, ((window.scrollY - start) / total) * 100));
      [25, 50, 75, 100].forEach((milestone) => {
        if (percent >= milestone && !sent.current.has(milestone)) {
          sent.current.add(milestone);
          trackEvent(milestone === 100 ? "article_complete" : (`article_read_${milestone}` as "article_read_25" | "article_read_50" | "article_read_75"), {
            article_slug: slug,
            article_title: title,
            percent_read: milestone,
          });
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [category, slug, title]);

  return null;
}
