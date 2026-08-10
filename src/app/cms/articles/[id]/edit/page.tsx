import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { ArticleEditorForm } from "@/components/cms/articles/ArticleEditorForm";
import { requireCmsPermission } from "@/lib/cms/auth";
import { CMS_PERMISSIONS } from "@/lib/cms/permissions";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  await requireCmsPermission(CMS_PERMISSIONS.ARTICLE_EDIT);
  const { id } = await params;
  return <CmsAdminShell active="articles" eyebrow="CMS Editorial" title="Edit Artikel" description="Perbarui konten, metadata, dan pengaturan publikasi artikel."><ArticleEditorForm articleId={id} /></CmsAdminShell>;
}
