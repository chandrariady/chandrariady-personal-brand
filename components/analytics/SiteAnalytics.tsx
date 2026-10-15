"use client";

import { GoogleAnalytics } from "@next/third-parties/google";

export default function SiteAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id || process.env.NODE_ENV !== "production") return null;
  return <GoogleAnalytics gaId={id} />;
}
