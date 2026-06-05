import type { SolutionDetail } from "@/data/solutions";

export function SolutionDetailTemplate({
  solution,
}: {
  solution: SolutionDetail;
}) {
  return (
    <>
      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div
            className="rounded-[2.5rem] p-8 md:p-12"
            style={{ backgroundColor: solution.theme.soft }}
          >
            <p
              className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black shadow-sm"
              style={{ color: solution.theme.primary }}
            >
              {solution.eyebrow}
            </p>

            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-[#0f172a] md:text-6xl">
              {solution.title}
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-[#475569] md:text-base">
              {solution.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#recommended-products"
                className="rounded-full px-7 py-4 text-sm font-black text-white shadow-lg"
                style={{ backgroundColor: solution.theme.primary }}
              >
                Lihat Rekomendasi
              </a>

              <a
                href="/kontak"
                className="rounded-full border border-black/10 bg-white px-7 py-4 text-sm font-black text-[#334155]"
              >
                Konsultasi Ahli Gizi
              </a>
            </div>
          </div>

          <div
            className={`relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[2.5rem] bg-gradient-to-br ${solution.theme.gradient} p-8 text-white shadow-2xl`}
          >
            <div className="absolute left-[-70px] top-[-70px] h-44 w-44 rounded-full bg-white/10" />
            <div className="absolute bottom-[-90px] right-[-90px] h-60 w-60 rounded-full bg-white/10" />

            <div className="relative rounded-[2rem] bg-white/10 p-8 text-center backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-white/70">
                Medikal Nutrience
              </p>
              <p className="mt-4 text-4xl font-black">
                {solution.shortTitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p
              className="text-sm font-bold uppercase tracking-[0.25em]"
              style={{ color: solution.theme.primary }}
            >
              Kebutuhan Tubuh
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-[#0f172a] md:text-5xl">
              {solution.problemTitle}
            </h2>

            <p className="mt-5 text-sm leading-8 text-[#475569]">
              Kenali beberapa kondisi yang dapat menjadi tanda bahwa tubuh
              membutuhkan dukungan nutrisi yang lebih tepat.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {solution.problems.map((problem, index) => (
              <article
                key={problem}
                className="rounded-[2rem] bg-[#f8fafc] p-6 ring-1 ring-black/5"
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black text-white"
                  style={{ backgroundColor: solution.theme.primary }}
                >
                  0{index + 1}
                </div>

                <h3 className="text-lg font-black leading-tight text-[#0f172a]">
                  {problem}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="recommended-products" className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p
                className="text-sm font-bold uppercase tracking-[0.25em]"
                style={{ color: solution.theme.primary }}
              >
                Rekomendasi Produk
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight text-[#0f172a] md:text-5xl">
                Produk yang Sesuai
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#475569]">
              Pilihan produk berikut disesuaikan dengan kategori solusi nutrisi
              yang sedang Anda lihat.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {solution.recommendedProducts.map((product) => (
              <article
                key={product.slug}
                className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-green-900/5 ring-1 ring-black/5"
              >
                <div
                  className={`flex h-52 items-center justify-center bg-gradient-to-br ${solution.theme.gradient} p-8 text-white`}
                >
                  <div className="rounded-[2rem] bg-white/10 px-8 py-6 text-center backdrop-blur">
                    <p className="text-sm font-black uppercase tracking-[0.25em] text-white/70">
                      Produk
                    </p>
                    <p className="mt-3 text-4xl font-black">{product.name}</p>
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-2xl font-black text-[#0f172a]">
                    {product.name}
                  </h3>

                  <p className="mt-3 min-h-20 text-sm leading-7 text-[#64748b]">
                    {product.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href={`/produk/${product.slug}`}
                      className="rounded-full px-6 py-3 text-sm font-black text-white shadow-lg"
                      style={{ backgroundColor: solution.theme.primary }}
                    >
                      Lihat Produk
                    </a>

                    <a
                      href="/kontak"
                      className="rounded-full border border-black/10 bg-[#f8fafc] px-6 py-3 text-sm font-black text-[#334155]"
                    >
                      Konsultasi
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p
              className="text-sm font-bold uppercase tracking-[0.25em]"
              style={{ color: solution.theme.primary }}
            >
              Edukasi Nutrisi
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-[#0f172a] md:text-5xl">
              {solution.educationTitle}
            </h2>
          </div>

          <div className="grid gap-4">
            {solution.educationPoints.map((point) => (
              <article
                key={point}
                className="rounded-[2rem] bg-[#f8fafc] p-6 ring-1 ring-black/5"
              >
                <p className="text-sm font-bold leading-7 text-[#475569]">
                  {point}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div
          className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] p-8 text-white shadow-2xl md:p-14"
          style={{ backgroundColor: solution.theme.primary }}
        >
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/70">
                Konsultasi Nutrisi
              </p>

              <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight md:text-5xl">
                Belum yakin produk mana yang paling sesuai?
              </h2>

              <p className="mt-5 max-w-2xl leading-8 text-white/80">
                Konsultasikan kebutuhan nutrisi Anda agar tim kami dapat
                membantu memberikan arahan awal yang lebih tepat.
              </p>
            </div>

            <div className="md:text-right">
              <a
                href="/kontak"
                className="inline-flex rounded-full bg-white px-7 py-4 text-sm font-black shadow-xl shadow-black/10"
                style={{ color: solution.theme.primary }}
              >
                Konsultasi Sekarang
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
