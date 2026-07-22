export type FaqItem = {
  category: string;
  question: string;
  answer: string;
  ctaLabel?: string;
  ctaHref?: string;
};


export const faqs: FaqItem[] = [

  {
    category:"Tentang Medikal Nutrience",
    question:"Apa itu Medikal Nutrience?",
    answer:
      "Medical Nutrience menyediakan berbagai produk nutrisi medis yang dirancang untuk mendukung kebutuhan nutrisi pada berbagai kondisi kesehatan maupun untuk menjaga kesehatan sehari-hari."
  },


  {
    category:"Produk",
    question:"Apakah produk nutrisi Medical Nutrience boleh diseduh dengan air panas?",
    answer:
      "Sebaiknya gunakan air hangat sesuai petunjuk penyajian pada kemasan produk. Penggunaan air yang terlalu panas dapat memengaruhi kualitas beberapa kandungan nutrisi."
  },


  {
    category:"Produk",
    question:"Apakah produk ini dapat dikonsumsi setiap hari?",
    answer:
      "Produk dapat dikonsumsi sesuai dengan kebutuhan nutrisi dan anjuran penggunaan yang tertera pada kemasan. Untuk kondisi kesehatan tertentu, sebaiknya berkonsultasi dengan dokter atau ahli gizi."
  },


  {
    category:"Produk",
    question:"Apakah produk Medical Nutrience cocok untuk lansia?",
    answer:
      "Beberapa produk Medical Nutrience dirancang untuk memenuhi kebutuhan nutrisi orang dewasa dan lansia. Pilihan produk dapat disesuaikan dengan kondisi dan kebutuhan masing-masing."
  },


  {
    category:"Produk",
    question:"Apakah produk Medical Nutrience dapat dikonsumsi oleh anak-anak?",
    answer:
      "Tidak semua produk diperuntukkan bagi anak-anak. Untuk kebutuhan nutrisi anak, kami menyediakan produk Entrakid yang diformulasikan khusus untuk mendukung tumbuh kembang anak."
  },


  {
    category:"Produk",
    question:"Bagaimana cara penyimpanan produk setelah kemasan dibuka?",
    answer:
      "Simpan produk sesuai petunjuk pada kemasan, di tempat yang sejuk dan kering, serta tutup rapat setelah digunakan."
  },


  {
    category:"Produk",
    question:"Apa perbedaan Entramix dan Entrasoy?",
    answer:
      "Entramix merupakan nutrisi berbasis susu, sedangkan Entrasoy merupakan nutrisi berbasis kedelai yang dapat menjadi alternatif bagi konsumen yang tidak mengonsumsi susu sapi."
  },


  {
    category:"Nutrition Finder",
    question:"Bagaimana cara memilih produk yang sesuai?",
    answer:
      "Anda dapat menggunakan fitur Temukan Nutrisi pada website untuk mendapatkan rekomendasi produk sesuai kebutuhan, atau berkonsultasi melalui fitur Konsultasi.",
    ctaLabel:"Coba Nutrition Finder",
    ctaHref:"/"
  },


  {
    category:"Nutrition Finder",
    question:"Bagaimana jika saya masih bingung memilih produk?",
    answer:
      "Anda dapat menggunakan fitur Temukan Nutrisi atau menghubungi kami melalui fitur Konsultasi untuk mendapatkan informasi yang lebih sesuai dengan kebutuhan Anda."
  },


  {
    category:"Kondisi Kesehatan",
    question:"Bagaimana jika saya memiliki kondisi kesehatan tertentu?",
    answer:
      "Medical Nutrience menyediakan produk nutrisi untuk berbagai kebutuhan seperti ginjal, hati, pernapasan, pencernaan, pemulihan setelah sakit atau operasi, serta tumbuh kembang anak."
  },


  {
    category:"Pembelian",
    question:"Di mana saya dapat membeli produk Medical Nutrience?",
    answer:
      "Produk Medical Nutrience dapat diperoleh melalui rumah sakit, apotek, atau menggunakan fitur Cari Apotek pada website untuk menemukan lokasi yang menyediakan produk kami.",
    ctaLabel:"Cari Apotek",
    ctaHref:"/apotek-resmi"
  },


  {
    category:"Konsultasi",
    question:"Apakah saya memerlukan resep dokter untuk membeli produk ini?",
    answer:
      "Sebagian besar produk nutrisi dapat diperoleh tanpa resep. Namun, untuk produk dengan kebutuhan nutrisi khusus, disarankan berkonsultasi dengan tenaga kesehatan terlebih dahulu."
  },


  {
    category:"Konsultasi",
    question:"Bagaimana jika saya memiliki alergi terhadap susu sapi?",
    answer:
      "Medical Nutrience menyediakan pilihan produk Entrasoy, yaitu nutrisi berbasis kedelai sebagai alternatif bagi konsumen yang tidak mengonsumsi susu sapi."
  },


  {
    category:"Support System",
    question:"Apakah saya bisa mengunduh brosur atau materi edukasi?",
    answer:
      "Ya. Beberapa halaman produk menyediakan brosur yang dapat diunduh. Selain itu, tersedia berbagai materi edukasi melalui halaman Support System."
  },


  {
    category:"Event",
    question:"Bagaimana cara mengikuti event Medical Nutrience?",
    answer:
      "Buka menu Event, pilih kegiatan yang ingin diikuti, lalu isi formulir pendaftaran secara online.",
    ctaLabel:"Lihat Event",
    ctaHref:"/event"
  },


  {
    category:"Kontak",
    question:"Siapa yang dapat saya hubungi jika memiliki pertanyaan lebih lanjut?",
    answer:
      "Silakan hubungi kami melalui halaman Kontak atau kanal konsultasi yang tersedia pada website."
  }

];


export const faqCategories = [
  "Semua",
  ...Array.from(new Set(faqs.map((faq)=>faq.category)))
];
