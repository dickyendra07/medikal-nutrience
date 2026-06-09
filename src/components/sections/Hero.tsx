"use client";

import { useState } from "react";
import { stats } from "@/data/home";
import { AssessmentModal } from "@/components/assessment/AssessmentModal";

export function Hero() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [selectedAssessmentFlow, setSelectedAssessmentFlow] = useState("recovery");

  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#f4fbf8]">
        <div className="absolute left-[-220px] top-[-220px] h-[520px] w-[520px] rounded-full bg-[#d8f6e8]" />
        <div className="absolute right-[-260px] top-24 h-[620px] w-[620px] rounded-full bg-[#c7f5d4]" />
        <div className="absolute bottom-[-180px] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/60" />

        <div className="relative mx-auto grid min-h-[760px] w-full max-w-[1600px] items-center gap-10 px-5 py-14 md:grid-cols-[0.95fr_1.05fr] md:py-20 lg:px-12 xl:px-16">
          <div className="relative z-20">
            <p className="mb-5 inline-flex rounded-full border border-[#006b3f]/10 bg-white px-5 py-3 text-sm font-black text-[#006b3f] shadow-sm">
              Medikal Nutrience by PT Fima Internasional
            </p>

            <h1 className="max-w-3xl bg-gradient-to-r from-[#004b34] via-[#007a4d] to-[#10b981] bg-clip-text text-5xl font-black uppercase leading-[1.02] tracking-tight text-transparent drop-shadow-sm md:text-7xl">
              Temukan Nutrisi yang Tepat untuk Kondisi Anda
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#475569] md:text-lg">
              Dapatkan rekomendasi produk nutrisi berdasarkan kebutuhan tubuh,
              kondisi kesehatan, dan tahap kehidupan Anda bersama Medikal
              Nutrience.
            </p>

            <div className="mt-9 max-w-2xl rounded-[2rem] bg-white p-4 shadow-2xl shadow-green-900/10 ring-1 ring-black/5">
              <label className="mb-3 block text-sm font-black text-[#006b3f]">
                Kondisi kesehatan Anda hari ini?
              </label>

              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <select
                  value={selectedAssessmentFlow}
                  onChange={(event) => setSelectedAssessmentFlow(event.target.value)}
                  className="w-full rounded-full border border-black/10 bg-[#f8fafc] px-5 py-4 text-sm font-semibold text-[#334155] outline-none focus:border-[#006b3f]"
                >
                  <option value="recovery">Recovery Saat Operasi</option>
                  <option value="ginjal">Ginjal</option>
                  <option value="hati">Hati / Liver</option>
                  <option value="stroke-alzheimer">Stroke / Alzheimer</option>
                  <option value="pernapasan">Pernapasan</option>
                  <option value="pencernaan">Pencernaan</option>
                  <option value="anak">Anak / Tumbuh Kembang</option>
                  <option value="daya-tahan">Jaga Kesehatan & Daya Tahan Tubuh</option>
                </select>

                <button
                  type="button"
                  onClick={() => setIsAssessmentOpen(true)}
                  className="rounded-full bg-[#006b3f] px-8 py-4 text-sm font-black text-white shadow-lg shadow-green-900/20 transition hover:-translate-y-1 hover:bg-[#005432]"
                >
                  Temukan Rekomendasi
                </button>
              </div>
            </div>

            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white p-5 shadow-lg shadow-green-900/5 ring-1 ring-black/5"
                >
                  <p className="text-3xl font-black text-[#006b3f]">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-[#64748b]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 min-h-[560px] md:min-h-[680px]">
            <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b7f7d0] md:h-[680px] md:w-[680px]" />
            <div className="absolute right-[-90px] top-24 h-[360px] w-[360px] rounded-full bg-[#d8f6e8]" />
            <div className="absolute bottom-20 left-12 h-[180px] w-[180px] rounded-full bg-white/50" />

            <div className="absolute left-0 top-12 z-0 hidden rounded-3xl bg-white/90 p-5 shadow-2xl shadow-green-900/10 ring-1 ring-black/5 lg:block xl:left-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#006b3f]">
                Konsultasi
              </p>
              <p className="mt-2 text-sm font-black text-[#0f172a]">
                Ahli Gizi Gratis
              </p>
            </div>

            <div className="absolute bottom-10 right-0 z-0 hidden rounded-3xl bg-white/90 p-5 shadow-2xl shadow-green-900/10 ring-1 ring-black/5 lg:block xl:right-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#006b3f]">
                Produk
              </p>
              <p className="mt-2 text-sm font-black text-[#0f172a]">
                100% Resmi
              </p>
            </div>

            <div className="relative z-20 mx-auto flex min-h-[560px] max-w-[760px] items-center justify-center md:min-h-[680px]">
              <img
                src="/images/home/hero-home.png"
                alt="Medikal Nutrience official product and nutrition consultant"
                className="relative z-30 h-auto w-full max-w-[700px] object-contain drop-shadow-2xl md:max-w-[760px] xl:max-w-[820px]"
              />
            </div>
          </div>
        </div>
      </section>

      <AssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        initialFlowKey={selectedAssessmentFlow}
      />
    </>
  );
}
