import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { getSettings } from "@/lib/cms/settings-storage";
import { updateSettings } from "./actions";

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
      title="Global Settings"
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

      <form
        action={updateSettings}
        className="space-y-6"
      >
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
          <div className="border-b border-black/5 pb-5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              Website Identity
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#111827]">
              Informasi Website
            </h2>
          </div>

          <div className="mt-6 grid gap-5">
            <input
              name="siteName"
              defaultValue={settings.siteName}
              placeholder="Website Name"
              className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold"
            />

            <textarea
              name="siteDescription"
              defaultValue={settings.siteDescription}
              rows={4}
              placeholder="Website Description"
              className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold"
            />
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
          <div className="border-b border-black/5 pb-5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              SEO Configuration
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#111827]">
              Search Engine Optimization
            </h2>
          </div>

          <div className="mt-6 grid gap-5">
            <input
              name="seoTitle"
              defaultValue={settings.seoTitle}
              placeholder="SEO Title"
              className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold"
            />

            <textarea
              name="seoDescription"
              defaultValue={settings.seoDescription}
              rows={4}
              placeholder="SEO Description"
              className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold"
            />
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
          <div className="border-b border-black/5 pb-5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              Contact Information
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
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
              <input
                key={name}
                name={name}
                defaultValue={settings[name as keyof typeof settings] as string}
                placeholder={label}
                className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold"
              />
            ))}
          </div>
        </section>

        <button
          type="submit"
          className="rounded-full bg-[#006b3f] px-8 py-4 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-green-900/20"
        >
          Save Settings
        </button>

        <p className="text-sm font-bold text-[#64748b]">
          Last update: {formatLastUpdate(settings.updatedAt)}
        </p>
      </form>
    </CmsAdminShell>
  );
}
