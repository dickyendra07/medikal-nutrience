import type { SolutionDetail } from "@/data/solutions";
import { mednutAssets } from "@/data/mednut-assets";

const solutionAssets: Record<
  string,
  {
    image: string;
    icon?: string;
  }
> = {
  ginjal: {
    image: mednutAssets.solutions.ginjal,
  },
  "hati-liver": {
    image: mednutAssets.solutions.hati,
  },
  pernafasan: {
    image: mednutAssets.solutions.pernafasan,
  },
  pencernaan: {
    image: mednutAssets.solutions.pencernaan,
  },
  pemulihan: {
    image: mednutAssets.packshots.peptisolVanila,
  },
  anak: {
    image: mednutAssets.packshots.entrakidVanila,
  },
  "dewasa-lansia": {
    image: mednutAssets.packshots.entramixVanila,
  },
};

const productAssets: Record<
  string,
  {
    logo?: string;
    image: string;
    accent: string;
  }
> = {
  peptibren: {
    logo: mednutAssets.productLogos.peptibren,
    image: mednutAssets.packshots.peptibrenVanila,
    accent: "#ca8a04",
  },
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

function getSolutionAsset(solution: SolutionDetail) {
  return solutionAssets[solution.slug] ?? {
    image: mednutAssets.solutions.ginjal,
  };
}

function getRecommendedProductAsset(slug: string) {
  return productAssets[slug] ?? {
    image: mednutAssets.packshots.entrasoy,
    accent: "#006b3f",
  };
}

export function SolutionDetailTemplate({
  solution,
}: {
  solution: SolutionDetail;
}) {
  const visual = getSolutionAsset(solution);

  return (
    <>
      <section className="relative overflow-hidden bg-[#f4fbf8] px-5 py-12 md:py-20 lg:px-10">
        <div
          className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full opacity-15"
          style={{ backgroundColor: solution.theme.primary }}
        />
        <div
          className="absolute bottom-[-220px] right-[-140px] h-[480px] w-[480px] rounded-full opacity-15"
          style={{ backgroundColor: solution.theme.primary }}
        />

        <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="reveal-left">
            <p
              className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.25em] shadow-lg shadow-green-900/8 ring-1 ring-black/5"
              style={{ color: solution.theme.primary }}
            >
              {solution.eyebrow}
            </p>

            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-[#111827] md:text-6xl">
              {solution.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[#5f6b76] md:text-lg md:leading-9">
              {solution.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#recommended-products"
                className="inline-flex items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-0.5"
                style={{ backgroundColor: solution.theme.primary }}
              >
                Lihat Rekomendasi
                <span>→</span>
              </a>

              <a
                href="/kontak"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-black shadow-xl shadow-green-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
                style={{ color: solution.theme.primary }}
              >
                Konsultasi
                <span>→</span>
              </a>
            </div>
          </div>

          <div className="reveal-scale reveal-delay-2">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-5 shadow-2xl shadow-black/5 ring-1 ring-black/5 md:p-7">
              <div
                className="absolute right-[-90px] top-[-90px] h-72 w-72 rounded-full opacity-20"
                style={{ backgroundColor: solution.theme.primary }}
              />
              <div
                className="absolute bottom-[-120px] left-[-90px] h-80 w-80 rounded-full opacity-15"
                style={{ backgroundColor: solution.theme.primary }}
              />

              <div
                className="relative z-10 rounded-[2rem] p-5 md:p-7"
                style={{ backgroundColor: solution.theme.soft }}
              >
                <div className="flex min-h-[78px] items-center justify-center rounded-[1.5rem] bg-white px-6 py-5 text-center shadow-lg shadow-black/5">
                  <div>
                    <p
                      className="text-xs font-black uppercase tracking-[0.28em]"
                      style={{ color: solution.theme.primary }}
                    >
                      Medikal Nutrience
                    </p>
                    <p className="mt-2 text-3xl font-black text-[#111827] md:text-4xl">
                      {solution.shortTitle}
                    </p>
                  </div>
                </div>

                <div className="relative mt-6 flex min-h-[340px] items-center justify-center md:min-h-[460px]">
                  <div
                    className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 md:h-[380px] md:w-[380px]"
                    style={{ backgroundColor: solution.theme.primary }}
                  />

                  <img
                    src={visual.image}
                    alt={solution.shortTitle}
                    className="relative z-20 h-auto w-[88%] max-w-[520px] object-contain drop-shadow-2xl transition duration-500 hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 md:py-16 lg:px-10">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="reveal-left">
            <p
              className="text-xs font-black uppercase tracking-[0.35em]"
              style={{ color: solution.theme.primary }}
            >
              Kebutuhan Tubuh
            </p>

            <h2 className="mt-5 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
              {solution.problemTitle}
            </h2>

            <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-[#6b7280] md:text-base md:leading-8">
              Kenali beberapa kondisi yang dapat menjadi tanda bahwa tubuh
              membutuhkan dukungan nutrisi yang lebih tepat.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 reveal-right">
            {solution.problems.map((problem, index) => (
              <article
                key={problem}
                className="rounded-[2rem] bg-[#f8fcfa] p-6 shadow-lg shadow-slate-900/5 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1"
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-black text-white"
                  style={{ backgroundColor: solution.theme.primary }}
                >
                  0{index + 1}
                </div>

                <h3 className="text-lg font-black leading-tight text-[#111827]">
                  {problem}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="recommended-products"
        className="bg-[#f4fbf8] px-5 py-12 md:py-16 lg:px-10"
      >
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end reveal">
            <div>
              <p
                className="text-xs font-black uppercase tracking-[0.35em]"
                style={{ color: solution.theme.primary }}
              >
                Rekomendasi Produk
              </p>

              <h2 className="mt-5 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
                Produk yang Sesuai
              </h2>
            </div>

            <p className="text-sm font-medium leading-7 text-[#6b7280] md:text-base md:leading-8">
              Pilihan produk berikut disesuaikan dengan kategori solusi nutrisi
              yang sedang Anda lihat, lengkap dengan packshot dan logo brand resmi.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {solution.recommendedProducts.map((product) => {
              const productVisual = getRecommendedProductAsset(product.slug);

              return (
                <article
                  key={product.slug}
                  className="group reveal overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-900/8 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-900/10"
                >
                  <div
                    className="relative overflow-hidden p-5"
                    style={{ backgroundColor: `${productVisual.accent}12` }}
                  >
                    <div
                      className="absolute right-[-70px] top-[-70px] h-48 w-48 rounded-full opacity-15"
                      style={{ backgroundColor: productVisual.accent }}
                    />

                    <div className="relative z-10 flex min-h-[80px] items-center justify-center rounded-[1.5rem] bg-white px-5 py-4 shadow-lg shadow-black/5">
                      {productVisual.logo ? (
                        <img
                          src={productVisual.logo}
                          alt={`${product.name} logo`}
                          className="max-h-16 w-auto max-w-[260px] object-contain"
                        />
                      ) : (
                        <p
                          className="text-3xl font-black"
                          style={{ color: productVisual.accent }}
                        >
                          {product.name}
                        </p>
                      )}
                    </div>

                    <div className="relative z-10 mt-5 flex min-h-[260px] items-center justify-center">
                      <div
                        className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15"
                        style={{ backgroundColor: productVisual.accent }}
                      />

                      <img
                        src={productVisual.image}
                        alt={product.name}
                        className="relative z-10 h-auto w-[78%] max-w-[300px] object-contain drop-shadow-2xl transition duration-500 group-hover:scale-[1.05]"
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-black text-[#111827]">
                      {product.name}
                    </h3>

                    <p className="mt-3 min-h-20 text-sm font-medium leading-7 text-[#6b7280]">
                      {product.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <a
                        href={`/produk/${product.slug}`}
                        className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5"
                        style={{ backgroundColor: productVisual.accent }}
                      >
                        Lihat Produk
                      </a>

                      <a
                        href="/apotek-resmi"
                        className="inline-flex items-center justify-center rounded-full bg-[#f8fafc] px-5 py-3 text-sm font-black text-[#334155] ring-1 ring-black/10 transition hover:-translate-y-0.5"
                      >
                        Apotek Resmi
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 md:py-16 lg:px-10">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="reveal-left">
            <p
              className="text-xs font-black uppercase tracking-[0.35em]"
              style={{ color: solution.theme.primary }}
            >
              Edukasi Nutrisi
            </p>

            <h2 className="mt-5 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
              {solution.educationTitle}
            </h2>
          </div>

          <div className="grid gap-4 reveal-right">
            {solution.educationPoints.map((point) => (
              <article
                key={point}
                className="rounded-[2rem] bg-[#f8fcfa] p-6 shadow-lg shadow-slate-900/5 ring-1 ring-black/5"
              >
                <p className="text-sm font-bold leading-7 text-[#475569] md:text-base md:leading-8">
                  {point}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:py-20 lg:px-10">
        <div
          className="mx-auto w-full max-w-[1440px] overflow-hidden rounded-[2.5rem] p-8 text-white shadow-2xl md:p-12 reveal-scale"
          style={{ backgroundColor: solution.theme.primary }}
        >
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-white/70">
                Konsultasi Nutrisi
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
                Belum yakin produk mana yang paling sesuai?
              </h2>

              <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-white/80 md:text-base md:leading-8">
                Konsultasikan kebutuhan nutrisi Anda agar tim kami dapat membantu
                memberikan arahan awal yang lebih tepat.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <a
                href="/kontak"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-black shadow-xl shadow-black/10 transition hover:-translate-y-0.5"
                style={{ color: solution.theme.primary }}
              >
                Konsultasi Sekarang
              </a>

              <a
                href="/apotek-resmi"
                className="inline-flex items-center justify-center rounded-full bg-white/15 px-7 py-4 text-sm font-black text-white ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                Apotek Resmi
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
