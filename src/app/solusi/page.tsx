import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { promises as fs } from "fs";
import path from "path";

type CmsSolutionDraft = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  problemTitle: string;
  problems: string[];
  educationTitle: string;
  educationPoints: string[];
  status: "published" | "draft" | "review";
  updatedAt: string;
};

async function getSolutionDrafts() {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "src/data/cms/cms-solutions.json"),
      "utf8"
    );

    const drafts = JSON.parse(file) as Record<string, CmsSolutionDraft>;

    return Object.fromEntries(
      Object.entries(drafts).filter(([, draft]) => draft.status === "published")
    ) as Record<string, CmsSolutionDraft>;
  } catch {
    return {};
  }
}

function getSlugFromHref(href: string) {
  return href.replace("/solusi/", "");
}


const featuredSolutions = [
  {
    title: "Hepatosol",
    headline: "Butuh Kondisi Hati Perhatian Lebih?",
    description: "Dukungan nutrisi lanjutan untuk kondisi hati kronik yang membutuhkan perhatian lebih intensif.",
    image: "/images/solutions/home/hati-liver-hepatosol.png",
    href: "/produk/hepatosol",
    color: "#dc2626",
    gradient: "from-[#c90000] via-[#e30613] to-[#ff2a2a]",
    button: "Lihat Hepatosol",
  },
  {
    title: "Hepatosol Lola",
    headline: "Nutrisi untuk Perawatan Hati Harian",
    description: "Untuk kondisi hati umum atau kronik dengan dukungan formula nutrisi yang sesuai.",
    image: "/images/mednut/products/page-assets/hepatosol-lola.png",
    href: "/produk/hepatosol-lola",
    color: "#dc2626",
    gradient: "from-[#b80000] via-[#dc0000] to-[#f43f3f]",
    button: "Lihat Hepatosol Lola",
  },
  {
    title: "Nephrisol",
    headline: "Sudah Menjalani Dialisis?",
    description: "Jika Anda sedang menjalani cuci darah atau dialisis, kebutuhan nutrisi Anda berbeda.",
    image: "/images/solutions/home/ginjal-nephrisol-d.jpeg",
    href: "/produk/nephrisol",
    color: "#7e22ce",
    gradient: "from-[#8b00c9] via-[#8a00b8] to-[#3b005a]",
    button: "Lihat Nephrisol",
  },
  {
    title: "Nephrisol-D",
    headline: "Belum Menjalani Dialisis?",
    description: "Jika Anda masih dalam tahap awal gangguan ginjal, tersedia pilihan nutrisi yang sesuai.",
    image: "/images/mednut/products/page-assets/nephrisol-d.jpeg",
    href: "/produk/nephrisol-d",
    color: "#6b21a8",
    gradient: "from-[#7c1dbb] via-[#5b0ca8] to-[#2a0045]",
    button: "Lihat Nephrisol-D",
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

export default async function SolutionsPage() {
  const drafts = await getSolutionDrafts();

  const otherSolutionRows = otherSolutions.map((solution) => {
    const slug = getSlugFromHref(solution.href);
    const draft = drafts[slug];

    return {
      ...solution,
      title: draft?.shortTitle ?? solution.title,
      subtitle: draft?.eyebrow ?? solution.subtitle,
      description: draft?.description ?? solution.description,
      href: `/solusi/${draft?.slug ?? slug}`,
    };
  });
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

                <div className="relative z-10 flex min-h-[420px] items-center justify-center rounded-[2rem] bg-[#f4fbf8] p-5 md:min-h-[520px]">
                  <img
                    src="/images/mednut/banners/menu-produk-depan.png"
                    alt="Keluarga Indonesia dan rangkaian produk Medikal Nutrience"
                    className="h-auto w-full max-w-[720px] object-contain drop-shadow-2xl"
                  />
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

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {featuredSolutions.map((solution) => (
                <a
                  key={solution.title}
                  href={solution.href}
                  className={`group relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${solution.gradient} text-white shadow-xl shadow-slate-900/10 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-900/15`}
                >
                  <div className="relative min-h-[460px]">
                    <div className="absolute right-[-70px] top-[-70px] h-52 w-52 rounded-full bg-white/15 blur-sm" />
                    <div className="absolute bottom-[-80px] left-[-70px] h-56 w-56 rounded-full bg-black/15 blur-sm" />

                    <div className="relative z-10 h-[220px] overflow-hidden bg-white/10">
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.05]"
                      />
                    </div>

                    <div className="relative z-10 px-6 pb-7 pt-6">
                      <p className="text-2xl font-black leading-tight text-white drop-shadow md:text-3xl">
                        {solution.title}
                      </p>

                      <h3 className="mt-6 text-2xl font-black leading-tight text-white md:text-3xl">
                        {solution.headline}
                      </h3>

                      <p className="mt-4 min-h-[84px] text-sm font-medium leading-7 text-white/90">
                        {solution.description}
                      </p>

                      <span className="mt-7 inline-flex rounded-full bg-black/25 px-5 py-3 text-[11px] font-black uppercase tracking-wide text-white shadow-lg shadow-black/10 ring-1 ring-white/10 transition group-hover:bg-white group-hover:text-[#111827]">
                        {solution.button}
                      </span>
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
              {otherSolutionRows.map((solution) => (
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
