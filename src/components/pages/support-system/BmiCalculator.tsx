"use client";

import { useMemo, useState } from "react";

type Gender = "male" | "female";
type CalculatorMode = "bmi" | "calorie";

const activities = [
  {
    label: "Jarang / Tidak Pernah",
    value: 1.2,
    description: "Aktivitas harian ringan atau sangat minim olahraga.",
  },
  {
    label: "Olahraga Ringan",
    value: 1.375,
    description: "Aktivitas ringan sekitar 1–3 hari per minggu.",
  },
  {
    label: "Sedang",
    value: 1.55,
    description: "Olahraga atau aktivitas sedang 3–5 hari per minggu.",
  },
  {
    label: "Berat",
    value: 1.725,
    description: "Olahraga intens 6–7 hari per minggu.",
  },
  {
    label: "Ekstrem",
    value: 1.9,
    description: "Aktivitas fisik berat atau atlet profesional.",
  },
];

export function BmiCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("bmi");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState(1.2);

  const bmiResult = useMemo(() => {
    const h = Number(height) / 100;
    const w = Number(weight);

    if (!h || !w || h <= 0 || w <= 0) return null;

    const bmi = w / (h * h);

    let category = "Normal";
    let note = "Pertahankan pola makan seimbang dan aktivitas fisik rutin.";
    let color = "#006b3f";

    if (bmi < 18.5) {
      category = "Berat badan kurang";
      note =
        "Pertimbangkan dukungan nutrisi dan konsultasi ahli gizi untuk membantu memenuhi kebutuhan harian.";
      color = "#f59e0b";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Berat badan berlebih";
      note =
        "Perhatikan pola makan, aktivitas harian, dan pilihan nutrisi yang lebih sesuai.";
      color = "#ea580c";
    } else if (bmi >= 30) {
      category = "Obesitas";
      note =
        "Sebaiknya konsultasikan kondisi dan kebutuhan nutrisi Anda dengan tenaga kesehatan.";
      color = "#dc2626";
    }

    return {
      bmi: bmi.toFixed(1),
      category,
      note,
      color,
    };
  }, [height, weight]);

  const calorieResult = useMemo(() => {
    const h = Number(height);
    const w = Number(weight);
    const a = Number(age);

    if (!h || !w || !a || h <= 0 || w <= 0 || a <= 0) return null;

    const bmr =
      gender === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = Math.round(bmr * activity);

    return {
      bmr: Math.round(bmr),
      tdee,
    };
  }, [height, weight, age, gender, activity]);

  return (
    <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-green-900/5 ring-1 ring-black/5">
      <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="bg-[#006b3f] p-8 text-white md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#b7f7d0]">
            Resources Kesehatan
          </p>

          <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
            Peta Jalan Nutrisi Pribadi Anda
          </h2>

          <p className="mt-5 text-sm leading-8 text-white/80">
            Keseimbangan adalah kunci. Gunakan kalkulator ini untuk memahami
            status gizi dan perkiraan kebutuhan kalori harian Anda.
          </p>

          <div className="mt-8 grid gap-3">
            <button
              type="button"
              onClick={() => setMode("bmi")}
              className={`rounded-2xl px-5 py-4 text-left text-sm font-black transition ${
                mode === "bmi"
                  ? "bg-white text-[#006b3f]"
                  : "bg-white/10 text-white hover:bg-white/15"
              }`}
            >
              Hitung BMI / IMT
            </button>

            <button
              type="button"
              onClick={() => setMode("calorie")}
              className={`rounded-2xl px-5 py-4 text-left text-sm font-black transition ${
                mode === "calorie"
                  ? "bg-white text-[#006b3f]"
                  : "bg-white/10 text-white hover:bg-white/15"
              }`}
            >
              Hitung Kebutuhan Kalori
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#006b3f]">
              {mode === "bmi"
                ? "Kalkulator Status Gizi"
                : "Kalkulator Kalori Harian"}
            </p>

            <h3 className="mt-3 text-3xl font-black leading-tight text-[#0f172a] md:text-4xl">
              {mode === "bmi"
                ? "Kalkulator BMI (IMT)"
                : "Kalkulator Kalori Harian"}
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#64748b]">
              {mode === "bmi"
                ? "Hitung Indeks Massa Tubuh untuk mendapatkan gambaran awal status gizi berdasarkan tinggi dan berat badan."
                : "Hitung perkiraan kalori harian tubuh Anda berdasarkan data tubuh dan tingkat aktivitas."}
            </p>
          </div>

          <div className="mt-7 grid gap-5">
            <div>
              <label className="mb-3 block text-sm font-black text-[#0f172a]">
                Apa Jenis Kelaminmu?
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`rounded-2xl border px-5 py-4 text-sm font-black transition ${
                    gender === "male"
                      ? "border-[#006b3f] bg-[#e4f8ed] text-[#006b3f]"
                      : "border-black/10 bg-[#f8fafc] text-[#334155]"
                  }`}
                >
                  Laki-laki
                </button>

                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`rounded-2xl border px-5 py-4 text-sm font-black transition ${
                    gender === "female"
                      ? "border-[#006b3f] bg-[#e4f8ed] text-[#006b3f]"
                      : "border-black/10 bg-[#f8fafc] text-[#334155]"
                  }`}
                >
                  Perempuan
                </button>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <NumberField
                label="Usia"
                suffix="Thn"
                value={age}
                onChange={setAge}
                placeholder="30"
              />

              <NumberField
                label="Tinggi Badan"
                suffix="Cm"
                value={height}
                onChange={setHeight}
                placeholder="170"
              />

              <NumberField
                label="Berat Badan"
                suffix="Kg"
                value={weight}
                onChange={setWeight}
                placeholder="65"
              />
            </div>

            {mode === "calorie" ? (
              <div>
                <label className="mb-3 block text-sm font-black text-[#0f172a]">
                  Seberapa Sering Kamu Berolahraga?
                </label>

                <div className="grid gap-3">
                  {activities.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setActivity(item.value)}
                      className={`rounded-2xl border px-5 py-4 text-left transition ${
                        activity === item.value
                          ? "border-[#006b3f] bg-[#e4f8ed]"
                          : "border-black/10 bg-[#f8fafc] hover:border-[#006b3f]/30"
                      }`}
                    >
                      <span className="block text-sm font-black text-[#0f172a]">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-[#64748b]">
                        {item.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <ResultPanel
              mode={mode}
              bmiResult={bmiResult}
              calorieResult={calorieResult}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NumberField({
  label,
  suffix,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  suffix: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-[#006b3f]">
        {label}
      </label>
      <div className="flex rounded-2xl border border-black/10 bg-[#f8fafc] px-5 py-4">
        <input
          type="number"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm font-bold outline-none"
        />
        <span className="text-sm font-black text-[#64748b]">{suffix}</span>
      </div>
    </div>
  );
}

function ResultPanel({
  mode,
  bmiResult,
  calorieResult,
}: {
  mode: CalculatorMode;
  bmiResult: {
    bmi: string;
    category: string;
    note: string;
    color: string;
  } | null;
  calorieResult: {
    bmr: number;
    tdee: number;
  } | null;
}) {
  if (mode === "bmi") {
    return (
      <div className="rounded-[2rem] bg-[#f4fbf8] p-6">
        {bmiResult ? (
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#006b3f]">
              Hasil BMI Anda
            </p>
            <p className="mt-3 text-5xl font-black text-[#0f172a]">
              {bmiResult.bmi}
            </p>
            <p
              className="mt-3 text-xl font-black"
              style={{ color: bmiResult.color }}
            >
              Status Gizi Anda: {bmiResult.category}
            </p>
            <p className="mt-3 text-sm leading-7 text-[#64748b]">
              {bmiResult.note}
            </p>
          </div>
        ) : (
          <EmptyResult message="Mohon lengkapi usia, tinggi, berat badan, dan pilih jenis kelamin untuk melihat hasil BMI." />
        )}
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] bg-[#f4fbf8] p-6">
      {calorieResult ? (
        <div>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#006b3f]">
            Kebutuhan Kalori Anda
          </p>
          <p className="mt-3 text-5xl font-black text-[#0f172a]">
            {calorieResult.tdee}
          </p>
          <p className="mt-3 text-xl font-black text-[#006b3f]">
            Kkal / Hari
          </p>
          <p className="mt-3 text-sm leading-7 text-[#64748b]">
            Ini adalah perkiraan energi yang dibutuhkan tubuh Anda untuk
            mempertahankan berat badan saat ini. Estimasi BMR Anda sekitar{" "}
            <strong>{calorieResult.bmr} kkal/hari</strong>.
          </p>
        </div>
      ) : (
        <EmptyResult message="Mohon lengkapi usia, tinggi, berat badan, jenis kelamin, dan aktivitas untuk melihat kebutuhan kalori harian." />
      )}
    </div>
  );
}

function EmptyResult({ message }: { message: string }) {
  return (
    <div>
      <p className="text-xl font-black text-[#0f172a]">
        Data belum lengkap
      </p>
      <p className="mt-3 text-sm leading-7 text-[#64748b]">{message}</p>
      <p className="mt-5 text-xs leading-6 text-[#64748b]">
        Catatan: Kalkulator ini hanya memberikan gambaran awal dan tidak
        menggantikan diagnosis atau konsultasi dengan dokter/ahli gizi.
      </p>
    </div>
  );
}
