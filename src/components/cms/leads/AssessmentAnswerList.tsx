import {
  formatAssessmentAnswer,
  getAssessmentAnswerLabel,
} from "@/lib/cms/assessment-result";

type AnswerItem = { key: string; label: string; value: string };

function flattenAnswers(value: unknown, prefix = ""): AnswerItem[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) return [];

  return Object.entries(value as Record<string, unknown>).flatMap(([key, answer]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (answer && typeof answer === "object" && !Array.isArray(answer)) {
      return flattenAnswers(answer, path);
    }
    if (Array.isArray(answer)) {
      const values = answer
        .map((item) => formatAssessmentAnswer(key, item))
        .filter((item) => item !== "Not provided");
      return values.length ? [{ key: path, label: getAssessmentAnswerLabel(key, answer), value: values.join(", ") }] : [];
    }
    const formatted = formatAssessmentAnswer(key, answer);
    return formatted === "Not provided"
      ? []
      : [{ key: path, label: getAssessmentAnswerLabel(key, answer), value: formatted }];
  });
}

export function AssessmentAnswerList({ answers }: { answers: unknown }) {
  const items = flattenAnswers(answers);

  if (!items.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-8 text-center">
        <p className="text-[13px] font-medium text-slate-600">No customer answers available</p>
        <p className="mt-1 text-[11px] text-slate-400">The submission did not include readable question responses.</p>
      </div>
    );
  }

  return (
    <dl className="divide-y divide-slate-100 rounded-xl border border-slate-200/80 bg-white">
      {items.map((item) => (
        <div key={item.key} className="grid gap-1 px-4 py-3.5 sm:grid-cols-[minmax(150px,0.42fr)_1fr] sm:gap-5">
          <dt className="text-[11px] font-medium text-slate-500">{item.label}</dt>
          <dd className="text-[13px] font-semibold leading-5 text-slate-800">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
