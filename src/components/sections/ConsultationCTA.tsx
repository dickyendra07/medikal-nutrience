export function ConsultationCTA() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#006b3f] text-white shadow-2xl shadow-green-900/20">
        <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div className="p-8 md:p-14">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#b7f7d0]">
              Konsultasi Nutrisi
            </p>

            <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight md:text-5xl">
              Bingung memilih produk nutrisi yang sesuai?
            </h2>

            <p className="mt-5 max-w-2xl leading-8 text-white/80">
              Konsultasikan kebutuhan Anda dan dapatkan arahan awal untuk
              menemukan pilihan nutrisi yang lebih tepat.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/kontak"
                className="inline-flex rounded-full bg-white px-7 py-4 text-sm font-black text-[#006b3f] shadow-xl shadow-black/10"
              >
                Konsultasi Sekarang
              </a>

              <a
                href="/produk"
                className="inline-flex rounded-full border border-white/20 px-7 py-4 text-sm font-black text-white"
              >
                Lihat Produk
              </a>
            </div>
          </div>

          <div className="relative min-h-[340px] bg-[#005432] p-8">
            <div className="absolute right-[-60px] top-[-60px] h-48 w-48 rounded-full bg-white/10" />
            <div className="absolute bottom-[-80px] left-[-80px] h-56 w-56 rounded-full bg-white/10" />

            <div className="relative flex h-full min-h-[280px] items-center justify-center">
              <div className="rounded-[2rem] bg-white/10 p-8 text-center backdrop-blur">
                <p className="text-5xl font-black">24/7</p>
                <p className="mt-3 text-sm font-semibold leading-6 text-white/80">
                  Akses informasi produk, solusi nutrisi, dan kanal resmi
                  Medikal Nutrience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
