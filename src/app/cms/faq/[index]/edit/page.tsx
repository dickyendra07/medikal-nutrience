import { notFound, redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { faqs } from "@/data/faqs";

type CmsFaqEditPageProps = {
  params: Promise<{
    index: string;
  }>;
};

export default async function CmsFaqEditPage({ params }: CmsFaqEditPageProps) {
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
              Form ini masih tahap UI edit FAQ. Batch berikutnya kita sambungkan
              ke save draft seperti module Products dan Solutions.
            </p>
          </div>

          <form className="mt-7 grid gap-5">
            <div>
              <label className="text-sm font-black text-[#111827]">
                Category
              </label>
              <input
                name="category"
                defaultValue={faq.category}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Question
              </label>
              <textarea
                name="question"
                defaultValue={faq.question}
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
                defaultValue={faq.answer}
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
                  defaultValue={faq.ctaLabel ?? ""}
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
                  defaultValue={faq.ctaHref ?? ""}
                  placeholder="Contoh: /apotek-resmi"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>
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
                  {faq.category}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f8fafc] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#64748b]">
                  CTA Status
                </p>
                <p className="mt-2 text-sm font-black text-[#475569]">
                  {faq.ctaLabel && faq.ctaHref ? "CTA aktif" : "Tanpa CTA"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] bg-[#004b34] p-6 text-white shadow-2xl shadow-green-900/15">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-white/50">
              Next Step
            </p>
            <h2 className="mt-4 text-2xl font-black leading-tight">
              Batch berikutnya: save draft FAQ.
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
