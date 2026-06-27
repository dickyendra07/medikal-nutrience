import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const featuredSolutions = [
  {
    title: "Ginjal",
    subtitle: "Pra-Dialisis & Dialisis",
    description:
      "Dukungan nutrisi untuk kebutuhan kondisi ginjal kronik pada tahap pra-dialisis maupun dialisis.",
    image: "/images/solutions/home/ginjal-nephrisol-d.jpeg",
    href: "/solusi/ginjal",
    color: "#5b0ca8",
    badge: "Nephrisol",
  },
  {
    title: "Hati / Liver",
    subtitle: "Gangguan Fungsi Hati",
    description:
      "Solusi nutrisi untuk membantu memenuhi kebutuhan pada kondisi hati kronik dan gangguan fungsi hati.",
    image: "/images/solutions/home/hati-liver-hepatosol.png",
    href: "/solusi/hati-liver",
    color: "#dc2626",
    badge: "Hepatosol",
  },
  {
    title: "Pernafasan",
    subtitle: "PPOK, Asma, Pneumonia, TB",
    description:
      "Dukungan nutrisi untuk kondisi pernafasan yang membutuhkan asupan protein dan energi yang tepat.",
    image: "/images/solutions/home/pernafasan-pulmosol.png",
    href: "/solusi/pernafasan",
    color: "#1e3a8a",
    badge: "Pulmosol",
  },
  {
    title: "Syaraf & Otak",
    subtitle: "Stroke & Alzheimer",
    description:
      "Dukungan nutrisi untuk kondisi dengan tantangan asupan makan, kesulitan menelan, atau kebutuhan nutrisi khusus.",
    image: "/images/solutions/home/syaraf-otak-peptibren.png",
    href: "/produk/peptibren",
    color: "#ca8a04",
    badge: "Peptibren",
  },
];

const otherSolutions = [
  {
    title: "Pencernaan",
    subtitle: "Saluran Cerna",
    description:
      "Solusi nutrisi untuk membantu kebutuhan pada kondisi saluran cerna tertentu.",
    href: "/solusi/pencernaan",
    color: "#db2777",
  },
  {
    title: "Pemulihan",
    subtitle: "Recovery & Protein",
    description:
      "Dukungan nutrisi untuk membantu memenuhi kebutuhan saat masa pemulihan.",
    href: "/solusi/pemulihan",
    color: "#059669",
  },
  {
    title: "Anak",
    subtitle: "Tumbuh Kembang",
    description:
      "Solusi nutrisi untuk mendukung kebutuhan tumbuh kembang anak.",
    href: "/solusi/anak",
    color: "#0ea5e9",
  },
  {
    title: "Dewasa & Lansia",
    subtitle: "Kebutuhan Harian",
    description:
      "Dukungan nutrisi untuk kebutuhan dewasa dan lansia agar tetap aktif.",
    href: "/solusi/dewasa-lansia",
    color: "#64748b",
  },
];

const focusList = [
  "Ginjal",
  "Hati / Liver",
  "Pernafasan",
  "Pencernaan",
  "Pemulihan",
  "Anak",
  "Dewasa & Lansia",
  "Syaraf & Otak",
];

