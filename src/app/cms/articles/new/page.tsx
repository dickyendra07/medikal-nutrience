import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { ArticleEditorForm } from "@/components/cms/articles/ArticleEditorForm";
import { isCmsAuthenticated } from "@/lib/cms/auth";

export default async function NewArticlePage() {
  if (!(await isCmsAuthenticated())) redirect("/cms/login");
  return <CmsAdminShell active="articles" eyebrow="CMS Editorial" title="Buat Artikel" description="Susun artikel edukasi baru dengan alur editorial yang jelas dan aman."><ArticleEditorForm /></CmsAdminShell>;
}
