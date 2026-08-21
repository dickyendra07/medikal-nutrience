import { getProductBySlug } from "@/data/product-details";

export type AssessmentAnswer = {
  label: string;
  value: string;
  description?: string;
  icon?: string;
  nextQuestion?: string;
  resultId?: string;
  condition?: string;
};

export type AssessmentOption = {
  label: string;
  value: string;
};

export type AssessmentQuestion = {
  id: string;
  eyebrow: string;
  question: string;
  answerLabel: string;
  answers: AssessmentAnswer[];
};

export type AssessmentResult = {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  product: string;
  productSlug: string;
  image: string;
  note: string;
  benefits: string[];
  ctaUrl: string;
};

export type AssessmentAnswerSummary = {
  questionId: string;
  label: string;
  answer: string;
  value: string;
};

export type AssessmentLeadPayload = {
  purpose: string;
  condition?: string;
  answers: Record<string, string>;
  recommendation: AssessmentResult;
  lead?: {
    name: string;
    age: string;
    gender: "male" | "female" | "";
    whatsapp: string;
    educationConsent: boolean;
    communicationConsent: boolean;
  };
  createdAt: string;
};

export const assessmentDisclaimer =
  "Rekomendasi ini bersifat informasi awal dan tidak menggantikan diagnosis, saran medis, atau konsultasi langsung dengan dokter maupun ahli gizi.";

const productImages: Record<string, string> = {
  entrakid:
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRAKID/ENTRAKID VANILA 1.png",
  entramix:
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRAMIX/ENTRAMIX VANILA 1.png",
  entrasoy:
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRASOY PACKSHOOT/ENTRASOY.png",
  peptisol:
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/PEPTISOL/Peptisol Vanila 1.png",
  peptibren:
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/PEPTIBREN/PEPTIBREN VANILA 1.png",
  nephrisol:
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/NEPHRISOL/NEPHRISOL CAPPUCINO 1.png",
  "nephrisol-d":
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/NEPHRISOL-D/NEPHRISOL-D - CAPPUCINO 1.png",
  hepatosol:
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/HEPATOSOL/HEPATOSOL VANILA 1.png",
  "hepatosol-lola":
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/HEPATOSOL LOLA/HEPATOSOL LOLA 1.png",
  pulmosol:
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/PULMOSOL/PULMOSOL 1.png",
  oligo:
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/OLIGO/OLIGO 1.png",
};

function createResult(id: string, productSlug: string): AssessmentResult {
  const product = getProductBySlug(productSlug);

  if (!product) {
    throw new Error(`Assessment product data not found: ${productSlug}`);
  }

  return {
    id,
    title: `Rekomendasi Nutrisi: ${product.name}`,
    description: product.description,
    recommendation: product.name,
    product: product.name,
    productSlug,
    image: productImages[productSlug],
    note: product.description,
    benefits: product.benefits.slice(0, 3),
    ctaUrl: `/produk/${productSlug}`,
  };
}

export const assessmentResults: AssessmentResult[] = [
  createResult("result-peptibren", "peptibren"),
  createResult("result-nephrisol", "nephrisol"),
  createResult("result-nephrisol-d", "nephrisol-d"),
  createResult("result-hepatosol", "hepatosol"),
  createResult("result-hepatosol-lola", "hepatosol-lola"),
  createResult("result-pulmosol", "pulmosol"),
  createResult("result-oligo", "oligo"),
  createResult("result-entrakid", "entrakid"),
  createResult("result-entramix", "entramix"),
  createResult("result-entrasoy", "entrasoy"),
  createResult("result-peptisol", "peptisol"),
];

