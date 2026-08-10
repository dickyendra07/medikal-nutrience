import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { MediaLibraryClient } from "@/components/cms/media/MediaLibraryClient";
import { requireCmsPermission } from "@/lib/cms/auth";
import { CMS_PERMISSIONS } from "@/lib/cms/permissions";

export default async function CmsMediaPage() {
  const identity = await requireCmsPermission(CMS_PERMISSIONS.MEDIA_VIEW);

  return (
    <CmsAdminShell
      active="media"
      title="Media Library"
      eyebrow="CMS Content"
      description="Kelola asset gambar terpusat untuk artikel, event, produk, solusi, dan Support System."
    >
      <MediaLibraryClient permissions={identity.permissions} />
    </CmsAdminShell>
  );
}
