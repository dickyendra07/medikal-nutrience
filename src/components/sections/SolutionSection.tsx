"use client";

import { useState } from "react";

const solutions = [
  {
    key: "ginjal",
    tab: "Ginjal",
    icon: "kidney",
    eyebrow: "Solusi Ginjal",
    title: "Nephrisol : Perlindungan Ginjal Dimulai dari Nutrisi yang Tepat",
    description:
      "Kebutuhan nutrisi Anda berbeda tergantung pada tahapan kondisi ginjal. Kami menyediakan formula presisi untuk tahap Pra-Dialisis dan Dialisis.",
    image: "/images/solutions/home/ginjal-nephrisol-d.jpeg",
    accent: "#5b0ca8",
    href: "/solusi/ginjal",
    primaryButton: "Predialisis",
    secondaryButton: "Dialisis",
  },
  {
    key: "hati",
    tab: "Hati / Liver",
    icon: "liver",
    eyebrow: "Solusi Hati / Liver",
    title: "Hepatosol : Dukungan Nutrisi untuk Gangguan Fungsi Hati",
    description:
      "Dukung kebutuhan nutrisi pada kondisi hati kronik maupun kondisi hati yang membutuhkan perhatian lebih intensif dengan formula yang sesuai.",
    image: "/images/solutions/home/hati-liver-hepatosol.png",
    accent: "#ef1f2d",
    href: "/solusi/hati-liver",
    primaryButton: "Hepatosol",
    secondaryButton: "Hepatosol Lola",
  },
  {
    key: "syaraf",
    tab: "Syaraf & Otak",
    icon: "brain",
    eyebrow: "Solusi Syaraf & Otak",
    title: "Peptibren : Dukungan Nutrisi untuk Stroke dan Alzheimer",
    description:
      "Dukungan nutrisi untuk kondisi dengan tantangan asupan makan, kesulitan menelan, atau kebutuhan makanan lembut dan cair.",
    image: "/images/solutions/home/syaraf-otak-peptibren.png",
    accent: "#2563eb",
    href: "/produk/peptibren",
    primaryButton: "Lihat Produk",
    secondaryButton: "Konsultasi",
  },
  {
    key: "pernafasan",
    tab: "Pernafasan",
    icon: "lungs",
    eyebrow: "Solusi Pernafasan",
    title: "Pulmosol : Solusi Nutrisi untuk Masalah Pernafasan",
    description:
      "Pulmosol diformulasikan untuk membantu memenuhi kebutuhan nutrisi pada kondisi pernafasan seperti PPOK, asma, pneumonia, dan TB paru.",
    image: "/images/solutions/home/pernafasan-pulmosol.png",
    accent: "#1e3a8a",
    href: "/solusi/pernafasan",
    primaryButton: "Pulmosol",
    secondaryButton: "Lihat Detail",
  },
  {
    key: "pencernaan",
    tab: "Pencernaan",
    icon: "digestive",
    eyebrow: "Solusi Pencernaan",
    title: "Oligo : Nutrisi Cepat Serap untuk Sistem Saluran Cerna",
    description:
      "Oligo merupakan nutrisi oligomerik dengan protein terhidrolisa parsial untuk membantu memenuhi kebutuhan nutrisi pada kondisi saluran cerna tertentu.",
    image: "/images/solutions/home/ginjal-nephrisol.jpeg",
    accent: "#d85b70",
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
    <section className="bg-[#effaf5] px-5 py-12 md:py-24 lg:px-10">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="reveal">
          <h2 className="max-w-3xl text-3xl font-black leading-tight tracking-tight text-[#111827] md:text-6xl">
            Solusi Nutrisi Berdasarkan Kebutuhan Tubuh
          </h2>

          <p className="mt-4 max-w-5xl text-sm font-medium leading-7 text-[#111827] md:text-base md:leading-8">
            Setiap kondisi memerlukan pendekatan nutrisi yang berbeda. Temukan
            pilihan yang sesuai dengan kebutuhan Anda.
          </p>
        </div>

        <div className="mt-7 flex gap-3 overflow-x-auto pb-5 md:grid md:grid-cols-5 md:overflow-visible md:pb-0 reveal reveal-delay-1">
          {solutions.map((solution) => {
            const isActive = activeSolution.key === solution.key;

            return (
              <button
                key={solution.key}
                type="button"
                onClick={() => setActiveKey(solution.key)}
                className={`relative flex min-h-[92px] min-w-[132px] flex-col items-center justify-center rounded-2xl border px-4 py-4 text-center transition duration-300 md:min-h-[120px] md:min-w-0 md:px-5 md:py-5 ${
                  isActive
                    ? "border-[#006b3f] bg-[#006b3f] text-white shadow-xl shadow-green-900/20"
                    : "border-black/10 bg-white text-[#005b3d] shadow-md shadow-slate-900/5 hover:-translate-y-1 hover:border-[#006b3f]/30"
                }`}
              >
                <Icon type={solution.icon} active={isActive} />

                <span className="mt-2 text-sm font-black leading-tight md:mt-3 md:text-base">
                  {solution.tab}
                </span>

                {isActive ? (
                  <span className="absolute -bottom-6 left-1/2 h-0 w-0 -translate-x-1/2 border-l-[18px] border-r-[18px] border-t-[24px] border-l-transparent border-r-transparent border-t-[#006b3f]" />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid items-center gap-7 lg:mt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <div className="overflow-hidden rounded-[1.8rem] bg-white shadow-2xl shadow-green-900/10 ring-1 ring-black/5 reveal-left reveal-delay-2 lg:rounded-[2.5rem]">
            <img
              src={activeSolution.image}
              alt={activeSolution.title}
              className="h-auto w-full object-cover transition duration-500"
            />
          </div>

          <div className="lg:pl-4 reveal-right reveal-delay-2">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#006b3f] md:mb-4 md:text-sm md:tracking-[0.35em]">
              {activeSolution.eyebrow}
            </p>

            <h3
              className="max-w-2xl text-2xl font-black leading-tight tracking-tight md:text-5xl"
              style={{ color: activeSolution.accent }}
            >
              {activeSolution.title}
            </h3>

            <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-[#6b7280] md:mt-6 md:text-base md:leading-8">
              {activeSolution.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 md:mt-8 md:gap-5">
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
