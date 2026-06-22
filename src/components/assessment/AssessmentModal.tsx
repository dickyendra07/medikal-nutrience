"use client";

import { useEffect, useMemo, useState } from "react";
import {
  assessmentDisclaimer,
  assessmentFlows,
  type AssessmentLeadPayload,
} from "@/data/assessment";
import { mednutAssets } from "@/data/mednut-assets";

type AssessmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialFlowKey?: string;
};


const assessmentProductAssets: Record<
  string,
  {
    logo?: string;
    image: string;
    accent: string;
  }
> = {
  entrakid: {
    image: mednutAssets.packshots.entrakidVanila,
    accent: "#13a8c5",
  },
  entramix: {
    logo: mednutAssets.productLogos.entramix,
    image: mednutAssets.packshots.entramixVanila,
    accent: "#f59e0b",
  },
  entrasoy: {
    logo: mednutAssets.productLogos.entrasoy,
    image: mednutAssets.packshots.entrasoy,
    accent: "#009c68",
  },
  peptisol: {
    logo: mednutAssets.productLogos.peptisol,
    image: mednutAssets.packshots.peptisolVanila,
    accent: "#d85b70",
  },
  peptibren: {
    logo: mednutAssets.productLogos.peptibren,
    image: mednutAssets.packshots.peptibrenVanila,
    accent: "#DED316",
  },
  nephrisol: {
    logo: mednutAssets.productLogos.nephrisol,
    image: mednutAssets.packshots.nephrisolCappucino,
    accent: "#a855f7",
  },
  "nephrisol-d": {
    logo: mednutAssets.productLogos.nephrisolD,
    image: mednutAssets.packshots.nephrisolDVanila,
    accent: "#7e22ce",
  },
  hepatosol: {
    logo: mednutAssets.productLogos.hepatosol,
    image: mednutAssets.packshots.hepatosolVanila,
    accent: "#ef1f2d",
  },
  "hepatosol-lola": {
    logo: mednutAssets.productLogos.hepatosolLola,
    image: mednutAssets.packshots.hepatosolLola,
    accent: "#ef1f2d",
  },
  oligo: {
    logo: mednutAssets.productLogos.oligo,
    image: mednutAssets.packshots.oligo,
    accent: "#d85b70",
  },
  pulmosol: {
    logo: mednutAssets.productLogos.pulmosol,
    image: mednutAssets.packshots.pulmosol,
    accent: "#1e3a8a",
  },
};

function getAssessmentProductAsset(slug: string) {
  return (
    assessmentProductAssets[slug] ?? {
      image: mednutAssets.packshots.entrasoy,
      accent: "#006b3f",
    }
  );
}

type Answers = Record<string, string>;

type LeadForm = {
  name: string;
  age: string;
  gender: "male" | "female" | "";
  whatsapp: string;
  educationConsent: boolean;
  communicationConsent: boolean;
};

