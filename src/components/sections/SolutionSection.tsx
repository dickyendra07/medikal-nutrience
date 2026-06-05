"use client";

import { useState } from "react";

const solutions = [
  {
    key: "ginjal",
    tab: "Ginjal",
    icon: "kidney",
    eyebrow: "Solusi Ginjal",
    product: "NEPHRISOL-D",
    productNote: "Nutrition Expert in CKD Dialysis Stage",
    title: "Nephrisol : Perlindungan Ginjal Dimulai dari Nutrisi yang Tepat",
    description:
      "Kebutuhan nutrisi Anda berbeda tergantung pada tahapan kondisi ginjal. Kami menyediakan formula presisi untuk tahap Pra-Dialisis dan Dialisis.",
    imageTitle: "NEPHRISOL-D",
    imageSubtitle: "Nutrition Expert in CKD Dialysis Stage",
    accent: "#5b0ca8",
    gradient: "from-[#25004d] via-[#5b0ca8] to-[#7e22ce]",
    href: "/solusi/ginjal",
    primaryButton: "Predialisis",
    secondaryButton: "Dialisis",
  },
  {
    key: "hati",
    tab: "Hati / Liver",
    icon: "liver",
    eyebrow: "Solusi Hati / Liver",
    product: "HEPATOSOL",
    productNote: "Nutrition Support for Liver Condition",
    title: "Hepatosol : Dukungan Nutrisi untuk Gangguan Fungsi Hati",
    description:
      "Dukung kebutuhan nutrisi pada kondisi hati kronik maupun kondisi hati yang membutuhkan perhatian lebih intensif dengan formula yang sesuai.",
    imageTitle: "HEPATOSOL",
    imageSubtitle: "Nutrition Support for Liver Condition",
    accent: "#ef1f2d",
    gradient: "from-[#7f1d1d] via-[#dc2626] to-[#fb7185]",
    href: "/solusi/hati-liver",
    primaryButton: "Hepatosol",
    secondaryButton: "Hepatosol Lola",
  },
  {
    key: "syaraf",
    tab: "Syaraf & Otak",
    icon: "brain",
    eyebrow: "Solusi Syaraf & Otak",
    product: "PEPTIBREN",
    productNote: "Support for Brain & Swallowing Nutrition",
    title: "Peptibren : Dukungan Nutrisi untuk Stroke dan Alzheimer",
    description:
      "Dukungan nutrisi untuk kondisi dengan tantangan asupan makan, kesulitan menelan, atau kebutuhan makanan lembut dan cair.",
    imageTitle: "PEPTIBREN",
    imageSubtitle: "Nutrition Support for Stroke / Alzheimer",
    accent: "#2563eb",
    gradient: "from-[#1e3a8a] via-[#2563eb] to-[#60a5fa]",
    href: "/produk/peptibren",
    primaryButton: "Lihat Produk",
    secondaryButton: "Konsultasi",
  },
  {
    key: "pernafasan",
    tab: "Pernafasan",
    icon: "lungs",
    eyebrow: "Solusi Pernafasan",
    product: "PULMOSOL",
    productNote: "Nutrition Support for Respiratory Condition",
    title: "Pulmosol : Solusi Nutrisi untuk Masalah Pernafasan",
    description:
      "Pulmosol diformulasikan untuk membantu memenuhi kebutuhan nutrisi pada kondisi pernafasan seperti PPOK, asma, pneumonia, dan TB paru.",
    imageTitle: "PULMOSOL",
    imageSubtitle: "Nutrition Support for Respiratory Condition",
    accent: "#1e3a8a",
    gradient: "from-[#0f172a] via-[#1e3a8a] to-[#2563eb]",
    href: "/solusi/pernafasan",
    primaryButton: "Pulmosol",
    secondaryButton: "Lihat Detail",
  },
  {
    key: "pencernaan",
    tab: "Pencernaan",
    icon: "digestive",
    eyebrow: "Solusi Pencernaan",
    product: "OLIGO",
    productNote: "Fast Absorb Nutrition for Digestive System",
    title: "Oligo : Nutrisi Cepat Serap untuk Sistem Saluran Cerna",
    description:
      "Oligo merupakan nutrisi oligomerik dengan protein terhidrolisa parsial untuk membantu memenuhi kebutuhan nutrisi pada kondisi saluran cerna tertentu.",
    imageTitle: "OLIGO",
    imageSubtitle: "Fast Absorb Nutrition for Digestive System",
    accent: "#d85b70",
    gradient: "from-[#881337] via-[#be4560] to-[#fda4af]",
    href: "/solusi/pencernaan",
    primaryButton: "Oligo",
    secondaryButton: "Konsultasi",
  },
];

