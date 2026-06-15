import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const featuredProducts = [
  {
    name: "Entrasoy",
    category: "Protein Nabati",
    description:
      "Nutrisi berbasis soya untuk membantu memenuhi kebutuhan protein harian.",
    image: "/images/products/home/entrasoy.png",
    href: "/produk/entrasoy",
    accent: "#0d7a53",
  },
  {
    name: "Entramix",
    category: "Nutrisi Lengkap",
    description:
      "Pilihan nutrisi lengkap untuk mendukung kebutuhan energi dan asupan harian.",
    image: "/images/products/home/entramix.png",
    href: "/produk/entramix",
    accent: "#e88b24",
  },
  {
    name: "Peptisol",
    category: "Protein Medis",
    description:
      "Nutrisi tinggi protein untuk membantu mendukung kebutuhan pemulihan.",
    image: "/images/products/home/peptisol.png",
    href: "/produk/peptisol",
    accent: "#e84f72",
  },
  {
    name: "Entrakid",
    category: "Tumbuh Kembang Anak",
    description:
      "Nutrisi untuk membantu mendukung kebutuhan tumbuh kembang anak.",
    image: "/images/products/home/entrakid.png",
    href: "/produk/entrakid",
    accent: "#1aa5b5",
  },
];

const medicalProducts = [
  {
    name: "Nephrisol",
    category: "Ginjal",
    description: "Dukungan nutrisi untuk kondisi ginjal kronik tahap pra-dialisis.",
    href: "/produk/nephrisol",
    color: "#7c3aed",
  },
  {
    name: "Nephrisol-D",
    category: "Ginjal",
    description: "Dukungan nutrisi untuk kondisi ginjal kronik dengan terapi dialisis.",
    href: "/produk/nephrisol-d",
    color: "#5b21b6",
  },
  {
    name: "Hepatosol",
    category: "Hati / Liver",
    description: "Dukungan nutrisi untuk kebutuhan pada gangguan fungsi hati.",
    href: "/produk/hepatosol",
    color: "#dc2626",
  },
  {
    name: "Hepatosol Lola",
    category: "Hati / Liver",
    description: "Nutrisi khusus untuk mendukung kebutuhan kondisi hati tertentu.",
    href: "/produk/hepatosol-lola",
    color: "#ef4444",
  },
  {
    name: "Pulmosol",
    category: "Pernafasan",
    description: "Nutrisi untuk membantu memenuhi kebutuhan kondisi pernafasan.",
    href: "/produk/pulmosol",
    color: "#1e3a8a",
  },
  {
    name: "Oligo",
    category: "Pencernaan",
    description: "Nutrisi untuk mendukung kebutuhan pada kondisi saluran cerna.",
    href: "/produk/oligo",
    color: "#db2777",
  },
  {
    name: "Peptibren",
    category: "Syaraf & Otak",
    description: "Dukungan nutrisi untuk kebutuhan khusus seperti stroke dan Alzheimer.",
    href: "/produk/peptibren",
    color: "#ca8a04",
  },
];

const categories = [
  "Nutrisi Keluarga",
  "Ginjal",
  "Hati / Liver",
  "Pernafasan",
  "Pencernaan",
  "Syaraf & Otak",
];

