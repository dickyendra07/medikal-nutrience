export type SolutionDetail = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  problemTitle: string;
  problems: string[];
  recommendedProducts: {
    name: string;
    slug: string;
    description: string;
  }[];
  educationTitle: string;
  educationPoints: string[];
  theme: {
    primary: string;
    soft: string;
    dark: string;
    gradient: string;
  };
};

export const solutionDetails: SolutionDetail[] = [
  {
    slug: "ginjal",
    title: "Solusi Nutrisi untuk Kondisi Ginjal",
    shortTitle: "Ginjal",
    eyebrow: "Solusi Ginjal",
    description:
      "Kondisi ginjal membutuhkan pendekatan nutrisi yang lebih terarah. Medikal Nutrience menyediakan pilihan nutrisi untuk kebutuhan pra-dialisis dan dialisis.",
    problemTitle: "Kondisi yang Perlu Diperhatikan",
    problems: [
      "Gangguan ginjal sebelum dialisis",
      "Sedang menjalani cuci darah atau dialisis",
      "Memiliki pantangan makanan tertentu",
      "Membutuhkan dukungan nutrisi khusus",
    ],
    recommendedProducts: [
      {
        name: "NEPHRISOL",
        slug: "nephrisol",
        description:
          "Dukungan nutrisi untuk kondisi gangguan ginjal sebelum dialisis.",
      },
      {
        name: "NEPHRISOL-D",
        slug: "nephrisol-d",
        description:
          "Nutrisi khusus untuk pasien ginjal yang sedang menjalani dialisis.",
      },
    ],
    educationTitle: "Kenapa nutrisi ginjal perlu disesuaikan?",
    educationPoints: [
      "Kebutuhan protein dapat berbeda antara pra-dialisis dan dialisis.",
      "Asupan mineral tertentu perlu diperhatikan sesuai kondisi tubuh.",
      "Pemilihan nutrisi sebaiknya mengikuti arahan tenaga kesehatan.",
    ],
    theme: {
      primary: "#7e22ce",
      soft: "#f5f3ff",
      dark: "#3b0764",
      gradient: "from-[#581c87] to-[#a855f7]",
    },
  },
  {
    slug: "hati-liver",
    title: "Solusi Nutrisi untuk Hati / Liver",
    shortTitle: "Hati / Liver",
    eyebrow: "Solusi Hati",
    description:
      "Gangguan fungsi hati membutuhkan dukungan nutrisi yang tepat untuk membantu memenuhi kebutuhan tubuh dan menjaga kualitas hidup.",
    problemTitle: "Kondisi yang Sering Dihadapi",
    problems: [
      "Gangguan fungsi hati kronik",
      "Hepatitis kronik atau sirosis hati",
      "Penurunan nafsu makan",
      "Kondisi hati yang membutuhkan perhatian lebih intensif",
    ],
    recommendedProducts: [
      {
        name: "HEPATOSOL",
        slug: "hepatosol",
        description:
          "Nutrisi khusus untuk pasien dengan gangguan fungsi hati/liver kronik.",
      },
      {
        name: "HEPATOSOL LOLA",
        slug: "hepatosol-lola",
        description:
          "Nutrisi enteral lengkap untuk kondisi gangguan fungsi hati berat.",
      },
    ],
    educationTitle: "Mengapa nutrisi penting untuk kondisi hati?",
    educationPoints: [
      "Asupan kalori dan protein perlu diperhatikan sesuai kondisi pasien.",
      "Penurunan nafsu makan dapat memengaruhi pemenuhan nutrisi harian.",
      "Pemilihan formula nutrisi perlu disesuaikan dengan tingkat kondisi hati.",
    ],
    theme: {
      primary: "#ef1f2d",
      soft: "#fff1f2",
      dark: "#9f1239",
      gradient: "from-[#991b1b] to-[#fb7185]",
    },
  },
  {
    slug: "pernafasan",
    title: "Solusi Nutrisi untuk Masalah Pernafasan",
    shortTitle: "Pernafasan",
    eyebrow: "Solusi Pernafasan",
    description:
      "Kondisi pernafasan seperti PPOK, asma, pneumonia, dan TB paru dapat memengaruhi energi, nafsu makan, serta aktivitas harian.",
    problemTitle: "Kondisi yang Perlu Didukung",
    problems: [
      "Mudah sesak saat aktivitas ringan",
      "Cepat lelah atau kehabisan energi",
      "Nafsu makan menurun",
      "Kondisi pernafasan mengganggu aktivitas harian",
    ],
    recommendedProducts: [
      {
        name: "PULMOSOL",
        slug: "pulmosol",
        description:
          "Solusi nutrisi untuk membantu memenuhi kebutuhan pada masalah pernafasan.",
      },
    ],
    educationTitle: "Kenapa kondisi pernafasan membutuhkan dukungan nutrisi?",
    educationPoints: [
      "Gangguan pernafasan dapat meningkatkan kebutuhan energi.",
      "Makan dalam porsi besar kadang membuat napas terasa tidak nyaman.",
      "Dukungan nutrisi membantu tubuh tetap bertenaga dalam aktivitas harian.",
    ],
    theme: {
      primary: "#1e3a8a",
      soft: "#eff6ff",
      dark: "#172554",
      gradient: "from-[#172554] to-[#2563eb]",
    },
  },
  {
    slug: "pencernaan",
    title: "Solusi Nutrisi untuk Sistem Pencernaan",
    shortTitle: "Pencernaan",
    eyebrow: "Solusi Pencernaan",
    description:
      "Kondisi saluran cerna tertentu membutuhkan formula nutrisi yang lebih mudah diserap dan sesuai dengan kebutuhan tubuh.",
    problemTitle: "Kondisi yang Cocok Dibantu",
    problems: [
      "Gangguan pencernaan kronis",
      "Pankreatitis kronis atau akut",
      "Pemulihan setelah tindakan medis pada pencernaan",
      "Kesulitan mencerna makanan tertentu",
    ],
    recommendedProducts: [
      {
        name: "OLIGO",
        slug: "oligo",
        description:
          "Nutrisi cepat serap dengan protein terhidrolisa parsial untuk sistem saluran cerna.",
      },
    ],
    educationTitle: "Mengapa perlu nutrisi cepat serap?",
    educationPoints: [
      "Beberapa kondisi cerna membutuhkan nutrisi yang lebih mudah dicerna.",
      "Asupan yang tidak optimal dapat membuat tubuh mudah lemas.",
      "Formula khusus dapat membantu memenuhi kebutuhan nutrisi harian.",
    ],
    theme: {
      primary: "#d85b70",
      soft: "#fff1f2",
      dark: "#9f1239",
      gradient: "from-[#be4560] to-[#fda4af]",
    },
  },
  {
    slug: "pemulihan",
    title: "Solusi Nutrisi untuk Pemulihan",
    shortTitle: "Pemulihan",
    eyebrow: "Solusi Pemulihan",
    description:
      "Masa pemulihan setelah sakit atau operasi membutuhkan asupan nutrisi yang cukup, terutama protein dan energi harian.",
    problemTitle: "Kapan Dukungan Nutrisi Dibutuhkan?",
    problems: [
      "Sedang pemulihan setelah sakit atau operasi",
      "Nafsu makan menurun",
      "Sulit makan dalam porsi normal",
      "Sering merasa lemas atau kurang tenaga",
    ],
    recommendedProducts: [
      {
        name: "PEPTISOL",
        slug: "peptisol",
        description:
          "Nutrisi tinggi protein dan zinc untuk membantu mendukung pemulihan pasca sakit.",
      },
    ],
    educationTitle: "Kenapa protein penting saat pemulihan?",
    educationPoints: [
      "Protein membantu memenuhi kebutuhan tubuh pada fase pemulihan.",
      "Asupan energi yang cukup membantu aktivitas harian.",
      "Pemenuhan nutrisi dapat mendukung kualitas proses pemulihan.",
    ],
    theme: {
      primary: "#d85b70",
      soft: "#fff1f2",
      dark: "#9f1239",
      gradient: "from-[#be4560] to-[#fda4af]",
    },
  },
  {
    slug: "anak",
    title: "Solusi Nutrisi untuk Anak dan Tumbuh Kembang",
    shortTitle: "Anak",
    eyebrow: "Solusi Anak",
    description:
      "Tumbuh kembang anak membutuhkan asupan nutrisi seimbang, terutama saat anak susah makan, picky eater, atau berat badan sulit naik.",
    problemTitle: "Tantangan yang Sering Dialami Anak",
    problems: [
      "Susah makan atau picky eater",
      "Berat badan sulit naik",
      "Tumbuh kembang belum optimal",
      "Anak mudah lelah atau kurang aktif",
    ],
    recommendedProducts: [
      {
        name: "ENTRAKID",
        slug: "entrakid",
        description:
          "Nutrisi untuk mendukung tumbuh kembang anak usia 1–12 tahun.",
      },
    ],
    educationTitle: "Mengapa nutrisi anak perlu diperhatikan?",
    educationPoints: [
      "Masa anak-anak adalah fase penting untuk tumbuh kembang.",
      "Picky eater dapat memengaruhi asupan makro dan mikro nutrisi.",
      "Nutrisi seimbang membantu anak tetap aktif dan berkembang optimal.",
    ],
    theme: {
      primary: "#13a8c5",
      soft: "#e7f9fd",
      dark: "#0f7490",
      gradient: "from-[#13a8c5] to-[#087f9b]",
    },
  },
  {
    slug: "dewasa-lansia",
    title: "Solusi Nutrisi untuk Dewasa dan Lansia",
    shortTitle: "Dewasa & Lansia",
    eyebrow: "Solusi Dewasa & Lansia",
    description:
      "Dewasa dan lansia membutuhkan dukungan nutrisi untuk menjaga energi, asupan harian, serta kualitas hidup yang lebih baik.",
    problemTitle: "Kondisi yang Sering Dialami",
    problems: [
      "Penurunan nafsu makan",
      "Berkurangnya indra pengecap",
      "Mudah merasa lemas",
      "Asupan nutrisi harian belum seimbang",
    ],
    recommendedProducts: [
      {
        name: "ENTRAMIX",
        slug: "entramix",
        description:
          "Nutrisi lengkap dan seimbang untuk dewasa hingga lansia.",
      },
      {
        name: "ENTRASOY",
        slug: "entrasoy",
        description:
          "Solusi gizi 100% protein nabati untuk kebutuhan nutrisi harian.",
      },
    ],
    educationTitle: "Mengapa dewasa dan lansia perlu dukungan nutrisi?",
    educationPoints: [
      "Kebutuhan nutrisi dapat berubah seiring usia.",
      "Nafsu makan yang menurun dapat memengaruhi asupan harian.",
      "Pilihan nutrisi perlu disesuaikan dengan toleransi dan kebutuhan tubuh.",
    ],
    theme: {
      primary: "#006b3f",
      soft: "#e4f8ed",
      dark: "#004b34",
      gradient: "from-[#006b3f] to-[#10b981]",
    },
  },
];

export function getSolutionBySlug(slug: string) {
  return solutionDetails.find((solution) => solution.slug === slug);
}
