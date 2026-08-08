import "server-only";

import { articles as staticArticles, articleCategories as staticCategories, type Article as StaticArticle } from "@/data/articles";
import type { TipTapDocument } from "@/lib/cms/article-api";
import { cmsInternalApiUrl } from "@/lib/cms/backend";

export type PublicArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentJson: TipTapDocument;
  contentVersion: number;
  coverMedia: { id: string; url: string; width: number; height: number; altText: string | null; mimeType: string } | null;
  category: { id: string; name: string; slug: string };
  author: { id: string; name: string };
  seoTitle: string;
  seoDescription: string;
  isFeatured: boolean;
  publishedAt: string;
  updatedAt: string;
  tags: Array<{ id: string; name: string; slug: string }>;
  readTime: string;
  keyPoints?: string[];
  relatedProducts?: string[];
};

type PublicListResponse = { items: Omit<PublicArticle, "readTime" | "keyPoints" | "relatedProducts">[] };

const monthNumbers: Record<string, number> = {
  januari: 0, februari: 1, maret: 2, april: 3, mei: 4, juni: 5,
  juli: 6, agustus: 7, september: 8, oktober: 9, november: 10, desember: 11,
};

function staticDate(value: string) {
  const [day, month, year] = value.toLowerCase().split(/\s+/);
  return new Date(Date.UTC(Number(year), monthNumbers[month] ?? 0, Number(day), 5)).toISOString();
}

export function staticContentToTipTap(article: StaticArticle): TipTapDocument {
  const content: Record<string, unknown>[] = [];
  if (article.keyPoints.length) {
    content.push({
      type: "bulletList",
      content: article.keyPoints.map((point) => ({
        type: "listItem",
        content: [{ type: "paragraph", content: [{ type: "text", text: point }] }],
      })),
    });
  }
  for (const section of article.content) {
    content.push({ type: "heading", attrs: { level: 2, textAlign: "left" }, content: [{ type: "text", text: section.heading }] });
    for (const paragraph of section.paragraphs) {
      content.push({ type: "paragraph", attrs: { textAlign: "left" }, content: [{ type: "text", text: paragraph }] });
    }
  }
  return { type: "doc", content };
}

function fallbackArticle(article: StaticArticle): PublicArticle {
  const publishedAt = staticDate(article.date);
  return {
    id: `static:${article.slug}`,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    contentJson: staticContentToTipTap(article),
    contentVersion: 1,
    coverMedia: { id: `static-cover:${article.slug}`, url: article.image, width: 1200, height: 630, altText: article.title, mimeType: article.image.endsWith(".png") ? "image/png" : "image/jpeg" },
    category: { id: `static-category:${slugify(article.category)}`, name: article.category, slug: slugify(article.category) },
    author: { id: "static-author", name: article.author },
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
    isFeatured: Boolean(article.featured),
    publishedAt,
    updatedAt: publishedAt,
    tags: article.tags.map((name) => ({ id: `static-tag:${slugify(name)}`, name, slug: slugify(name) })),
    readTime: article.readTime,
    keyPoints: article.keyPoints,
    relatedProducts: article.relatedProducts,
  };
}

function slugify(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/&/g, " dan ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function textLength(value: unknown): number {
  if (!value || typeof value !== "object") return 0;
  const node = value as { text?: unknown; content?: unknown[] };
  return (typeof node.text === "string" ? node.text.length : 0) + (node.content ?? []).reduce<number>((sum, child) => sum + textLength(child), 0);
}

function enrich(article: Omit<PublicArticle, "readTime" | "keyPoints" | "relatedProducts">): PublicArticle {
  const legacy = staticArticles.find((item) => item.slug === article.slug);
  const words = Math.max(1, Math.round(textLength(article.contentJson) / 6));
  return {
    ...article,
    readTime: `${Math.max(1, Math.ceil(words / 200))} menit membaca`,
    keyPoints: legacy?.keyPoints,
    relatedProducts: legacy?.relatedProducts,
  };
}

const fallback = staticArticles.map(fallbackArticle);
const fallbackEnabled = process.env.CMS_STATIC_ARTICLE_FALLBACK !== "false";

export async function getPublicArticles(): Promise<PublicArticle[]> {
  try {
    const response = await fetch(`${cmsInternalApiUrl}/public/articles?limit=50`, {
      next: { revalidate: 300, tags: ["articles"] },
      signal: AbortSignal.timeout(3_000),
    });
    if (!response.ok) throw new Error("Article API unavailable");
    const payload = (await response.json()) as PublicListResponse;
    if (payload.items.length === 0 && fallbackEnabled) return fallback;
    return payload.items.map(enrich);
  } catch {
    return fallbackEnabled ? fallback : [];
  }
}

export async function getPublicArticle(slug: string): Promise<PublicArticle | null> {
  try {
    const response = await fetch(`${cmsInternalApiUrl}/public/articles/${encodeURIComponent(slug)}`, {
      next: { revalidate: 300, tags: ["articles", `article:${slug}`] },
      signal: AbortSignal.timeout(3_000),
    });
    if (response.status === 404) {
      return fallbackEnabled
        ? fallback.find((article) => article.slug === slug) ?? null
        : null;
    }
    if (!response.ok) throw new Error("Article API unavailable");
    return enrich((await response.json()) as Omit<PublicArticle, "readTime" | "keyPoints" | "relatedProducts">);
  } catch {
    return fallbackEnabled ? fallback.find((article) => article.slug === slug) ?? null : null;
  }
}

export function getFallbackArticleSlugs() {
  return staticArticles.map((article) => article.slug);
}

export function getFallbackCategories() {
  return staticCategories;
}