export const assessmentQuestionList: AssessmentQuestion[] = [
  {
    id: "purpose",
    eyebrow: "Tujuan",
    question: "Apa kebutuhan utama Anda?",
    answerLabel: "Tujuan",
    answers: [
      { label: "Gangguan fungsi organ", value: "condition", description: "Cari arahan awal berdasarkan kondisi tertentu.", icon: "medical", nextQuestion: "condition" },
      { label: "Menjaga kesehatan & daya tahan tubuh", value: "daily-health", description: "Temukan pilihan untuk kebutuhan nutrisi harian.", icon: "shield", nextQuestion: "health-milk" },
      { label: "Tumbuh kembang anak", value: "child", description: "Dukungan nutrisi untuk anak usia 1–12 tahun.", icon: "child", nextQuestion: "child-age" },
      { label: "Masa pemulihan", value: "recovery", description: "Arahan awal setelah sakit atau operasi.", icon: "user", nextQuestion: "recovery-status" },
    ],
  },
  {
    id: "condition",
    eyebrow: "Kondisi",
    question: "Kondisi mana yang paling sesuai?",
    answerLabel: "Kondisi",
    answers: [
      { label: "Stroke / Alzheimer", value: "stroke", icon: "medical", condition: "stroke", nextQuestion: "stroke-swallow" },
      { label: "Ginjal", value: "ginjal", icon: "kidney", condition: "ginjal", nextQuestion: "kidney-dialysis" },
      { label: "Hati / Liver", value: "hati", icon: "liver", condition: "hati", nextQuestion: "liver-severity" },
      { label: "Pernapasan", value: "pernapasan", icon: "lung", condition: "pernapasan", nextQuestion: "respiratory-breath" },
      { label: "Pencernaan", value: "pencernaan", icon: "digestive", condition: "pencernaan", nextQuestion: "digestive-recovery" },
    ],
  },
  {
    id: "stroke-swallow",
    eyebrow: "Kebutuhan",
    question: "Apakah Anda mengalami kesulitan saat makan atau menelan?",
    answerLabel: "Kemampuan makan",
    answers: [
      { label: "Ya", value: "yes", nextQuestion: "stroke-texture" },
      { label: "Tidak", value: "no", nextQuestion: "stroke-energy" },
    ],
  },
  {
    id: "stroke-texture",
    eyebrow: "Pola Asupan",
    question: "Saat ini, bagaimana Anda memenuhi kebutuhan nutrisi harian?",
    answerLabel: "Pola asupan",
    answers: [
      { label: "Makan seperti biasa", value: "regular", resultId: "result-peptibren" },
      { label: "Porsi makan lebih sedikit", value: "smaller", resultId: "result-peptibren" },
      { label: "Mengandalkan makanan lembut atau cair", value: "soft-liquid", resultId: "result-peptibren" },
    ],
  },
  {
    id: "stroke-energy",
    eyebrow: "Kondisi Harian",
    question: "Apakah Anda sering merasa lemas atau kekurangan energi?",
    answerLabel: "Kondisi energi",
    answers: [
      { label: "Ya, sering", value: "often", resultId: "result-peptibren" },
      { label: "Kadang-kadang", value: "sometimes", resultId: "result-peptibren" },
      { label: "Tidak", value: "no", resultId: "result-peptibren" },
    ],
  },
  {
    id: "kidney-dialysis",
    eyebrow: "Kebutuhan Ginjal",
    question: "Apakah Anda saat ini menjalani cuci darah (dialisis)?",
    answerLabel: "Status dialisis",
    answers: [
      { label: "Ya, rutin menjalani dialisis", value: "dialysis", nextQuestion: "kidney-dialysis-intake" },
      { label: "Belum, tetapi memiliki masalah ginjal", value: "non-dialysis", nextQuestion: "kidney-restrictions" },
      { label: "Tidak yakin", value: "unsure", nextQuestion: "kidney-history" },
    ],
  },
  {
    id: "kidney-dialysis-intake",
    eyebrow: "Pola Asupan",
    question: "Bagaimana nafsu makan Anda akhir-akhir ini?",
    answerLabel: "Nafsu makan",
    answers: [
      { label: "Menurun", value: "decreased", resultId: "result-nephrisol-d" },
      { label: "Normal", value: "normal", resultId: "result-nephrisol-d" },
      { label: "Sangat kurang", value: "very-low", resultId: "result-nephrisol-d" },
    ],
  },
  {
    id: "kidney-restrictions",
    eyebrow: "Pola Makan",
    question: "Apakah Anda membatasi makanan tertentu karena kondisi kesehatan?",
    answerLabel: "Pembatasan makanan",
    answers: [
      { label: "Ya, banyak pantangan", value: "many", resultId: "result-nephrisol" },
      { label: "Sedikit membatasi", value: "some", resultId: "result-nephrisol" },
      { label: "Tidak ada pantangan", value: "none", resultId: "result-nephrisol" },
    ],
  },
  {
    id: "kidney-history",
    eyebrow: "Riwayat Kesehatan",
    question: "Apakah Anda memiliki riwayat tekanan darah tinggi atau diabetes?",
    answerLabel: "Riwayat kesehatan",
    answers: [
      { label: "Ya", value: "yes", resultId: "result-nephrisol" },
      { label: "Tidak", value: "no", resultId: "result-nephrisol" },
    ],
  },
  {
    id: "liver-severity",
    eyebrow: "Kebutuhan Hati",
    question: "Bagaimana kondisi hati atau liver Anda saat ini?",
    answerLabel: "Kondisi hati",
    answers: [
      { label: "Gangguan ringan atau kronik", value: "mild", nextQuestion: "liver-appetite" },
      { label: "Gangguan yang cukup berat", value: "severe", nextQuestion: "liver-intake" },
      { label: "Belum yakin", value: "unsure", nextQuestion: "liver-appetite" },
    ],
  },
  {
    id: "liver-appetite",
    eyebrow: "Pola Asupan",
    question: "Bagaimana nafsu makan Anda akhir-akhir ini?",
    answerLabel: "Nafsu makan",
    answers: [
      { label: "Menurun", value: "decreased", resultId: "result-hepatosol" },
      { label: "Normal", value: "normal", resultId: "result-hepatosol" },
      { label: "Sangat kurang", value: "very-low", resultId: "result-hepatosol" },
    ],
  },
  {
    id: "liver-intake",
    eyebrow: "Kebutuhan Harian",
    question: "Apakah Anda mengalami kesulitan memenuhi kebutuhan makan harian?",
    answerLabel: "Pemenuhan asupan",
    answers: [
      { label: "Ya, sangat sulit", value: "very-hard", resultId: "result-hepatosol-lola" },
      { label: "Kadang-kadang sulit", value: "sometimes", resultId: "result-hepatosol-lola" },
      { label: "Tidak", value: "no", resultId: "result-hepatosol-lola" },
    ],
  },
  {
    id: "respiratory-breath",
    eyebrow: "Kebutuhan Pernapasan",
    question: "Apakah Anda mudah merasa sesak atau lelah saat beraktivitas ringan?",
    answerLabel: "Kondisi aktivitas",
    answers: [
      { label: "Ya, sering", value: "often", nextQuestion: "respiratory-meal" },
      { label: "Kadang-kadang", value: "sometimes", nextQuestion: "respiratory-meal" },
      { label: "Tidak", value: "no", nextQuestion: "respiratory-energy" },
    ],
  },
  {
    id: "respiratory-meal",
    eyebrow: "Pola Makan",
    question: "Apakah makan dalam porsi besar membuat napas menjadi tidak nyaman?",
    answerLabel: "Kenyamanan makan",
    answers: [
      { label: "Ya", value: "yes", resultId: "result-pulmosol" },
      { label: "Kadang-kadang", value: "sometimes", resultId: "result-pulmosol" },
      { label: "Tidak", value: "no", resultId: "result-pulmosol" },
    ],
  },
  {
    id: "respiratory-energy",
    eyebrow: "Kondisi Harian",
    question: "Apakah Anda sering merasa cepat lelah atau kehabisan energi?",
    answerLabel: "Kondisi energi",
    answers: [
      { label: "Ya", value: "yes", resultId: "result-pulmosol" },
      { label: "Kadang-kadang", value: "sometimes", resultId: "result-pulmosol" },
      { label: "Tidak", value: "no", resultId: "result-pulmosol" },
    ],
  },
  {
    id: "digestive-recovery",
    eyebrow: "Kebutuhan Pencernaan",
    question: "Apakah Anda sedang dalam masa pemulihan setelah operasi atau tindakan medis pada pencernaan?",
    answerLabel: "Masa pemulihan",
    answers: [
      { label: "Ya", value: "yes", nextQuestion: "digestive-intake" },
      { label: "Tidak", value: "no", nextQuestion: "digestive-digestion" },
    ],
  },
  {
    id: "digestive-intake",
    eyebrow: "Pola Asupan",
    question: "Bagaimana nafsu makan Anda saat ini?",
    answerLabel: "Nafsu makan",
    answers: [
      { label: "Menurun", value: "decreased", resultId: "result-oligo" },
      { label: "Normal", value: "normal", resultId: "result-oligo" },
      { label: "Sangat kurang", value: "very-low", resultId: "result-oligo" },
    ],
  },
  {
    id: "digestive-digestion",
    eyebrow: "Kenyamanan Makan",
    question: "Apakah Anda kesulitan mencerna makanan tertentu?",
    answerLabel: "Kemampuan mencerna",
    answers: [
      { label: "Ya, sering", value: "often", resultId: "result-oligo" },
      { label: "Kadang-kadang", value: "sometimes", resultId: "result-oligo" },
      { label: "Tidak", value: "no", resultId: "result-oligo" },
    ],
  },
  {
    id: "health-milk",
    eyebrow: "Preferensi",
    question: "Apakah Anda nyaman mengonsumsi susu?",
    answerLabel: "Preferensi susu",
    answers: [
      { label: "Ya, nyaman minum susu", value: "milk", condition: "dewasa", nextQuestion: "health-energy" },
      { label: "Tidak, kurang cocok minum susu", value: "soy", condition: "dewasa", nextQuestion: "health-balance" },
    ],
  },
  {
    id: "health-energy",
    eyebrow: "Kondisi Harian",
    question: "Bagaimana kondisi energi Anda dalam menjalani aktivitas sehari-hari?",
    answerLabel: "Kondisi energi",
    answers: [
      { label: "Sering merasa lemas atau cepat lelah", value: "low", resultId: "result-entramix" },
      { label: "Cukup stabil", value: "stable", resultId: "result-entramix" },
      { label: "Baik dan bertenaga", value: "good", resultId: "result-entramix" },
    ],
  },
  {
    id: "health-balance",
    eyebrow: "Pola Asupan",
    question: "Apakah asupan nutrisi harian Anda sudah cukup seimbang?",
    answerLabel: "Keseimbangan asupan",
    answers: [
      { label: "Belum cukup", value: "low", resultId: "result-entrasoy" },
      { label: "Cukup", value: "enough", resultId: "result-entrasoy" },
      { label: "Sudah baik", value: "good", resultId: "result-entrasoy" },
    ],
  },
  {
    id: "child-age",
    eyebrow: "Profil Anak",
    question: "Berapa usia anak?",
    answerLabel: "Usia anak",
    answers: [
      { label: "1–5 tahun", value: "1-5", condition: "anak", nextQuestion: "child-eating" },
      { label: "6–12 tahun", value: "6-12", condition: "anak", nextQuestion: "child-eating" },
    ],
  },
  {
    id: "child-eating",
    eyebrow: "Pola Makan Anak",
    question: "Apakah anak sering susah makan atau pilih-pilih makanan?",
    answerLabel: "Pola makan anak",
    answers: [
      { label: "Susah makan", value: "picky", nextQuestion: "child-growth" },
      { label: "Makan normal", value: "normal", nextQuestion: "child-nutrition" },
    ],
  },
  {
    id: "child-growth",
    eyebrow: "Tumbuh Kembang",
    question: "Apakah berat badan anak sulit naik atau cenderung stagnan?",
    answerLabel: "Perkembangan berat badan",
    answers: [
      { label: "Ya", value: "yes", resultId: "result-entrakid" },
      { label: "Tidak", value: "no", resultId: "result-entrakid" },
    ],
  },
  {
    id: "child-nutrition",
    eyebrow: "Kebutuhan Harian",
    question: "Apakah kebutuhan nutrisi harian anak sudah terpenuhi dengan baik?",
    answerLabel: "Pemenuhan nutrisi anak",
    answers: [
      { label: "Belum", value: "no", resultId: "result-entrakid" },
      { label: "Mungkin belum optimal", value: "maybe", resultId: "result-entrakid" },
      { label: "Sudah cukup", value: "enough", resultId: "result-entrakid" },
    ],
  },
  {
    id: "recovery-status",
    eyebrow: "Masa Pemulihan",
    question: "Apakah Anda sedang dalam masa pemulihan setelah sakit atau operasi?",
    answerLabel: "Status pemulihan",
    answers: [
      { label: "Ya, dalam proses pemulihan", value: "yes", condition: "recovery", nextQuestion: "recovery-appetite" },
      { label: "Tidak", value: "no", nextQuestion: "health-milk" },
    ],
  },
  {
    id: "recovery-appetite",
    eyebrow: "Pola Asupan",
    question: "Bagaimana nafsu makan Anda saat ini?",
    answerLabel: "Nafsu makan",
    answers: [
      { label: "Menurun", value: "decreased", resultId: "result-peptisol" },
      { label: "Normal", value: "normal", resultId: "result-peptisol" },
      { label: "Sangat kurang", value: "very-low", resultId: "result-peptisol" },
    ],
  },
];

