export type ArticleItem = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  image: string;
  date: string;
  readTime: string;
};

export const articles: ArticleItem[] = [
  {
    slug: "pentingnya-nutrisi-seimbang-untuk-keluarga",
    title: "Pentingnya Nutrisi Seimbang untuk Menjaga Kesehatan Keluarga",
    category: "Edukasi Nutrisi",
    excerpt:
      "Memahami kebutuhan nutrisi harian menjadi langkah awal untuk membantu menjaga kesehatan keluarga.",
    content: [
      "Nutrisi yang seimbang membantu tubuh mendapatkan energi dan zat gizi yang dibutuhkan untuk menjalankan aktivitas sehari-hari.",
      "Setiap tahap kehidupan memiliki kebutuhan nutrisi yang berbeda sehingga pemilihan asupan perlu disesuaikan dengan kondisi tubuh.",
    ],
    image: "/images/client-assets/img/general-practitioner-ennumerating-advantages-new-treatment-when-talking-senior-patient.jpg",
    date: "24 Juli 2026",
    readTime: "5 menit membaca",
  },
  {
    slug: "memahami-kebutuhan-protein-saat-pemulihan",
    title: "Memahami Kebutuhan Protein Saat Masa Pemulihan",
    category: "Pemulihan",
    excerpt:
      "Protein memiliki peran penting dalam membantu memenuhi kebutuhan tubuh selama proses pemulihan.",
    content: [
      "Pada masa pemulihan, tubuh membutuhkan asupan energi dan protein yang cukup.",
      "Kebutuhan setiap individu dapat berbeda tergantung kondisi kesehatan dan arahan tenaga kesehatan.",
    ],
    image: "/images/mednut/support/doctor-consultation.jpg",
    date: "18 Juli 2026",
    readTime: "4 menit membaca",
  },
  {
    slug: "tips-memilih-nutrisi-sesuai-kondisi-tubuh",
    title: "Tips Memilih Nutrisi Sesuai Kondisi Tubuh",
    category: "Tips Kesehatan",
    excerpt:
      "Kenali kebutuhan tubuh sebelum menentukan pilihan nutrisi yang tepat.",
    content: [
      "Pemahaman kondisi kesehatan menjadi bagian penting dalam menentukan pilihan nutrisi.",
      "Gunakan informasi terpercaya dan konsultasikan kebutuhan khusus bersama tenaga kesehatan.",
    ],
    image: "/images/client-assets/img/stacked-books-pencil-stethoscope-white-surface.jpg",
    date: "10 Juli 2026",
    readTime: "6 menit membaca",
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
