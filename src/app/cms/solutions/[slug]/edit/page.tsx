import { notFound, redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { solutionDetails } from "@/data/solutions";
import { deleteSolutionDraft, saveSolutionDraft } from "./actions";
import { promises as fs } from "fs";
import path from "path";

type CmsSolutionDraft = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  problemTitle: string;
  problems: string[];
  educationTitle: string;
  educationPoints: string[];
  status: "published" | "draft" | "review";
  updatedAt: string;
};

async function getSolutionDraft(slug: string) {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "src/data/cms/cms-solutions.json"),
      "utf8"
    );
    const drafts = JSON.parse(file) as Record<string, CmsSolutionDraft>;
    return drafts[slug] ?? null;
  } catch {
    return null;
  }
}


type CmsSolutionEditPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    saved?: string;
    reset?: string;
  }>;
};

export default async function CmsSolutionEditPage({
  params,
  searchParams,
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

  const draft = await getSolutionDraft(slug);
  const paramsQuery = await searchParams;
  const isSaved = paramsQuery.saved === "1";
  const isReset = paramsQuery.reset === "1";

  const viewData = {
    slug: draft?.slug ?? solution.slug,
    title: draft?.title ?? solution.title,
    shortTitle: draft?.shortTitle ?? solution.shortTitle,
    eyebrow: draft?.eyebrow ?? solution.eyebrow,
    description: draft?.description ?? solution.description,
    problemTitle: draft?.problemTitle ?? solution.problemTitle,
    problems: draft?.problems ?? solution.problems,
    educationTitle: draft?.educationTitle ?? solution.educationTitle,
    educationPoints: draft?.educationPoints ?? solution.educationPoints,
    status: draft?.status ?? "published",
    updatedAt: draft?.updatedAt ?? null,
  };

  return (
    <CmsAdminShell
      active="solutions"
      title={`Edit ${viewData.shortTitle}`}
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
            href={`/solusi/${viewData.slug}`}
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
              Form ini sudah dapat menyimpan draft solusi ke storage JSON lokal
              untuk kebutuhan staging/demo CMS.
            </p>

            {isSaved ? (
              <div className="mt-5 rounded-2xl bg-[#e4f8ed] px-5 py-4 text-sm font-black text-[#006b3f] ring-1 ring-[#006b3f]/10">
                Draft solusi berhasil disimpan.
              </div>
            ) : null}

            {isReset ? (
              <div className="mt-5 rounded-2xl bg-[#fff7ed] px-5 py-4 text-sm font-black text-[#c2410c] ring-1 ring-[#fb923c]/20">
                Draft solusi berhasil dihapus. Konten kembali menggunakan data original.
              </div>
            ) : null}
          </div>

          <form action={saveSolutionDraft} className="mt-7 grid gap-5">
            <input type="hidden" name="originalSlug" value={solution.slug} />
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-black text-[#111827]">
                  Short Title
                </label>
                <input
                  name="shortTitle"
                  defaultValue={viewData.shortTitle}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">
                  Slug
                </label>
                <input
                  name="slug"
                  defaultValue={viewData.slug}
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
                defaultValue={viewData.eyebrow}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Title
              </label>
              <textarea
                name="title"
                defaultValue={viewData.title}
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
                defaultValue={viewData.description}
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
                defaultValue={viewData.problemTitle}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Problems
              </label>
              <textarea
                name="problems"
                defaultValue={viewData.problems.join("\n")}
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
                defaultValue={viewData.educationTitle}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Education Points
              </label>
              <textarea
                name="educationPoints"
                defaultValue={viewData.educationPoints.join("\n")}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold leading-7 outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
              <p className="mt-2 text-xs font-semibold text-[#94a3b8]">
                Satu poin edukasi per baris.
              </p>
            </div>

            <div className="border-t border-black/5 pt-6">
              <button
                type="submit"
                className="rounded-full bg-[#006b3f] px-6 py-4 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-[#005635]"
              >
                Save Draft
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
                <p className="mt-2 text-xl font-black capitalize text-[#006b3f]">
                  {viewData.status}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f8fafc] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#64748b]">
                  Public URL
                </p>
                <code className="mt-2 block break-all text-xs font-black text-[#475569]">
                  /solusi/{viewData.slug}
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

              <div className="rounded-2xl bg-[#f8fafc] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#64748b]">
                  Last Draft Update
                </p>
                <p className="mt-2 text-sm font-black text-[#475569]">
                  {viewData.updatedAt
                    ? new Date(viewData.updatedAt).toLocaleString("id-ID")
                    : "Belum ada draft"}
                </p>
              </div>

              <div className="rounded-2xl bg-[#fff7ed] p-4 ring-1 ring-[#fed7aa]">
                <p className="text-xs font-black uppercase tracking-wide text-[#c2410c]">
                  Reset Draft
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-[#9a3412]">
                  Hapus draft CMS dan kembalikan solusi ke data original.
                </p>

                <form action={deleteSolutionDraft} className="mt-4">
                  <input type="hidden" name="originalSlug" value={solution.slug} />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#c2410c] px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:bg-[#9a3412]"
                  >
                    Reset Draft
                  </button>
                </form>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] bg-[#004b34] p-6 text-white shadow-2xl shadow-green-900/15">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-white/50">
              Next Step
            </p>
            <h2 className="mt-4 text-2xl font-black leading-tight">
              Batch berikutnya: connect ke public.
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
