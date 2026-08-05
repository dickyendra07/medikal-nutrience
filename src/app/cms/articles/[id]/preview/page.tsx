import { redirect } from "next/navigation";
import { ArticlePreviewClient } from "@/components/cms/articles/ArticlePreviewClient";
import { isCmsAuthenticated } from "@/lib/cms/auth";

export default async function ArticlePreviewPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isCmsAuthenticated())) redirect("/cms/login");
  const { id } = await params;
  return <ArticlePreviewClient articleId={id} />;
}
