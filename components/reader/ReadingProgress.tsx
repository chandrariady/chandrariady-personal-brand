"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const article = document.querySelector<HTMLElement>(
        "[data-reader-article]"
      );

      if (!article) return;

      const rect = article.getBoundingClientRect();
      const start = window.scrollY + rect.top;
      const readable = Math.max(1, article.offsetHeight - window.innerHeight);
      const current = Math.min(
        readable,
        Math.max(0, window.scrollY - start + 120)
      );

      setProgress((current / readable) * 100);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="reader-progress" aria-hidden="true">
      <span style={{ width: `${progress}%` }} />
    </div>
  );
}
