export type AssessmentOption = {
  label: string;
  value: string;
};

export type AssessmentQuestion = {
  id: string;
  title: string;
  options: AssessmentOption[];
};

export type AssessmentFlow = {
  key: string;
  label: string;
  icon: string;
  description: string;
  product: string;
  productSlug: string;
  productNote: string;
  theme: {
    primary: string;
    soft: string;
    gradient: string;
  };
  questions: AssessmentQuestion[];
};

export type AssessmentLeadPayload = {
  flowKey: string;
  flowLabel: string;
  recommendedProduct: string;
  recommendedProductSlug: string;
  answers: Record<string, string>;
  createdAt: string;
};

export const assessmentDisclaimer =
  "Rekomendasi ini bersifat informasi awal dan tidak dimaksudkan untuk menggantikan diagnosis, saran medis, atau konsultasi langsung dengan dokter/ahli gizi. Untuk kondisi kesehatan khusus, konsultasikan kebutuhan nutrisi Anda dengan tenaga kesehatan profesional.";

export const assessmentFlows: AssessmentFlow[] = [
  {
    key: "stroke-alzheimer",
    label: "Stroke / Alzheimer",
    icon: "🧠",
    description: "Dukungan nutrisi untuk kondisi kesulitan makan, menelan, atau penurunan asupan harian.",
    product: "PEPTIBREN",
    productSlug: "peptibren",
    productNote: "Rekomendasi awal untuk dukungan nutrisi stroke/alzheimer.",
    theme: {
      primary: "#2563eb",
      soft: "#eff6ff",
      gradient: "from-[#1e3a8a] to-[#60a5fa]",
    },
    questions: [
      {
        id: "swallow",
        title: "Apakah Anda mengalami kesulitan saat makan atau menelan?",
        options: [
          { label: "Ya", value: "yes" },
          { label: "Tidak", value: "no" },
        ],
      },
      {
        id: "appetite",
        title: "Bagaimana nafsu makan Anda akhir-akhir ini?",
        options: [
          { label: "Menurun", value: "low" },
          { label: "Normal", value: "normal" },
          { label: "Sangat kurang", value: "very-low" },
        ],
      },
      {
        id: "energy",
        title: "Apakah Anda sering merasa lemas atau kekurangan energi?",
        options: [
          { label: "Ya, sering", value: "often" },
          { label: "Kadang-kadang", value: "sometimes" },
          { label: "Tidak", value: "no" },
        ],
      },
      {
        id: "weight",
        title: "Apakah berat badan Anda menurun dalam beberapa waktu terakhir?",
        options: [
          { label: "Ya", value: "yes" },
          { label: "Tidak", value: "no" },
          { label: "Tidak yakin", value: "unsure" },
        ],
      },
      {
        id: "intake",
        title: "Saat ini, bagaimana Anda memenuhi kebutuhan nutrisi harian?",
        options: [
          { label: "Makan seperti biasa", value: "normal-food" },
          { label: "Porsi makan lebih sedikit", value: "less-food" },
          { label: "Mengandalkan cairan / makanan lembut", value: "soft-liquid" },
        ],
      },
    ],
  },
  {
    key: "ginjal",
    label: "Ginjal",
    icon: "🩺",
    description: "Membedakan kebutuhan nutrisi ginjal pra-dialisis dan dialisis.",
    product: "NEPHRISOL",
    productSlug: "nephrisol",
    productNote: "Jika sedang dialisis, rekomendasi akan diarahkan ke Nephrisol-D.",
    theme: {
      primary: "#7e22ce",
      soft: "#f5f3ff",
      gradient: "from-[#581c87] to-[#a855f7]",
    },
    questions: [
      {
        id: "dialysis",
        title: "Apakah Anda saat ini menjalani cuci darah (dialisis)?",
        options: [
          { label: "Ya, rutin menjalani dialisis", value: "dialysis" },
          { label: "Belum, tapi memiliki masalah ginjal", value: "pre-dialysis" },
          { label: "Tidak yakin", value: "unsure" },
        ],
      },
      {
        id: "history",
        title: "Apakah Anda memiliki riwayat tekanan darah tinggi atau diabetes?",
        options: [
          { label: "Ya", value: "yes" },
          { label: "Tidak ada", value: "no" },
        ],
      },
      {
        id: "appetite",
        title: "Bagaimana nafsu makan Anda akhir-akhir ini?",
        options: [
          { label: "Menurun", value: "low" },
          { label: "Normal", value: "normal" },
          { label: "Sangat kurang", value: "very-low" },
        ],
      },
      {
        id: "energy",
        title: "Apakah Anda sering merasa lemas atau cepat lelah?",
        options: [
          { label: "Ya, sering", value: "often" },
          { label: "Kadang-kadang", value: "sometimes" },
          { label: "Tidak", value: "no" },
        ],
      },
      {
        id: "restriction",
        title: "Apakah Anda saat ini membatasi makanan tertentu karena kondisi kesehatan?",
        options: [
          { label: "Ya, banyak pantangan", value: "many" },
          { label: "Sedikit membatasi", value: "some" },
          { label: "Tidak ada pantangan", value: "none" },
        ],
      },
    ],
  },
  {
    key: "hati",
    label: "Hati / Liver",
    icon: "❤️",
    description: "Dukungan nutrisi untuk gangguan fungsi hati kronik hingga kondisi hati berat.",
    product: "HEPATOSOL",
    productSlug: "hepatosol",
    productNote: "Jika kondisi hati cukup berat, rekomendasi akan diarahkan ke Hepatosol Lola.",
    theme: {
      primary: "#ef1f2d",
      soft: "#fff1f2",
      gradient: "from-[#991b1b] to-[#fb7185]",
    },
    questions: [
      {
        id: "liver-condition",
        title: "Bagaimana kondisi hati/liver Anda saat ini?",
        options: [
          { label: "Gangguan hati/liver ringan / kronik", value: "chronic" },
          { label: "Gangguan hati/liver yang cukup berat", value: "severe" },
        ],
      },
      {
        id: "symptom",
        title: "Apakah Anda mengalami gejala seperti mudah lelah, mual, atau perut terasa tidak nyaman?",
        options: [
          { label: "Ya, sering", value: "often" },
          { label: "Kadang-kadang", value: "sometimes" },
          { label: "Tidak", value: "no" },
        ],
      },
      {
        id: "appetite",
        title: "Bagaimana nafsu makan Anda akhir-akhir ini?",
        options: [
          { label: "Menurun", value: "low" },
          { label: "Normal", value: "normal" },
          { label: "Sangat kurang", value: "very-low" },
        ],
      },
      {
        id: "activity",
        title: "Apakah Anda merasa tubuh semakin lemah atau sulit beraktivitas?",
        options: [
          { label: "Ya", value: "yes" },
          { label: "Sedikit", value: "some" },
          { label: "Tidak", value: "no" },
        ],
      },
      {
        id: "daily-intake",
        title: "Apakah Anda mengalami kesulitan dalam memenuhi kebutuhan makan harian?",
        options: [
          { label: "Ya, sangat sulit", value: "hard" },
          { label: "Kadang-kadang sulit", value: "sometimes" },
          { label: "Tidak", value: "no" },
        ],
      },
    ],
  },
  {
    key: "pencernaan",
    label: "Pencernaan",
    icon: "🥣",
    description: "Solusi cepat serap untuk kebutuhan nutrisi saluran cerna.",
    product: "OLIGO",
    productSlug: "oligo",
    productNote: "Rekomendasi awal untuk dukungan nutrisi saluran cerna.",
    theme: {
      primary: "#d85b70",
      soft: "#fff1f2",
      gradient: "from-[#be4560] to-[#fda4af]",
    },
    questions: [
      {
        id: "operation",
        title: "Apakah Anda sedang dalam masa pemulihan setelah operasi atau tindakan medis pada pencernaan?",
        options: [
          { label: "Ya", value: "yes" },
          { label: "Tidak", value: "no" },
        ],
      },
      {
        id: "digest",
        title: "Apakah Anda kesulitan mencerna makanan tertentu?",
        options: [
          { label: "Ya, sering", value: "often" },
          { label: "Kadang-kadang", value: "sometimes" },
          { label: "Tidak", value: "no" },
        ],
      },
      {
        id: "bloating",
        title: "Apakah Anda sering merasa kembung atau tidak nyaman setelah makan?",
        options: [
          { label: "Ya", value: "yes" },
          { label: "Kadang-kadang", value: "sometimes" },
          { label: "Tidak", value: "no" },
        ],
      },
      {
        id: "appetite",
        title: "Bagaimana nafsu makan Anda saat ini?",
        options: [
          { label: "Menurun", value: "low" },
          { label: "Normal", value: "normal" },
          { label: "Sangat kurang", value: "very-low" },
        ],
      },
      {
        id: "energy",
        title: "Apakah Anda merasa tubuh mudah lemas karena sulit makan atau mencerna makanan?",
        options: [
          { label: "Ya", value: "yes" },
          { label: "Kadang-kadang", value: "sometimes" },
          { label: "Tidak", value: "no" },
        ],
      },
    ],
  },
  {
    key: "daya-tahan",
    label: "Jaga Kesehatan & Daya Tahan Tubuh",
    icon: "🛡️",
    description: "Membedakan kebutuhan nutrisi harian berbasis susu atau protein nabati.",
    product: "ENTRAMIX",
    productSlug: "entramix",
    productNote: "Jika kurang cocok minum susu, rekomendasi akan diarahkan ke Entrasoy.",
    theme: {
      primary: "#006b3f",
      soft: "#e4f8ed",
      gradient: "from-[#006b3f] to-[#10b981]",
    },
    questions: [
      {
        id: "milk",
        title: "Apakah Anda nyaman mengonsumsi susu?",
        options: [
          { label: "Ya, nyaman minum susu", value: "milk-ok" },
          { label: "Tidak, kurang cocok minum susu", value: "milk-no" },
        ],
      },
      {
        id: "energy",
        title: "Bagaimana kondisi energi Anda dalam menjalani aktivitas sehari-hari?",
        options: [
          { label: "Sering merasa lemas / cepat lelah", value: "low" },
          { label: "Cukup stabil", value: "stable" },
          { label: "Baik dan bertenaga", value: "good" },
        ],
      },
      {
        id: "nutrition",
        title: "Apakah Anda merasa asupan nutrisi harian sudah cukup seimbang?",
        options: [
          { label: "Belum cukup", value: "not-enough" },
          { label: "Cukup", value: "enough" },
          { label: "Sudah baik", value: "good" },
        ],
      },
      {
        id: "diet",
        title: "Seberapa teratur Anda dalam menjaga pola makan setiap hari?",
        options: [
          { label: "Tidak teratur", value: "irregular" },
          { label: "Cukup teratur", value: "regular" },
          { label: "Sangat teratur", value: "very-regular" },
        ],
      },
      {
        id: "immune",
        title: "Apakah Anda mudah sakit atau merasa daya tahan tubuh menurun?",
        options: [
          { label: "Ya, cukup sering", value: "often" },
          { label: "Kadang-kadang", value: "sometimes" },
          { label: "Tidak", value: "no" },
        ],
      },
    ],
  },
  {
    key: "pernapasan",
    label: "Pernapasan",
    icon: "🫁",
    description: "Solusi nutrisi untuk PPOK, asma, pneumonia, dan TB paru.",
    product: "PULMOSOL",
    productSlug: "pulmosol",
    productNote: "Rekomendasi awal untuk dukungan nutrisi masalah pernapasan.",
    theme: {
      primary: "#1e3a8a",
      soft: "#eff6ff",
      gradient: "from-[#172554] to-[#2563eb]",
    },
    questions: [
      {
        id: "breath",
        title: "Apakah Anda mudah merasa sesak atau lelah saat beraktivitas ringan?",
        options: [
          { label: "Ya, sering", value: "often" },
          { label: "Kadang-kadang", value: "sometimes" },
          { label: "Tidak", value: "no" },
        ],
      },
      {
        id: "energy",
        title: "Apakah Anda sering merasa cepat lelah atau kehabisan energi?",
        options: [
          { label: "Ya", value: "yes" },
          { label: "Kadang-kadang", value: "sometimes" },
          { label: "Tidak", value: "no" },
        ],
      },
      {
        id: "appetite",
        title: "Bagaimana nafsu makan Anda akhir-akhir ini?",
        options: [
          { label: "Menurun", value: "low" },
          { label: "Normal", value: "normal" },
          { label: "Sangat kurang", value: "very-low" },
        ],
      },
      {
        id: "portion",
        title: "Apakah makan dalam porsi besar membuat napas menjadi tidak nyaman?",
        options: [
          { label: "Ya", value: "yes" },
          { label: "Kadang-kadang", value: "sometimes" },
          { label: "Tidak", value: "no" },
        ],
      },
      {
        id: "activity",
        title: "Apakah kondisi pernapasan mempengaruhi aktivitas sehari-hari?",
        options: [
          { label: "Ya, sangat terasa", value: "high" },
          { label: "Sedikit terganggu", value: "medium" },
          { label: "Tidak terlalu", value: "low" },
        ],
      },
    ],
  },
  {
    key: "anak",
    label: "Anak / Tumbuh Kembang",
    icon: "🧒",
    description: "Dukungan nutrisi anak untuk picky eater, berat badan, dan tumbuh kembang.",
    product: "ENTRAKID",
    productSlug: "entrakid",
    productNote: "Rekomendasi awal untuk mendukung tumbuh kembang anak.",
    theme: {
      primary: "#13a8c5",
      soft: "#e7f9fd",
      gradient: "from-[#13a8c5] to-[#087f9b]",
    },
    questions: [
      {
        id: "age",
        title: "Berapa usia anak?",
        options: [
          { label: "1–5 tahun", value: "1-5" },
          { label: "6–12 tahun", value: "6-12" },
        ],
      },
      {
        id: "picky",
        title: "Apakah anak sering susah makan atau pilih-pilih makanan?",
        options: [
          { label: "Susah makan", value: "picky" },
          { label: "Makan normal", value: "normal" },
        ],
      },
      {
        id: "weight",
        title: "Apakah berat badan anak sulit naik atau cenderung stagnan?",
        options: [
          { label: "Ya", value: "yes" },
          { label: "Tidak", value: "no" },
        ],
      },
      {
        id: "main-goal",
        title: "Apa kebutuhan utama anak Bapak/Ibu saat ini?",
        options: [
          { label: "Menambah berat badan", value: "weight" },
          { label: "Mendukung tumbuh kembang optimal", value: "growth" },
        ],
      },
      {
        id: "nutrition",
        title: "Apakah kebutuhan nutrisi harian anak belum terpenuhi dengan baik?",
        options: [
          { label: "Ya", value: "yes" },
          { label: "Mungkin belum optimal", value: "maybe" },
          { label: "Sudah cukup", value: "enough" },
        ],
      },
      {
        id: "active",
        title: "Apakah anak mudah lelah atau kurang aktif?",
        options: [
          { label: "Ya", value: "yes" },
          { label: "Tidak", value: "no" },
        ],
      },
    ],
  },
  {
    key: "recovery",
    label: "Recovery Saat Operasi",
    icon: "💪",
    description: "Dukungan nutrisi pasca sakit atau operasi.",
    product: "PEPTISOL",
    productSlug: "peptisol",
    productNote: "Rekomendasi awal untuk pemulihan pasca sakit atau operasi.",
    theme: {
      primary: "#d85b70",
      soft: "#fff1f2",
      gradient: "from-[#be4560] to-[#fda4af]",
    },
    questions: [
      {
        id: "recovering",
        title: "Apakah Anda sedang dalam masa pemulihan setelah sakit atau operasi?",
        options: [
          { label: "Ya, dalam proses pemulihan", value: "yes" },
          { label: "Tidak", value: "no" },
        ],
      },
      {
        id: "appetite",
        title: "Bagaimana nafsu makan Anda saat ini?",
        options: [
          { label: "Menurun", value: "low" },
          { label: "Normal", value: "normal" },
          { label: "Sangat kurang", value: "very-low" },
        ],
      },
      {
        id: "portion",
        title: "Apakah Anda mengalami kesulitan makan dalam porsi normal?",
        options: [
          { label: "Ya", value: "yes" },
          { label: "Kadang-kadang", value: "sometimes" },
          { label: "Tidak", value: "no" },
        ],
      },
      {
        id: "energy",
        title: "Apakah Anda sering merasa lemas atau kurang tenaga?",
        options: [
          { label: "Ya", value: "yes" },
          { label: "Kadang-kadang", value: "sometimes" },
          { label: "Tidak", value: "no" },
        ],
      },
      {
        id: "intake",
        title: "Saat ini, bagaimana Anda memenuhi kebutuhan nutrisi harian?",
        options: [
          { label: "Porsi makan lebih sedikit dari biasanya", value: "less-food" },
          { label: "Makan seperti biasa", value: "normal-food" },
          { label: "Mengandalkan makanan lembut / cair", value: "soft-liquid" },
        ],
      },
    ],
  },
];

export function getAssessmentFlow(key: string) {
  return assessmentFlows.find((flow) => flow.key === key);
}
