"use client";

import { useMemo, useState } from "react";
import { mednutAssets } from "@/data/mednut-assets";

const activityFactors = {
  sedentary: {
    label: "Ringan / jarang olahraga",
    factor: 1.2,
  },
  light: {
    label: "Aktivitas ringan 1-3x/minggu",
    factor: 1.375,
  },
  moderate: {
    label: "Aktivitas sedang 3-5x/minggu",
    factor: 1.55,
  },
  active: {
    label: "Aktif 6-7x/minggu",
    factor: 1.725,
  },
};

const conditionOptions = [
  { value: "general", label: "Kebutuhan umum / menjaga kesehatan" },
  { value: "recovery", label: "Pemulihan / pasca sakit" },
  { value: "kidney", label: "Kebutuhan ginjal" },
  { value: "liver", label: "Kebutuhan hati / liver" },
  { value: "respiratory", label: "Kebutuhan pernafasan" },
  { value: "digestive", label: "Kebutuhan pencernaan" },
  { value: "child", label: "Tumbuh kembang anak" },
  { value: "elderly", label: "Dewasa & lansia" },
];

type Gender = "male" | "female";
type Activity = keyof typeof activityFactors;

function getBmiCategory(bmi: number) {
  if (bmi < 18.5) {
    return {
      label: "Berat badan kurang",
      tone: "#d97706",
      message:
        "Tubuh mungkin membutuhkan dukungan energi dan protein yang lebih optimal.",
    };
  }

  if (bmi < 23) {
    return {
      label: "Normal",
      tone: "#006b3f",
      message:
        "Status gizi berada pada rentang normal. Tetap jaga asupan seimbang dan aktivitas fisik.",
    };
  }

  if (bmi < 25) {
    return {
      label: "Berisiko berat badan berlebih",
      tone: "#ca8a04",
      message:
        "Mulai perhatikan pola makan, aktivitas, dan pilihan nutrisi harian.",
    };
  }

  return {
    label: "Berat badan berlebih",
    tone: "#dc2626",
    message:
      "Disarankan mengatur pola makan, aktivitas fisik, dan berkonsultasi dengan tenaga kesehatan.",
  };
}

function getProductRecommendations(condition: string, bmi: number, age: number) {
  if (condition === "kidney") {
    return [
      {
        name: "Nephrisol",
        description: "Dukungan nutrisi untuk kebutuhan ginjal non dialisis.",
        logo: mednutAssets.productLogos.nephrisol,
        image: mednutAssets.packshots.nephrisolCappucino,
        href: "/produk/nephrisol",
      },
      {
        name: "Nephrisol-D",
        description: "Dukungan nutrisi untuk kebutuhan ginjal dialisis.",
        logo: mednutAssets.productLogos.nephrisolD,
        image: mednutAssets.packshots.nephrisolDVanila,
        href: "/produk/nephrisol-d",
      },
    ];
  }

  if (condition === "liver") {
    return [
      {
        name: "Hepatosol",
        description: "Dukungan nutrisi untuk kondisi hati atau liver.",
        logo: mednutAssets.productLogos.hepatosol,
        image: mednutAssets.packshots.hepatosolVanila,
        href: "/produk/hepatosol",
      },
      {
        name: "Hepatosol Lola",
        description: "Dukungan nutrisi untuk kondisi hati dengan kebutuhan spesifik.",
        logo: mednutAssets.productLogos.hepatosolLola,
        image: mednutAssets.packshots.hepatosolLola,
        href: "/produk/hepatosol-lola",
      },
    ];
  }

  if (condition === "respiratory") {
    return [
      {
        name: "Pulmosol",
        description: "Dukungan nutrisi untuk kebutuhan pernafasan.",
        logo: mednutAssets.productLogos.pulmosol,
        image: mednutAssets.packshots.pulmosol,
        href: "/produk/pulmosol",
      },
    ];
  }

  if (condition === "digestive") {
    return [
      {
        name: "Oligo",
        description: "Dukungan nutrisi untuk kebutuhan saluran cerna.",
        logo: mednutAssets.productLogos.oligo,
        image: mednutAssets.packshots.oligo,
        href: "/produk/oligo",
      },
    ];
  }

  if (condition === "child" || age < 13) {
    return [
      {
        name: "Entrakid",
        description: "Nutrisi untuk mendukung tumbuh kembang anak.",
        image: mednutAssets.packshots.entrakidVanila,
        href: "/produk/entrakid",
      },
    ];
  }

  if (condition === "recovery" || bmi < 18.5) {
    return [
      {
        name: "Peptisol",
        description: "Nutrisi tinggi protein untuk membantu kebutuhan pemulihan.",
        logo: mednutAssets.productLogos.peptisol,
        image: mednutAssets.packshots.peptisolVanila,
        href: "/produk/peptisol",
      },
      {
        name: "Entramix",
        description: "Nutrisi lengkap untuk mendukung asupan harian.",
        logo: mednutAssets.productLogos.entramix,
        image: mednutAssets.packshots.entramixVanila,
        href: "/produk/entramix",
      },
    ];
  }

  if (condition === "elderly") {
    return [
      {
        name: "Entramix",
        description: "Nutrisi lengkap untuk kebutuhan dewasa dan lansia.",
        logo: mednutAssets.productLogos.entramix,
        image: mednutAssets.packshots.entramixVanila,
        href: "/produk/entramix",
      },
      {
        name: "Entrasoy",
        description: "Nutrisi protein nabati untuk kebutuhan harian.",
        logo: mednutAssets.productLogos.entrasoy,
        image: mednutAssets.packshots.entrasoy,
        href: "/produk/entrasoy",
      },
    ];
  }

  if (bmi >= 23) {
    return [
      {
        name: "Entrasoy",
        description: "Nutrisi berbasis protein nabati untuk kebutuhan harian.",
        logo: mednutAssets.productLogos.entrasoy,
        image: mednutAssets.packshots.entrasoy,
        href: "/produk/entrasoy",
      },
    ];
  }

  return [
    {
      name: "Entramix",
      description: "Nutrisi lengkap dan seimbang untuk mendukung asupan harian.",
      logo: mednutAssets.productLogos.entramix,
      image: mednutAssets.packshots.entramixVanila,
      href: "/produk/entramix",
    },
    {
      name: "Entrasoy",
      description: "Nutrisi protein nabati untuk kebutuhan harian.",
      logo: mednutAssets.productLogos.entrasoy,
      image: mednutAssets.packshots.entrasoy,
      href: "/produk/entrasoy",
    },
  ];
}

