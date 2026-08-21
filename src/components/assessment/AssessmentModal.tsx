"use client";

import { AssessmentFlow } from "@/components/assessment/AssessmentFlow";

type AssessmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialFlowKey?: string;
};

export function AssessmentModal({
  isOpen,
  onClose,
  initialFlowKey,
}: AssessmentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/55 p-3 backdrop-blur-md md:p-6">
      <button
        type="button"
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Tutup assessment"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Assessment nutrisi Medikal Nutrience"
        className="relative z-10 max-h-[calc(100dvh-1.5rem)] w-full max-w-6xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl md:max-h-[calc(100dvh-3rem)] md:rounded-[3rem]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#e4f8ed] text-xl font-black text-[#006b3f] md:right-6 md:top-6"
          aria-label="Tutup"
        >
          ×
        </button>

        <div className="grid min-h-[42rem] lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="relative hidden overflow-hidden bg-gradient-to-br from-[#004b34] via-[#006b3f] to-[#10b981] p-10 text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-white/10" />
            <div className="relative">
              <p className="text-xs font-black tracking-[0.3em] text-white/70">MEDIKAL NUTRIENCE</p>
              <h2 className="mt-8 text-4xl font-black leading-tight lg:text-5xl">
                Temukan Nutrisi yang Tepat untuk Anda
              </h2>
              <p className="mt-6 max-w-md leading-8 text-white/80">
                Pertanyaan berikut akan menyesuaikan diri dengan jawaban Anda untuk memberikan arahan awal yang lebih relevan.
              </p>
            </div>
            <p className="relative text-xs font-bold leading-6 text-white/60">
              Hasil assessment bukan diagnosis dan tetap perlu dikonsultasikan dengan tenaga kesehatan.
            </p>
          </aside>

          <div className="p-6 pt-16 sm:p-8 sm:pt-16 md:p-10 lg:p-12">
            <AssessmentFlow initialFlowKey={initialFlowKey} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}
