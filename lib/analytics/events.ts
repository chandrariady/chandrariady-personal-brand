export type AnalyticsEvent =
  | "article_view"
  | "article_read_25"
  | "article_read_50"
  | "article_read_75"
  | "article_complete"
  | "share_article"
  | "copy_article_link"
  | "media_upload"
  | "outbound_click";

export function trackEvent(
  event: AnalyticsEvent,
  parameters: Record<string, string | number | boolean | undefined> = {}
) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", event, parameters);
}
