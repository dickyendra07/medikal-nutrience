import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const stats = [
  { value: "6+", label: "Kategori Produk" },
  { value: "8+", label: "Solusi Nutrisi" },
  { value: "100%", label: "Kanal Resmi" },
];

const pillars = [
  {
    title: "Nutrisi Berbasis Kebutuhan",
    description:
      "Produk dikembangkan untuk membantu memenuhi kebutuhan nutrisi pada berbagai tahap kehidupan dan kondisi kesehatan tertentu.",
  },
  {
    title: "Dukungan Edukasi",
    description:
      "Medikal Nutrience menghadirkan informasi dan fitur pendukung agar masyarakat dapat memahami kebutuhan nutrisi dengan lebih baik.",
  },
  {
    title: "Akses Produk Resmi",
    description:
      "Produk dapat ditemukan melalui kanal dan apotek resmi untuk menjaga keamanan serta kenyamanan pembelian.",
  },
];

const focuses = [
  "Ginjal",
  "Hati / Liver",
  "Pernafasan",
  "Pencernaan",
  "Pemulihan",
  "Anak",
  "Dewasa & Lansia",
  "Syaraf & Otak",
];

const approaches = [
  {
    step: "01",
    title: "Memahami Kebutuhan",
    description:
      "Setiap kondisi memiliki kebutuhan nutrisi yang berbeda. Karena itu, informasi awal dan pemahaman kebutuhan menjadi bagian penting.",
  },
  {
    step: "02",
    title: "Mengarahkan Solusi",
    description:
      "Pengguna dapat menelusuri pilihan produk dan solusi berdasarkan kategori kebutuhan tubuh serta kondisi kesehatan.",
  },
  {
    step: "03",
    title: "Menghubungkan Kanal Resmi",
    description:
      "Website membantu pengguna menemukan informasi produk, konsultasi awal, dan akses ke apotek resmi.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#f4fbf8]">
        <section className="relative overflow-hidden px-5 py-12 md:py-20 lg:px-10">
          <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#d9f3e8]" />
          <div className="absolute bottom-[-220px] right-[-120px] h-[460px] w-[460px] rounded-full bg-[#c6f1df]" />

          <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="reveal-left">
              <p className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-[#006b3f] shadow-lg shadow-green-900/8 ring-1 ring-black/5">
                Tentang Medikal Nutrience
              </p>

              <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-[#111827] md:text-6xl">
                Pendamping Nutrisi untuk Kebutuhan Kesehatan Keluarga Indonesia
              </h1>

              <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[#5f6b76] md:text-lg md:leading-9">
                Medikal Nutrience menghadirkan pilihan produk nutrisi dan fitur
                pendukung untuk membantu masyarakat menemukan solusi nutrisi yang
                sesuai dengan kebutuhan tubuh, tahap kehidupan, dan kondisi kesehatan.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/produk"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#006b3f] px-6 py-4 text-sm font-black text-white shadow-xl shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-[#005635]"
                >
                  Lihat Produk
                  <span>→</span>
                </a>

                <a
                  href="/solusi"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-black text-[#006b3f] shadow-xl shadow-green-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
                >
                  Jelajahi Solusi
                  <span>→</span>
                </a>
              </div>
            </div>

            <div className="reveal-scale reveal-delay-2">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-5 shadow-2xl shadow-green-900/10 ring-1 ring-black/5">
                <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-[#d9f3e8]" />
                <div className="absolute bottom-[-90px] left-[-70px] h-72 w-72 rounded-full bg-[#eaf8f1]" />

                <img
                  src="/images/support/konsultasi.png"
                  alt="Medikal Nutrience consultation"
                  className="relative z-10 mx-auto h-auto w-full max-w-[560px] object-contain drop-shadow-2xl"
                />

                <div className="relative z-20 mt-4 grid gap-3 sm:grid-cols-3">
                  {stats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl bg-[#f4fbf8] p-4 text-center ring-1 ring-black/5"
                    >
                      <p className="text-2xl font-black text-[#006b3f]">
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs font-black uppercase tracking-wide text-[#6b7280]">
                        {item.label}
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
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div className="reveal-left">
                <p className="text-xs font-black uppercase tracking-[0.35em] text-[#006b3f]">
                  Who We Are
                </p>

                <h2 className="mt-5 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
                  Solusi nutrisi yang dirancang untuk membantu kebutuhan spesifik tubuh.
                </h2>
              </div>

              <div className="reveal-right">
                <p className="text-base font-medium leading-8 text-[#5f6b76] md:text-lg md:leading-9">
                  Medikal Nutrience berfokus pada penyediaan informasi produk,
                  edukasi, dan akses kanal resmi untuk kebutuhan nutrisi. Website ini
                  dirancang untuk memudahkan pengguna memahami kategori produk,
                  memilih solusi berdasarkan kondisi, serta menghubungi kanal resmi
                  untuk konsultasi awal.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {focuses.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-white px-5 py-4 text-sm font-black text-[#006b3f] shadow-lg shadow-green-900/5 ring-1 ring-black/5"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-12 md:py-16 lg:px-10">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="mx-auto max-w-3xl text-center reveal">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#006b3f]">
                Our Commitment
              </p>

              <h2 className="mt-5 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
                Membangun pengalaman nutrisi yang informatif, aman, dan mudah diakses.
              </h2>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {pillars.map((item, index) => (
                <article
                  key={item.title}
                  className={`reveal rounded-[2rem] bg-white p-7 shadow-2xl shadow-slate-900/8 ring-1 ring-black/5 ${
                    index === 1 ? "lg:-translate-y-4" : ""
                  }`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf8f1] text-xl font-black text-[#006b3f]">
                    {index + 1}
                  </div>

                  <h3 className="mt-6 text-2xl font-black leading-tight text-[#111827]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm font-medium leading-7 text-[#6b7280]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-12 md:py-16 lg:px-10">
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="overflow-hidden rounded-[2.5rem] bg-[#006b3f] p-7 text-white shadow-2xl shadow-green-900/15 md:p-10 reveal-left">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-white/70">
                Approach
              </p>

              <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                Dari informasi kebutuhan hingga akses produk resmi.
              </h2>

              <p className="mt-5 text-sm font-medium leading-7 text-white/80 md:text-base md:leading-8">
                Medikal Nutrience membantu pengguna memahami kebutuhan nutrisi,
                menelusuri solusi yang relevan, dan mengakses informasi produk
                melalui kanal resmi.
              </p>

              <a
                href="/kontak"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-black text-[#006b3f] transition hover:-translate-y-0.5"
              >
                Konsultasi Sekarang
                <span>→</span>
              </a>
            </div>

            <div className="space-y-4 reveal-right">
              {approaches.map((item) => (
                <article
                  key={item.step}
                  className="grid gap-5 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/8 ring-1 ring-black/5 md:grid-cols-[80px_1fr]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf8f1] text-xl font-black text-[#006b3f]">
                    {item.step}
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-[#111827]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-7 text-[#6b7280]">
                      {item.description}
                    </p>
                  </div>
                </article>
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
                    Medikal Nutrience
                  </p>

                  <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
                    Temukan produk nutrisi yang sesuai dengan kebutuhan Anda.
                  </h2>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/produk"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#006b3f] transition hover:-translate-y-0.5"
                  >
                    Lihat Produk
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
