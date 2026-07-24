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
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find(
    (article) => article.slug === slug
  );
}
