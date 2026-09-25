"use client";

import { useState } from "react";
import { stats } from "@/data/home";
import { AssessmentModal } from "@/components/assessment/AssessmentModal";

export function Hero() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#f4fbf8]">
        <div className="absolute left-[-220px] top-[-220px] h-[520px] w-[520px] rounded-full bg-[#d8f6e8]" />
        <div className="absolute right-[-260px] top-24 h-[620px] w-[620px] rounded-full bg-[#c7f5d4]" />
        <div className="absolute bottom-[-180px] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/60" />

        <div className="relative mx-auto grid min-h-[760px] w-full max-w-[1600px] items-center gap-10 px-5 py-14 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-12 xl:px-16">
          <div className="relative z-20 reveal-left">
            <h1 className="max-w-3xl bg-gradient-to-r from-[#004b34] via-[#007a4d] to-[#10b981] bg-clip-text text-[2.55rem] font-black leading-[1.02] tracking-tight text-transparent drop-shadow-sm md:text-7xl">
              Temukan nutrisi yang tepat untuk kondisi Anda
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#475569] md:text-lg">
              Dapatkan rekomendasi produk nutrisi berdasarkan kebutuhan tubuh,
              kondisi kesehatan, dan tahap kehidupan Anda bersama Medikal
              Nutrience.
            </p>

            <div className="mt-9 max-w-2xl rounded-[2rem] bg-white p-6 shadow-2xl shadow-green-900/10 ring-1 ring-black/5">
              <p className="text-sm font-black text-[#006b3f]">
                Temukan Nutrisi Yang Tepat Untuk Anda
              </p>

              <p className="mt-3 text-sm leading-7 text-[#64748b]">
                Jawab beberapa pertanyaan dan dapatkan rekomendasi nutrisi
                yang sesuai dengan kebutuhan Anda.
              </p>

              <button
                type="button"
                onClick={() => setIsAssessmentOpen(true)}
                className="mt-5 rounded-full bg-[#006b3f] px-8 py-4 text-sm font-black text-white shadow-lg shadow-green-900/20 transition hover:-translate-y-1 hover:bg-[#005432]"
              >
                Mulai Assessment →
              </button>
            </div>

            <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {stats.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white p-4 shadow-lg shadow-green-900/5 ring-1 ring-black/5 sm:p-5"
                >
                  <p className="text-base font-black leading-tight text-[#111827] md:text-lg">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs font-medium leading-5 text-[#64748b]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 min-h-[520px] md:min-h-[680px] reveal-scale reveal-delay-2">
            <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b7f7d0] md:h-[680px] md:w-[680px]" />
            <div className="absolute right-[-90px] top-24 h-[360px] w-[360px] rounded-full bg-[#d8f6e8]" />
            <div className="absolute bottom-20 left-12 h-[180px] w-[180px] rounded-full bg-white/50" />

            <div className="relative z-20 mx-auto flex min-h-[500px] max-w-[860px] items-center justify-center md:min-h-[680px]">
              <img
                src="/images/mednut/home/hero-family-nutrition.png"
                alt="Keluarga Indonesia bersama produk Medikal Nutrience"
                className="relative z-30 h-auto w-[118%] max-w-none object-contain drop-shadow-2xl md:w-full md:max-w-[760px] xl:max-w-[820px]"
              />
            </div>
          </div>
        </div>
      </section>

      <AssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        initialFlowKey="recovery"
      />
    </>
  );
}
