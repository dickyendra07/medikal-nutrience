"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const productOptions = [
  "Entramix",
  "Entrakid",
  "Nephrisol",
  "Pulmosol",
  "Entrasoy",
  "Peptisol",
  "Oligo",
  "Hepatosol",
  "Hepatosol Lola",
  "Peptibren",
];

const infoSources = [
  "Instagram",
  "WhatsApp",
  "Dokter / Ahli Gizi",
  "Rumah Sakit / Klinik",
  "Teman / Keluarga",
  "Website Medikal Nutrience",
  "Lainnya",
];

export default function EventPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleProduct = (product: string) => {
    setSelectedProducts((current) =>
      current.includes(product)
        ? current.filter((item) => item !== product)
        : [...current, product]
    );
  };

  return (
    <>
      <Navbar />

      <main className="bg-[#f4fbf8]">
        <section className="relative overflow-hidden px-5 py-12 md:py-20 lg:px-10">
          <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#d9f3e8]" />
          <div className="absolute bottom-[-220px] right-[-140px] h-[480px] w-[480px] rounded-full bg-[#c6f1df]" />

          <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="reveal-left">
              <p className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-[#006b3f] shadow-lg shadow-green-900/8 ring-1 ring-black/5">
                Event Medikal Nutrience
              </p>

              <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-[#111827] md:text-6xl">
                Hari Gizi Nasional 2026
              </h1>

              <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[#5f6b76] md:text-lg md:leading-9">
                Gizi Seimbang untuk Lansia Kuat & Aktif. Ikuti health talk dan
                demo cooking bersama tenaga kesehatan profesional.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-5 shadow-lg shadow-green-900/5 ring-1 ring-black/5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#006b3f]">
                    Lokasi
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-[#334155]">
                    Auditorium RS Permata Cibubur Lt. 4
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-lg shadow-green-900/5 ring-1 ring-black/5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#006b3f]">
                    Tanggal
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-[#334155]">
                    Kamis, 22 Januari 2026
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-lg shadow-green-900/5 ring-1 ring-black/5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#006b3f]">
                    Waktu
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-[#334155]">
                    08.30 – 11.30 WIB
                  </p>
                </div>
              </div>

              <a
                href="#registration"
                className="mt-8 inline-flex rounded-full bg-[#006b3f] px-8 py-4 text-sm font-black text-white shadow-xl shadow-green-900/20 transition hover:-translate-y-1 hover:bg-[#005432]"
              >
                Daftar Event Sekarang
              </a>
            </div>

            <div className="reveal-scale reveal-delay-2">
              <div className="overflow-hidden rounded-[2.5rem] bg-white p-4 shadow-2xl shadow-green-900/10 ring-1 ring-black/5">
                <img
                  src="/images/mednut/events/hgn-2026.webp"
                  alt="Poster Hari Gizi Nasional 2026"
                  className="w-full rounded-[2rem] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-12 md:py-16 lg:px-10">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: "Health Talk",
                  desc: "Diskusi edukatif seputar gizi seimbang untuk lansia agar tetap kuat dan aktif.",
                },
                {
                  title: "Demo Cooking",
                  desc: "Inspirasi menu sehat yang mudah diterapkan untuk mendukung kebutuhan nutrisi harian.",
                },
                {
                  title: "Free Check & Sample",
                  desc: "Pemeriksaan protein, komposisi tubuh, snack box, lunch box, drink, dan sample selama kuota tersedia.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-[2rem] bg-white p-7 shadow-xl shadow-slate-900/8 ring-1 ring-black/5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#006b3f]">
                    Program
                  </p>
                  <h2 className="mt-4 text-2xl font-black leading-tight text-[#111827]">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-sm font-medium leading-7 text-[#64748b]">
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="registration" className="px-5 py-12 md:py-20 lg:px-10">
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div className="rounded-[2.5rem] bg-[#006b3f] p-8 text-white shadow-2xl shadow-green-900/15 md:p-10">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-white/60">
                Form Registrasi
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
                Daftar Hari Gizi Nasional 2026
              </h2>
              <p className="mt-5 text-sm font-medium leading-7 text-white/75 md:text-base md:leading-8">
                Lengkapi data berikut untuk mengikuti event. Data ini akan
                membantu tim Medikal Nutrience mengelola registrasi dan edukasi
                yang relevan.
              </p>

              <div className="mt-8 overflow-hidden rounded-[2rem] bg-white/10 p-4 ring-1 ring-white/10">
                <img
                  src="/images/mednut/events/hgn-2026.webp"
                  alt="Hari Gizi Nasional 2026"
                  className="rounded-[1.5rem]"
                />
              </div>
            </div>

            <form className="rounded-[2.5rem] bg-white p-6 shadow-2xl shadow-slate-900/8 ring-1 ring-black/5 md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Nama Lengkap" placeholder="Tulis nama lengkap" />
                <Field label="Email" placeholder="nama@email.com" type="email" />
                <Field label="Nomor WhatsApp" placeholder="08xxxxxxxxxx" />
                <div>
                  <label className="mb-2 block text-sm font-black text-[#0f172a]">
                    Sumber Informasi Event
                  </label>
                  <select className="w-full rounded-2xl border border-black/10 bg-[#f8fafc] px-5 py-4 text-sm font-bold text-[#334155] outline-none focus:border-[#006b3f]">
                    <option value="">Pilih sumber informasi</option>
                    {infoSources.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-7 rounded-[2rem] bg-[#f8fcfa] p-5 ring-1 ring-black/5">
                <p className="text-sm font-black text-[#0f172a]">
                  Apakah Anda pernah menggunakan produk Medikal Nutrience?
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {["Ya", "Belum"].map((item) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white px-4 py-4 text-sm font-bold text-[#334155] ring-1 ring-black/5"
                    >
                      <input
                        type="radio"
                        name="usedProduct"
                        value={item}
                        className="h-4 w-4 accent-[#006b3f]"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-7 rounded-[2rem] bg-[#f8fcfa] p-5 ring-1 ring-black/5">
                <p className="text-sm font-black text-[#0f172a]">
                  Produk yang pernah digunakan / diminati
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {productOptions.map((product) => (
                    <label
                      key={product}
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-4 text-sm font-bold ring-1 transition ${
                        selectedProducts.includes(product)
                          ? "bg-[#006b3f] text-white ring-[#006b3f]"
                          : "bg-white text-[#334155] ring-black/5"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product)}
                        onChange={() => toggleProduct(product)}
                        className="h-4 w-4 accent-[#006b3f]"
                      />
                      {product}
                    </label>
                  ))}
                </div>
              </div>

              <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-[1.5rem] bg-[#f8fcfa] p-5 text-sm font-bold leading-7 text-[#64748b] ring-1 ring-black/5">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-[#006b3f]" />
                Saya setuju untuk menerima informasi event, edukasi, dan
                komunikasi dari Medikal Nutrience.
              </label>

              <button
                type="button"
                className="mt-7 w-full rounded-full bg-[#006b3f] px-8 py-4 text-sm font-black text-white shadow-xl shadow-green-900/20 transition hover:bg-[#005432]"
              >
                Kirim Registrasi
              </button>

              <p className="mt-4 text-center text-xs font-medium leading-6 text-[#94a3b8]">
                Form ini masih preview frontend. Integrasi penyimpanan data akan
                disambungkan pada tahap CMS/backend.
              </p>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-[#0f172a]">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-black/10 bg-[#f8fafc] px-5 py-4 text-sm font-bold text-[#334155] outline-none focus:border-[#006b3f]"
      />
    </div>
  );
}
