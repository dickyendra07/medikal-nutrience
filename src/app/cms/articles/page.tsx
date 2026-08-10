import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { ArticleListClient } from "@/components/cms/articles/ArticleListClient";
import { requireCmsPermission } from "@/lib/cms/auth";
import { CMS_PERMISSIONS } from "@/lib/cms/permissions";

export default async function CmsArticlesPage() {
  await requireCmsPermission(CMS_PERMISSIONS.ARTICLE_VIEW);

  return (
    <CmsAdminShell
      active="articles"
      eyebrow="CMS Editorial"
      title="Manajemen Artikel"
      description="Kelola pusat edukasi Medikal Nutrience dari draft hingga publikasi dengan workflow editorial yang aman."
    >
      <ArticleListClient />
    </CmsAdminShell>
  );
}
