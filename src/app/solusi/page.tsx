import { PageHero } from "@/components/shared/PageHero";
import { PageShell } from "@/components/shared/PageShell";
import { solutionDetails } from "@/data/solutions";

export default function SolusiPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Solusi Nutrisi"
        title="Solusi Nutrisi Berdasarkan Kondisi dan Kebutuhan Tubuh"
        description="Setiap kondisi tubuh membutuhkan pendekatan nutrisi yang berbeda. Medikal Nutrience membantu pengguna menemukan pilihan produk dan edukasi yang lebih sesuai."
      />

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#006b3f]">
                Pilih Kategori
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight text-[#0f172a] md:text-5xl">
                Jelajahi Solusi Nutrisi
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#475569]">
              Temukan rekomendasi produk berdasarkan kondisi tubuh dan kebutuhan
              nutrisi Anda.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {solutionDetails.map((solution) => (
              <a
                key={solution.slug}
                href={`/solusi/${solution.slug}`}
                className="group overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-green-900/5 ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div
                  className={`flex h-52 items-center justify-center bg-gradient-to-br ${solution.theme.gradient} p-8 text-white`}
                >
                  <div className="rounded-[2rem] bg-white/10 px-8 py-6 text-center backdrop-blur">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-white/70">
                      {solution.eyebrow}
                    </p>
                    <p className="mt-3 text-3xl font-black">
                      {solution.shortTitle}
                    </p>
                  </div>
                </div>

                <div className="p-7">
                  <p
                    className="mb-3 inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
                    style={{ backgroundColor: solution.theme.primary }}
                  >
                    {solution.eyebrow}
                  </p>

                  <h3 className="text-2xl font-black leading-tight text-[#0f172a]">
                    {solution.title}
                  </h3>

                  <p className="mt-3 min-h-28 text-sm leading-7 text-[#64748b]">
                    {solution.description}
                  </p>

                  <p
                    className="mt-6 text-sm font-black"
                    style={{ color: solution.theme.primary }}
                  >
                    Lihat Solusi →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
