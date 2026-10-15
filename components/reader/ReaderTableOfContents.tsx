"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/cms/rich-text-types";

export default function ReaderTableOfContents({
  items,
}: {
  items: TocItem[];
}) {
  const [active, setActive] = useState(items[0]?.id || "");

  useEffect(() => {
    if (!items.length) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -70% 0px", threshold: [0, 1] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav className="reader-toc" aria-label="Article sections">
      <span>ON THIS NOTE</span>
      {items.map((item, index) => (
        <a
          key={`${item.id}-${index}`}
          href={`#${item.id}`}
          className={`${item.level === 3 ? "toc-sub" : ""} ${
            active === item.id ? "active" : ""
          }`}
        >
          <b>{String(index + 1).padStart(2, "0")}</b>
          {item.text}
        </a>
      ))}
    </nav>
  );
}