export function SolutionSection() {
  const [activeKey, setActiveKey] = useState(solutions[0].key);

  const activeSolution =
    solutions.find((solution) => solution.key === activeKey) ?? solutions[0];

  return (
    <section className="bg-[#effaf5] px-5 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div>
          <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-[#111827] md:text-6xl">
            Solusi Nutrisi Berdasarkan Kebutuhan Tubuh
          </h2>

          <p className="mt-5 max-w-5xl text-base font-medium leading-8 text-[#111827]">
            Setiap kondisi memerlukan pendekatan nutrisi yang berbeda. Temukan
            pilihan yang sesuai dengan kebutuhan Anda.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {solutions.map((solution) => {
            const isActive = activeSolution.key === solution.key;

            return (
              <button
                key={solution.key}
                type="button"
                onClick={() => setActiveKey(solution.key)}
                className={`relative flex min-h-[120px] flex-col items-center justify-center rounded-2xl border px-5 py-5 text-center transition duration-300 ${
                  isActive
                    ? "border-[#006b3f] bg-[#006b3f] text-white shadow-xl shadow-green-900/20"
                    : "border-black/10 bg-white text-[#005b3d] shadow-md shadow-slate-900/5 hover:-translate-y-1 hover:border-[#006b3f]/30"
                }`}
              >
                <Icon type={solution.icon} active={isActive} />

                <span className="mt-3 text-base font-black leading-tight">
                  {solution.tab}
                </span>

                {isActive ? (
                  <span className="absolute -bottom-6 left-1/2 h-0 w-0 -translate-x-1/2 border-l-[18px] border-r-[18px] border-t-[24px] border-l-transparent border-r-transparent border-t-[#006b3f]" />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-[0.95fr_1fr]">
          <div
            className={`relative min-h-[420px] overflow-hidden rounded-[2.5rem] bg-gradient-to-br ${activeSolution.gradient} shadow-2xl shadow-slate-900/10`}
          >
            <div className="absolute left-[-80px] top-[-80px] h-60 w-60 rounded-full bg-black/20" />
            <div className="absolute bottom-[-90px] right-[-80px] h-72 w-72 rounded-full bg-white/10" />
            <div className="absolute left-16 top-14 h-28 w-28 rounded-full bg-white/10" />

            <div className="relative z-10 flex min-h-[420px] items-center justify-center p-8">
              <div className="w-full max-w-md rounded-[2rem] bg-white/10 p-6 text-center text-white backdrop-blur">
                <div className="mx-auto mb-5 inline-flex rounded-t-[2rem] bg-white px-8 py-5 shadow-2xl">
                  <div>
                    <p className="text-3xl font-black tracking-tight text-[#fbbf24] md:text-4xl">
                      {activeSolution.imageTitle}
                    </p>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#111827]">
                      {activeSolution.imageSubtitle}
                    </p>
                  </div>
                </div>

                <div className="mx-auto flex max-w-sm items-end justify-center gap-3">
                  <ProductPack
                    title={activeSolution.product}
                    gradient={activeSolution.gradient}
                  />
                  <ProductPack
                    title={activeSolution.product}
                    gradient={activeSolution.gradient}
                    small
                  />
                  <div className="hidden h-28 w-20 rounded-full bg-white/90 shadow-xl md:block" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pl-4">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-[#006b3f]">
              {activeSolution.eyebrow}
            </p>

            <h3
              className="max-w-2xl text-3xl font-black leading-tight tracking-tight md:text-5xl"
              style={{ color: activeSolution.accent }}
            >
              {activeSolution.title}
            </h3>

            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-[#6b7280]">
              {activeSolution.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-5">
              <a
                href={activeSolution.href}
                className="group inline-flex items-center gap-4 rounded-full px-6 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-1"
                style={{ backgroundColor: activeSolution.accent }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition group-hover:bg-white/30">
                  →
                </span>
                {activeSolution.primaryButton}
              </a>

              <a
                href={activeSolution.href}
                className="group inline-flex items-center gap-4 rounded-full px-6 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-1"
                style={{ backgroundColor: activeSolution.accent }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition group-hover:bg-white/30">
                  →
                </span>
                {activeSolution.secondaryButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductPack({
  title,
  gradient,
  small = false,
}: {
  title: string;
  gradient: string;
  small?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl bg-white p-2 shadow-2xl ${
        small ? "h-44 w-28" : "h-56 w-36"
      }`}
    >
      <div
        className={`flex h-full w-full flex-col items-center justify-center rounded-xl bg-gradient-to-b ${gradient} px-3 text-center text-white`}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.2em]">
          Medikal
        </p>
        <p className="mt-3 text-base font-black leading-tight">{title}</p>
        <p className="mt-3 text-[9px] font-bold uppercase tracking-wide text-white/70">
          Nutrition Care
        </p>
      </div>
    </div>
  );
}

function Icon({ type, active }: { type: string; active: boolean }) {
  const color = active ? "text-white" : "text-[#006b3f]";
  const common = `h-12 w-12 ${color}`;

  if (type === "kidney") {
    return (
      <svg className={common} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 9v46" />
        <path d="M36 9v46" />
        <path d="M28 22c-8-10-19-3-17 10 1 8 6 15 13 16 5 1 7-3 7-8V23" />
        <path d="M36 22c8-10 19-3 17 10-1 8-6 15-13 16-5 1-7-3-7-8V23" />
        <path d="M20 29c2 4 5 5 8 4" />
        <path d="M44 29c-2 4-5 5-8 4" />
      </svg>
    );
  }

  if (type === "liver") {
    return (
      <svg className={common} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 36c6-16 18-23 35-19 8 2 11 8 10 14-1 8-8 13-18 13H20c-8 0-13-2-11-8Z" />
        <path d="M36 18c1 9-2 17-9 26" />
        <path d="M44 15l5-7" />
        <path d="M47 22l9-3" />
      </svg>
    );
  }

  if (type === "brain") {
    return (
      <svg className={common} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M25 10c-7 0-12 5-12 12 0 2 1 4 2 6-5 3-7 8-5 14 2 7 8 10 15 9" />
        <path d="M39 10c7 0 12 5 12 12 0 2-1 4-2 6 5 3 7 8 5 14-2 7-8 10-15 9" />
        <path d="M32 11v42" />
        <path d="M21 23c5 0 8 3 8 8" />
        <path d="M43 23c-5 0-8 3-8 8" />
        <path d="M19 39c5-1 9 1 11 5" />
        <path d="M45 39c-5-1-9 1-11 5" />
      </svg>
    );
  }

  if (type === "lungs") {
    return (
      <svg className={common} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 8v22" />
        <path d="M32 30c-7 0-13 7-15 18-1 6 2 9 7 7 7-3 8-11 8-25Z" />
        <path d="M32 30c7 0 13 7 15 18 1 6-2 9-7 7-7-3-8-11-8-25Z" />
        <path d="M24 20c3 4 5 7 8 10" />
        <path d="M40 20c-3 4-5 7-8 10" />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 8c8 5 11 10 8 16-2 5-8 6-8 14" />
      <path d="M32 8c-8 5-11 10-8 16 2 5 8 6 8 14" />
      <path d="M22 38h20" />
      <path d="M19 45h26" />
      <path d="M16 52h32" />
      <path d="M32 38v16" />
    </svg>
  );
}
