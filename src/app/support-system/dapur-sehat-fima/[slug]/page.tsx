import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RecipeDetail } from "@/components/pages/support-system/RecipeDetail";
import {
  fimaRecipes,
} from "@/data/dapur-sehat-fima";
import { getFimaRecipeBySlug } from "@/lib/cms/fima-storage";
import type { Metadata } from "next";

export function generateStaticParams() {
  return fimaRecipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getFimaRecipeBySlug(slug);

  if (!recipe || recipe.status !== "Published") {
    return { title: "Resep Tidak Ditemukan" };
  }

  return {
    title: { absolute: `${recipe.title} | Medikal Nutrience` },
    description: recipe.excerpt || recipe.description,
    openGraph: {
      title: `${recipe.title} | Medikal Nutrience`,
      description: recipe.excerpt || recipe.description,
      images: [{ url: recipe.image, alt: recipe.title }],
    },
  };
}

export default async function DapurSehatFimaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = await getFimaRecipeBySlug(slug);

  if (!recipe || recipe.status !== "Published") {
    notFound();
  }

  return (
    <>
      <Navbar />
      <RecipeDetail recipe={recipe} />

      <Footer />
    </>
  );
}
