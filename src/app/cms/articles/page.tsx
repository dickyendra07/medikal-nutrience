import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { ArticleListClient } from "@/components/cms/articles/ArticleListClient";
import { isCmsAuthenticated } from "@/lib/cms/auth";

export default async function CmsArticlesPage() {
  if (!(await isCmsAuthenticated())) redirect("/cms/login");

  return (
    <CmsAdminShell
      active="articles"
      eyebrow="CMS Editorial"
      title="Article Management"
      description="Kelola pusat edukasi Medikal Nutrience dari draft hingga publikasi dengan workflow editorial yang aman."
    >
      <ArticleListClient />
    </CmsAdminShell>
  );
}
