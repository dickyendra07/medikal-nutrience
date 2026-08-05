import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { ArticleTaxonomyManager } from "@/components/cms/articles/ArticleTaxonomyManager";
import { isCmsAuthenticated } from "@/lib/cms/auth";

export default async function ArticleCategoriesPage() {
  if (!(await isCmsAuthenticated())) redirect("/cms/login");
  return <CmsAdminShell active="articles" eyebrow="CMS Editorial" title="Kategori & Tags" description="Jaga struktur topik artikel tetap konsisten dan mudah dipahami pembaca."><ArticleTaxonomyManager /></CmsAdminShell>;
}
