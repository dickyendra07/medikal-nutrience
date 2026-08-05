import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetailPage } from "@/components/pages/articles/ArticleDetailPage";
import { getFallbackArticleSlugs, getPublicArticle, getPublicArticles } from "@/lib/api/articles";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://medikal-nutrience.vercel.app";
export const revalidate = 300;

export function generateStaticParams() {
  return getFallbackArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublicArticle(slug);
  if (!article) return { title: "Artikel Tidak Ditemukan | Medikal Nutrience" };
  const image = article.coverMedia?.url;
  const absoluteImage = image ? (image.startsWith("http") ? image : `${siteUrl}${image}`) : undefined;
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      url: `${siteUrl}/artikel/${article.slug}`,
      siteName: "Medikal Nutrience",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      images: absoluteImage ? [{ url: absoluteImage, width: article.coverMedia?.width, height: article.coverMedia?.height, alt: article.coverMedia?.altText || article.title }] : [],
    },
    twitter: { card: "summary_large_image", title: article.seoTitle || article.title, description: article.seoDescription || article.excerpt, images: absoluteImage ? [absoluteImage] : [] },
  };
}

export default async function ArticleDetailRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([getPublicArticle(slug), getPublicArticles()]);
  if (!article) notFound();
  const relatedArticles = allArticles
    .filter((item) => item.slug !== article.slug)
    .map((item) => ({ item, score: (item.category.id === article.category.id ? 5 : 0) + item.tags.filter((tag) => article.tags.some((current) => current.slug === tag.slug)).length * 3 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ item }) => item);
  const image = article.coverMedia?.url;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt, image: image ? [image.startsWith("http") ? image : `${siteUrl}${image}`] : [], datePublished: article.publishedAt, dateModified: article.updatedAt, author: { "@type": "Organization", name: article.author.name }, publisher: { "@type": "Organization", name: "Medikal Nutrience", logo: { "@type": "ImageObject", url: `${siteUrl}/images/brand/medikal-nutrience-logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/artikel/${article.slug}` } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Artikel", item: `${siteUrl}/artikel` }, { "@type": "ListItem", position: 3, name: article.category.name, item: `${siteUrl}/artikel/${article.slug}` }] },
  ];
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} /><ArticleDetailPage article={article} relatedArticles={relatedArticles} /></>;
}
