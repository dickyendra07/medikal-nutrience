import { notFound, redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { faqs } from "@/data/faqs";
import { deleteFaqDraft, saveFaqDraft } from "./actions";
import { promises as fs } from "fs";
import path from "path";

type CmsFaqDraft = {
  index: number;
  category: string;
  question: string;
  answer: string;
  ctaLabel: string;
  ctaHref: string;
  status: "published" | "draft" | "review";
  updatedAt: string;
};

async function getFaqDraft(index: string) {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "src/data/cms/cms-faqs.json"),
      "utf8"
    );
    const drafts = JSON.parse(file) as Record<string, CmsFaqDraft>;
    return drafts[index] ?? null;
  } catch {
    return null;
  }
}


type CmsFaqEditPageProps = {
  params: Promise<{
    index: string;
  }>;
  searchParams: Promise<{
    saved?: string;
    reset?: string;
  }>;
};

export default async function CmsFaqEditPage({
  params,
  searchParams,
}: CmsFaqEditPageProps) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const { index } = await params;
  const faqIndex = Number(index);
  const faq = faqs[faqIndex];

  if (!faq || Number.isNaN(faqIndex)) {
    notFound();
  }

  const draft = await getFaqDraft(index);
  const paramsQuery = await searchParams;
  const isSaved = paramsQuery.saved === "1";
  const isReset = paramsQuery.reset === "1";

  const viewData = {
    category: draft?.category ?? faq.category,
    question: draft?.question ?? faq.question,
    answer: draft?.answer ?? faq.answer,
    ctaLabel: draft?.ctaLabel ?? faq.ctaLabel ?? "",
    ctaHref: draft?.ctaHref ?? faq.ctaHref ?? "",
    status: draft?.status ?? "published",
    updatedAt: draft?.updatedAt ?? null,
  };

  return (
    <CmsAdminShell
      active="faq"
      title={`Edit FAQ #${faqIndex + 1}`}
      eyebrow="CMS FAQ"
      description="Kelola pertanyaan, jawaban, kategori, dan CTA untuk halaman FAQ Medikal Nutrience."
      actions={
        <div className="flex flex-wrap gap-3">
          <a
            href="/cms/faq"
            className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
          >
            Back to FAQ
          </a>

          <a
            href="/faq"
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
              FAQ Content
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#111827]">
              Informasi FAQ
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-[#64748b]">
              Form ini sudah dapat menyimpan draft FAQ ke storage JSON lokal
              untuk kebutuhan staging/demo CMS.
            </p>

            {isSaved ? (
              <div className="mt-5 rounded-2xl bg-[#e4f8ed] px-5 py-4 text-sm font-black text-[#006b3f] ring-1 ring-[#006b3f]/10">
                Draft FAQ berhasil disimpan.
              </div>
            ) : null}

            {isReset ? (
              <div className="mt-5 rounded-2xl bg-[#fff7ed] px-5 py-4 text-sm font-black text-[#c2410c] ring-1 ring-[#fb923c]/20">
                Draft FAQ berhasil dihapus. Konten kembali menggunakan data original.
              </div>
            ) : null}
          </div>

          <form action={saveFaqDraft} className="mt-7 grid gap-5">
            <input type="hidden" name="originalIndex" value={faqIndex} />
            <div>
              <label className="text-sm font-black text-[#111827]">
                Category
              </label>
              <input
                name="category"
                defaultValue={viewData.category}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Question
              </label>
              <textarea
                name="question"
                defaultValue={viewData.question}
                rows={3}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold leading-7 outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Answer
              </label>
              <textarea
                name="answer"
                defaultValue={viewData.answer}
                rows={8}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold leading-7 outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-black text-[#111827]">
                  CTA Label
                </label>
                <input
                  name="ctaLabel"
                  defaultValue={viewData.ctaLabel}
                  placeholder="Contoh: Cari Apotek"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">
                  CTA URL
                </label>
                <input
                  name="ctaHref"
                  defaultValue={viewData.ctaHref}
                  placeholder="Contoh: /apotek-resmi"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>
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
              FAQ Status
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
                  FAQ Index
                </p>
                <p className="mt-2 text-3xl font-black text-[#006b3f]">
                  #{faqIndex + 1}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f8fafc] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#64748b]">
                  Category
                </p>
                <p className="mt-2 text-sm font-black text-[#475569]">
                  {viewData.category}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f8fafc] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#64748b]">
                  CTA Status
                </p>
                <p className="mt-2 text-sm font-black text-[#475569]">
                  {viewData.ctaLabel && viewData.ctaHref ? "CTA aktif" : "Tanpa CTA"}
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
                  Hapus draft CMS dan kembalikan FAQ ke data original.
                </p>

                <form action={deleteFaqDraft} className="mt-4">
                  <input type="hidden" name="originalIndex" value={faqIndex} />
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
              Batch berikutnya: connect ke public FAQ.
            </h2>
            <p className="mt-4 text-sm font-medium leading-7 text-white/70">
              Setelah halaman edit ini aman, kita buat action untuk menyimpan
              draft FAQ ke JSON lokal, lalu hubungkan ke halaman public FAQ.
            </p>
          </section>
        </aside>
      </div>
    </CmsAdminShell>
  );
}