export function getAssessmentQuestion(id: string) {
  return assessmentQuestionList.find((question) => question.id === id);
}

export function getAssessmentResult(id: string) {
  return assessmentResults.find((result) => result.id === id);
}

// Compatibility exports keep dormant public UI snapshots type-safe while the
// active assessment uses the question graph above.
export const assessmentPurposeOptions = [
  { label: "Memiliki Gangguan Fungsi Organ", value: "condition", icon: "medical", description: "Cari rekomendasi nutrisi berdasarkan gangguan fungsi organ tertentu." },
  { label: "Menjaga kesehatan", value: "health", icon: "shield", description: "Temukan nutrisi untuk mendukung aktivitas dan kebutuhan harian." },
];

export const healthConditions = [
  { label: "Ginjal", value: "ginjal", icon: "kidney", description: "Dukungan nutrisi untuk kebutuhan pasien dengan kondisi ginjal." },
  { label: "Hati / Liver", value: "hati", icon: "liver", description: "Dukungan nutrisi untuk membantu menjaga fungsi hati." },
  { label: "Pernapasan", value: "pernapasan", icon: "lung", description: "Nutrisi pendukung untuk kebutuhan sistem pernapasan." },
  { label: "Pencernaan", value: "pencernaan", icon: "digestive", description: "Nutrisi yang lebih mudah diserap dan dicerna." },
];

