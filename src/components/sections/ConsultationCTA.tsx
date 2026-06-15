export function ConsultationCTA() {
  return (
    <section className="bg-[#f4fbf8] px-5 py-20 lg:px-10 md:py-24">
      <div className="mx-auto w-full max-w-[1520px]">
        <div className="relative overflow-hidden rounded-[1.8rem] bg-[#006b3f] shadow-2xl shadow-green-900/15 reveal-scale lg:rounded-[2.5rem]">
          <div className="absolute right-[-80px] top-[-90px] h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute bottom-[-110px] left-[45%] h-72 w-72 rounded-full bg-white/10" />
          <div className="absolute bottom-0 right-0 top-0 hidden w-[45%] bg-gradient-to-l from-[#005837]/60 to-transparent lg:block" />

          <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="p-8 text-white md:p-12 lg:p-16">
              <p className="text-sm font-black uppercase tracking-[0.35em] text-[#b7f7d0]">
                Konsultasi Nutrisi
              </p>

              <h2 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Bingung memilih produk nutrisi yang sesuai?
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
                Konsultasikan kebutuhan Anda dan dapatkan arahan awal untuk
                menemukan pilihan nutrisi yang lebih tepat.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="/kontak"
                  className="inline-flex rounded-full bg-white px-8 py-4 text-sm font-black text-[#006b3f] shadow-xl shadow-black/10 transition hover:-translate-y-1"
                >
                  Konsultasi Sekarang
                </a>

                <a
                  href="/produk"
                  className="inline-flex rounded-full border border-white/25 bg-white/5 px-8 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white/10"
                >
                  Lihat Produk
                </a>
              </div>
            </div>

            <div className="relative hidden min-h-[260px] items-center justify-center overflow-hidden px-2 pb-4 lg:flex lg:min-h-[500px] lg:px-4 lg:py-4">
              <img
                src="/images/support/konsultasi.png"
                alt="Konsultasi nutrisi Medikal Nutrience"
                className="relative z-10 h-auto w-[118%] max-w-none object-contain drop-shadow-2xl transition duration-500 hover:scale-[1.02] lg:w-[125%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
