import { PageHero } from "@/components/shared/PageHero";
import { PageShell } from "@/components/shared/PageShell";
import { supportItems } from "@/data/support-system";

export default function SupportSystemPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Support System"
        title="Dukungan Terintegrasi untuk Perjalanan Nutrisi yang Lebih Baik"
        description="Medikal Nutrience menghadirkan fitur pendukung mulai dari cek status gizi, kisah sukses pasien, dapur sehat, hingga komunitas sehat."
      />

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#006b3f]">
                Fitur Pendukung
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight text-[#0f172a] md:text-5xl">
                Pilih Support System
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#475569]">
              Fitur ini membantu pengguna memahami kondisi tubuh, mendapatkan
              inspirasi nutrisi, dan mengakses edukasi kesehatan.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {supportItems.map((item) => (
              <a
                key={item.slug}
                href={`/support-system/${item.slug}`}
                className="group overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-green-900/5 ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div
                  className="flex h-44 items-center justify-center p-6 text-white"
                  style={{ backgroundColor: item.color }}
                >
                  <div className="rounded-[1.5rem] bg-white/10 p-6 text-center backdrop-blur">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-white/70">
                      {item.eyebrow}
                    </p>
                    <p className="mt-3 text-3xl font-black">
                      {item.title.split(" ")[0]}
                    </p>
                  </div>
                </div>

                <div className="p-7">
                  <p
                    className="mb-3 inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.eyebrow}
                  </p>

                  <h3 className="text-xl font-black text-[#0f172a]">
                    {item.title}
                  </h3>

                  <p className="mt-3 min-h-28 text-sm leading-7 text-[#64748b]">
                    {item.description}
                  </p>

                  <p
                    className="mt-6 text-sm font-black"
                    style={{ color: item.color }}
                  >
                    Selengkapnya →
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