export function BmiCalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("33");
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("65");
  const [activity, setActivity] = useState<Activity>("light");
  const [condition, setCondition] = useState("general");

  const result = useMemo(() => {
    const parsedAge = Number(age);
    const parsedHeight = Number(height);
    const parsedWeight = Number(weight);

    if (!parsedAge || !parsedHeight || !parsedWeight) {
      return null;
    }

    const heightMeter = parsedHeight / 100;
    const bmi = parsedWeight / (heightMeter * heightMeter);
    const category = getBmiCategory(bmi);

    const bmr =
      gender === "male"
        ? 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge + 5
        : 10 * parsedWeight + 6.25 * parsedHeight - 5 * parsedAge - 161;

    const dailyCalories = bmr * activityFactors[activity].factor;
    const idealWeightMin = 18.5 * heightMeter * heightMeter;
    const idealWeightMax = 22.9 * heightMeter * heightMeter;
    const recommendations = getProductRecommendations(
      condition,
      bmi,
      parsedAge
    );

    return {
      bmi,
      category,
      bmr,
      dailyCalories,
      idealWeightMin,
      idealWeightMax,
      recommendations,
    };
  }, [activity, age, condition, gender, height, weight]);

  return (
    <section className="px-5 py-12 md:py-16 lg:px-10">
      <div className="mx-auto grid w-full max-w-[1440px] gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="reveal-left rounded-[2.5rem] bg-white p-6 shadow-xl shadow-slate-900/8 ring-1 ring-black/5 md:p-8 lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#006b3f]">
            Masukkan Data
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight text-[#111827] md:text-4xl">
            Hitung gambaran awal kebutuhan tubuh.
          </h2>

          <div className="mt-7 grid gap-4">
            <div>
              <label className="text-sm font-black text-[#111827]">
                Jenis Kelamin
              </label>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {[
                  { value: "male", label: "Pria" },
                  { value: "female", label: "Wanita" },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setGender(item.value as Gender)}
                    className={`rounded-2xl px-4 py-4 text-sm font-black transition ${
                      gender === item.value
                        ? "bg-[#006b3f] text-white"
                        : "bg-[#f4fbf8] text-[#006b3f] ring-1 ring-black/5"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="text-sm font-black text-[#111827]">
                  Usia
                </label>
                <input
                  type="number"
                  min="1"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 py-4 text-sm font-bold text-[#111827] outline-none focus:border-[#006b3f] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">
                  Tinggi (cm)
                </label>
                <input
                  type="number"
                  min="1"
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                  className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 py-4 text-sm font-bold text-[#111827] outline-none focus:border-[#006b3f] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">
                  Berat (kg)
                </label>
                <input
                  type="number"
                  min="1"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 py-4 text-sm font-bold text-[#111827] outline-none focus:border-[#006b3f] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Aktivitas Harian
              </label>
              <select
                value={activity}
                onChange={(event) => setActivity(event.target.value as Activity)}
                className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 py-4 text-sm font-bold text-[#111827] outline-none focus:border-[#006b3f] focus:bg-white"
              >
                {Object.entries(activityFactors).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Kebutuhan / Kondisi
              </label>
              <select
                value={condition}
                onChange={(event) => setCondition(event.target.value)}
                className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 py-4 text-sm font-bold text-[#111827] outline-none focus:border-[#006b3f] focus:bg-white"
              >
                {conditionOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-[#f4fbf8] p-5">
            <p className="text-sm font-black text-[#111827]">
              Disclaimer
            </p>
            <p className="mt-2 text-sm font-medium leading-7 text-[#6b7280]">
              Hasil kalkulator ini merupakan gambaran awal dan bukan diagnosis
              medis. Untuk kondisi khusus, tetap konsultasikan dengan dokter,
              ahli gizi, atau tenaga kesehatan.
            </p>
          </div>
        </div>

        <div className="reveal-right">
          {result ? (
            <div className="grid gap-5">
              <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-xl shadow-slate-900/8 ring-1 ring-black/5">
                <div className="bg-[#006b3f] p-6 text-white md:p-8">
                  <p className="text-xs font-black uppercase tracking-[0.35em] text-white/70">
                    Hasil Status Gizi
                  </p>

                  <div className="mt-5 grid gap-5 md:grid-cols-[auto_1fr] md:items-end">
                    <div>
                      <p className="text-7xl font-black leading-none">
                        {result.bmi.toFixed(1)}
                      </p>
                      <p className="mt-2 text-sm font-black uppercase tracking-[0.18em] text-white/70">
                        IMT / BMI
                      </p>
                    </div>

                    <div>
                      <span
                        className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-black"
                        style={{ color: result.category.tone }}
                      >
                        {result.category.label}
                      </span>

                      <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/80 md:text-base">
                        {result.category.message}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
                  <div className="rounded-[1.5rem] bg-[#f8fcfa] p-5 ring-1 ring-black/5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6b7280]">
                      Kalori Harian
                    </p>
                    <p className="mt-3 text-3xl font-black text-[#111827]">
                      {Math.round(result.dailyCalories)}
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#6b7280]">
                      kkal / hari
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] bg-[#f8fcfa] p-5 ring-1 ring-black/5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6b7280]">
                      BMR
                    </p>
                    <p className="mt-3 text-3xl font-black text-[#111827]">
                      {Math.round(result.bmr)}
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#6b7280]">
                      kkal / hari
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] bg-[#f8fcfa] p-5 ring-1 ring-black/5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6b7280]">
                      Rentang BB Ideal
                    </p>
                    <p className="mt-3 text-3xl font-black text-[#111827]">
                      {Math.round(result.idealWeightMin)}-
                      {Math.round(result.idealWeightMax)}
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#6b7280]">
                      kg
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2.5rem] bg-white p-6 shadow-xl shadow-slate-900/8 ring-1 ring-black/5 md:p-8">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.35em] text-[#006b3f]">
                      Rekomendasi Awal
                    </p>
                    <h2 className="mt-4 text-3xl font-black leading-tight text-[#111827] md:text-4xl">
                      Produk yang mungkin relevan.
                    </h2>
                  </div>

                  <a
                    href="/kontak"
                    className="inline-flex w-fit items-center justify-center rounded-full bg-[#006b3f] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5"
                  >
                    Konsultasi Lanjutan
                  </a>
                </div>

                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  {result.recommendations.map((product) => (
                    <a
                      key={product.name}
                      href={product.href}
                      className="group overflow-hidden rounded-[2rem] bg-[#f8fcfa] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-green-900/8"
                    >
                      <div className="grid grid-cols-[0.86fr_1.14fr] items-center gap-4 p-5">
                        <div className="rounded-[1.5rem] bg-white p-3 shadow-md shadow-slate-900/5 ring-1 ring-black/5">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="aspect-square w-full object-contain transition duration-500 group-hover:scale-[1.05]"
                          />
                        </div>

                        <div>
                          {"logo" in product && product.logo ? (
                            <img
                              src={product.logo}
                              alt={`${product.name} logo`}
                              className="max-h-12 w-auto max-w-[190px] object-contain"
                            />
                          ) : (
                            <h3 className="text-2xl font-black text-[#006b3f]">
                              {product.name}
                            </h3>
                          )}

                          <p className="mt-3 text-sm font-medium leading-7 text-[#6b7280]">
                            {product.description}
                          </p>

                          <span className="mt-4 inline-flex text-sm font-black text-[#006b3f]">
                            Lihat Produk →
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-[2.5rem] bg-gradient-to-br from-[#006b3f] via-[#087a4c] to-[#10b981] p-8 text-white shadow-2xl shadow-green-900/15">
                <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.35em] text-white/70">
                      Next Step
                    </p>
                    <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
                      Temukan produk di official partner terdekat.
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/80">
                      Setelah memahami gambaran awal kebutuhan tubuh, Anda dapat
                      mencari outlet resmi atau konsultasi untuk arahan lebih lanjut.
                    </p>
                  </div>

                  <a
                    href="/apotek-resmi"
                    className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-black text-[#006b3f]"
                  >
                    Lihat Apotek Resmi
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-[2.5rem] bg-white p-8 text-center shadow-xl shadow-slate-900/8 ring-1 ring-black/5">
              <p className="text-xl font-black text-[#111827]">
                Lengkapi data terlebih dahulu.
              </p>
              <p className="mt-2 text-sm font-medium text-[#6b7280]">
                Masukkan usia, tinggi badan, dan berat badan untuk melihat hasil.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
