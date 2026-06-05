"use client";

import { useEffect, useMemo, useState } from "react";
import {
  assessmentDisclaimer,
  assessmentFlows,
  type AssessmentLeadPayload,
} from "@/data/assessment";

type AssessmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialFlowKey?: string;
};

type Answers = Record<string, string>;

export function AssessmentModal({
  isOpen,
  onClose,
  initialFlowKey,
}: AssessmentModalProps) {
  const [selectedFlowKey, setSelectedFlowKey] = useState(
    initialFlowKey ?? assessmentFlows[0].key
  );
  const [screen, setScreen] = useState<"intro" | "question" | "loading" | "result">(
    "intro"
  );
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  useEffect(() => {
    if (isOpen && initialFlowKey) {
      setSelectedFlowKey(initialFlowKey);
      setStep(0);
      setAnswers({});
      setScreen("intro");
    }
  }, [isOpen, initialFlowKey]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const selectedFlow = useMemo(() => {
    return (
      assessmentFlows.find((flow) => flow.key === selectedFlowKey) ??
      assessmentFlows[0]
    );
  }, [selectedFlowKey]);

  const currentQuestion = selectedFlow.questions[step];
  const progress = Math.round(((step + 1) / selectedFlow.questions.length) * 100);

  if (!isOpen) {
    return null;
  }

  const resetModal = () => {
    setScreen("intro");
    setStep(0);
    setAnswers({});
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleStart = () => {
    setScreen("loading");

    window.setTimeout(() => {
      setScreen("question");
    }, 500);
  };

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((current) => ({
      ...current,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (!currentQuestion || !answers[currentQuestion.id]) {
      return;
    }

    if (step >= selectedFlow.questions.length - 1) {
      setScreen("loading");

      window.setTimeout(() => {
        setScreen("result");
      }, 650);

      return;
    }

    setStep((current) => current + 1);
  };

  const handleBack = () => {
    if (screen === "question" && step > 0) {
      setStep((current) => current - 1);
      return;
    }

    if (screen === "question") {
      setScreen("intro");
      return;
    }

    if (screen === "result") {
      setScreen("question");
    }
  };

  const getRecommendation = () => {
    if (selectedFlow.key === "ginjal") {
      if (answers.dialysis === "dialysis") {
        return {
          product: "NEPHRISOL-D",
          slug: "nephrisol-d",
          note: "Dipilih karena Anda menjalani dialisis dan membutuhkan dukungan nutrisi yang disesuaikan.",
        };
      }

      return {
        product: "NEPHRISOL",
        slug: "nephrisol",
        note: "Dipilih untuk dukungan nutrisi ginjal sebelum dialisis atau kondisi ginjal yang membutuhkan pengaturan asupan.",
      };
    }

    if (selectedFlow.key === "hati") {
      if (answers["liver-condition"] === "severe") {
        return {
          product: "HEPATOSOL LOLA",
          slug: "hepatosol-lola",
          note: "Dipilih untuk dukungan nutrisi pada kondisi hati yang membutuhkan perhatian lebih intensif.",
        };
      }

      return {
        product: "HEPATOSOL",
        slug: "hepatosol",
        note: "Dipilih untuk dukungan nutrisi pada gangguan fungsi hati kronik.",
      };
    }

    if (selectedFlow.key === "daya-tahan") {
      if (answers.milk === "milk-no") {
        return {
          product: "ENTRASOY",
          slug: "entrasoy",
          note: "Dipilih karena Anda kurang cocok mengonsumsi susu dan membutuhkan alternatif protein nabati.",
        };
      }

      return {
        product: "ENTRAMIX",
        slug: "entramix",
        note: "Dipilih untuk membantu memenuhi kebutuhan nutrisi harian dewasa dan lansia.",
      };
    }

    return {
      product: selectedFlow.product,
      slug: selectedFlow.productSlug,
      note: selectedFlow.productNote,
    };
  };

  const recommendation = getRecommendation();

  const leadPayload: AssessmentLeadPayload = {
    flowKey: selectedFlow.key,
    flowLabel: selectedFlow.label,
    recommendedProduct: recommendation.product,
    recommendedProductSlug: recommendation.slug,
    answers,
    createdAt: new Date().toISOString(),
  };

  const saveLeadLater = () => {
    console.log("Assessment lead payload for future NestJS API:", leadPayload);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0f172a]/45 px-0 pt-8 backdrop-blur-md md:items-center md:px-4 md:py-6">
      <button
        type="button"
        onClick={handleClose}
        className="absolute inset-0 cursor-default"
        aria-label="Close assessment overlay"
      />

      <div className="relative flex max-h-[94dvh] w-full max-w-5xl md:max-h-[92vh]">
        <div className="absolute inset-0 hidden rotate-2 rounded-[2.5rem] bg-[#f4fbf8] shadow-2xl md:block" />

        <section className="relative flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl ring-1 ring-black/10 md:max-h-[92vh] md:rounded-[2.5rem]">
          <div className="flex shrink-0 items-center justify-between border-b border-black/5 px-5 py-4 md:absolute md:right-5 md:top-5 md:z-20 md:border-0 md:p-0">
            <div className="md:hidden">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006b3f]">
                Assessment
              </p>
              <p className="text-sm font-black text-[#0f172a]">
                {selectedFlow.label}
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e4f8ed] text-xl font-black text-[#006b3f] ring-1 ring-black/5 transition hover:bg-[#006b3f] hover:text-white"
            >
              ×
            </button>
          </div>

          <div className="overflow-y-auto p-5 md:p-8">
            {screen === "intro" ? (
              <div className="grid gap-5 lg:min-h-[560px] lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
                <div
                  className={`hidden min-h-[300px] items-center justify-center rounded-[2rem] bg-gradient-to-br ${selectedFlow.theme.gradient} p-7 text-white md:flex`}
                >
                  <div className="text-center">
                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 text-4xl backdrop-blur">
                      {selectedFlow.icon}
                    </div>
                    <p className="text-sm font-black uppercase tracking-[0.25em] text-white/70">
                      Assessment
                    </p>
                    <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                      Rekomendasi Nutrisi Personal
                    </h2>
                    <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-white/80">
                      Pilih kondisi utama, lalu jawab beberapa pertanyaan singkat
                      untuk mendapatkan arahan produk.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <p className="hidden text-sm font-black uppercase tracking-[0.25em] text-[#006b3f] md:block">
                    Pilih Kondisi
                  </p>

                  <h3 className="max-w-2xl text-3xl font-black leading-tight text-[#0f172a] md:mt-4 md:text-5xl">
                    Apa kebutuhan utama Anda hari ini?
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#64748b] md:mt-4">
                    Pilih salah satu kondisi yang paling sesuai. Rekomendasi akan
                    disesuaikan berdasarkan jawaban Anda.
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3 md:mt-7 xl:grid-cols-4">
                    {assessmentFlows.map((flow) => {
                      const isActive = selectedFlow.key === flow.key;

                      return (
                        <button
                          key={flow.key}
                          type="button"
                          onClick={() => {
                            setSelectedFlowKey(flow.key);
                            setStep(0);
                            setAnswers({});
                          }}
                          className={`group rounded-2xl border p-3 text-left transition md:rounded-3xl md:p-4 ${
                            isActive
                              ? "border-[#006b3f] bg-[#e4f8ed] shadow-lg shadow-green-900/10"
                              : "border-black/10 bg-white hover:border-[#006b3f]/30 hover:bg-[#f8fafc]"
                          }`}
                        >
                          <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm md:mb-3 md:h-12 md:w-12">
                            {flow.icon}
                          </span>
                          <span className="block text-xs font-black leading-tight text-[#0f172a] group-hover:text-[#006b3f] md:text-sm">
                            {flow.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 grid gap-3 md:mt-7 md:grid-cols-[1fr_auto] md:items-center">
                    <p className="rounded-2xl bg-[#f8fafc] px-4 py-3 text-[11px] leading-5 text-[#64748b] md:px-5 md:py-4 md:text-xs md:leading-6">
                      {assessmentDisclaimer}
                    </p>

                    <button
                      type="button"
                      onClick={handleStart}
                      className="hidden rounded-full bg-[#006b3f] px-8 py-4 text-sm font-black text-white shadow-lg shadow-green-900/20 transition hover:bg-[#005432] md:inline-flex"
                    >
                      Mulai Assessment
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {screen === "loading" ? (
              <div className="flex min-h-[58dvh] flex-col items-center justify-center text-center md:min-h-[560px]">
                <div className="mb-7 flex gap-2 md:mb-8 md:gap-3">
                  {[0, 1, 2, 3].map((item) => (
                    <span
                      key={item}
                      className={`h-2 w-12 rounded-full md:w-16 ${
                        item === 0 ? "bg-[#006b3f]" : "bg-[#d1d5db]"
                      }`}
                    />
                  ))}
                </div>

                <h2 className="max-w-2xl text-4xl font-black leading-tight text-[#0f172a] md:text-6xl">
                  Menyiapkan Rekomendasi untuk Anda...
                </h2>

                <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-[#64748b] md:mt-6 md:text-base md:leading-8">
                  Kami sedang menyesuaikan kebutuhan nutrisi berdasarkan jawaban
                  Anda.
                </p>
              </div>
            ) : null}

            {screen === "question" && currentQuestion ? (
              <div className="pb-24 md:min-h-[560px] md:p-6 md:pb-6">
                <div className="mb-7 flex gap-2 md:mb-10 md:gap-3">
                  {selectedFlow.questions.map((question, index) => (
                    <span
                      key={question.id}
                      className={`h-2 flex-1 rounded-full transition ${
                        index <= step ? "bg-[#006b3f]" : "bg-[#d1d5db]"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#006b3f] md:text-sm">
                  Pertanyaan {step + 1} dari {selectedFlow.questions.length}
                </p>

                <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-[#0f172a] md:mt-5 md:text-5xl">
                  {currentQuestion.title}
                </h2>

                <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#64748b] md:mt-6 md:text-sm">
                  Pilih salah satu
                </p>

                <div className="mt-4 grid gap-3 md:mt-6">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.id] === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          handleAnswer(currentQuestion.id, option.value)
                        }
                        className={`flex items-center gap-4 rounded-2xl border px-4 py-4 text-left transition md:px-5 ${
                          isSelected
                            ? "border-[#006b3f] bg-[#e4f8ed]"
                            : "border-black/10 bg-white hover:border-[#006b3f]/30 hover:bg-[#f8fafc]"
                        }`}
                      >
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                            isSelected
                              ? "border-[#006b3f] bg-[#006b3f]"
                              : "border-[#cbd5e1] bg-white"
                          }`}
                        >
                          {isSelected ? (
                            <span className="h-2.5 w-2.5 rounded-full bg-white" />
                          ) : null}
                        </span>

                        <span className="text-base font-bold text-[#0f172a] md:text-lg">
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 hidden items-center justify-between gap-4 md:flex">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-full px-7 py-4 text-sm font-black text-[#334155] transition hover:bg-[#f8fafc]"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                    className="rounded-full bg-[#a3f56d] px-9 py-4 text-sm font-black text-[#0f172a] shadow-lg shadow-lime-900/10 transition hover:bg-[#8ee85c] disabled:cursor-not-allowed disabled:bg-[#e5e7eb] disabled:text-[#94a3b8]"
                  >
                    {step >= selectedFlow.questions.length - 1
                      ? "Lihat Hasil"
                      : "Next"}
                  </button>
                </div>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#e5e7eb] md:mt-6">
                  <div
                    className="h-full rounded-full bg-[#006b3f] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : null}

            {screen === "result" ? (
              <div className="grid gap-6 pb-6 md:min-h-[560px] md:grid-cols-[0.9fr_1.1fr] md:items-center md:pb-0">
                <div
                  className={`flex min-h-[240px] items-center justify-center rounded-[2rem] bg-gradient-to-br ${selectedFlow.theme.gradient} p-8 text-white md:min-h-[360px]`}
                >
                  <div className="text-center">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-white/70 md:text-sm">
                      Rekomendasi Produk
                    </p>
                    <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                      {recommendation.product}
                    </h2>
                    <p className="mt-5 text-sm leading-7 text-white/80">
                      Arahan awal berdasarkan jawaban assessment Anda.
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-[#006b3f]">
                    Hasil Assessment
                  </p>

                  <h3 className="mt-4 text-3xl font-black leading-tight text-[#0f172a] md:text-5xl">
                    Produk yang paling sesuai untuk kebutuhan Anda
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-[#64748b] md:text-base md:leading-8">
                    {recommendation.note}
                  </p>

                  <p className="mt-5 rounded-2xl bg-[#f8fafc] px-4 py-3 text-[11px] leading-5 text-[#64748b] md:px-5 md:py-4 md:text-xs md:leading-6">
                    {assessmentDisclaimer}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 md:mt-8">
                    <a
                      href={`/produk/${recommendation.slug}`}
                      onClick={saveLeadLater}
                      className="rounded-full bg-[#006b3f] px-7 py-4 text-center text-sm font-black text-white shadow-lg shadow-green-900/20"
                    >
                      Lihat Detail Produk
                    </a>

                    <a
                      href="/kontak"
                      onClick={saveLeadLater}
                      className="rounded-full border border-[#006b3f]/20 bg-[#f4fbf8] px-7 py-4 text-center text-sm font-black text-[#006b3f]"
                    >
                      Konsultasi Ahli Gizi
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={resetModal}
                    className="mt-4 w-full rounded-full px-7 py-4 text-sm font-black text-[#334155] transition hover:bg-[#f8fafc]"
                  >
                    Ulangi Assessment
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {screen === "intro" ? (
            <div className="shrink-0 border-t border-black/5 bg-white px-5 py-4 md:hidden">
              <button
                type="button"
                onClick={handleStart}
                className="w-full rounded-full bg-[#006b3f] px-8 py-4 text-sm font-black text-white shadow-lg shadow-green-900/20 transition hover:bg-[#005432]"
              >
                Mulai Assessment
              </button>
            </div>
          ) : null}

          {screen === "question" && currentQuestion ? (
            <div className="fixed bottom-0 left-0 right-0 z-[120] border-t border-black/5 bg-white/95 px-5 py-4 shadow-2xl backdrop-blur md:hidden">
              <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="rounded-full px-6 py-3 text-sm font-black text-[#334155] transition hover:bg-[#f8fafc]"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.id]}
                  className="rounded-full bg-[#a3f56d] px-8 py-3 text-sm font-black text-[#0f172a] shadow-lg shadow-lime-900/10 transition hover:bg-[#8ee85c] disabled:cursor-not-allowed disabled:bg-[#e5e7eb] disabled:text-[#94a3b8]"
                >
                  {step >= selectedFlow.questions.length - 1
                    ? "Lihat Hasil"
                    : "Next"}
                </button>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
