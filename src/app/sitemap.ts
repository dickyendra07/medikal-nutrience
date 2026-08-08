import type { MetadataRoute } from "next";
import { productDetails } from "@/data/product-details";
import { solutionDetails } from "@/data/solutions";
import { getPublicArticles } from "@/lib/api/articles";
import { getFimaRecipes } from "@/lib/cms/fima-storage";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://medikal-nutrience.vercel.app"
).replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, fimaRecipes] = await Promise.all([
    getPublicArticles(),
    getFimaRecipes(),
  ]);
  const staticRoutes = [
    "",
    "/produk",
    "/solusi",
    "/support-system",
    "/support-system/dapur-sehat-fima",
    "/support-system/kalkulator-status-gizi",
    "/support-system/kisah-sukses-pasien",
    "/support-system/komunitas-sehat",
    "/artikel",
    "/event",
    "/tentang",
    "/kontak",
    "/apotek-resmi",
    "/faq",
    "/mitra-enterprise",
    "/kebijakan-privasi",
  ];

  const dynamicRoutes = [
    ...productDetails.map((product) => `/produk/${product.slug}`),
    ...solutionDetails.map((solution) => `/solusi/${solution.slug}`),
    ...articles.map((article) => `/artikel/${article.slug}`),
    ...fimaRecipes.filter((recipe) => recipe.status === "Published").map(
      (recipe) => `/support-system/dapur-sehat-fima/${recipe.slug}`
    ),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