export default function ProductsPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#f4fbf8]">
        <section className="relative overflow-hidden px-5 py-12 md:py-20 lg:px-10">
          <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#d9f3e8]" />
          <div className="absolute bottom-[-220px] right-[-120px] h-[460px] w-[460px] rounded-full bg-[#c6f1df]" />

          <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="reveal-left">
              <p className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-[#006b3f] shadow-lg shadow-green-900/8 ring-1 ring-black/5">
                Produk Medikal Nutrience
              </p>

              <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-[#111827] md:text-6xl">
                Pilihan Produk Nutrisi untuk Setiap Kebutuhan Tubuh
              </h1>

              <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[#5f6b76] md:text-lg md:leading-9">
                Temukan rangkaian produk Medikal Nutrience untuk kebutuhan nutrisi
                keluarga, pemulihan, serta kondisi kesehatan khusus.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {categories.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-md shadow-green-900/5 ring-1 ring-black/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal-scale reveal-delay-2">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-[#006b3f] p-5 shadow-2xl shadow-green-900/15">
                <div className="absolute right-[-80px] top-[-80px] h-72 w-72 rounded-full bg-white/10" />
                <div className="absolute bottom-[-100px] left-[-80px] h-80 w-80 rounded-full bg-white/10" />

                <div className="relative z-10 grid grid-cols-2 gap-4">
                  {featuredProducts.map((product) => (
                    <a
                      key={product.name}
                      href={product.href}
                      className="group overflow-hidden rounded-[1.5rem] bg-white/10 p-3 ring-1 ring-white/15 transition hover:-translate-y-1 hover:bg-white/15"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="aspect-[4/3] w-full rounded-[1.2rem] object-cover shadow-xl shadow-black/10 transition group-hover:scale-[1.03]"
                      />
                      <div className="p-2">
                        <p className="text-xs font-bold uppercase tracking-wide text-white/55">
                          {product.category}
                        </p>
                        <h3 className="mt-1 text-lg font-black text-white">
                          {product.name}
                        </h3>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-12 md:py-16 lg:px-10">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end reveal">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-[#006b3f]">
                  Produk Unggulan
                </p>
                <h2 className="mt-5 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
                  Rangkaian nutrisi keluarga dengan visual produk resmi.
                </h2>
              </div>

              <p className="text-sm font-medium leading-7 text-[#6b7280] md:text-base md:leading-8">
                Produk unggulan ditampilkan dengan asset visual yang sudah tersedia
                agar halaman terasa lebih hidup, informatif, dan siap dipresentasikan
                ke client.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {featuredProducts.map((product) => (
                <a
                  key={product.name}
                  href={product.href}
                  className="group reveal overflow-hidden rounded-[1.6rem] bg-white shadow-xl shadow-slate-900/8 ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-900/12 lg:rounded-[2rem]"
                >
                  <div className="relative overflow-hidden bg-[#eaf8f1] p-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-[4/3] w-full rounded-[1.25rem] object-cover transition duration-500 group-hover:scale-[1.04] lg:rounded-[1.6rem]"
                    />
                  </div>

                  <div className="p-4 lg:p-6">
                    <p
                      className="text-[10px] font-black uppercase tracking-[0.18em] lg:text-xs"
                      style={{ color: product.accent }}
                    >
                      {product.category}
                    </p>

                    <h3 className="mt-2 text-lg font-black leading-tight text-[#111827] lg:text-2xl">
                      {product.name}
                    </h3>

                    <p className="mt-3 hidden text-sm font-medium leading-7 text-[#6b7280] lg:block">
                      {product.description}
                    </p>

                    <span
                      className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-white lg:h-11 lg:w-11"
                      style={{ backgroundColor: product.accent }}
                    >
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-12 md:py-16 lg:px-10">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="mx-auto max-w-3xl text-center reveal">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#006b3f]">
                Produk Kondisi Khusus
              </p>

              <h2 className="mt-5 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
                Solusi nutrisi untuk kebutuhan medis dan kondisi spesifik.
              </h2>

              <p className="mt-5 text-sm font-medium leading-7 text-[#6b7280] md:text-base md:leading-8">
                Telusuri produk berdasarkan kebutuhan tubuh dan kondisi kesehatan
                seperti ginjal, hati, pernafasan, pencernaan, dan kebutuhan pemulihan.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {medicalProducts.map((product) => (
                <a
                  key={product.name}
                  href={product.href}
                  className="group reveal rounded-[1.8rem] bg-white p-5 shadow-xl shadow-slate-900/8 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-900/10"
                >
                  <div className="flex gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-black text-white"
                      style={{ backgroundColor: product.color }}
                    >
                      {product.name.charAt(0)}
                    </div>

                    <div>
                      <p
                        className="text-xs font-black uppercase tracking-[0.18em]"
                        style={{ color: product.color }}
                      >
                        {product.category}
                      </p>

                      <h3 className="mt-2 text-xl font-black text-[#111827]">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-sm font-medium leading-7 text-[#6b7280]">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
                    <span className="text-xs font-black uppercase tracking-wide text-[#006b3f]">
                      Lihat Detail
                    </span>
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-white transition group-hover:translate-x-1"
                      style={{ backgroundColor: product.color }}
                    >
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 pt-8 lg:px-10">
          <div className="mx-auto w-full max-w-[1440px] reveal-scale">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#006b3f] via-[#087a4c] to-[#10b981] p-8 text-white shadow-2xl shadow-green-900/15 md:p-12">
              <div className="absolute right-[-80px] top-[-80px] h-72 w-72 rounded-full bg-white/10" />
              <div className="absolute bottom-[-90px] left-[35%] h-72 w-72 rounded-full bg-white/10" />

              <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.35em] text-white/70">
                    Butuh Bantuan?
                  </p>

                  <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
                    Temukan produk yang sesuai dengan kebutuhan Anda.
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/80 md:text-base">
                    Konsultasikan kebutuhan nutrisi Anda atau temukan produk melalui
                    apotek resmi Medikal Nutrience.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/kontak"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#006b3f] transition hover:-translate-y-0.5"
                  >
                    Konsultasi
                  </a>
                  <a
                    href="/apotek-resmi"
                    className="inline-flex items-center justify-center rounded-full bg-white/15 px-6 py-4 text-sm font-black text-white ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    Apotek Resmi
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
