import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RichTextRenderer from "@/components/content/RichTextRenderer";
import RTEStyles from "@/components/content/RTEStyles";
import ArticleReader from "@/components/reader/ArticleReader";
import ArticleReaderStyles from "@/components/reader/ArticleReaderStyles";
import ArticleAnalytics from "@/components/analytics/ArticleAnalytics";
import JsonLd from "@/components/seo/JsonLd";
import { createClient } from "@/lib/supabase/server";
import type { Article } from "@/lib/cms/types";
import { absoluteUrl, siteConfig } from "@/lib/seo/config";
import {
  articleBreadcrumbJsonLd,
  articleJsonLd,
} from "@/lib/seo/structured-data";

export const revalidate = 60;
type PageProps = { params: Promise<{ slug: string }> };

async function getArticle(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data as Article | null;
}

async function getNavigationAndRelated(article: Article) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("id,title,slug,excerpt,category,tags,type,cover_image,featured,published_at,reading_time,word_count")
    .eq("status", "published")
    .neq("id", article.id)
    .order("published_at", { ascending: false });
  const articles = (data || []) as Article[];
  const tags = new Set((article.tags || []).map((tag) => tag.toLowerCase()));
  const related = articles
    .map((candidate) => ({
      candidate,
      score:
        (candidate.category === article.category ? 4 : 0) +
        (candidate.tags || []).filter((tag) => tags.has(tag.toLowerCase())).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ candidate }) => candidate);
  const chronological = [article, ...articles].sort((a, b) =>
    (b.published_at ? new Date(b.published_at).getTime() : 0) -
    (a.published_at ? new Date(a.published_at).getTime() : 0)
  );
  const index = chronological.findIndex((item) => item.id === article.id);
  return {
    newer: index > 0 ? chronological[index - 1] : null,
    older: index >= 0 && index < chronological.length - 1 ? chronological[index + 1] : null,
    related,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article not found", robots: { index: false, follow: false } };
  const title = article.seo_title || article.title;
  const description = article.seo_description || article.excerpt;
  const url = absoluteUrl(`/writing/${article.slug}`);
  const image = article.cover_image || absoluteUrl("/opengraph-image");
  return {
    title,
    description,
    keywords: article.tags,
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url,
      title,
      description,
      publishedTime: article.published_at || undefined,
      modifiedTime: article.updated_at || undefined,
      authors: [siteConfig.author],
      tags: article.tags,
      section: article.category,
      images: [{ url: image, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const navigation = await getNavigationAndRelated(article);
  const body = article.content_format === "tiptap" && article.content_json ? (
    <RichTextRenderer content={article.content_json} />
  ) : (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
  );

  return (
    <>
      <JsonLd data={[articleJsonLd(article), articleBreadcrumbJsonLd(article)]} />
      <RTEStyles />
      <ArticleReaderStyles />
      <Nav />
      <ArticleAnalytics slug={article.slug} title={article.title} category={article.category} />
      <ArticleReader article={article} newer={navigation.newer} older={navigation.older} related={navigation.related}>
        {body}
      </ArticleReader>
      <Footer />
    </>
  );
}
