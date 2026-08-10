import { ArticlePreviewClient } from "@/components/cms/articles/ArticlePreviewClient";
import { requireCmsPermission } from "@/lib/cms/auth";
import { CMS_PERMISSIONS } from "@/lib/cms/permissions";

export default async function ArticlePreviewPage({ params }: { params: Promise<{ id: string }> }) {
  await requireCmsPermission(CMS_PERMISSIONS.ARTICLE_VIEW);
  const { id } = await params;
  return <ArticlePreviewClient articleId={id} />;
}
