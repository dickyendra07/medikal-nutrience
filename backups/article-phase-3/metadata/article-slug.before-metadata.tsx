import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetailPage } from "@/components/pages/articles/ArticleDetailPage";
import {
  articles,
  getArticleBySlug,
} from "@/data/articles";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}


export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  }
): Promise<Metadata> {

  const { slug } = await params;

  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan | Medikal Nutrience",
    };
  }


  return {
    title: article.seoTitle,

    description: article.seoDescription,


    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      type: "article",
      locale: "id_ID",
      siteName: "Medikal Nutrience",

      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },


    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.seoDescription,

      images: [
        article.image,
      ],
    },


    alternates: {
      canonical: `/artikel/${article.slug}`,
    },

  };
}


export default async function ArticleDetailRoute(
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  }
) {

  const { slug } = await params;

  const article = getArticleBySlug(slug);


  if (!article) {
    notFound();
  }


  return (
    <ArticleDetailPage
      article={article}
    />
  );
}
