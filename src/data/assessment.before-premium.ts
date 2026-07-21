export type AssessmentOption = {
  label: string;
  value: string;
};

export type AssessmentQuestion = {
  id: string;
  title: string;
  options: AssessmentOption[];
};

export type AssessmentResult = {
  product: string;
  productSlug: string;
  note: string;
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

export const assessmentPurposeOptions = [
  {
    label: "Memiliki kondisi kesehatan",
    value: "condition",
    icon: "🩺",
  },
  {
    label: "Menjaga kesehatan",
    value: "health",
    icon: "🌱",
  },
];

export const healthConditions = [
  {
    label: "Ginjal",
    value: "ginjal",
    icon: "🫘",
  },
  {
    label: "Hati / Liver",
    value: "hati",
    icon: "❤️",
  },
  {
    label: "Pernapasan",
    value: "pernapasan",
    icon: "🫁",
  },
  {
    label: "Pencernaan",
    value: "pencernaan",
    icon: "🥣",
  },
];

export const assessmentQuestions = {
  ginjal: {
    title: "Sedang menjalani dialisis?",
    options: [
      {
        label: "Ya",
        value: "dialysis",
      },
      {
        label: "Tidak",
        value: "no-dialysis",
      },
    ],
  },

  hati: {
    title: "Apa kebutuhan nutrisi Anda?",
    options: [
      {
        label: "Menjaga kesehatan",
        value: "maintenance",
      },
      {
        label: "Dukungan lebih spesifik",
        value: "specific",
      },
    ],
  },

  pernapasan: {
    title: "Apa kebutuhan nutrisi Anda saat ini?",
    options: [
      {
        label:
          "Saya membutuhkan dukungan nutrisi untuk membantu menjaga kesehatan sistem pernapasan.",
        value: "maintenance",
      },
      {
        label:
          "Saya ingin memenuhi kebutuhan nutrisi selama masa pemulihan terkait kondisi pernapasan.",
        value: "recovery",
      },
    ],
  },

  pencernaan: {
    title: "Apa kebutuhan nutrisi Anda saat ini?",
    options: [
      {
        label:
          "Saya membutuhkan nutrisi yang lebih mudah dicerna.",
        value: "easy-digest",
      },
      {
        label:
          "Saya sedang dalam masa pemulihan setelah tindakan atau operasi yang berkaitan dengan saluran cerna.",
        value: "recovery",
      },
    ],
  },

  dewasa: {
    title: "Apa yang ingin Anda dukung?",
    options: [
      {
        label: "Menjaga kesehatan sehari-hari",
        value: "entramix",
      },
      {
        label: "Alternatif tanpa susu sapi",
        value: "entrasoy",
      },
      {
        label: "Pemulihan setelah sakit",
        value: "peptisol",
      },
    ],
  },
};

export function getAssessmentRecommendation(
  condition: string,
  answer: string
): AssessmentResult {

  if (condition === "ginjal") {
    return answer === "dialysis"
      ? {
          product: "NEPHRISOL-D",
          productSlug: "nephrisol-d",
          note:
            "Direkomendasikan untuk kebutuhan nutrisi pasien yang menjalani dialisis.",
        }
      : {
          product: "NEPHRISOL",
          productSlug: "nephrisol",
          note:
            "Direkomendasikan untuk dukungan nutrisi pada kondisi ginjal.",
        };
  }

  if (condition === "hati") {
    return answer === "specific"
      ? {
          product: "HEPATOSOL LOLA",
          productSlug: "hepatosol-lola",
          note:
            "Direkomendasikan untuk kebutuhan nutrisi hati yang lebih spesifik.",
        }
      : {
          product: "HEPATOSOL",
          productSlug: "hepatosol",
          note:
            "Direkomendasikan untuk menjaga kebutuhan nutrisi hati.",
        };
  }

  if (condition === "pernapasan") {
    return {
      product: "PULMOSOL",
      productSlug: "pulmosol",
      note:
        "Direkomendasikan untuk dukungan nutrisi sistem pernapasan.",
    };
  }

  if (condition === "pencernaan") {
    return {
      product: "OLIGO",
      productSlug: "oligo",
      note:
        "Direkomendasikan untuk kebutuhan nutrisi yang lebih mudah dicerna.",
    };
  }

  if (answer === "entrakid") {
    return {
      product: "ENTRAKID",
      productSlug: "entrakid",
      note:
        "Direkomendasikan untuk mendukung tumbuh kembang anak.",
    };
  }

  if (answer === "entrasoy") {
    return {
      product: "ENTRASOY",
      productSlug: "entrasoy",
      note:
        "Alternatif nutrisi berbasis kedelai tanpa susu sapi.",
    };
  }

  if (answer === "peptisol") {
    return {
      product: "PEPTISOL",
      productSlug: "peptisol",
      note:
        "Direkomendasikan untuk membantu pemulihan setelah sakit.",
    };
  }

  return {
    product: "ENTRAMIX",
    productSlug: "entramix",
    note:
      "Direkomendasikan untuk membantu memenuhi kebutuhan nutrisi harian.",
  };
}
