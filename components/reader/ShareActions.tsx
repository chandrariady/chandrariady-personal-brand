"use client";

import { Check, Copy, Linkedin, Share2 } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics/events";

export default function ShareActions({
  title,
  slug,
}: {
  title: string;
  slug?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    trackEvent("copy_article_link", {
      article_title: title,
      article_slug: slug,
    });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function shareLinkedIn() {
    trackEvent("share_article", {
      article_title: title,
      article_slug: slug,
      share_method: "linkedin",
    });
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  async function nativeShare() {
    if (navigator.share) {
      trackEvent("share_article", {
        article_title: title,
        article_slug: slug,
        share_method: "native",
      });
      await navigator.share({ title, url: window.location.href });
      return;
    }
    await copyLink();
  }

  return (
    <div className="reader-share" aria-label="Share article">
      <span>SHARE FIELD NOTE</span>
      <div>
        <button type="button" onClick={copyLink}>
          {copied ? <Check /> : <Copy />}
          {copied ? "Copied" : "Copy link"}
        </button>
        <button type="button" onClick={shareLinkedIn}>
          <Linkedin /> LinkedIn
        </button>
        <button type="button" onClick={nativeShare}>
          <Share2 /> Share
        </button>
      </div>
    </div>
  );
}
