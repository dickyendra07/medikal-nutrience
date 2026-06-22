import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { mednutAssets } from "@/data/mednut-assets";

const supportItems = [
  {
    title: "Kalkulator Status Gizi",
    eyebrow: "Assessment Tools",
    description:
      "Bantu pengguna mendapatkan gambaran awal status gizi melalui kalkulator IMT dan estimasi kebutuhan energi harian.",
    image: mednutAssets.support.bmiCalculator,
    href: "/support-system/kalkulator-status-gizi",
    accent: "#006b3f",
  },
  {
    title: "Dapur Sehat FIMA",
    eyebrow: "Healthy Kitchen",
    description:
      "Inspirasi menu dan edukasi nutrisi yang membantu keluarga menyiapkan pilihan asupan lebih sehat.",
    image: mednutAssets.support.educationHealth,
    href: "/support-system/dapur-sehat-fima",
    accent: "#d85b70",
  },
  {
    title: "Kisah Sukses Pasien",
    eyebrow: "Patient Story",
    description:
      "Cerita perjalanan dan pengalaman pasien dalam memenuhi kebutuhan nutrisi sesuai kondisi tubuhnya.",
    image: mednutAssets.support.doctorConsultation,
    href: "/support-system/kisah-sukses-pasien",
    accent: "#1e3a8a",
  },
  {
    title: "Komunitas Sehat",
    eyebrow: "Healthy Community",
    description:
      "Ruang edukasi dan dukungan untuk membantu masyarakat memahami pentingnya nutrisi yang tepat.",
    image: mednutAssets.banners.brandArtboard2,
    href: "/support-system/komunitas-sehat",
    accent: "#f59e0b",
  },
];

const highlights = [
  "Edukasi nutrisi berbasis kebutuhan",
  "Arahan awal untuk memilih produk",
  "Dukungan konten keluarga sehat",
  "Koneksi ke konsultasi dan apotek resmi",
];

export default function SupportSystemPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#f4fbf8]">
        <section className="relative overflow-hidden px-5 py-12 md:py-20 lg:px-10">
          <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#d9f3e8]" />
          <div className="absolute bottom-[-220px] right-[-140px] h-[480px] w-[480px] rounded-full bg-[#c6f1df]" />

          <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="reveal-left">
              <p className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-[#006b3f] shadow-lg shadow-green-900/8 ring-1 ring-black/5">
                Support System
              </p>

              <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-[#111827] md:text-6xl">
                Pendamping Nutrisi untuk Membantu Pilihan yang Lebih Tepat
              </h1>

              <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[#5f6b76] md:text-lg md:leading-9">
                Medikal Nutrience menghadirkan sistem pendukung berupa tools,
                edukasi, cerita pasien, dan komunitas untuk membantu masyarakat
                memahami kebutuhan nutrisi sesuai kondisi tubuh.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/support-system/kalkulator-status-gizi"
                  className="inline-flex items-center justify-center rounded-full bg-[#006b3f] px-6 py-4 text-sm font-black text-white shadow-xl shadow-green-900/15 transition hover:-translate-y-0.5"
                >
                  Mulai Cek Status Gizi
                </a>
                <a
                  href="/kontak"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#006b3f] shadow-xl shadow-green-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
                >
                  Konsultasi Produk
                </a>
              </div>
            </div>

            <div className="reveal-scale reveal-delay-2">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-5 shadow-2xl shadow-green-900/10 ring-1 ring-black/5 md:p-7">
                <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-[#d9f3e8]" />
                <div className="absolute bottom-[-120px] left-[-80px] h-72 w-72 rounded-full bg-[#e8f8f1]" />

                <div className="relative z-10 overflow-hidden rounded-[2rem] bg-[#006b3f]">
                  <img
                    src={mednutAssets.support.doctorConsultation}
                    alt="Konsultasi nutrisi Medikal Nutrience"
                    className="h-[360px] w-full object-cover opacity-90 md:h-[480px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003d28]/90 via-[#003d28]/25 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-white/70">
                      Nutrition Care Journey
                    </p>
                    <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight text-white md:text-5xl">
                      Edukasi, tools, dan dukungan untuk keluarga sehat.
                    </h2>
                  </div>
                </div>

                <div className="relative z-10 mt-5 grid grid-cols-2 gap-3">
                  {highlights.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-[#f8fcfa] p-4 ring-1 ring-black/5"
                    >
                      <p className="text-sm font-black leading-6 text-[#111827]">
                        {item}
                      </p>
                    </div>
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
                  Pilihan Support
                </p>

                <h2 className="mt-5 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
                  Satu ekosistem pendukung untuk kebutuhan nutrisi harian.
                </h2>
              </div>

              <p className="text-sm font-medium leading-7 text-[#6b7280] md:text-base md:leading-8">
                Setiap fitur dirancang untuk membantu pengguna memahami kondisi,
                menemukan edukasi yang relevan, dan terhubung ke produk serta
                channel resmi Medikal Nutrience.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {supportItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="group reveal overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-900/8 ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-900/10"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4">
                      <span
                        className="inline-flex rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white"
                        style={{ backgroundColor: item.accent }}
                      >
                        {item.eyebrow}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-black leading-tight text-[#111827]">
                      {item.title}
                    </h3>

                    <p className="mt-3 min-h-28 text-sm font-medium leading-7 text-[#6b7280]">
                      {item.description}
                    </p>

                    <span
                      className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-black text-white transition group-hover:translate-x-1"
                      style={{ backgroundColor: item.accent }}
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
                    Need Guidance?
                  </p>

                  <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
                    Bingung memilih produk nutrisi yang sesuai?
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/80 md:text-base">
                    Gunakan tools support system atau hubungi tim Medikal
                    Nutrience untuk mendapatkan arahan awal yang lebih tepat.
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
