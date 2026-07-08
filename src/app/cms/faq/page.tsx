import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { faqCategories, faqs } from "@/data/faqs";

export default async function CmsFaqPage() {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const categories = faqCategories.filter((category) => category !== "Semua");

  return (
    <CmsAdminShell
      active="faq"
      title="FAQ Management"
      eyebrow="CMS FAQ"
      description="Kelola daftar pertanyaan dan jawaban seputar produk, pembelian, Nutrition Finder, event, dan kontak."
      actions={
        <a
          href="/faq"
          target="_blank"
          className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
        >
          View Public FAQ
        </a>
      }
    >
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-4xl font-black text-[#006b3f]">{faqs.length}</p>
          <p className="mt-2 text-sm font-black text-[#64748b]">Total FAQ</p>
        </article>

        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-4xl font-black text-[#006b3f]">{categories.length}</p>
          <p className="mt-2 text-sm font-black text-[#64748b]">Kategori</p>
        </article>

        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-4xl font-black text-[#006b3f]">
            {faqs.filter((faq) => faq.ctaLabel && faq.ctaHref).length}
          </p>
          <p className="mt-2 text-sm font-black text-[#64748b]">FAQ dengan CTA</p>
        </article>
      </section>

      <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
        <div className="flex flex-col gap-4 border-b border-black/5 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              FAQ List
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#111827]">
              Daftar Pertanyaan
            </h2>
          </div>

          <p className="max-w-xl text-sm font-medium leading-7 text-[#64748b]">
            Module ini masih tahap list CMS. Batch berikutnya kita buat halaman
            edit FAQ dan save draft.
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          {faqs.map((faq, index) => (
            <article
              key={`${faq.category}-${faq.question}`}
              className="grid gap-4 rounded-[1.7rem] bg-[#f8fcfa] p-5 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-xl hover:shadow-green-900/8 lg:grid-cols-[1fr_180px_160px]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#e4f8ed] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#006b3f]">
                    {faq.category}
                  </span>

                  {faq.ctaLabel ? (
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#475569] ring-1 ring-black/5">
                      CTA: {faq.ctaLabel}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-4 text-xl font-black text-[#111827]">
                  {faq.question}
                </h3>

                <p className="mt-3 line-clamp-2 text-sm font-medium leading-7 text-[#64748b]">
                  {faq.answer}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#94a3b8]">
                  Index
                </p>
                <p className="mt-2 text-3xl font-black text-[#006b3f]">
                  {index + 1}
                </p>
              </div>

              <div className="flex items-center gap-2 lg:justify-end">
                <a
                  href="/faq"
                  target="_blank"
                  className="relative z-20 inline-flex rounded-full bg-[#f1f5f9] px-4 py-2 text-xs font-black text-[#475569] transition hover:bg-[#e2e8f0]"
                >
                  View
                </a>

                <a
                  href={`/cms/faq/${index}/edit`}
                  className="relative z-20 inline-flex rounded-full bg-[#006b3f] px-4 py-2 text-xs font-black text-white transition hover:bg-[#005635]"
                >
                  Edit
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </CmsAdminShell>
  );
}
