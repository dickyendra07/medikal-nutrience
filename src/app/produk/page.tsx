import { PageHero } from "@/components/shared/PageHero";
import { PageShell } from "@/components/shared/PageShell";
import { ProductNeedSection } from "@/components/pages/products/ProductNeedSection";
import { productDetails } from "@/data/product-details";

const productCategories = [
  "Semua",
  "Anak",
  "Dewasa & Lansia",
  "Ginjal",
  "Hati / Liver",
  "Pencernaan",
  "Pemulihan",
  "Pernafasan",
];

export default function ProdukPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Produk Medikal Nutrience"
        title="Pilihan Nutrisi untuk Setiap Kebutuhan Keluarga Indonesia"
        description="Temukan rangkaian produk nutrisi Medikal Nutrience yang diformulasikan untuk anak, dewasa, lansia, hingga kebutuhan nutrisi khusus."
      />

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#006b3f]">
                Katalog Produk
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight text-[#0f172a] md:text-5xl">
                Rangkaian Produk Nutrisi
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#475569]">
              Pilih produk berdasarkan kategori kebutuhan, lalu arahkan pengguna
              ke detail produk atau konsultasi.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {productCategories.map((category, index) => (
              <button
                key={category}
                className={`rounded-full px-5 py-3 text-sm font-black transition ${
                  index === 0
                    ? "bg-[#006b3f] text-white shadow-lg shadow-green-900/20"
                    : "bg-white text-[#334155] ring-1 ring-black/10 hover:text-[#006b3f]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {productDetails.map((product) => (
              <article
                key={product.slug}
                className="group overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-green-900/5 ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div
                  className="flex h-64 items-end justify-center p-7"
                  style={{ backgroundColor: product.theme.soft }}
                >
                  <div className="relative flex h-48 w-32 items-center justify-center rounded-[2rem] bg-white p-2 shadow-2xl">
                    <div
                      className={`flex h-full w-full flex-col items-center justify-center rounded-[1.5rem] bg-gradient-to-b ${product.theme.gradient} px-4 text-center text-white`}
                    >
                      <p className="text-[10px] font-bold tracking-[0.25em]">
                        MEDIKAL
                      </p>
                      <p className="mt-3 text-lg font-black leading-tight">
                        {product.name}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-7">
                  <p
                    className="mb-3 inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
                    style={{ backgroundColor: product.theme.primary }}
                  >
                    {product.category}
                  </p>

                  <h3 className="text-2xl font-black text-[#0f172a]">
                    {product.name}
                  </h3>

                  <p className="mt-3 min-h-24 text-sm leading-7 text-[#64748b]">
                    {product.heroTitle}
                  </p>

                  <div className="mt-7 flex gap-3">
                    <a
                      href={`/produk/${product.slug}`}
                      className="flex-1 rounded-full px-5 py-3 text-center text-sm font-black text-white shadow-lg"
                      style={{ backgroundColor: product.theme.primary }}
                    >
                      Detail
                    </a>

                    <a
                      href="/kontak"
                      className="flex-1 rounded-full border border-black/10 bg-[#f8fafc] px-5 py-3 text-center text-sm font-black text-[#334155]"
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

      <ProductNeedSection />

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#006b3f] p-8 text-white shadow-2xl shadow-green-900/20 md:p-14">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#b7f7d0]">
                Butuh Bantuan?
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
                className="inline-flex rounded-full bg-white px-7 py-4 text-sm font-black text-[#006b3f] shadow-xl shadow-black/10"
              >
                Konsultasi Produk
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
