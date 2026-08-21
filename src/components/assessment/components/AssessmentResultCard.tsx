"use client";

import Image from "next/image";
import Link from "next/link";

import type {
  AssessmentAnswerSummary,
  AssessmentResult,
} from "@/data/assessment";

export function AssessmentResultCard({
  result,
  answers,
  onClose,
}: {
  result: AssessmentResult;
  answers: AssessmentAnswerSummary[];
  onClose?: () => void;
}) {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#006b3f]">
          Assessment Selesai
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-[#111827] md:text-4xl">
          Hasil Assessment Anda
        </h1>
      </div>

      <section className="rounded-[1.75rem] bg-[#f4fbf8] p-5 ring-1 ring-black/5 md:p-6">
        <h2 className="text-xl font-black text-[#111827]">Jawaban Anda</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {answers.map((item) => (
            <div key={item.questionId} className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
              <dt className="text-[10px] font-black uppercase tracking-[0.16em] text-[#006b3f]">
                {item.label}
              </dt>
              <dd className="mt-2 text-sm font-bold leading-6 text-[#334155]">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#006b3f] via-[#087a4c] to-[#10b981] p-5 text-white shadow-xl shadow-green-900/15 md:p-7">
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/70">
          Rekomendasi Nutrisi
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-[10rem_1fr] sm:items-center">
          <div className="relative h-44 rounded-[1.5rem] bg-white/95">
            <Image
              src={result.image}
              alt={result.product}
              fill
              sizes="160px"
              className="object-contain p-3"
            />
          </div>
          <div>
            <h2 className="text-3xl font-black">{result.product}</h2>
            <p className="mt-3 text-sm font-medium leading-7 text-white/80">{result.note}</p>
            <ul className="mt-4 space-y-2">
              {result.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-2 text-sm font-bold text-white/90">
                  <span>✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <p className="rounded-2xl bg-[#f4fbf7] p-4 text-xs leading-6 text-slate-500">
        Rekomendasi ini bersifat informasi awal dan tidak menggantikan diagnosis, saran medis, atau konsultasi langsung dengan dokter maupun ahli gizi.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href={result.ctaUrl}
          className="flex-1 rounded-full bg-[#006b3f] px-7 py-4 text-center text-sm font-black text-white transition hover:bg-[#004b34]"
        >
          Detail Produk
        </Link>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#006b3f]/20 px-7 py-4 text-sm font-black text-[#006b3f]"
          >
            Tutup
          </button>
        ) : null}
      </div>
    </div>
  );
}
