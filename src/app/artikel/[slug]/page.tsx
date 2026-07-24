import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetailPage } from "@/components/pages/articles/ArticleDetailPage";
import {
  getArticleBySlug,
  articles,
} from "@/data/articles";


const siteUrl = "https://medikal-nutrience.vercel.app";


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

      url: `${siteUrl}/artikel/${article.slug}`,

      siteName: "Medikal Nutrience",

      type: "article",

      publishedTime: article.date,

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



  const jsonLd = [
    {
      "@context": "https://schema.org",

      "@type": "Article",

      headline: article.title,

      description: article.excerpt,

      image: [
        `${siteUrl}${article.image}`,
      ],

      datePublished: article.date,

      dateModified: article.date,


      author: {
        "@type": "Organization",
        name: "Medikal Nutrience",
      },


      publisher: {
        "@type": "Organization",

        name: "Medikal Nutrience",

        logo: {
          "@type": "ImageObject",

          url: `${siteUrl}/images/brand/medikal-nutrience-logo.png`,
        },
      },


      mainEntityOfPage: {
        "@type": "WebPage",

        "@id": `${siteUrl}/artikel/${article.slug}`,
      },
    },


    {
      "@context": "https://schema.org",

      "@type": "BreadcrumbList",

      itemListElement: [
        {
          "@type": "ListItem",

          position: 1,

          name: "Home",

          item: siteUrl,
        },

        {
          "@type": "ListItem",

          position: 2,

          name: "Artikel",

          item: `${siteUrl}/artikel`,
        },

        {
          "@type": "ListItem",

          position: 3,

          name: article.category,

          item: `${siteUrl}/artikel/${article.slug}`,
        },
      ],
    },
  ];


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <ArticleDetailPage
        article={article}
      />
    </>
  );
}
