import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const contactItems = [
  {
    label: "Email",
    value: "info@medikalnutrience.com",
    description: "Untuk pertanyaan umum, kerja sama, dan informasi produk.",
  },
  {
    label: "Konsultasi",
    value: "Konsultasi Nutrisi",
    description: "Diskusikan kebutuhan nutrisi Anda bersama tim Medikal Nutrience.",
  },
  {
    label: "Apotek",
    value: "Apotek Resmi",
    description: "Temukan produk Medikal Nutrience melalui kanal resmi.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#f4fbf8]">
        <section className="relative overflow-hidden px-5 py-12 md:py-16 lg:px-10">
          <div className="absolute left-[-180px] top-[-180px] h-[380px] w-[380px] rounded-full bg-[#d9f3e8]" />
          <div className="absolute bottom-[-220px] right-[-160px] h-[440px] w-[440px] rounded-full bg-[#c6f1df]" />

          <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="reveal-left">
              <p className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-[#006b3f] shadow-lg shadow-green-900/8 ring-1 ring-black/5">
                Kontak Medikal Nutrience
              </p>

              <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[1.04] tracking-tight text-[#111827] md:text-6xl">
                Bingung Memilih Produk Nutrisi yang Sesuai?
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-[#5f6b76] md:text-lg md:leading-9">
                Hubungi tim Medikal Nutrience untuk mendapatkan informasi produk,
                rekomendasi awal, dan arahan kanal pembelian resmi sesuai kebutuhan Anda.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {contactItems.map((item) => (
                  <div
                    key={item.label}
                    className="min-w-0 rounded-[1.5rem] bg-white p-5 shadow-xl shadow-green-900/8 ring-1 ring-black/5"
                  >
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#006b3f]">
                      {item.label}
                    </p>

                    <h3 className="mt-3 break-words text-base font-black leading-tight text-[#111827] md:text-lg">
                      {item.value}
                    </h3>

                    <p className="mt-2 text-sm font-medium leading-6 text-[#6b7280]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden min-h-[470px] items-center justify-center lg:flex reveal-scale reveal-delay-2">
              <div className="absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9f3e8]" />
              <div className="absolute left-[18%] top-[18%] h-28 w-28 rounded-full bg-white/70 blur-2xl" />
              <div className="absolute bottom-[15%] right-[12%] h-36 w-36 rounded-full bg-[#7de0b3]/30 blur-2xl" />

              <img
                src="/images/support/konsultasi.png"
                alt="Konsultasi nutrisi Medikal Nutrience"
                className="relative z-10 h-auto w-full max-w-[560px] object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 lg:px-10">
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="rounded-[2rem] bg-[#006b3f] p-7 text-white shadow-2xl shadow-green-900/15 md:p-9 reveal-left">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-white/70">
                Informasi
              </p>

              <h2 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                Kanal Resmi untuk Konsultasi dan Pertanyaan Produk
              </h2>

              <p className="mt-5 text-sm font-medium leading-7 text-white/80 md:text-base md:leading-8">
                Silakan isi form konsultasi atau gunakan kanal resmi yang tersedia.
                Tim kami akan membantu mengarahkan kebutuhan nutrisi Anda sesuai
                informasi yang diberikan.
              </p>

              <div className="mt-8 space-y-4">
                <InfoRow
                  title="Jam Operasional"
                  value="Senin - Jumat, 09.00 - 17.00 WIB"
                />
                <InfoRow
                  title="Jenis Bantuan"
                  value="Informasi produk, apotek resmi, dan konsultasi awal"
                />
                <InfoRow
                  title="Catatan"
                  value="Rekomendasi bersifat informasi awal dan bukan pengganti konsultasi dokter."
                />
              </div>

              <a
                href="/apotek-resmi"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-black text-[#006b3f] transition hover:-translate-y-0.5"
              >
                Lihat Apotek Resmi
                <span>→</span>
              </a>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-900/8 ring-1 ring-black/5 md:p-8 reveal-right">
              <div className="flex flex-col gap-2 border-b border-black/5 pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
                    Form Konsultasi
                  </p>

                  <h2 className="mt-4 text-3xl font-black leading-tight text-[#111827] md:text-4xl">
                    Kirim kebutuhan nutrisi Anda
                  </h2>
                </div>

                <span className="w-fit rounded-full bg-[#eaf8f1] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#006b3f]">
                  Respon Tim
                </span>
              </div>

              <form className="mt-7 grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Nama Lengkap" placeholder="Masukkan nama lengkap" />
                  <Field label="Nomor WhatsApp" placeholder="Contoh: 0812xxxxxxx" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Email" placeholder="nama@email.com" />

                  <div>
                    <label className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-[#006b3f]">
                      Kebutuhan
                    </label>
                    <select className="h-[52px] w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 text-sm font-semibold text-[#111827] outline-none transition focus:border-[#006b3f] focus:bg-white focus:ring-4 focus:ring-[#006b3f]/10">
                      <option>Pilih kebutuhan nutrisi</option>
                      <option>Ginjal</option>
                      <option>Hati / Liver</option>
                      <option>Pernafasan</option>
                      <option>Pencernaan</option>
                      <option>Pemulihan</option>
                      <option>Anak</option>
                      <option>Dewasa / Lansia</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-[#006b3f]">
                    Pesan
                  </label>
                  <textarea
                    placeholder="Ceritakan kebutuhan atau pertanyaan Anda"
                    rows={5}
                    className="w-full resize-none rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 py-4 text-sm font-semibold text-[#111827] outline-none transition placeholder:text-[#9ca3af] focus:border-[#006b3f] focus:bg-white focus:ring-4 focus:ring-[#006b3f]/10"
                  />
                </div>

                <button
                  type="button"
                  className="mt-2 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#006b3f] px-6 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-[#005635]"
                >
                  Kirim Konsultasi
                  <span>→</span>
                </button>

                <p className="text-center text-xs font-medium leading-6 text-[#6b7280]">
                  Dengan mengirim form ini, Anda menyetujui untuk dihubungi oleh
                  tim Medikal Nutrience terkait informasi produk dan konsultasi awal.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function InfoRow({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-white/55">
        {title}
      </p>
      <p className="mt-2 text-sm font-bold leading-6 text-white">{value}</p>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-[#006b3f]">
        {label}
      </label>
      <input
        placeholder={placeholder}
        className="h-[52px] w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 text-sm font-semibold text-[#111827] outline-none transition placeholder:text-[#9ca3af] focus:border-[#006b3f] focus:bg-white focus:ring-4 focus:ring-[#006b3f]/10"
      />
    </div>
  );
}
