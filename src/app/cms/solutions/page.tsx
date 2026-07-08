import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { solutionDetails } from "@/data/solutions";

export default async function CmsSolutionsPage() {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const solutionRows = solutionDetails.map((solution) => ({
    title: solution.title,
    shortTitle: solution.shortTitle,
    eyebrow: solution.eyebrow,
    slug: solution.slug,
    description: solution.description,
    productCount: solution.recommendedProducts.length,
    href: `/solusi/${solution.slug}`,
    theme: solution.theme,
  }));

  return (
    <CmsAdminShell
      active="solutions"
      title="Solutions Management"
      eyebrow="CMS Solutions"
      description="Kelola konten solusi nutrisi berdasarkan kebutuhan tubuh seperti ginjal, hati, pernafasan, pencernaan, anak, pemulihan, dan lansia."
      actions={
        <a
          href="/solusi"
          target="_blank"
          className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
        >
          View Public Page
        </a>
      }
    >
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-4xl font-black text-[#006b3f]">
            {solutionRows.length}
          </p>
          <p className="mt-2 text-sm font-black text-[#64748b]">
            Total Solusi
          </p>
        </article>

        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-4xl font-black text-[#006b3f]">
            {solutionRows.reduce((total, item) => total + item.productCount, 0)}
          </p>
          <p className="mt-2 text-sm font-black text-[#64748b]">
            Produk Direkomendasikan
          </p>
        </article>

        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-4xl font-black text-[#006b3f]">Live</p>
          <p className="mt-2 text-sm font-black text-[#64748b]">
            Public Status
          </p>
        </article>
      </section>

      <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
        <div className="flex flex-col gap-4 border-b border-black/5 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              Solutions List
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#111827]">
              Daftar Solusi Nutrisi
            </h2>
          </div>

          <p className="max-w-xl text-sm font-medium leading-7 text-[#64748b]">
            Module ini masih tahap list CMS. Batch berikutnya kita buat halaman
            edit solusi dan save draft seperti module Products.
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          {solutionRows.map((solution) => (
            <article
              key={solution.slug}
              className="grid gap-4 rounded-[1.7rem] bg-[#f8fcfa] p-5 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-xl hover:shadow-green-900/8 lg:grid-cols-[1.2fr_0.6fr_0.45fr]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide text-white"
                    style={{ backgroundColor: solution.theme.primary }}
                  >
                    {solution.eyebrow}
                  </span>

                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#006b3f] ring-1 ring-black/5">
                    /solusi/{solution.slug}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-black text-[#111827]">
                  {solution.title}
                </h3>

                <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[#64748b]">
                  {solution.description}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#94a3b8]">
                  Recommended Products
                </p>
                <p className="mt-2 text-3xl font-black text-[#006b3f]">
                  {solution.productCount}
                </p>
                <p className="mt-2 text-sm font-bold text-[#64748b]">
                  Produk terhubung
                </p>
              </div>

              <div className="flex items-center gap-2 lg:justify-end">
                <a
                  href={solution.href}
                  target="_blank"
                  className="relative z-20 inline-flex rounded-full bg-[#f1f5f9] px-4 py-2 text-xs font-black text-[#475569] transition hover:bg-[#e2e8f0]"
                >
                  View
                </a>

                <a
                  href={`/cms/solutions/${solution.slug}/edit`}
                  className="relative z-20 inline-flex rounded-full bg-[#006b3f] px-4 py-2 text-xs font-black text-white transition hover:bg-[#005635]"
                >
                  Edit
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-[2rem] bg-[#004b34] p-6 text-white shadow-2xl shadow-green-900/15">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-white/60">
          Next Development Step
        </p>
        <h2 className="mt-4 text-3xl font-black leading-tight">
          Module Solutions sudah masuk ke CMS.
        </h2>
        <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-white/70">
          Tahap berikutnya adalah membuat halaman edit solusi, menyimpan draft,
          lalu menghubungkan draft solusi ke halaman public /solusi.
        </p>
      </section>
    </CmsAdminShell>
  );
}
