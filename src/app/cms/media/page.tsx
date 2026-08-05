import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { MediaLibraryClient } from "@/components/cms/media/MediaLibraryClient";
import { isCmsAuthenticated } from "@/lib/cms/auth";

export default async function CmsMediaPage() {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) redirect("/cms/login");

  return (
    <CmsAdminShell
      active="media"
      title="Media Library"
      eyebrow="CMS Content"
      description="Kelola asset gambar terpusat untuk artikel, event, produk, solusi, dan Support System."
    >
      <MediaLibraryClient />
    </CmsAdminShell>
  );
}
