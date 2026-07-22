export type FaqItem = {
  category: string;
  question: string;
  answer: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export const faqs: FaqItem[] = [
  {
    category: "Tentang Medikal Nutrience",
    question: "Apa itu Medikal Nutrience?",
    answer:
      "Medikal Nutrience menyediakan berbagai produk nutrisi medis yang dirancang untuk mendukung kebutuhan nutrisi pada berbagai kondisi kesehatan maupun untuk menjaga kesehatan sehari-hari. Produk dapat digunakan sesuai rekomendasi tenaga kesehatan atau sesuai kebutuhan nutrisi masing-masing.",
  },
  {
    category: "Nutrition Finder",
    question: "Bagaimana cara memilih produk yang sesuai?",
    answer:
      "Anda dapat menggunakan fitur Nutrition Finder di website Medikal Nutrience. Cukup jawab beberapa pertanyaan sederhana, dan sistem akan membantu merekomendasikan produk yang sesuai dengan kebutuhan Anda.",
    ctaLabel: "Coba Nutrition Finder",
    ctaHref: "/",
  },
  {
    category: "Produk",
    question: "Apakah produk Medikal Nutrience dapat dikonsumsi setiap hari?",
    answer:
      "Setiap produk memiliki tujuan penggunaan yang berbeda. Beberapa produk dapat dikonsumsi sebagai nutrisi harian, sementara produk lainnya ditujukan untuk kondisi kesehatan tertentu. Selalu ikuti petunjuk penggunaan pada kemasan atau konsultasikan dengan tenaga kesehatan.",
  },
  {
    category: "Pembelian",
    question: "Di mana saya dapat membeli produk Medikal Nutrience?",
    answer:
      "Produk Medikal Nutrience tersedia di rumah sakit, apotek, serta distributor resmi. Anda juga dapat menggunakan fitur Cari Apotek untuk menemukan lokasi terdekat.",
    ctaLabel: "Cari Apotek",
    ctaHref: "/apotek-resmi",
  },
  {
    category: "Produk",
    question: "Apakah saya memerlukan resep dokter?",
    answer:
      "Sebagian besar produk nutrisi dapat diperoleh tanpa resep. Namun, untuk produk yang ditujukan bagi kondisi kesehatan tertentu, kami menyarankan berkonsultasi dengan dokter atau ahli gizi sebelum mengonsumsinya.",
  },
  {
    category: "Produk",
    question: "Apa perbedaan Entramix dan Entrasoy?",
    answer:
      "Entramix merupakan nutrisi berbasis susu. Entrasoy merupakan nutrisi berbasis protein kedelai yang dapat menjadi alternatif bagi Anda yang tidak mengonsumsi susu sapi atau lebih memilih nutrisi berbasis kedelai.",
  },
  {
    category: "Kondisi Kesehatan",
    question: "Bagaimana jika saya memiliki kondisi kesehatan tertentu?",
    answer:
      "Medikal Nutrience menyediakan produk nutrisi untuk berbagai kebutuhan seperti ginjal, hati, stroke, pernapasan, pencernaan, pemulihan setelah sakit atau operasi, serta tumbuh kembang anak. Gunakan fitur Nutrition Finder atau konsultasikan dengan tenaga kesehatan untuk membantu menentukan pilihan yang sesuai.",
  },
  {
    category: "Support System",
    question: "Apakah saya bisa mengunduh brosur atau materi edukasi?",
    answer:
      "Ya. Beberapa halaman produk menyediakan brosur yang dapat diunduh. Selain itu, halaman MERAKIDS menyediakan berbagai aktivitas edukatif seperti gambar mewarnai, diary si kecil, dan panduan origami.",
  },
  {
    category: "Event",
    question: "Bagaimana cara mengikuti event Medikal Nutrience?",
    answer:
      "Buka menu Event, pilih kegiatan yang ingin diikuti, lalu isi formulir pendaftaran secara online. Anda akan menerima informasi lebih lanjut setelah registrasi berhasil.",
    ctaLabel: "Lihat Event",
    ctaHref: "/event",
  },
  {
    category: "Kontak",
    question: "Siapa yang dapat saya hubungi jika memiliki pertanyaan lebih lanjut?",
    answer:
      "Silakan hubungi kami melalui halaman Kontak atau tombol WhatsApp yang tersedia di website. Tim kami akan membantu menjawab pertanyaan Anda.",
    ctaLabel: "Hubungi Kami",
    ctaHref: "/kontak",
  },
];

export const faqCategories = [
  "Semua",
  ...Array.from(new Set(faqs.map((faq) => faq.category))),
];
