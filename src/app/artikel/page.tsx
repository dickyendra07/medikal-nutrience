import { ArticlesPage } from "@/components/pages/articles/ArticlesPage";
import { getFallbackCategories, getPublicArticles } from "@/lib/api/articles";

export const revalidate = 300;

export default async function Page() {
  const articles = await getPublicArticles();
  const categories = ["Semua", ...new Set(articles.map((article) => article.category.name))];
  return <ArticlesPage articles={articles} articleCategories={categories.length > 1 ? categories : getFallbackCategories()} />;
}
