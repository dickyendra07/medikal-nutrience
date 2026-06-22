import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BmiCalculator } from "@/components/pages/support-system/BmiCalculator";
import { mednutAssets } from "@/data/mednut-assets";

const features = [
  "Hitung status gizi berdasarkan IMT",
  "Estimasi kebutuhan kalori harian",
  "Arahan awal produk sesuai kondisi",
  "Terhubung ke konsultasi dan apotek resmi",
];

export default function NutritionCalculatorPage() {
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
                Kalkulator Status Gizi
              </p>

              <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-[#111827] md:text-6xl">
                Cek Status Gizi dan Kebutuhan Nutrisi Anda
              </h1>

              <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[#5f6b76] md:text-lg md:leading-9">
                Gunakan kalkulator ini untuk mendapatkan gambaran awal status
                gizi, estimasi kebutuhan kalori harian, dan arahan produk
                Medikal Nutrience yang mungkin relevan dengan kondisi Anda.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl bg-white p-4 shadow-lg shadow-green-900/5 ring-1 ring-black/5"
                  >
                    <p className="text-sm font-black leading-6 text-[#111827]">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal-scale reveal-delay-2">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-5 shadow-2xl shadow-green-900/10 ring-1 ring-black/5 md:p-7">
                <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-[#d9f3e8]" />
                <div className="absolute bottom-[-120px] left-[-80px] h-72 w-72 rounded-full bg-[#e8f8f1]" />

                <div className="relative z-10 overflow-hidden rounded-[2rem] bg-[#006b3f]">
                  <img
                    src={mednutAssets.support.bmiCalculator}
                    alt="Kalkulator status gizi"
                    className="h-[360px] w-full object-cover opacity-90 md:h-[480px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003d28]/90 via-[#003d28]/25 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-white/70">
                      Nutrition Assessment
                    </p>
                    <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight text-white md:text-5xl">
                      Langkah awal memahami kebutuhan tubuh.
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BmiCalculator />
      </main>

      <Footer />
    </>
  );
}
