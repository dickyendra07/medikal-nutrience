import { notFound, redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { solutionDetails } from "@/data/solutions";

type CmsSolutionEditPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CmsSolutionEditPage({
  params,
}: CmsSolutionEditPageProps) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const { slug } = await params;
  const solution = solutionDetails.find((item) => item.slug === slug);

  if (!solution) {
    notFound();
  }

  return (
    <CmsAdminShell
      active="solutions"
      title={`Edit ${solution.shortTitle}`}
      eyebrow="CMS Solutions"
      description="Kelola konten utama solusi nutrisi seperti judul, slug, deskripsi, problem, edukasi, dan produk rekomendasi."
      actions={
        <div className="flex flex-wrap gap-3">
          <a
            href="/cms/solutions"
            className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
          >
            Back to Solutions
          </a>

          <a
            href={`/solusi/${solution.slug}`}
            target="_blank"
            className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
          >
            View Public
          </a>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
          <div className="border-b border-black/5 pb-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              Solution Content
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#111827]">
              Informasi Solusi
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-[#64748b]">
              Form ini masih tahap UI edit solusi. Batch berikutnya kita
              sambungkan ke save draft seperti module Products.
            </p>
          </div>

          <form className="mt-7 grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-black text-[#111827]">
                  Short Title
                </label>
                <input
                  name="shortTitle"
                  defaultValue={solution.shortTitle}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">
                  Slug
                </label>
                <input
                  name="slug"
                  defaultValue={solution.slug}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Eyebrow
              </label>
              <input
                name="eyebrow"
                defaultValue={solution.eyebrow}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Title
              </label>
              <textarea
                name="title"
                defaultValue={solution.title}
                rows={3}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold leading-7 outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={solution.description}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold leading-7 outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Problem Title
              </label>
              <input
                name="problemTitle"
                defaultValue={solution.problemTitle}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Problems
              </label>
              <textarea
                name="problems"
                defaultValue={solution.problems.join("\n")}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold leading-7 outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
              <p className="mt-2 text-xs font-semibold text-[#94a3b8]">
                Satu poin per baris.
              </p>
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Education Title
              </label>
              <input
                name="educationTitle"
                defaultValue={solution.educationTitle}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Education Points
              </label>
              <textarea
                name="educationPoints"
                defaultValue={solution.educationPoints.join("\n")}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold leading-7 outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
              <p className="mt-2 text-xs font-semibold text-[#94a3b8]">
                Satu poin edukasi per baris.
              </p>
            </div>

            <div className="border-t border-black/5 pt-6">
              <button
                type="button"
                className="rounded-full bg-[#006b3f] px-6 py-4 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-[#005635]"
              >
                Save Draft UI
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-5">
          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              Solution Status
            </p>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl bg-[#f0fdf4] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#64748b]">
                  Current Status
                </p>
                <p className="mt-2 text-xl font-black text-[#006b3f]">
                  Published
                </p>
              </div>

              <div className="rounded-2xl bg-[#f8fafc] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#64748b]">
                  Public URL
                </p>
                <code className="mt-2 block break-all text-xs font-black text-[#475569]">
                  /solusi/{solution.slug}
                </code>
              </div>

              <div className="rounded-2xl bg-[#f8fafc] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#64748b]">
                  Recommended Products
                </p>
                <p className="mt-2 text-3xl font-black text-[#006b3f]">
                  {solution.recommendedProducts.length}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] bg-[#004b34] p-6 text-white shadow-2xl shadow-green-900/15">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-white/50">
              Next Step
            </p>
            <h2 className="mt-4 text-2xl font-black leading-tight">
              Batch berikutnya: save draft solusi.
            </h2>
            <p className="mt-4 text-sm font-medium leading-7 text-white/70">
              Setelah halaman edit ini aman, kita buat server action untuk
              menyimpan draft solusi ke JSON lokal, lalu hubungkan ke halaman
              public /solusi.
            </p>
          </section>
        </aside>
      </div>
    </CmsAdminShell>
  );
}
