import type { Article } from "@/lib/cms/types";
import { absoluteUrl, siteConfig } from "@/lib/seo/config";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    url: siteConfig.url,
    jobTitle: "Senior Mining Consultant",
    knowsAbout: [
      "Mine Planning",
      "Mining Technology",
      "Nickel Laterite",
      "Artificial Intelligence in Mining",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
  };
}

export function articleJsonLd(article: Article) {
  const url = absoluteUrl(`/writing/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seo_description || article.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: article.published_at || undefined,
    dateModified: article.updated_at || article.published_at || undefined,
    image: article.cover_image ? [article.cover_image] : undefined,
    articleSection: article.category,
    keywords: article.tags?.join(", ") || undefined,
    wordCount: article.word_count || undefined,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
  };
}

export function articleBreadcrumbJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Field Notes", item: absoluteUrl("/writing") },
      { "@type": "ListItem", position: 3, name: article.title, item: absoluteUrl(`/writing/${article.slug}`) },
    ],
  };
}
