import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { ArticleEditorForm } from "@/components/cms/articles/ArticleEditorForm";
import { isCmsAuthenticated } from "@/lib/cms/auth";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isCmsAuthenticated())) redirect("/cms/login");
  const { id } = await params;
  return <CmsAdminShell active="articles" eyebrow="CMS Editorial" title="Edit Artikel" description="Perbarui konten, metadata, dan pengaturan publikasi artikel."><ArticleEditorForm articleId={id} /></CmsAdminShell>;
}
