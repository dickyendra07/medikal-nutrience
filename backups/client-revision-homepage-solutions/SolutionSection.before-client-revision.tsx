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
    image: "/images/mednut/products/page-assets/nephrisol-d.jpeg",
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
    image: "/images/mednut/products/page-assets/hepatosol.png",
    accent: "#ef1f2d",
    href: "/solusi/hati-liver",
    primaryButton: "Hati Kronik",
    secondaryButton: "Hati Berat",
  },
  {
    key: "syaraf",
    tab: "Syaraf & Otak",
    icon: "brain",
    eyebrow: "Solusi Syaraf & Otak",
    title: "Peptibren : Dukungan Nutrisi untuk Stroke dan Alzheimer",
    description:
      "Dukungan nutrisi untuk kondisi dengan tantangan asupan makan, kesulitan menelan, atau kebutuhan makanan lembut dan cair.",
    image: "/images/mednut/products/page-assets/peptibren.jpeg",
    accent: "#2563eb",
    href: "/produk/peptibren",
    primaryButton: "Lihat Produk",
    secondaryButton: "Lihat Produk",
  },
  {
    key: "pernafasan",
    tab: "Pernafasan",
    icon: "lungs",
    eyebrow: "Solusi Pernafasan",
    title: "Pulmosol : Solusi Nutrisi untuk Masalah Pernafasan",
    description:
      "Pulmosol diformulasikan untuk membantu memenuhi kebutuhan nutrisi pada kondisi pernafasan seperti PPOK, asma, pneumonia, dan TB paru.",
    image: "/images/mednut/products/page-assets/pulmosol.jpeg",
    accent: "#1e3a8a",
    href: "/produk/pulmosol",
    primaryButton: "Lihat Produk",
    secondaryButton: "Lihat Produk",
  },
  {
    key: "pencernaan",
    tab: "Pencernaan",
    icon: "digestive",
    eyebrow: "Solusi Pencernaan",
    title: "Oligo : Nutrisi Cepat Serap untuk Sistem Saluran Cerna",
    description:
      "Oligo merupakan nutrisi oligomerik dengan protein terhidrolisa parsial untuk membantu memenuhi kebutuhan nutrisi pada kondisi saluran cerna tertentu.",
    image: "/images/mednut/products/page-assets/oligo.jpeg",
    accent: "#d85b70",
    href: "/produk/oligo",
    primaryButton: "Lihat Produk",
    secondaryButton: "Lihat Produk",
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

        <div className="mt-7 grid gap-3 pb-5 md:grid-cols-5 md:pb-0 reveal reveal-delay-1">
          {solutions.map((solution) => {
            const isActive = activeSolution.key === solution.key;

            return (
              <div
                key={solution.key}
                className={`relative overflow-hidden rounded-2xl border transition duration-300 md:overflow-visible ${
                  isActive
                    ? "border-[#006b3f] bg-[#006b3f] text-white shadow-xl shadow-green-900/20"
                    : "border-black/10 bg-white text-[#005b3d] shadow-md shadow-slate-900/5 hover:border-[#006b3f]/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveKey(solution.key)}
                  className="relative flex min-h-[76px] w-full items-center gap-4 px-4 py-4 text-left md:min-h-[120px] md:flex-col md:justify-center md:gap-0 md:px-5 md:py-5 md:text-center"
                >
                  <Icon type={solution.icon} active={isActive} />

                  <span className="text-sm font-black leading-tight md:mt-3 md:text-base">
                    {solution.tab}
                  </span>

                  {isActive ? (
                    <span className="absolute -bottom-5 left-8 hidden h-0 w-0 border-l-[16px] border-r-[16px] border-t-[22px] border-l-transparent border-r-transparent border-t-[#006b3f] md:block md:left-1/2 md:-translate-x-1/2" />
                  ) : null}
                </button>

                {isActive ? (
                  <div className="border-t border-white/10 bg-white px-4 py-5 text-[#0f172a] md:hidden">
                    <div className="overflow-hidden rounded-[1.4rem] bg-[#f4fbf8]">
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="aspect-[1.28/1] w-full object-cover"
                      />
                    </div>

                    <p className="mt-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#006b3f]">
                      {solution.eyebrow}
                    </p>

                    <h3
                      className="mt-3 text-2xl font-black leading-tight"
                      style={{ color: solution.accent }}
                    >
                      {solution.title}
                    </h3>

                    <p className="mt-4 text-sm font-medium leading-7 text-[#64748b]">
                      {solution.description}
                    </p>

                    <div className="mt-5 grid gap-3">
                      <a
                        href={solution.href}
                        className="inline-flex items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-black text-white shadow-lg"
                        style={{ backgroundColor: solution.accent }}
                      >
                        {solution.primaryButton}
                        <span>→</span>
                      </a>

                      <a
                        href={solution.href}
                        className="inline-flex items-center justify-center gap-3 rounded-full bg-[#f8fafc] px-6 py-4 text-sm font-black ring-1 ring-black/5"
                        style={{ color: solution.accent }}
                      >
                        {solution.secondaryButton}
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-8 hidden items-center gap-7 md:grid lg:mt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <div className="overflow-hidden rounded-[1.8rem] bg-white shadow-2xl shadow-green-900/10 ring-1 ring-black/5 reveal-left reveal-delay-2 lg:rounded-[2.5rem]">
            <img
              src={activeSolution.image}
              alt={activeSolution.title}
              className="aspect-[1.18/1] w-full object-cover transition duration-500"
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
  const icons: Record<string, string> = {
    kidney: "/images/mednut/solutions/icons/icon-ginjal.svg",
    liver: "/images/mednut/solutions/icons/icon-hati-liver.svg",
    brain: "/images/mednut/solutions/icons/icon-syaraf-otak.svg",
    lungs: "/images/mednut/solutions/icons/icon-pernafasan.svg",
    digestive: "/images/mednut/solutions/icons/icon-pencernaan.svg",
  };

  return (
    <span
      className={`flex h-14 w-14 items-center justify-center rounded-2xl transition ${
        active ? "bg-white/15" : "bg-[#e4f8ed]"
      }`}
    >
      <img
        src={icons[type] ?? icons.digestive}
        alt=""
        className={`h-9 w-9 object-contain transition ${
          active
            ? "brightness-0 invert"
            : "[filter:brightness(0)_saturate(100%)_invert(23%)_sepia(97%)_saturate(798%)_hue-rotate(129deg)_brightness(91%)_contrast(101%)]"
        }`}
      />
    </span>
  );
}