export default function SolutionsPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#f4fbf8]">
        <section className="relative overflow-hidden px-5 py-12 md:py-20 lg:px-10">
          <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#d9f3e8]" />
          <div className="absolute bottom-[-240px] right-[-140px] h-[500px] w-[500px] rounded-full bg-[#c6f1df]" />

          <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="reveal-left">
              <p className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-[#006b3f] shadow-lg shadow-green-900/8 ring-1 ring-black/5">
                Solusi Medikal Nutrience
              </p>

              <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-[#111827] md:text-6xl">
                Solusi Nutrisi Berdasarkan Kondisi Kesehatan
              </h1>

              <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[#5f6b76] md:text-lg md:leading-9">
                Setiap kondisi membutuhkan pendekatan nutrisi yang berbeda.
                Temukan pilihan solusi Medikal Nutrience berdasarkan kebutuhan tubuh
                dan tahap kesehatan Anda.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {focusList.map((item) => (
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
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-4 shadow-2xl shadow-green-900/10 ring-1 ring-black/5">
                <div className="absolute right-[-90px] top-[-90px] h-72 w-72 rounded-full bg-[#d9f3e8]" />
                <div className="absolute bottom-[-110px] left-[-90px] h-80 w-80 rounded-full bg-[#eaf8f1]" />

                <div className="relative z-10 grid grid-cols-2 gap-4">
                  {featuredSolutions.map((solution) => (
                    <a
                      key={solution.title}
                      href={solution.href}
                      className="group overflow-hidden rounded-[1.5rem] bg-[#f8fcfa] shadow-lg shadow-slate-900/5 ring-1 ring-black/5 transition hover:-translate-y-1"
                    >
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      />

                      <div className="p-4">
                        <p
                          className="text-[10px] font-black uppercase tracking-[0.18em]"
                          style={{ color: solution.color }}
                        >
                          {solution.badge}
                        </p>
                        <h3 className="mt-1 text-base font-black leading-tight text-[#111827] md:text-lg">
                          {solution.title}
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
                  Solusi Utama
                </p>
                <h2 className="mt-5 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
                  Pilihan solusi dengan asset produk asli yang lebih meyakinkan.
                </h2>
              </div>

              <p className="text-sm font-medium leading-7 text-[#6b7280] md:text-base md:leading-8">
                Solusi utama ditampilkan dengan visual produk asli agar pengguna
                lebih mudah mengenali kategori dan produk yang relevan dengan
                kebutuhan kesehatannya.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {featuredSolutions.map((solution) => (
                <a
                  key={solution.title}
                  href={solution.href}
                  className="group reveal overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-900/8 ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-green-900/12"
                >
                  <div className="grid gap-0 md:grid-cols-[1fr_0.95fr] md:items-stretch">
                    <div className="relative overflow-hidden bg-[#eaf8f1]">
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="h-full min-h-[240px] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="flex flex-col justify-between p-6 md:p-8">
                      <div>
                        <p
                          className="text-xs font-black uppercase tracking-[0.25em]"
                          style={{ color: solution.color }}
                        >
                          {solution.subtitle}
                        </p>

                        <h3 className="mt-4 text-3xl font-black leading-tight text-[#111827]">
                          {solution.title}
                        </h3>

                        <p className="mt-4 text-sm font-medium leading-7 text-[#6b7280] md:text-base">
                          {solution.description}
                        </p>
                      </div>

                      <div className="mt-7 flex items-center justify-between border-t border-black/5 pt-5">
                        <span className="text-xs font-black uppercase tracking-wide text-[#006b3f]">
                          Lihat Solusi
                        </span>

                        <span
                          className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-black text-white transition group-hover:translate-x-1"
                          style={{ backgroundColor: solution.color }}
                        >
                          →
                        </span>
                      </div>
                    </div>
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
                Solusi Lainnya
              </p>

              <h2 className="mt-5 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
                Telusuri solusi nutrisi lain sesuai tahap kebutuhan.
              </h2>

              <p className="mt-5 text-sm font-medium leading-7 text-[#6b7280] md:text-base md:leading-8">
                Beberapa kategori masih dapat diperkuat dengan asset asli tambahan
                dari client agar visual setiap solusi semakin konsisten.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {otherSolutions.map((solution) => (
                <a
                  key={solution.title}
                  href={solution.href}
                  className="group reveal rounded-[1.8rem] bg-white p-6 shadow-xl shadow-slate-900/8 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-900/10"
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black text-white"
                    style={{ backgroundColor: solution.color }}
                  >
                    {solution.title.charAt(0)}
                  </div>

                  <p
                    className="mt-6 text-xs font-black uppercase tracking-[0.2em]"
                    style={{ color: solution.color }}
                  >
                    {solution.subtitle}
                  </p>

                  <h3 className="mt-3 text-2xl font-black leading-tight text-[#111827]">
                    {solution.title}
                  </h3>

                  <p className="mt-3 text-sm font-medium leading-7 text-[#6b7280]">
                    {solution.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4">
                    <span className="text-xs font-black uppercase tracking-wide text-[#006b3f]">
                      Lihat Detail
                    </span>
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-white transition group-hover:translate-x-1"
                      style={{ backgroundColor: solution.color }}
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
                    Butuh Arahan?
                  </p>

                  <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
                    Temukan produk nutrisi berdasarkan kondisi Anda.
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/80 md:text-base">
                    Gunakan halaman produk, apotek resmi, atau konsultasi awal
                    untuk membantu menemukan pilihan yang sesuai.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/produk"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#006b3f] transition hover:-translate-y-0.5"
                  >
                    Lihat Produk
                  </a>
                  <a
                    href="/kontak"
                    className="inline-flex items-center justify-center rounded-full bg-white/15 px-6 py-4 text-sm font-black text-white ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    Konsultasi
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
