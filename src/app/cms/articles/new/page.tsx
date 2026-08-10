import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { ArticleEditorForm } from "@/components/cms/articles/ArticleEditorForm";
import { requireCmsPermission } from "@/lib/cms/auth";
import { CMS_PERMISSIONS } from "@/lib/cms/permissions";

export default async function NewArticlePage() {
  await requireCmsPermission(CMS_PERMISSIONS.ARTICLE_CREATE);
  return <CmsAdminShell active="articles" eyebrow="CMS Editorial" title="Buat Artikel" description="Susun artikel edukasi baru dengan alur editorial yang jelas dan aman."><ArticleEditorForm /></CmsAdminShell>;
}
