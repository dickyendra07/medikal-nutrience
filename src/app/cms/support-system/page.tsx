import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";

const supportModules = [
  {
    title: "Dapur Sehat FIMA",
    description:
      "Kelola resep, artikel nutrisi, bahan, cara penyajian, dan produk terkait.",
    publicHref: "/support-system/dapur-sehat-fima",
    cmsHref: "/cms/support-system/fima",
    status: "Active",
  },
  {
    title: "Kalkulator Status Gizi",
    description:
      "Kelola copywriting, informasi kalkulator, disclaimer, dan hasil status gizi.",
    publicHref: "/support-system/kalkulator-status-gizi",
    status: "Next",
  },
  {
    title: "Kisah Sukses Pasien",
    description:
      "Kelola testimonial, cerita pasien, gambar, dan informasi pendukung.",
    publicHref: "/support-system/kisah-sukses-pasien",
    status: "Next",
  },
  {
    title: "Komunitas Sehat",
    description:
      "Kelola informasi komunitas, program edukasi, manfaat, dan CTA.",
    publicHref: "/support-system/komunitas-sehat",
    status: "Next",
  },
];

export default async function CmsSupportSystemPage() {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  return (
    <CmsAdminShell
      active="support-system"
      title="Support System Management"
      eyebrow="CMS Support System"
      description="Kelola seluruh layanan edukasi dan support system Medikal Nutrience dalam satu module."
      actions={
        <a
          href="/support-system"
          target="_blank"
          className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
        >
          View Public Page
        </a>
      }
    >
      <section className="grid gap-4 md:grid-cols-4">
        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-4xl font-black text-[#006b3f]">
            {supportModules.length}
          </p>
          <p className="mt-2 text-sm font-black text-[#64748b]">
            Total Module
          </p>
        </article>

        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-4xl font-black text-[#006b3f]">4</p>
          <p className="mt-2 text-sm font-black text-[#64748b]">
            Public Pages
          </p>
        </article>

        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-4xl font-black text-[#c2410c]">0</p>
          <p className="mt-2 text-sm font-black text-[#64748b]">
            CMS Connected
          </p>
        </article>

        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-2xl font-black text-[#006b3f]">Development</p>
          <p className="mt-2 text-sm font-black text-[#64748b]">
            Current Status
          </p>
        </article>
      </section>

      <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
        <div className="border-b border-black/5 pb-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
            Support Modules
          </p>
          <h2 className="mt-3 text-3xl font-black text-[#111827]">
            Daftar Support System
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[#64748b]">
            Setiap module akan dikembangkan bertahap dengan pola list, edit,
            draft, reset, dan sinkronisasi ke halaman public.
          </p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {supportModules.map((module) => (
            <article
              key={module.title}
              className="rounded-[1.7rem] bg-[#f8fcfa] p-6 ring-1 ring-black/5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#006b3f]">
                    Support Module
                  </p>
                  <h3 className="mt-3 text-2xl font-black text-[#111827]">
                    {module.title}
                  </h3>
                </div>

                <span className="rounded-full bg-[#fff7ed] px-3 py-1.5 text-xs font-black text-[#c2410c]">
                  {module.status}
                </span>
              </div>

              <p className="mt-4 text-sm font-medium leading-7 text-[#64748b]">
                {module.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={module.publicHref}
                  target="_blank"
                  className="rounded-full bg-white px-5 py-3 text-xs font-black text-[#475569] ring-1 ring-black/5"
                >
                  View Public
                </a>

                {module.cmsHref ? (
                  <a
                    href={module.cmsHref}
                    className="rounded-full bg-[#006b3f] px-5 py-3 text-xs font-black text-white transition hover:bg-[#005635]"
                  >
                    Open CMS
                  </a>
                ) : (
                  <span className="cursor-not-allowed rounded-full bg-[#e2e8f0] px-5 py-3 text-xs font-black text-[#64748b]">
                    CMS Next
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </CmsAdminShell>
  );
}
