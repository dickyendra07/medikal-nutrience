"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { FaqItem } from "@/data/faqs";

type FaqClientPageProps = {
  initialFaqs: FaqItem[];
  initialCategories: string[];
};

export function FaqClientPage({
  initialFaqs,
  initialCategories,
}: FaqClientPageProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs =
    activeCategory === "Semua"
      ? initialFaqs
      : initialFaqs.filter((faq) => faq.category === activeCategory);

  return (
    <>
      <Navbar />

      <main className="bg-[#f4fbf8]">
        <section className="relative overflow-hidden px-5 py-14 md:py-24 lg:px-10">
          <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#d9f3e8]" />
          <div className="absolute bottom-[-220px] right-[-120px] h-[460px] w-[460px] rounded-full bg-[#c6f1df]" />

          <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="reveal-left">
              <p className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-[#006b3f] shadow-lg shadow-green-900/8 ring-1 ring-black/5">
                FAQ
              </p>

              <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-[#111827] md:text-6xl">
                Pertanyaan yang Sering Diajukan
              </h1>

              <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[#5f6b76] md:text-lg md:leading-9">
                Temukan jawaban seputar produk Medikal Nutrience, cara memilih
                nutrisi, apotek resmi, event, dan kanal konsultasi.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {initialCategories.slice(0, 6).map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-md shadow-green-900/5 ring-1 ring-black/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal-scale reveal-delay-2">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-7 shadow-2xl shadow-green-900/10 ring-1 ring-black/5">
                <div className="absolute right-[-80px] top-[-80px] h-72 w-72 rounded-full bg-[#d9f3e8]" />
                <div className="absolute bottom-[-100px] left-[-80px] h-80 w-80 rounded-full bg-[#e8f8f1]" />

                <div className="relative z-10 rounded-[2rem] bg-[#f4fbf8] p-7">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
                    Quick Help
                  </p>
                  <h2 className="mt-4 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
                    Butuh bantuan memilih nutrisi?
                  </h2>
                  <p className="mt-4 text-sm font-medium leading-7 text-[#64748b] md:text-base">
                    Gunakan Nutrition Finder atau hubungi tim kami untuk mendapatkan
                    arahan awal sesuai kebutuhan Anda.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href="/"
                      className="rounded-full bg-[#006b3f] px-6 py-4 text-xs font-black uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-[#005635]"
                    >
                      Coba Nutrition Finder
                    </a>
                    <a
                      href="/kontak"
                      className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] ring-1 ring-[#006b3f]/15 transition hover:-translate-y-0.5"
                    >
                      Kontak Kami
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 lg:px-10">
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 lg:grid-cols-[0.32fr_0.68fr]">
            <aside className="h-fit rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-900/5 ring-1 ring-black/5 lg:sticky lg:top-28">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#006b3f]">
                Kategori
              </p>

              <div className="mt-5 grid gap-2">
                {initialCategories.map((category) => {
                  const active = activeCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category);
                        setOpenIndex(0);
                      }}
                      className={`rounded-2xl px-5 py-4 text-left text-sm font-black transition ${
                        active
                          ? "bg-[#006b3f] text-white shadow-lg shadow-green-900/15"
                          : "bg-[#f4fbf8] text-[#0f172a] hover:bg-[#e4f8ed] hover:text-[#006b3f]"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <article
                    key={`${faq.category}-${faq.question}`}
                    className="overflow-hidden rounded-[1.7rem] bg-white shadow-xl shadow-slate-900/5 ring-1 ring-black/5"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-5 px-6 py-6 text-left md:px-8"
                    >
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#006b3f]">
                          {faq.category}
                        </p>
                        <h3 className="mt-2 text-lg font-black leading-tight text-[#111827] md:text-2xl">
                          {faq.question}
                        </h3>
                      </div>

                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl font-black transition ${
                          isOpen
                            ? "rotate-45 bg-[#006b3f] text-white"
                            : "bg-[#e4f8ed] text-[#006b3f]"
                        }`}
                      >
                        +
                      </span>
                    </button>

                    {isOpen ? (
                      <div className="border-t border-black/5 px-6 pb-7 pt-1 md:px-8">
                        <p className="text-sm font-medium leading-8 text-[#64748b] md:text-base md:leading-9">
                          {faq.answer}
                        </p>

                        {faq.ctaLabel && faq.ctaHref ? (
                          <a
                            href={faq.ctaHref}
                            className="mt-5 inline-flex rounded-full bg-[#006b3f] px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-[#005635]"
                          >
                            {faq.ctaLabel}
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
