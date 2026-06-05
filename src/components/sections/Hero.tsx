"use client";

import { useState } from "react";
import { stats } from "@/data/home";
import { AssessmentModal } from "@/components/assessment/AssessmentModal";

export function Hero() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [selectedAssessmentFlow, setSelectedAssessmentFlow] = useState("recovery");

  return (
    <>
      <section className="relative overflow-hidden bg-[#f4fbf8]">
        <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#d8f6e8]" />
        <div className="absolute right-[-220px] top-20 h-[520px] w-[520px] rounded-full bg-[#c7f5d4]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-20">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-[#006b3f]/10 bg-white px-4 py-2 text-sm font-bold text-[#006b3f] shadow-sm">
              Medikal Nutrience by PT Fima Internasional
            </p>

            <h1 className="max-w-2xl text-4xl font-black leading-[1.05] tracking-tight text-[#0f172a] md:text-6xl">
              Temukan Nutrisi yang Tepat untuk Kondisi Anda
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#475569]">
              Dapatkan rekomendasi produk nutrisi berdasarkan kebutuhan tubuh,
              kondisi kesehatan, dan tahap kehidupan Anda bersama Medikal
              Nutrience.
            </p>

            <div className="mt-8 max-w-xl rounded-[2rem] bg-white p-4 shadow-2xl shadow-green-900/10 ring-1 ring-black/5">
              <label className="mb-3 block text-sm font-black text-[#006b3f]">
                Kondisi kesehatan Anda hari ini?
              </label>

              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <select
                  value={selectedAssessmentFlow}
                  onChange={(event) => setSelectedAssessmentFlow(event.target.value)}
                  className="w-full rounded-full border border-black/10 bg-[#f8fafc] px-5 py-3 text-sm font-semibold text-[#334155] outline-none focus:border-[#006b3f]"
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
                  className="rounded-full bg-[#006b3f] px-7 py-3 text-sm font-black text-white shadow-lg shadow-green-900/20 transition hover:bg-[#005432]"
                >
                  Temukan Rekomendasi
                </button>
              </div>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white p-4 shadow-lg shadow-green-900/5 ring-1 ring-black/5"
                >
                  <p className="text-2xl font-black text-[#006b3f]">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-[#64748b]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[520px]">
            <div className="absolute bottom-4 left-1/2 h-[440px] w-[440px] -translate-x-1/2 rounded-full bg-[#b7f7d0]" />

            <div className="absolute left-0 top-14 z-20 hidden rounded-3xl bg-white p-5 shadow-2xl shadow-green-900/15 ring-1 ring-black/5 md:block">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#006b3f]">
                Konsultasi
              </p>
              <p className="mt-2 text-sm font-black text-[#0f172a]">
                Ahli Gizi Gratis
              </p>
            </div>

            <div className="absolute bottom-12 right-0 z-20 hidden rounded-3xl bg-white p-5 shadow-2xl shadow-green-900/15 ring-1 ring-black/5 md:block">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#006b3f]">
                Produk
              </p>
              <p className="mt-2 text-sm font-black text-[#0f172a]">
                100% Resmi
              </p>
            </div>

            <div className="relative z-10 mx-auto flex min-h-[520px] max-w-md items-end justify-center">
              <div className="absolute bottom-0 h-[430px] w-[300px] rounded-t-[9rem] bg-gradient-to-b from-white to-[#e4f8ed] shadow-2xl shadow-green-900/10" />

              <div className="relative z-10 mb-10 flex h-[360px] w-[230px] flex-col items-center justify-end rounded-t-[7rem] bg-gradient-to-b from-[#ecfff3] to-[#c7f5d4] px-6 pb-8 text-center shadow-xl">
                <div className="mb-6 h-28 w-28 rounded-full bg-[#006b3f]/10" />
                <div className="h-32 w-24 rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
                  <div className="flex h-full flex-col items-center justify-center rounded-3xl bg-gradient-to-b from-[#0b8f52] to-[#006b3f] p-3 text-white">
                    <p className="text-xs font-bold">MEDIKAL</p>
                    <p className="mt-2 text-lg font-black">NUTRIENCE</p>
                  </div>
                </div>
                <p className="mt-5 text-xs font-semibold leading-5 text-[#064e3b]">
                  Area visual dokter dan produk akan kita replace dengan asset
                  asli dari Figma.
                </p>
              </div>
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
