import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { absoluteUrl } from "@/lib/seo/config";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("slug,updated_at,cover_image")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const fixed: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/writing"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/map"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/projects/mineplan-city"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const articles: MetadataRoute.Sitemap = (data || []).map((article) => ({
    url: absoluteUrl(`/writing/${article.slug}`),
    lastModified: article.updated_at ? new Date(article.updated_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
    images: article.cover_image ? [article.cover_image] : undefined,
  }));

  return [...fixed, ...articles];
}
