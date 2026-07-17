import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { getSettings } from "@/lib/cms/settings-storage";

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

export default async function CmsSettingsPage() {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const settings = await getSettings();

  return (
    <CmsAdminShell
      active="settings"
      title="Global Settings"
      eyebrow="CMS Settings"
      description="Kelola informasi website, SEO, kontak, dan informasi global Medikal Nutrience."
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
      <section className="grid gap-4 md:grid-cols-4">
        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-3xl font-black text-[#006b3f]">
            Active
          </p>
          <p className="mt-2 text-sm font-black text-[#64748b]">
            Website Status
          </p>
        </article>

        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-3xl font-black text-[#006b3f]">
            SEO
          </p>
          <p className="mt-2 text-sm font-black text-[#64748b]">
            Configuration
          </p>
        </article>

        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-3xl font-black text-[#006b3f]">
            CMS
          </p>
          <p className="mt-2 text-sm font-black text-[#64748b]">
            Global Data
          </p>
        </article>

        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-lg font-black text-[#006b3f]">
            {formatLastUpdate(settings.updatedAt)}
          </p>
          <p className="mt-2 text-sm font-black text-[#64748b]">
            Last Update
          </p>
        </article>
      </section>

      <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
          Website Identity
        </p>

        <h2 className="mt-3 text-3xl font-black text-[#111827]">
          {settings.siteName}
        </h2>

        <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-[#64748b]">
          {settings.siteDescription}
        </p>
      </section>
    </CmsAdminShell>
  );
}
