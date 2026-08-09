import type { ComponentPropsWithoutRef, ReactNode } from "react";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export const cmsFieldClass =
  "cms-field w-full border border-slate-200 bg-white text-[13px] text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#16805b] focus:ring-4 focus:ring-[#16805b]/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400";

export function CmsCard({
  className,
  padding = "default",
  ...props
}: ComponentPropsWithoutRef<"section"> & {
  padding?: "none" | "compact" | "default";
}) {
  return (
    <section
      className={cx(
        "cms-card rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.025)]",
        padding === "default" ? "p-5" : padding === "compact" ? "p-4" : undefined,
        className
      )}
      {...props}
    />
  );
}

export function CmsSectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", className)}>
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#16805b]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-1 text-lg font-semibold tracking-[-0.015em] text-slate-900">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 max-w-2xl text-[13px] leading-5 text-slate-500">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function CmsMetricCard({
  label,
  value,
  hint,
  tone = "green",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "green" | "neutral" | "amber" | "blue";
}) {
  const tones = {
    green: "bg-[#16805b]",
    neutral: "bg-slate-400",
    amber: "bg-amber-500",
    blue: "bg-blue-500",
  };

  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.02)]">
      <div className={cx("mb-3 h-1.5 w-8 rounded-full", tones[tone])} />
      <p className="text-[22px] font-semibold leading-none tracking-[-0.03em] text-slate-900">
        {value}
      </p>
      <p className="mt-2 text-[11px] font-medium text-slate-500">{label}</p>
      {hint ? <p className="mt-1 text-[10px] text-slate-400">{hint}</p> : null}
    </article>
  );
}

export function CmsButton({
  tone = "primary",
  size = "md",
  className,
  ...props
}: ComponentPropsWithoutRef<"button"> & {
  tone?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
}) {
  const tones = {
    primary: "border-[#08704c] bg-[#08704c] text-white hover:border-[#065e40] hover:bg-[#065e40]",
    secondary: "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
    ghost: "border-transparent bg-transparent text-slate-600 hover:bg-slate-100",
    danger: "border-red-200 bg-red-50 text-red-700 hover:bg-red-100",
  };

  return (
    <button
      className={cx(
        "inline-flex items-center justify-center rounded-lg border font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#16805b]/15 disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" ? "h-8 px-3 text-[11px]" : "h-9 px-4 text-xs",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}

export function CmsBadge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
  className?: string;
}) {
  const tones = {
    neutral: "border-slate-200 bg-slate-50 text-slate-600",
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
    warning: "border-amber-200 bg-amber-50 text-amber-700",
    danger: "border-red-200 bg-red-50 text-red-700",
    info: "border-blue-200 bg-blue-50 text-blue-700",
  };
  return (
    <span className={cx("inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-semibold", tones[tone], className)}>
      {children}
    </span>
  );
}

export function CmsEmptyState({
  icon = "◇",
  title,
  description,
  action,
}: {
  icon?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="px-5 py-14 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-sm text-[#08704c]">
        {icon}
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-lg text-[13px] leading-5 text-slate-500">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
