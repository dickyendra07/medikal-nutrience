import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { getSettings } from "@/lib/cms/settings-storage";
import { updateSettings } from "./actions";
import { CmsCard, CmsSectionHeader, cmsFieldClass } from "@/components/cms/CmsUi";

function formatLastUpdate(value: string | null) {
  if (!value) {
    return "Belum ada";
  }

  return new Date(value).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function CmsSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    saved?: string;
  }>;
}) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const settings = await getSettings();
  const query = await searchParams;

  return (
    <CmsAdminShell
      active="settings"
      title="Pengaturan Website"
      eyebrow="CMS Settings"
      description="Kelola informasi global website, SEO, kontak, dan identitas Medikal Nutrience."
      actions={
        <a
          href="/"
          target="_blank"
          className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
        >
          View Website
        </a>
      }
    >
      {query.saved === "1" ? (
        <div className="mb-6 rounded-2xl bg-[#e4f8ed] px-5 py-4 text-sm font-black text-[#006b3f] ring-1 ring-[#006b3f]/10">
          Global settings berhasil diperbarui.
        </div>
      ) : null}

      <form action={updateSettings} className="space-y-5">
        <div className="grid items-start gap-5 xl:grid-cols-2">
          <CmsCard>
            <CmsSectionHeader eyebrow="Informasi umum" title="Identitas website" description="Nama dan deskripsi utama yang digunakan di seluruh website." />
            <div className="mt-5 grid gap-4">
              <label htmlFor="settings-site-name">Nama website<input id="settings-site-name" name="siteName" defaultValue={settings.siteName} placeholder="Nama website" className={`mt-1.5 ${cmsFieldClass}`} /></label>
              <label htmlFor="settings-site-description">Deskripsi website<textarea id="settings-site-description" name="siteDescription" defaultValue={settings.siteDescription} rows={4} placeholder="Deskripsi singkat website" className={`mt-1.5 ${cmsFieldClass} resize-none py-2.5`} /></label>
            </div>
          </CmsCard>

          <CmsCard>
            <CmsSectionHeader eyebrow="SEO" title="Search engine optimization" description="Metadata default untuk pencarian dan social sharing." />
            <div className="mt-5 grid gap-4">
              <label htmlFor="settings-seo-title">SEO title<input id="settings-seo-title" name="seoTitle" defaultValue={settings.seoTitle} placeholder="SEO title" className={`mt-1.5 ${cmsFieldClass}`} /><span className="mt-1 block text-[10px] font-normal text-slate-400">Disarankan 50–60 karakter.</span></label>
              <label htmlFor="settings-seo-description">SEO description<textarea id="settings-seo-description" name="seoDescription" defaultValue={settings.seoDescription} rows={4} placeholder="SEO description" className={`mt-1.5 ${cmsFieldClass} resize-none py-2.5`} /><span className="mt-1 block text-[10px] font-normal text-slate-400">Disarankan 140–160 karakter.</span></label>
            </div>
          </CmsCard>
        </div>

        <CmsCard>
          <CmsSectionHeader eyebrow="Informasi kontak" title="Kontak dan kanal resmi" description="Informasi perusahaan yang ditampilkan pada titik kontak website." />
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              ["phone", "Phone"],
              ["email", "Email"],
              ["whatsapp", "WhatsApp"],
              ["address", "Address"],
              ["instagram", "Instagram"],
              ["facebook", "Facebook"],
              ["youtube", "Youtube"],
              ["logo", "Logo URL"],
            ].map(([name, label]) => (
              <label key={name} htmlFor={`settings-${name}`}>{label}<input id={`settings-${name}`} name={name} defaultValue={settings[name as keyof typeof settings] as string} placeholder={label} className={`mt-1.5 ${cmsFieldClass}`} /></label>
            ))}
          </div>
        </CmsCard>

        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-slate-400">Terakhir diperbarui: {formatLastUpdate(settings.updatedAt)}</p>
          <button type="submit" className="h-9 rounded-lg bg-[#08704c] px-4 text-[11px] font-semibold text-white hover:bg-[#065e40]">Simpan pengaturan</button>
        </div>
      </form>
    </CmsAdminShell>
  );
}
