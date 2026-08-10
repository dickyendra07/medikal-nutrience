import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { ArticleTaxonomyManager } from "@/components/cms/articles/ArticleTaxonomyManager";
import { requireCmsPermission } from "@/lib/cms/auth";
import { CMS_PERMISSIONS } from "@/lib/cms/permissions";

export default async function ArticleCategoriesPage() {
  await requireCmsPermission(CMS_PERMISSIONS.ARTICLE_EDIT);
  return <CmsAdminShell active="articles" eyebrow="CMS Editorial" title="Kategori & Tags" description="Jaga struktur topik artikel tetap konsisten dan mudah dipahami pembaca."><ArticleTaxonomyManager /></CmsAdminShell>;
}
