import {
  assessmentQuestions,
  getAssessmentRecommendation,
} from "../../data/assessment";
import type { CmsAssessmentData } from "./leads-storage";

export type ParsedAssessmentResult = {
  status: "empty" | "incomplete" | "complete";
  assessmentType: string | null;
  nutritionCategory: string | null;
  recommendedProduct: string | null;
  recommendationNotes: string | null;
  answers: Record<string, unknown>;
};

const conditionCategories: Record<string, string> = {
  ginjal: "Renal Nutrition Support",
  hati: "Liver Nutrition Support",
  pernapasan: "Respiratory Nutrition Support",
  pencernaan: "Digestive Nutrition Support",
  anak: "Pediatric Nutrition Support",
  dewasa: "Adult Nutrition Support",
};

const certainAnswerConditions: Record<string, string> = {
  dialysis: "ginjal",
  "no-dialysis": "ginjal",
  specific: "hati",
  easy: "pencernaan",
  entrakid: "anak",
  entramix: "dewasa",
  entrasoy: "dewasa",
  peptisol: "dewasa",
};

const recommendationAnswerLabels: Record<string, string> = {
  entrakid: "Entrakid",
  entramix: "Entramix",
  entrasoy: "Entrasoy",
  peptisol: "Peptisol",
};

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function text(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  if (!normalized || /^(undefined|null|n\/a)$/i.test(normalized)) return null;
  return normalized;
}

function safeJson(value: string) {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

function parseLegacyMessage(message: string): CmsAssessmentData {
  const assessmentType = text(message.match(/^Assessment:\s*(.+)$/im)?.[1]);
  const recommendedProduct = text(message.match(/^Rekomendasi:\s*(.+)$/im)?.[1]);
  const answerBlock = message.match(/(?:Jawaban|Answers?):\s*([\s\S]+)$/i)?.[1]?.trim();
  const answers = record(answerBlock ? safeJson(answerBlock) : null) ?? {};
  return {
    assessmentType: assessmentType ?? undefined,
    recommendedProduct: recommendedProduct ?? undefined,
    answers,
  };
}

function infer(data: CmsAssessmentData) {
  const answers = record(data.answers) ?? {};
  const answer = text(answers.answer);
  const explicitCondition = text(answers.condition) ?? text(answers.healthCondition);
  const condition = explicitCondition ?? (answer ? certainAnswerConditions[answer.toLowerCase()] : null);
  const recommendation = condition && answer
    ? getAssessmentRecommendation(condition, answer)
    : null;

  return {
    assessmentType: text(data.assessmentType) ?? (Object.keys(answers).length ? "Nutrition Assessment" : null),
    nutritionCategory: text(data.nutritionCategory) ?? (condition ? conditionCategories[condition.toLowerCase()] ?? null : null),
    recommendedProduct: text(data.recommendedProduct) ?? recommendation?.product ?? null,
    recommendationNotes: text(data.recommendationNotes) ?? recommendation?.note ?? null,
    answers,
  };
}

/** Safely normalizes current structured submissions and historical message/JSON payloads. */
export function parseAssessmentResult(input: unknown): ParsedAssessmentResult {
  let source: CmsAssessmentData = {};

  if (typeof input === "string") {
    const parsedJson = record(safeJson(input));
    source = parsedJson ? parsedJson as CmsAssessmentData : parseLegacyMessage(input);
  } else {
    const inputRecord = record(input);
    if (inputRecord) {
      const recommendation = record(inputRecord.recommendation);
      const answers = record(inputRecord.answers) ?? {};
      const condition = text(inputRecord.condition);
      source = {
        assessmentType: text(inputRecord.assessmentType) ?? (condition || recommendation || Object.keys(answers).length ? "Nutrition Assessment" : undefined),
        nutritionCategory: text(inputRecord.nutritionCategory) ?? (condition ? conditionCategories[condition.toLowerCase()] : undefined),
        recommendedProduct: text(inputRecord.recommendedProduct) ?? text(recommendation?.product) ?? undefined,
        recommendationNotes: text(inputRecord.recommendationNotes) ?? text(recommendation?.note) ?? undefined,
        answers: condition && !answers.condition ? { condition, ...answers } : answers,
        schemaVersion: typeof inputRecord.schemaVersion === "number" ? inputRecord.schemaVersion : undefined,
      };
    }
  }

  const normalized = infer(source);
  const hasData = Boolean(
    normalized.assessmentType ||
    normalized.nutritionCategory ||
    normalized.recommendedProduct ||
    normalized.recommendationNotes ||
    Object.keys(normalized.answers).length,
  );
  const complete = Boolean(
    normalized.assessmentType &&
    normalized.nutritionCategory &&
    normalized.recommendedProduct,
  );

  return {
    status: !hasData ? "empty" : complete ? "complete" : "incomplete",
    ...normalized,
  };
}

export function assessmentDataFromSubmission(input: unknown): CmsAssessmentData | null {
  const result = parseAssessmentResult(input);
  if (result.status === "empty") return null;
  return {
    assessmentType: result.assessmentType ?? undefined,
    nutritionCategory: result.nutritionCategory ?? undefined,
    recommendedProduct: result.recommendedProduct ?? undefined,
    recommendationNotes: result.recommendationNotes ?? undefined,
    answers: result.answers,
    schemaVersion: 1,
  };
}

export function getAssessmentAnswerLabel(key: string, value: unknown) {
  const labels: Record<string, string> = {
    age: "Age",
    gender: "Gender",
    condition: "Health Condition",
    healthCondition: "Health Condition",
    answer: "Assessment Answer",
    recommendedProduct: "Recommended Product",
    purpose: "Assessment Purpose",
  };
  if (key === "answer" && typeof value === "string" && recommendationAnswerLabels[value.toLowerCase()]) {
    return "Recommended Product";
  }
  return labels[key] ?? key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").replace(/^./, (letter) => letter.toUpperCase());
}

export function formatAssessmentAnswer(key: string, value: unknown) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return key.toLowerCase().includes("age") ? `${value} years` : new Intl.NumberFormat("id-ID").format(value);
  if (typeof value !== "string") return "Not provided";
  const normalized = value.trim();
  if (!normalized || /^(undefined|null)$/i.test(normalized)) return "Not provided";

  const recommendationLabel = key === "answer"
    ? recommendationAnswerLabels[normalized.toLowerCase()]
    : undefined;
  if (recommendationLabel) return recommendationLabel;

  const option = Object.values(assessmentQuestions)
    .flatMap(({ options }) => options)
    .find(({ value: optionValue }) => optionValue === normalized);
  if (option) return option.label;
  return normalized.replace(/[_-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
