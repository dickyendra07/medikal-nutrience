export const supportItems = [
  {
    slug: "kalkulator-status-gizi",
    title: "Kalkulator Status Gizi",
    eyebrow: "BMI Calculator",
    description:
      "Gunakan kalkulator kesehatan untuk mengetahui gambaran awal status gizi berdasarkan tinggi dan berat badan.",
    heroTitle: "Cek Status Gizi Anda dengan Mudah",
    color: "#006b3f",
    soft: "#e4f8ed",
  },
  {
    slug: "kisah-sukses-pasien",
    title: "Kisah Sukses Pasien",
    eyebrow: "Patient Story",
    description:
      "Baca cerita inspiratif perjalanan pasien dalam menjaga asupan nutrisi dan kualitas hidup.",
    heroTitle: "Cerita Perjalanan Nutrisi yang Menginspirasi",
    color: "#0f766e",
    soft: "#ecfdf5",
  },
  {
    slug: "dapur-sehat-fima",
    title: "Dapur Sehat Fima",
    eyebrow: "Healthy Kitchen",
    description:
      "Inspirasi menu, resep, dan panduan makanan sehat untuk membantu memenuhi kebutuhan nutrisi harian.",
    heroTitle: "Inspirasi Menu Sehat untuk Keluarga",
    color: "#f59e0b",
    soft: "#fff7ed",
  },
  {
    slug: "komunitas-sehat",
    title: "Komunitas Sehat",
    eyebrow: "Healthy Community",
    description:
      "Ruang edukasi, aktivitas, dan dukungan komunitas untuk membangun kebiasaan hidup sehat.",
    heroTitle: "Bersama Membangun Kebiasaan Hidup Sehat",
    color: "#1e3a8a",
    soft: "#eff6ff",
  },
];

export const patientStories = [
  {
    title: "\"Luka Operasi Cepat Kering\"",
    description:
      "Setelah operasi, badan terasa lemas dan luka masih basah. Dengan dukungan asupan tinggi protein seperti Peptisol, proses pemulihan dapat dibantu bersama arahan tenaga kesehatan.",
    tag: "Pemulihan Pasca Operasi",
  },
  {
    title: "\"Bima Akhirnya Doyan Makan!\"",
    description:
      "Cerita orang tua yang mendampingi anak picky eater agar lebih semangat makan dan kebutuhan tumbuh kembangnya lebih terdukung.",
    tag: "Tumbuh Kembang",
  },
  {
    title: "\"Saya Pikir Cuci Darah Adalah Akhir...\"",
    description:
      "Perjalanan pasien ginjal dalam menjaga pola makan, mengikuti arahan ahli gizi, dan mendapatkan dukungan nutrisi yang sesuai.",
    tag: "Pejuang Ginjal",
  },
];

export const recipes = [
  {
    title: "Smoothie Nutrisi Harian",
    description:
      "Ide minuman praktis untuk membantu memenuhi asupan harian dengan cara yang lebih menyenangkan.",
    tag: "Minuman",
  },
  {
    title: "Menu Lembut untuk Pemulihan",
    description:
      "Inspirasi menu lembut untuk kondisi yang membutuhkan asupan lebih mudah dikonsumsi.",
    tag: "Pemulihan",
  },
  {
    title: "Sarapan Seimbang Keluarga",
    description:
      "Panduan menu sederhana untuk membantu keluarga memulai hari dengan nutrisi lebih baik.",
    tag: "Keluarga",
  },
];

export const communityPrograms = [
  {
    title: "Webinar: Diet Tepat Pasien Ginjal di Bulan Puasa",
    description:
      "Sesi edukasi bersama tenaga kesehatan tentang cara menjaga kebutuhan nutrisi pasien ginjal saat berpuasa.",
    tag: "Webinar",
  },
  {
    title: "Kopdar: Parenting Anak Susah Makan",
    description:
      "Sharing session bersama ahli untuk membantu orang tua menghadapi anak susah makan atau picky eater.",
    tag: "Offline Event",
  },
  {
    title: "Senam Jantung Sehat Virtual",
    description:
      "Olahraga ringan yang aman untuk lansia, dipandu instruktur berpengalaman secara virtual.",
    tag: "Virtual Class",
  },
];

export function getSupportItemBySlug(slug: string) {
  return supportItems.find((item) => item.slug === slug);
}