export function AssessmentModal({
  isOpen,
  onClose,
  initialFlowKey,
}: AssessmentModalProps) {
  const [selectedFlowKey, setSelectedFlowKey] = useState(
    initialFlowKey ?? assessmentFlows[0].key
  );
  const [screen, setScreen] = useState<
    "intro" | "question" | "lead" | "loading" | "result"
  >("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [leadForm, setLeadForm] = useState<LeadForm>({
    name: "",
    age: "",
    gender: "",
    whatsapp: "",
    educationConsent: false,
    communicationConsent: false,
  });

  useEffect(() => {
    if (isOpen && initialFlowKey) {
      setSelectedFlowKey(initialFlowKey);
      setStep(0);
      setAnswers({});
    setLeadForm({
      name: "",
      age: "",
      gender: "",
      whatsapp: "",
      educationConsent: false,
      communicationConsent: false,
    });
      setLeadForm({
        name: "",
        age: "",
        gender: "",
        whatsapp: "",
        educationConsent: false,
        communicationConsent: false,
      });
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
    setLeadForm({
      name: "",
      age: "",
      gender: "",
      whatsapp: "",
      educationConsent: false,
      communicationConsent: false,
    });
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
        setScreen("lead");
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

    if (screen === "lead") {
      setScreen("question");
      return;
    }

    if (screen === "result") {
      setScreen("lead");
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
  const recommendedAsset = getAssessmentProductAsset(recommendation.slug);

  const canSubmitLead =
    leadForm.name.trim().length > 1 &&
    leadForm.age.trim().length > 0 &&
    leadForm.gender &&
    leadForm.whatsapp.trim().length >= 8 &&
    leadForm.educationConsent &&
    leadForm.communicationConsent;

  const updateLeadForm = <Key extends keyof LeadForm>(
    key: Key,
    value: LeadForm[Key]
  ) => {
    setLeadForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleLeadSubmit = () => {
    if (!canSubmitLead) {
      return;
    }

    setScreen("loading");

    window.setTimeout(() => {
      setScreen("result");
    }, 650);
  };

  const leadPayload: AssessmentLeadPayload = {
    flowKey: selectedFlow.key,
    flowLabel: selectedFlow.label,
    recommendedProduct: recommendation.product,
    recommendedProductSlug: recommendation.slug,
    answers,
    lead: leadForm,
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
    setLeadForm({
      name: "",
      age: "",
      gender: "",
      whatsapp: "",
      educationConsent: false,
      communicationConsent: false,
    });
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


            {screen === "lead" ? (
              <div className="grid gap-6 pb-6 md:min-h-[560px] md:grid-cols-[0.82fr_1.18fr] md:items-stretch md:pb-0">
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#006b3f] via-[#00885a] to-[#10b981] p-6 text-white md:p-8">
                  <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-white/10" />
                  <div className="absolute bottom-[-90px] left-[-70px] h-72 w-72 rounded-full bg-white/10" />

                  <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-white/70 md:text-sm">
                        Hasil Assessment
                      </p>

                      <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                        Rekomendasi Anda Sudah Siap
                      </h2>

                      <p className="mt-5 text-sm font-medium leading-7 text-white/80">
                        Lengkapi data diri terlebih dahulu untuk membuka hasil
                        rekomendasi produk yang paling sesuai.
                      </p>
                    </div>

                    <div className="mt-8 rounded-[1.5rem] bg-white/12 p-5 backdrop-blur">
                      <p className="text-sm font-bold leading-7 text-white/85">
                        Data ini membantu Medikal Nutrience memberikan edukasi
                        dan komunikasi yang lebih relevan sesuai kebutuhan Anda.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] bg-[#f8fcfa] p-5 ring-1 ring-black/5 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-[#006b3f]">
                    Isi Data Diri
                  </p>

                  <h3 className="mt-4 text-3xl font-black leading-tight text-[#0f172a] md:text-5xl">
                    Lengkapi data untuk melihat hasil assessment
                  </h3>

                  <p className="mt-4 text-sm font-medium leading-7 text-[#64748b]">
                    Data ini membantu Medikal Nutrience memberikan edukasi dan
                    komunikasi yang lebih relevan sesuai kebutuhan Anda.
                  </p>

                  <div className="mt-6 grid gap-4">
                    <div>
                      <label className="text-sm font-black text-[#0f172a]">
                        Nama
                      </label>
                      <input
                        value={leadForm.name}
                        onChange={(event) =>
                          updateLeadForm("name", event.target.value)
                        }
                        placeholder="Tulis nama di sini"
                        className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-sm font-bold text-[#0f172a] outline-none transition focus:border-[#006b3f]"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-black text-[#0f172a]">
                        Usia
                      </label>
                      <input
                        value={leadForm.age}
                        onChange={(event) =>
                          updateLeadForm("age", event.target.value)
                        }
                        type="number"
                        min="1"
                        placeholder="Tulis usia di sini"
                        className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-sm font-bold text-[#0f172a] outline-none transition focus:border-[#006b3f]"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-black text-[#0f172a]">
                        Jenis Kelamin
                      </label>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => updateLeadForm("gender", "male")}
                          className={`rounded-2xl px-4 py-4 text-sm font-black transition ${
                            leadForm.gender === "male"
                              ? "bg-[#006b3f] text-white"
                              : "bg-white text-[#006b3f] ring-1 ring-black/10"
                          }`}
                        >
                          Laki-laki
                        </button>

                        <button
                          type="button"
                          onClick={() => updateLeadForm("gender", "female")}
                          className={`rounded-2xl px-4 py-4 text-sm font-black transition ${
                            leadForm.gender === "female"
                              ? "bg-[#006b3f] text-white"
                              : "bg-white text-[#006b3f] ring-1 ring-black/10"
                          }`}
                        >
                          Perempuan
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-black text-[#0f172a]">
                        Nomor WhatsApp
                      </label>
                      <div className="mt-2 grid grid-cols-[74px_1fr] overflow-hidden rounded-2xl border border-black/10 bg-white focus-within:border-[#006b3f]">
                        <div className="flex items-center justify-center border-r border-black/10 bg-[#f4fbf8] text-sm font-black text-[#006b3f]">
                          +62
                        </div>
                        <input
                          value={leadForm.whatsapp}
                          onChange={(event) =>
                            updateLeadForm("whatsapp", event.target.value)
                          }
                          inputMode="tel"
                          placeholder="Tulis nomor handphone di sini"
                          className="w-full bg-white px-4 py-4 text-sm font-bold text-[#0f172a] outline-none"
                        />
                      </div>
                    </div>

                    <label className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5">
                      <input
                        type="checkbox"
                        checked={leadForm.educationConsent}
                        onChange={(event) =>
                          updateLeadForm(
                            "educationConsent",
                            event.target.checked
                          )
                        }
                        className="mt-1 h-4 w-4 shrink-0"
                      />
                      <span className="text-sm font-medium leading-6 text-[#64748b]">
                        Saya setuju untuk mendapatkan informasi edukasi dari
                        Medikal Nutrience.
                      </span>
                    </label>

                    <label className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5">
                      <input
                        type="checkbox"
                        checked={leadForm.communicationConsent}
                        onChange={(event) =>
                          updateLeadForm(
                            "communicationConsent",
                            event.target.checked
                          )
                        }
                        className="mt-1 h-4 w-4 shrink-0"
                      />
                      <span className="text-sm font-medium leading-6 text-[#64748b]">
                        Dengan mengikuti ini, maka saya bersedia menerima
                        informasi dan komunikasi dari Medikal Nutrience. Medikal
                        Nutrience berkomitmen untuk melindungi dan menghormati
                        privasi saya.
                      </span>
                    </label>

                    <p className="rounded-2xl bg-white px-4 py-3 text-[11px] font-medium leading-5 text-[#64748b] ring-1 ring-black/5">
                      <strong className="text-[#006b3f]">TnC:</strong> Isilah data diri
                      Anda dengan benar karena akan menentukan hasil dan komunikasi
                      edukasi yang akan Anda terima.
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="rounded-full px-6 py-3 text-sm font-black text-[#334155] transition hover:bg-white"
                    >
                      Sebelumnya
                    </button>

                    <button
                      type="button"
                      onClick={handleLeadSubmit}
                      disabled={!canSubmitLead}
                      className="rounded-full bg-[#006b3f] px-8 py-3 text-sm font-black text-white shadow-lg shadow-green-900/20 transition hover:bg-[#005432] disabled:cursor-not-allowed disabled:bg-[#e5e7eb] disabled:text-[#94a3b8]"
                    >
                      Lihat Hasil
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {screen === "result" ? (
              <div className="grid gap-6 pb-6 md:min-h-[560px] md:grid-cols-[0.9fr_1.1fr] md:items-center md:pb-0">
                <div className="relative overflow-hidden rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-900/8 ring-1 ring-black/5">
                  <div
                    className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full opacity-15"
                    style={{ backgroundColor: recommendedAsset.accent }}
                  />
                  <div
                    className="absolute bottom-[-100px] left-[-80px] h-72 w-72 rounded-full opacity-15"
                    style={{ backgroundColor: recommendedAsset.accent }}
                  />

                  <div
                    className="relative z-10 rounded-[1.7rem] p-5"
                    style={{ backgroundColor: `${recommendedAsset.accent}14` }}
                  >
                    <div className="flex min-h-[76px] items-center justify-center rounded-[1.4rem] bg-white px-5 py-4 shadow-lg shadow-black/5">
                      {recommendedAsset.logo ? (
                        <img
                          src={recommendedAsset.logo}
                          alt={`${recommendation.product} logo`}
                          className="max-h-16 w-auto max-w-[280px] object-contain"
                        />
                      ) : (
                        <p
                          className="text-4xl font-black"
                          style={{ color: recommendedAsset.accent }}
                        >
                          {recommendation.product}
                        </p>
                      )}
                    </div>

                    <div className="relative mt-5 flex min-h-[280px] items-center justify-center md:min-h-[380px]">
                      <div
                        className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 md:h-80 md:w-80"
                        style={{ backgroundColor: recommendedAsset.accent }}
                      />

                      <img
                        src={recommendedAsset.image}
                        alt={recommendation.product}
                        className="relative z-10 h-auto w-[78%] max-w-[360px] object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>

                  <div className="relative z-10 mt-4 rounded-[1.4rem] bg-[#f8fcfa] p-4 ring-1 ring-black/5">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#006b3f]">
                      Rekomendasi Produk
                    </p>
                    <p className="mt-2 text-sm font-bold leading-7 text-[#64748b]">
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
