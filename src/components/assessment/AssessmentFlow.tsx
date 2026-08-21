"use client";

import { useMemo, useState } from "react";

import { AssessmentLoading } from "@/components/assessment/components/AssessmentLoading";
import { AssessmentOptionCard } from "@/components/assessment/components/AssessmentOptionCard";
import { AssessmentProgress } from "@/components/assessment/components/AssessmentProgress";
import { AssessmentResultCard } from "@/components/assessment/components/AssessmentResultCard";
import {
  assessmentDisclaimer,
  getAssessmentQuestion,
  getAssessmentResult,
  type AssessmentAnswer,
  type AssessmentAnswerSummary,
  type AssessmentLeadPayload,
  type AssessmentResult,
} from "@/data/assessment";

type FlowStep = "question" | "lead" | "loading" | "result";

type HistoryItem = {
  questionId: string;
  answer: AssessmentAnswer;
};

export function AssessmentFlow({
  initialFlowKey,
  onClose,
}: {
  initialFlowKey?: string;
  onClose?: () => void;
}) {
  const [step, setStep] = useState<FlowStep>("question");
  const [questionId, setQuestionId] = useState("purpose");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [condition, setCondition] = useState("");
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [leadForm, setLeadForm] = useState({ name: "", whatsapp: "" });
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const question = getAssessmentQuestion(questionId);
  const answerSummaries = useMemo<AssessmentAnswerSummary[]>(
    () =>
      history.map((item) => {
        const answeredQuestion = getAssessmentQuestion(item.questionId);

        return {
          questionId: item.questionId,
          label: answeredQuestion?.answerLabel ?? "Jawaban",
          answer: item.answer.label,
          value: item.answer.value,
        };
      }),
    [history]
  );

  const chooseAnswer = (answer: AssessmentAnswer) => {
    const nextHistory = [...history, { questionId, answer }];
    setHistory(nextHistory);

    if (answer.condition) setCondition(answer.condition);

    if (answer.nextQuestion) {
      setQuestionId(answer.nextQuestion);
      return;
    }

    if (answer.resultId) {
      const nextResult = getAssessmentResult(answer.resultId);
      if (!nextResult) return;
      setResult(nextResult);
      setStep("lead");
    }
  };

  const goBack = () => {
    if (history.length === 0) return;

    const previous = history[history.length - 1];
    const nextHistory = history.slice(0, -1);
    setHistory(nextHistory);
    setQuestionId(previous.questionId);
    setCondition(
      [...nextHistory].reverse().find((item) => item.answer.condition)?.answer.condition ?? ""
    );
  };

  const submitLead = async () => {
    if (!result) return;

    const answers = Object.fromEntries(
      answerSummaries.map((item) => [item.questionId, item.answer])
    );
    const payload: AssessmentLeadPayload = {
      purpose: initialFlowKey ?? answerSummaries[0]?.value ?? "assessment",
      condition,
      answers,
      recommendation: result,
      lead: {
        ...leadForm,
        age: "",
        gender: "",
        educationConsent: privacyConsent,
        communicationConsent: privacyConsent,
      },
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error(error);
    }

    setStep("loading");
    window.setTimeout(() => setStep("result"), 1200);
  };

  if (step === "loading") return <AssessmentLoading />;

  if (step === "result" && result) {
    return (
      <AssessmentResultCard
        result={result}
        answers={answerSummaries}
        onClose={onClose}
      />
    );
  }

  if (step === "lead") {
    return (
      <div>
        <AssessmentProgress step={4} />
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#006b3f]">
          Langkah Terakhir
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-[#111827] md:text-4xl">
          Dapatkan rekomendasi Anda
        </h1>
        <p className="mt-3 text-sm font-medium leading-6 text-[#64748b]">
          Isi data singkat berikut agar hasil assessment dapat kami simpan dengan aman.
        </p>

        <label className="mt-6 block text-sm font-black text-[#334155]">
          Nama
          <input
            value={leadForm.name}
            onChange={(event) => setLeadForm({ ...leadForm, name: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-5 py-4 font-medium outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
            autoComplete="name"
          />
        </label>

        <label className="mt-4 block text-sm font-black text-[#334155]">
          WhatsApp
          <input
            value={leadForm.whatsapp}
            onChange={(event) => setLeadForm({ ...leadForm, whatsapp: event.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-5 py-4 font-medium outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
            inputMode="tel"
            autoComplete="tel"
          />
        </label>

        <label className="mt-5 flex gap-3 rounded-2xl bg-[#f4fbf7] p-4 text-sm font-medium leading-6 text-[#475569]">
          <input
            type="checkbox"
            checked={privacyConsent}
            onChange={(event) => setPrivacyConsent(event.target.checked)}
            className="mt-1 h-4 w-4 accent-[#006b3f]"
          />
          <span>
            Saya menyetujui penggunaan data saya untuk mendapatkan rekomendasi nutrisi dan informasi terkait produk Medikal Nutrience.
          </span>
        </label>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setStep("question");
              goBack();
            }}
            className="rounded-full border border-[#006b3f]/20 px-6 py-4 text-sm font-black text-[#006b3f]"
          >
            Kembali
          </button>
          <button
            type="button"
            disabled={!privacyConsent}
            onClick={submitLead}
            className="flex-1 rounded-full bg-[#006b3f] px-6 py-4 text-sm font-black text-white shadow-lg shadow-green-900/15 transition hover:bg-[#005432] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Lihat Rekomendasi
          </button>
        </div>

        <p className="mt-6 rounded-2xl bg-[#f4fbf7] p-4 text-xs leading-6 text-slate-500">
          {assessmentDisclaimer}
        </p>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div>
      <AssessmentProgress step={Math.min(3, history.length + 1)} />
      <p className="text-xs font-black uppercase tracking-[0.25em] text-[#006b3f]">
        {question.eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-black leading-tight text-[#111827] md:text-4xl">
        {question.question}
      </h1>

      <div className={`mt-6 grid gap-4 ${question.answers.length > 3 ? "sm:grid-cols-2" : ""}`}>
        {question.answers.map((answer) => (
          <AssessmentOptionCard
            key={answer.value}
            title={answer.label}
            description={answer.description}
            icon={answer.icon}
            onClick={() => chooseAnswer(answer)}
          />
        ))}
      </div>

      {history.length > 0 ? (
        <button
          type="button"
          onClick={goBack}
          className="mt-5 rounded-full px-2 py-2 text-sm font-black text-[#006b3f]"
        >
          ← Kembali
        </button>
      ) : null}

      <p className="mt-6 rounded-2xl bg-[#f4fbf7] p-4 text-xs leading-6 text-slate-500">
        {assessmentDisclaimer}
      </p>
    </div>
  );
}
