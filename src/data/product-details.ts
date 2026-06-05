export type ProductDetail = {
  slug: string;
  name: string;
  category: string;
  heroTitle: string;
  description: string;
  theme: {
    primary: string;
    soft: string;
    dark: string;
    gradient: string;
  };
  needTitle: string;
  needs: {
    title: string;
    description?: string;
  }[];
  benefitTitle: string;
  benefits: string[];
  ctaLabel: string;
  crossSell?: {
    title: string;
    description: string;
    buttonLabel: string;
    href: string;
  };
  closingTitle: string;
  closingDescription: string;
};

export const productDetails: ProductDetail[] = [
  {
    slug: "peptibren",
    name: "PEPTIBREN",
    category: "Stroke / Alzheimer",
    heroTitle: "Dukungan Nutrisi untuk Kebutuhan Stroke dan Alzheimer",
    description:
      "Peptibren disiapkan sebagai rekomendasi nutrisi untuk kondisi dengan tantangan asupan makan, kesulitan menelan, atau kebutuhan makanan lembut/cair. Konten detail final produk dapat disesuaikan setelah aset dan copy resmi tersedia.",
    theme: {
      primary: "#2563eb",
      soft: "#eff6ff",
      dark: "#1e3a8a",
      gradient: "from-[#1e3a8a] to-[#60a5fa]",
    },
    needTitle: "Siapa yang Membutuhkan Peptibren?",
    needs: [
      { title: "Kesulitan Makan atau Menelan" },
      { title: "Nafsu Makan Menurun" },
      { title: "Membutuhkan Makanan Lembut / Cair" },
    ],
    benefitTitle: "Keunggulan Utama Peptibren",
    benefits: [
      "Dukungan Asupan Nutrisi",
      "Untuk Kondisi Kesulitan Makan",
      "Membantu Pemenuhan Energi Harian",
      "Arahan Awal untuk Kebutuhan Stroke / Alzheimer",
    ],
    ctaLabel: "Konsultasi Produk",
    closingTitle: "Dukung Kebutuhan Nutrisi dengan Arahan yang Tepat",
    closingDescription:
      "Konsultasikan kondisi Anda dengan tenaga kesehatan untuk mendapatkan rekomendasi nutrisi yang lebih sesuai.",
  },
  {
    slug: "entrakid",
    name: "ENTRAKID",
    category: "Nutrisi Anak",
    heroTitle: "Solusi Gizi untuk Tumbuh Kembang Anak yang Optimal",
    description:
      "Entrakid adalah suplementasi yang diperkaya dengan jenis protein hewani berkualitas tinggi yang lebih mudah dicerna oleh tubuh anak dan mengandung asam amino esensial yang lebih lengkap. Dirancang khusus untuk mendukung masa tumbuh kembang anak usia 1–12 tahun.",
    theme: {
      primary: "#13a8c5",
      soft: "#e7f9fd",
      dark: "#0f7490",
      gradient: "from-[#13a8c5] to-[#087f9b]",
    },
    needTitle: "Bunda Khawatir Berat Badan Anak Stuck?",
    needs: [
      { title: "Susah Makan", description: "Picky eater" },
      { title: "Berat Badan Kurang" },
      { title: "Tumbuh Kembang Tidak Optimal" },
    ],
    benefitTitle: "Entrakid: Rahasia Si Kecil Tumbuh Kembang Optimal dan Cerdas",
    benefits: [
      "Dual Protein Source",
      "Serat Pangan Inulin",
      "DHA & Omega 3",
      "11 Vitamin & 6 Mineral",
    ],
    ctaLabel: "Beli Sekarang",
    crossSell: {
      title: "Serunya Aktivitas Kreatif Bersama MERAKIDS",
      description:
        "Temukan berbagai aktivitas seru untuk mendukung kreativitas dan tumbuh kembang si kecil di rumah.",
      buttonLabel: "Lihat Aktivitas",
      href: "/support-system",
    },
    closingTitle: "Bantu Si Kecil Tumbuh Maksimal",
    closingDescription:
      "Setiap sendok Entrakid adalah langkah pasti menuju berat badan ideal dan anak yang lebih aktif. Tersedia rasa cokelat dan vanila yang disukai anak.",
  },
  {
    slug: "entramix",
    name: "ENTRAMIX",
    category: "Dewasa & Lansia",
    heroTitle: "Solusi Gizi Lengkap dan Seimbang untuk Dewasa Hingga Lansia",
    description:
      "Entramix terbuat dari protein hewani yang cepat diserap oleh tubuh. Entramix mengandung inulin untuk membantu kesehatan saluran pencernaan Anda.",
    theme: {
      primary: "#f59e0b",
      soft: "#fff7ed",
      dark: "#b45309",
      gradient: "from-[#f59e0b] to-[#b45309]",
    },
    needTitle: "Siapa yang Membutuhkan Entramix?",
    needs: [
      { title: "Dewasa & Lansia" },
      { title: "Penurunan Nafsu Makan" },
      { title: "Berkurangnya Indra Pengecap" },
    ],
    benefitTitle: "Keunggulan Utama Entramix",
    benefits: [
      "Rendah Laktosa",
      "Sumber Protein 100% Hewani",
      "Sumber Serat Pangan Inulin",
      "Sumber Kalsium",
    ],
    ctaLabel: "Beli Sekarang",
    closingTitle: "Sahabat Sehat Sampai Tua",
    closingDescription:
      "Dapatkan rekomendasi nutrisi yang sesuai dengan kondisi Anda untuk membantu proses pemulihan lebih optimal.",
  },
  {
    slug: "entrasoy",
    name: "ENTRASOY",
    category: "Protein Nabati",
    heroTitle: "Solusi Gizi 100% Protein Nabati",
    description:
      "Entrasoy sesuai diberikan untuk semua orang yang membutuhkan suplemen nutrisi dengan konsep gizi seimbang, termasuk yang memiliki intoleransi laktosa, alergi protein sapi, dan pola diet vegetarian.",
    theme: {
      primary: "#009c68",
      soft: "#e4f8ed",
      dark: "#006b3f",
      gradient: "from-[#00a86b] to-[#006b3f]",
    },
    needTitle: "Siapa yang Membutuhkan Entrasoy?",
    needs: [
      { title: "Manajemen Berat Badan" },
      { title: "Intoleransi Laktosa" },
      { title: "Alergi Protein Hewani" },
    ],
    benefitTitle: "Keunggulan Utama Entrasoy",
    benefits: [
      "Bebas Laktosa & Gluten",
      "Bebas Kolesterol",
      "Rendah Lemak",
      "Dilengkapi Serat Pangan Inulin",
    ],
    ctaLabel: "Beli Sekarang",
    closingTitle: "Lebih Sehat dengan Segelas Entrasoy",
    closingDescription:
      "Dapatkan rekomendasi nutrisi yang sesuai dengan kondisi Anda untuk membantu proses pemulihan lebih optimal.",
  },
  {
    slug: "hepatosol-lola",
    name: "HEPATOSOL LOLA",
    category: "Hati / Liver",
    heroTitle: "Dukungan Nutrisi untuk Menjaga Fungsi Hati",
    description:
      "Hepatosol Lola adalah nutrisi enteral yang lengkap untuk pasien dengan gangguan fungsi hati berat.",
    theme: {
      primary: "#ef1f2d",
      soft: "#fff1f2",
      dark: "#9f1239",
      gradient: "from-[#ef1f2d] to-[#be123c]",
    },
    needTitle: "Siapa yang Membutuhkan Hepatosol Lola?",
    needs: [
      { title: "Pasien Hepatitis Kronik" },
      { title: "Gangguan Fungsi Hati" },
      { title: "Penurunan Nafsu Makan" },
    ],
    benefitTitle: "Keunggulan Utama Hepatosol Lola",
    benefits: [
      "Tinggi Kalori",
      "Sumber Lemak MCT",
      "Diperkaya BCAA & LOLA",
      "Densitas Kalori 1,1 Kkal/ml",
    ],
    ctaLabel: "Beli Sekarang",
    crossSell: {
      title: "Nutrisi untuk Perawatan Hati Harian",
      description: "Untuk kondisi hati umum atau kronik.",
      buttonLabel: "Lihat Hepatosol",
      href: "/produk/hepatosol",
    },
    closingTitle: "Kebutuhan Asupan Nutrisi Pasien Hati Spesifik",
    closingDescription:
      "Temukan dukungan nutrisi yang sesuai untuk kondisi hati dengan kebutuhan lebih spesifik.",
  },
  {
    slug: "hepatosol",
    name: "HEPATOSOL",
    category: "Hati / Liver",
    heroTitle: "Solusi Gizi Gangguan Fungsi Hati Kronik",
    description:
      "Hepatosol adalah nutrisi khusus untuk pasien dengan gangguan fungsi hati/liver kronik seperti hepatitis kronik, sirosis hati, gangguan fungsi hati, dan pasien dengan penurunan nafsu makan.",
    theme: {
      primary: "#ef1f2d",
      soft: "#fff1f2",
      dark: "#9f1239",
      gradient: "from-[#ef1f2d] to-[#be123c]",
    },
    needTitle: "Siapa yang Membutuhkan Hepatosol?",
    needs: [
      { title: "Pasien Hepatitis Kronik" },
      { title: "Gangguan Fungsi Hati" },
      { title: "Penurunan Nafsu Makan" },
    ],
    benefitTitle: "Keunggulan Utama Hepatosol",
    benefits: [
      "Tinggi Kalori",
      "Bebas Laktosa & Gluten",
      "Diperkaya BCAA",
      "Sumber Lemak MCT 100%",
    ],
    ctaLabel: "Beli Sekarang",
    crossSell: {
      title: "Butuh Kondisi Hati Perhatian Lebih?",
      description: "Dukungan nutrisi lanjutan untuk nutrisi lebih intensif.",
      buttonLabel: "Lihat Hepatosol Lola",
      href: "/produk/hepatosol-lola",
    },
    closingTitle: "Kebutuhan Asupan Nutrisi Pasien Hati Kronik",
    closingDescription:
      "Dukung kebutuhan nutrisi pasien dengan gangguan fungsi hati kronik melalui asupan yang tepat.",
  },
  {
    slug: "nephrisol-d",
    name: "NEPHRISOL-D",
    category: "Ginjal Dialisis",
    heroTitle: "Solusi Gizi Penyakit Ginjal Kronis Dialisis",
    description:
      "Nephrisol-D diformulasikan untuk membantu memenuhi kebutuhan nutrisi bagi pasien yang menjalani dialisis, guna mendukung kondisi tubuh dan energi harian.",
    theme: {
      primary: "#7e22ce",
      soft: "#f5f3ff",
      dark: "#3b0764",
      gradient: "from-[#9333ea] to-[#4c1d95]",
    },
    needTitle: "Siapa yang Membutuhkan Nephrisol-D?",
    needs: [
      {
        title: "Khusus Ginjal Dialisis",
        description:
          "Untuk pasien yang menjalani cuci darah dan membutuhkan dukungan nutrisi harian.",
      },
      {
        title: "Membutuhkan Tambahan Protein",
        description:
          "Selama proses dialisis, protein dalam darah ikut terbuang.",
      },
      {
        title: "Membutuhkan Tambahan Energi",
        description:
          "Untuk membantu menjaga stamina dan energi selama aktivitas sehari-hari.",
      },
    ],
    benefitTitle: "Keunggulan Utama Nephrisol-D",
    benefits: [
      "Jumlah Kalium, Fosfor & Natrium Disesuaikan",
      "Tinggi Protein",
      "Khusus untuk Ginjal Dialisis",
      "Dengan 13 Vitamin dan 6 Mineral",
    ],
    ctaLabel: "Beli Sekarang",
    crossSell: {
      title: "Belum Menjalani Dialisis?",
      description:
        "Jika Anda masih dalam tahap awal gangguan ginjal, tersedia pilihan nutrisi yang sesuai.",
      buttonLabel: "Lihat Nephrisol",
      href: "/produk/nephrisol",
    },
    closingTitle: "Dukung Kondisi Tubuh Anda Selama Menjalani Dialisis",
    closingDescription:
      "Penuhi kebutuhan nutrisi harian dengan formula yang disesuaikan untuk kondisi ginjal dialisis.",
  },
  {
    slug: "nephrisol",
    name: "NEPHRISOL",
    category: "Ginjal Non Dialisis",
    heroTitle: "Dukungan Nutrisi untuk Menjaga Fungsi Ginjal",
    description:
      "Nephrisol membantu melengkapi kebutuhan nutrisi pada kondisi gangguan ginjal sebelum dialisis, dengan formula yang disesuaikan untuk menjaga kondisi tubuh tetap stabil.",
    theme: {
      primary: "#a855f7",
      soft: "#f5f3ff",
      dark: "#581c87",
      gradient: "from-[#a855f7] to-[#7e22ce]",
    },
    needTitle: "Siapa yang Membutuhkan Nephrisol?",
    needs: [
      {
        title: "Khusus Ginjal Non Dialisis",
        description:
          "Untuk pasien dengan gangguan ginjal yang belum menjalani dialisis.",
      },
      {
        title: "Memiliki Pantangan Makanan Tertentu",
        description: "Untuk kondisi dengan pembatasan protein.",
      },
      {
        title: "Membutuhkan Dukungan Nutrisi Khusus",
        description: "Untuk membantu menjaga kondisi tubuh tetap optimal.",
      },
    ],
    benefitTitle: "Keunggulan Utama Nephrisol",
    benefits: [
      "Kandungan Mikronutrien (Na, K, Fosfor)",
      "Rendah Protein",
      "Khusus untuk Ginjal Non Dialisis",
      "Dengan 13 Vitamin dan 6 Mineral",
    ],
    ctaLabel: "Beli Sekarang",
    crossSell: {
      title: "Sudah Menjalani Dialisis?",
      description:
        "Jika Anda sedang menjalani cuci darah, kebutuhan nutrisi Anda berbeda.",
      buttonLabel: "Lihat Nephrisol-D",
      href: "/produk/nephrisol-d",
    },
    closingTitle: "Temukan Dukungan Nutrisi yang Sesuai untuk Kondisi Ginjal Anda",
    closingDescription:
      "Pilih formula nutrisi yang sesuai dengan tahap kondisi ginjal Anda.",
  },
  {
    slug: "oligo",
    name: "OLIGO",
    category: "Saluran Cerna",
    heroTitle: "Solusi Spesifik Cepat Serap untuk Sistem Saluran Cerna",
    description:
      "OLIGO merupakan nutrisi oligomerik dengan 100% protein terhidrolisa parsial dan 75% lemak rantai sedang untuk perioperative bedah digestif guna memenuhi kebutuhan nutrisi kondisi malabsorbsi protein utuh.",
    theme: {
      primary: "#d85b70",
      soft: "#fff1f2",
      dark: "#9f1239",
      gradient: "from-[#e8798f] to-[#be4560]",
    },
    needTitle: "Siapa yang Cocok Konsumsi Oligo?",
    needs: [
      { title: "Pankreatitis Kronis dan Akut" },
      { title: "Gangguan Pencernaan Kronis", description: "IBD & IBS" },
      { title: "Pembedahan Saluran Cerna" },
    ],
    benefitTitle: "Keunggulan Utama Oligo",
    benefits: [
      "100% Protein Terhidrolisa Parsial",
      "Osmolaritas Fisiologis (353 mOsm/L)",
      "Lemak MCT",
      "Rendah Residu, Cepat Serap",
    ],
    ctaLabel: "Beli Sekarang",
    closingTitle: "Terapi Gizi 100% Protein Terhidrolisa Parsial",
    closingDescription:
      "Dapatkan rekomendasi nutrisi yang sesuai dengan kondisi Anda untuk membantu proses pemulihan lebih optimal.",
  },
  {
    slug: "peptisol",
    name: "PEPTISOL",
    category: "Pemulihan",
    heroTitle: "Solusi Gizi dengan Formula Tinggi Protein untuk Pemulihan Pasca Sakit",
    description:
      "Peptisol adalah nutrisi tinggi protein dan zinc untuk kondisi Protein Energy Malnutrition (PEM) guna mempercepat pemulihan luka dan memenuhi kebutuhan protein harian.",
    theme: {
      primary: "#d85b70",
      soft: "#fff1f2",
      dark: "#9f1239",
      gradient: "from-[#e8798f] to-[#be4560]",
    },
    needTitle: "Siapa yang Cocok Konsumsi Peptisol?",
    needs: [
      { title: "Pasien Pasca Operasi" },
      { title: "Ibu Hamil dengan Kondisi KEK" },
      { title: "Berkurangnya Asupan Protein Harian" },
    ],
    benefitTitle: "Keunggulan Utama Peptisol",
    benefits: [
      "Tinggi Zinc (20% AKG)",
      "Tinggi Protein (13 gr/saji)",
      "Rendah Laktosa",
      "Dual Protein Source",
    ],
    ctaLabel: "Beli Sekarang",
    closingTitle: "Dukung Kesehatan dengan Nutrisi yang Tepat",
    closingDescription:
      "Dapatkan rekomendasi nutrisi yang sesuai dengan kondisi Anda untuk membantu proses pemulihan lebih optimal.",
  },
  {
    slug: "pulmosol",
    name: "PULMOSOL",
    category: "Pernafasan",
    heroTitle: "Solusi Gizi Masalah Pernafasan PPOK, Asma, Pneumonia, dan TB Paru",
    description:
      "Pulmosol merupakan inovasi terbaru dari Medikal Nutrience sebagai produk pertama di Indonesia yang diformulasi untuk membantu meringankan sesak napas karena gangguan pernapasan.",
    theme: {
      primary: "#1e3a8a",
      soft: "#eff6ff",
      dark: "#172554",
      gradient: "from-[#1d4ed8] to-[#172554]",
    },
    needTitle: "Siapa yang Membutuhkan Pulmosol?",
    needs: [
      {
        title: "PPOK",
        description: "Bronkitis dan emfisema, untuk membantu memenuhi kebutuhan nutrisi harian.",
      },
      {
        title: "Serangan Asma",
        description: "Sebagai tambahan energi dan asupan gizi.",
      },
      {
        title: "TB Paru dan Pneumonia",
        description: "Mendukung tubuh agar pulih lebih optimal.",
      },
    ],
    benefitTitle: "Keunggulan Utama Pulmosol",
    benefits: [
      "Komposisi Karbohidrat Rendah",
      "Tinggi Lemak",
      "Tinggi Protein",
      "Sumber Vitamin, Mineral, Antioksidan",
    ],
    ctaLabel: "Beli Sekarang",
    closingTitle: "Solusi untuk Masalah Pernapasanmu",
    closingDescription:
      "Dapatkan rekomendasi nutrisi yang sesuai dengan kondisi Anda untuk membantu proses pemulihan lebih optimal.",
  },
];

export function getProductBySlug(slug: string) {
  return productDetails.find((product) => product.slug === slug);
}
