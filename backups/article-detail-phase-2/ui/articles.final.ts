export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  featured?: boolean;
  popular?: boolean;
  tags: string[];
  relatedProducts?: string[];
  author: string;
  keyPoints: string[];
  content: {
    heading: string;
    paragraphs: string[];
  }[];
  seoTitle: string;
  seoDescription: string;
};

export const articleCategories = [
  "Semua",
  "Nutrisi",
  "Ginjal",
  "Hati / Liver",
  "Pemulihan",
  "Anak",
  "Lifestyle",
  "Produk",
];

export const articles: Article[] = [
  {
    slug: "pentingnya-protein-saat-masa-pemulihan",
    title:
      "Pentingnya Protein Saat Masa Pemulihan Setelah Sakit atau Operasi",
    category: "Pemulihan",
    excerpt:
      "Tubuh membutuhkan dukungan nutrisi yang tepat selama proses pemulihan. Protein menjadi salah satu nutrisi penting untuk membantu memenuhi kebutuhan tubuh.",
    image:
      "/images/client-assets/img/general-practitioner-ennumerating-advantages-new-treatment-when-talking-senior-patient.jpg",
    date: "24 Juli 2026",
    readTime: "6 menit membaca",
    featured: true,
    popular: true,
    tags: [
      "protein",
      "pemulihan",
      "nutrisi medis",
    ],
    relatedProducts: [
      "Peptisol",
    ],
    author: "Medikal Nutrience",
    keyPoints: [
      "Protein membantu memenuhi kebutuhan tubuh selama proses pemulihan.",
      "Kebutuhan nutrisi dapat berbeda berdasarkan kondisi kesehatan.",
      "Pemilihan nutrisi sebaiknya disesuaikan dengan kebutuhan individu.",
    ],
    content: [
      {
        heading: "Mengapa protein penting saat masa pemulihan?",
        paragraphs: [
          "Setelah sakit atau menjalani tindakan medis, tubuh membutuhkan dukungan nutrisi yang cukup untuk membantu proses pemulihan.",
          "Protein menjadi salah satu nutrisi penting karena berperan dalam membantu memenuhi kebutuhan tubuh selama fase pemulihan.",
        ],
      },
      {
        heading: "Bagaimana memilih dukungan nutrisi yang tepat?",
        paragraphs: [
          "Setiap kondisi kesehatan memiliki kebutuhan yang berbeda. Karena itu, pendekatan nutrisi perlu disesuaikan dengan kondisi dan kebutuhan tubuh.",
          "Konsultasi dengan tenaga kesehatan dapat membantu menentukan pilihan yang lebih sesuai.",
        ],
      },
    ],
    seoTitle:
      "Pentingnya Protein Saat Masa Pemulihan Setelah Sakit atau Operasi | Medikal Nutrience",
    seoDescription:
      "Pelajari pentingnya protein dan dukungan nutrisi saat masa pemulihan setelah sakit atau operasi.",
  },

  {
    slug: "memahami-kebutuhan-nutrisi-pasien-ginjal",
    title:
      "Memahami Kebutuhan Nutrisi untuk Pasien dengan Gangguan Ginjal",
    category: "Ginjal",
    excerpt:
      "Setiap tahap kondisi ginjal membutuhkan pendekatan nutrisi yang berbeda sesuai kebutuhan tubuh.",
    image:
      "/images/mednut/solutions/solution-ginjal-nephrisol.png",
    date: "22 Juli 2026",
    readTime: "7 menit membaca",
    popular: true,
    tags: [
      "ginjal",
      "dialisis",
      "nutrisi klinis",
    ],
    relatedProducts: [
      "Nephrisol",
    ],
    author: "Medikal Nutrience",
    keyPoints: [
      "Kebutuhan nutrisi pasien ginjal dapat berbeda pada setiap tahap kondisi.",
      "Pemilihan nutrisi perlu mempertimbangkan kebutuhan tubuh.",
      "Informasi nutrisi membantu pasien memahami pilihan yang tersedia.",
    ],
    content: [
      {
        heading: "Mengapa nutrisi penting pada kondisi ginjal?",
        paragraphs: [
          "Kondisi ginjal membutuhkan perhatian khusus terhadap asupan nutrisi.",
          "Pendekatan nutrisi yang tepat dapat membantu memenuhi kebutuhan tubuh sesuai kondisi kesehatan.",
        ],
      },
    ],
    seoTitle: "Memahami Kebutuhan Nutrisi Pasien Ginjal | Medikal Nutrience",
    seoDescription:
      "Informasi mengenai kebutuhan nutrisi untuk pasien dengan gangguan ginjal.",
  },

  {
    slug: "cara-memilih-nutrisi-sesuai-kondisi-tubuh",
    title:
      "Cara Memilih Nutrisi yang Tepat Sesuai Kondisi Tubuh",
    category: "Nutrisi",
    excerpt:
      "Kebutuhan nutrisi setiap orang berbeda. Kenali kondisi tubuh sebelum menentukan pilihan nutrisi yang sesuai.",
    image:
      "/images/client-assets/img/stacked-books-pencil-stethoscope-white-surface.jpg",
    date: "20 Juli 2026",
    readTime: "5 menit membaca",
    tags: [
      "nutrisi",
      "kesehatan",
    ],
    author: "Medikal Nutrience",
    keyPoints: [
      "Setiap orang memiliki kebutuhan nutrisi yang berbeda.",
      "Kondisi tubuh menjadi pertimbangan penting dalam memilih nutrisi.",
      "Informasi yang tepat membantu menentukan pilihan lebih baik.",
    ],
    content: [
      {
        heading: "Memahami kebutuhan nutrisi tubuh",
        paragraphs: [
          "Kebutuhan nutrisi dapat berbeda berdasarkan usia, aktivitas, dan kondisi kesehatan.",
          "Memahami kebutuhan tubuh menjadi langkah awal untuk memilih dukungan nutrisi yang sesuai.",
        ],
      },
    ],
    seoTitle: "Cara Memilih Nutrisi Sesuai Kondisi Tubuh | Medikal Nutrience",
    seoDescription:
      "Pelajari cara memilih nutrisi sesuai kebutuhan dan kondisi tubuh.",
  },

  {
    slug: "nutrisi-untuk-lansia-agar-tetap-aktif",
    title:
      "Nutrisi untuk Lansia Agar Tetap Aktif dan Sehat",
    category: "Lifestyle",
    excerpt:
      "Memenuhi kebutuhan nutrisi pada usia lanjut membantu mendukung aktivitas dan kualitas hidup sehari-hari.",
    image:
      "/images/client-assets/img/bmi-body-mass-index-formula-rate-formula-notepad.jpg",
    date: "18 Juli 2026",
    readTime: "5 menit membaca",
    tags: [
      "lansia",
      "nutrisi",
      "healthy aging",
    ],
    author: "Medikal Nutrience",
    keyPoints: [
      "Kebutuhan nutrisi dapat berubah seiring bertambahnya usia.",
      "Asupan protein dan energi menjadi bagian penting dalam menjaga aktivitas.",
      "Pola makan seimbang membantu mendukung kualitas hidup lansia.",
    ],
    content: [
      {
        heading: "Mengapa nutrisi penting untuk lansia?",
        paragraphs: [
          "Pada usia lanjut, tubuh mengalami berbagai perubahan yang dapat memengaruhi kebutuhan nutrisi.",
          "Pemenuhan nutrisi yang baik membantu mendukung aktivitas harian dan kesehatan secara keseluruhan.",
        ],
      },
    ],
    seoTitle: "Nutrisi untuk Lansia Agar Tetap Aktif dan Sehat | Medikal Nutrience",
    seoDescription:
      "Panduan nutrisi untuk membantu lansia tetap aktif dan memenuhi kebutuhan tubuh.",
  },

  {
    slug: "mengatasi-anak-susah-makan",
    title:
      "Mengatasi Anak Susah Makan dan Memenuhi Kebutuhan Nutrisinya",
    category: "Anak",
    excerpt:
      "Picky eater dapat membuat orang tua khawatir. Kenali strategi sederhana untuk membantu memenuhi kebutuhan nutrisi anak.",
    image:
      "/images/mednut/merakids/merakids-banner.png",
    date: "15 Juli 2026",
    readTime: "6 menit membaca",
    tags: [
      "anak",
      "picky eater",
      "tumbuh kembang",
    ],
    relatedProducts: [
      "Entrakid",
    ],
    author: "Medikal Nutrience",
    keyPoints: [
      "Picky eater dapat memengaruhi asupan nutrisi anak.",
      "Orang tua dapat membantu membangun kebiasaan makan sehat.",
      "Nutrisi seimbang mendukung tumbuh kembang anak.",
    ],
    content: [
      {
        heading: "Menghadapi anak susah makan",
        paragraphs: [
          "Anak yang sulit makan menjadi tantangan yang sering dialami orang tua.",
          "Pendekatan yang tepat dapat membantu anak mendapatkan asupan nutrisi yang dibutuhkan.",
        ],
      },
    ],
    seoTitle: "Mengatasi Anak Susah Makan dan Kebutuhan Nutrisinya | Medikal Nutrience",
    seoDescription:
      "Tips membantu anak susah makan dan memenuhi kebutuhan nutrisi untuk tumbuh kembang.",
  },

  {
    slug: "mengenal-hepatosol-dukungan-nutrisi-hati",
    title:
      "Mengenal Dukungan Nutrisi untuk Kondisi Hati",
    category: "Hati / Liver",
    excerpt:
      "Kondisi hati membutuhkan perhatian khusus termasuk pemenuhan nutrisi yang sesuai.",
    image:
      "/images/mednut/solutions/solution-hati-hepatosol.png",
    date: "12 Juli 2026",
    readTime: "5 menit membaca",
    tags: [
      "hati",
      "liver",
      "nutrisi",
    ],
    relatedProducts: [
      "Hepatosol",
    ],
    author: "Medikal Nutrience",
    keyPoints: [
      "Kondisi hati membutuhkan perhatian terhadap pemenuhan nutrisi.",
      "Pendekatan nutrisi perlu disesuaikan dengan kebutuhan tubuh.",
      "Informasi terpercaya membantu memahami pilihan nutrisi.",
    ],
    content: [
      {
        heading: "Dukungan nutrisi untuk kondisi hati",
        paragraphs: [
          "Hati memiliki peran penting dalam berbagai proses tubuh sehingga kebutuhan nutrisinya perlu diperhatikan.",
          "Pemilihan nutrisi yang sesuai dapat menjadi bagian dari dukungan kesehatan secara menyeluruh.",
        ],
      },
    ],
    seoTitle: "Dukungan Nutrisi untuk Kondisi Hati | Medikal Nutrience",
    seoDescription:
      "Informasi mengenai dukungan nutrisi untuk kondisi hati dan liver.",
  },

  {
    slug: "mengenal-produk-peptisol",
    title:
      "Mengenal Peptisol: Nutrisi Tinggi Protein untuk Mendukung Pemulihan",
    category: "Produk",
    excerpt:
      "Peptisol merupakan salah satu pilihan nutrisi untuk membantu memenuhi kebutuhan protein tubuh.",
    image:
      "/images/products/banners/peptisol-banner.png",
    date: "10 Juli 2026",
    readTime: "4 menit membaca",
    tags: [
      "peptisol",
      "protein",
      "produk",
    ],
    relatedProducts: [
      "Peptisol",
    ],
    author: "Medikal Nutrience",
    keyPoints: [
      "Protein membantu memenuhi kebutuhan tubuh selama proses pemulihan.",
      "Kebutuhan nutrisi dapat berbeda berdasarkan kondisi kesehatan.",
      "Pemilihan nutrisi sebaiknya disesuaikan dengan kebutuhan individu.",
    ],
    content: [
      {
        heading: "Mengapa protein penting saat masa pemulihan?",
        paragraphs: [
          "Setelah sakit atau menjalani tindakan medis, tubuh membutuhkan dukungan nutrisi yang cukup untuk membantu proses pemulihan.",
          "Protein menjadi salah satu nutrisi penting karena berperan dalam membantu memenuhi kebutuhan tubuh selama fase pemulihan.",
        ],
      },
      {
        heading: "Bagaimana memilih dukungan nutrisi yang tepat?",
        paragraphs: [
          "Setiap kondisi kesehatan memiliki kebutuhan yang berbeda. Karena itu, pendekatan nutrisi perlu disesuaikan dengan kondisi dan kebutuhan tubuh.",
          "Konsultasi dengan tenaga kesehatan dapat membantu menentukan pilihan yang lebih sesuai.",
        ],
      },
    ],
    seoTitle:
      "Pentingnya Protein Saat Masa Pemulihan Setelah Sakit atau Operasi | Medikal Nutrience",
    seoDescription:
      "Pelajari pentingnya protein dan dukungan nutrisi saat masa pemulihan setelah sakit atau operasi.",
  },

  {
    slug: "tips-menjaga-pola-makan-seimbang",
    title:
      "Tips Menjaga Pola Makan Seimbang untuk Kesehatan Harian",
    category: "Lifestyle",
    excerpt:
      "Pola makan seimbang membantu tubuh mendapatkan berbagai nutrisi yang dibutuhkan setiap hari.",
    image:
      "/images/client-assets/img/Artboard 3.png",
    date: "8 Juli 2026",
    readTime: "5 menit membaca",
    tags: [
      "healthy lifestyle",
      "nutrisi",
    ],
    author: "Medikal Nutrience",
    keyPoints: [
      "Pola makan seimbang membantu memenuhi kebutuhan nutrisi harian.",
      "Variasi makanan menjadi bagian penting dari gaya hidup sehat.",
      "Kebiasaan kecil yang konsisten dapat mendukung kesehatan jangka panjang.",
    ],
    content: [
      {
        heading: "Apa itu pola makan seimbang?",
        paragraphs: [
          "Pola makan seimbang adalah kebiasaan mengonsumsi berbagai jenis makanan dengan jumlah yang sesuai kebutuhan tubuh.",
          "Kombinasi nutrisi yang tepat membantu tubuh mendapatkan energi dan zat gizi yang diperlukan.",
        ],
      },
      {
        heading: "Membangun kebiasaan sehat setiap hari",
        paragraphs: [
          "Memulai dari perubahan sederhana seperti memilih makanan bernutrisi dan menjaga pola makan teratur dapat memberikan dampak positif.",
          "Kebutuhan setiap individu dapat berbeda sehingga penting memahami kondisi tubuh masing-masing.",
        ],
      },
    ],
    seoTitle:
      "Tips Menjaga Pola Makan Seimbang untuk Kesehatan Harian | Medikal Nutrience",
    seoDescription:
      "Pelajari tips menjaga pola makan seimbang untuk membantu memenuhi kebutuhan nutrisi harian.",
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find(
    (article) => article.slug === slug
  );
}