export const healthTargetOptions = [
  { label: "Anak", value: "anak", icon: "child", description: "Mendukung kebutuhan nutrisi untuk tumbuh kembang anak." },
  { label: "Dewasa", value: "dewasa", icon: "user", description: "Mendukung kebutuhan nutrisi dan kesehatan harian." },
];

export const assessmentQuestions: Record<string, { title: string; options: AssessmentOption[] }> = {
  ginjal: { title: "Apakah Anda sedang menjalani dialisis?", options: [{ label: "Ya, sedang menjalani dialisis", value: "dialysis" }, { label: "Tidak menjalani dialisis", value: "no-dialysis" }] },
  hati: { title: "Apa kebutuhan nutrisi Anda?", options: [{ label: "Menjaga kesehatan hati", value: "maintenance" }, { label: "Membutuhkan dukungan lebih spesifik", value: "specific" }] },
  pernapasan: { title: "Apa kebutuhan nutrisi Anda saat ini?", options: [{ label: "Menjaga kesehatan pernapasan", value: "maintenance" }, { label: "Masa pemulihan", value: "recovery" }] },
  pencernaan: { title: "Apa kebutuhan nutrisi Anda?", options: [{ label: "Nutrisi mudah dicerna", value: "easy" }, { label: "Pemulihan setelah tindakan medis", value: "recovery" }] },
  anak: { title: "Apa kebutuhan nutrisi anak saat ini?", options: [{ label: "Mendukung tumbuh kembang anak", value: "entrakid" }] },
  dewasa: { title: "Apa tujuan utama Anda?", options: [{ label: "Menjaga kesehatan harian", value: "entramix" }, { label: "Alternatif tanpa susu sapi", value: "entrasoy" }, { label: "Pemulihan setelah sakit", value: "peptisol" }] },
};

export function getAssessmentRecommendation(condition: string, answer: string) {
  const resultId =
    condition === "ginjal" ? (answer === "dialysis" ? "result-nephrisol-d" : "result-nephrisol")
      : condition === "hati" ? (answer === "specific" ? "result-hepatosol-lola" : "result-hepatosol")
        : condition === "pernapasan" ? "result-pulmosol"
          : condition === "pencernaan" ? "result-oligo"
            : condition === "anak" ? "result-entrakid"
              : answer === "entrasoy" ? "result-entrasoy"
                : answer === "peptisol" ? "result-peptisol"
                  : "result-entramix";

  return getAssessmentResult(resultId) ?? assessmentResults[0];
}
