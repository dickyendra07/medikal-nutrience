"use client";

import { useEffect, useState } from "react";
import { ArticleDetailPage } from "@/components/pages/articles/ArticleDetailPage";
import { getArticle, type AdminArticle } from "@/lib/cms/article-api";
import type { PublicArticle } from "@/lib/api/articles";

function toPublic(article: AdminArticle): PublicArticle {
  const text = JSON.stringify(article.contentJson).replace(/[^a-zA-ZÀ-ÿ]+/g, " ").trim();
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    contentJson: article.contentJson,
    contentVersion: article.contentVersion,
    coverMedia: article.coverMedia,
    category: article.category,
    author: article.author,
    seoTitle: article.seoTitle || article.title,
    seoDescription: article.seoDescription || article.excerpt,
    isFeatured: article.isFeatured,
    publishedAt: article.publishedAt || article.scheduledAt || new Date().toISOString(),
    updatedAt: article.updatedAt,
    tags: article.tags,
    readTime: `${Math.max(1, Math.ceil(text.split(/\s+/).length / 200))} menit membaca`,
  };
}

export function ArticlePreviewClient({ articleId }: { articleId: string }) {
  const [article, setArticle] = useState<AdminArticle | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    void getArticle(articleId).then(setArticle).catch(() => setError(true));
  }, [articleId]);
  if (error) return <main className="flex min-h-screen items-center justify-center bg-[#eef8f3] p-5"><div className="rounded-[2rem] bg-white p-8 text-center shadow-xl"><h1 className="text-2xl font-black">Preview tidak tersedia</h1><p className="mt-3 text-sm font-medium text-[#64748b]">Artikel tidak dapat dimuat atau sesi Anda telah berakhir.</p><a href="/cms/articles" className="mt-5 inline-flex rounded-full bg-[#006b3f] px-5 py-3 text-sm font-black text-white">Kembali ke Artikel</a></div></main>;
  if (!article) return <div className="min-h-screen animate-pulse bg-[#eef8f3]" aria-label="Memuat preview" />;
  return <ArticleDetailPage article={toPublic(article)} preview />;
}
