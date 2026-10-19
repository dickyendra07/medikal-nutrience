const faqs = [
  {
    question: "Apa itu Medikal Nutrience?",
    answer:
      "Medikal Nutrience menyediakan berbagai produk nutrisi medis yang dirancang untuk mendukung kebutuhan nutrisi pada berbagai kondisi kesehatan maupun untuk menjaga kesehatan sehari-hari. Produk dapat digunakan sesuai rekomendasi tenaga kesehatan atau sesuai kebutuhan nutrisi masing-masing.",
  },
  {
    question: "Bagaimana cara memilih produk yang sesuai?",
    answer:
      "Anda dapat menggunakan fitur Nutrition Finder di website Medikal Nutrience. Cukup jawab beberapa pertanyaan sederhana, dan sistem akan membantu merekomendasikan produk yang sesuai dengan kebutuhan Anda.",
    ctaLabel: "Coba Nutrition Finder",
    ctaHref: "/",
  },
  {
    question: "Apakah produk Medikal Nutrience dapat dikonsumsi setiap hari?",
    answer:
      "Setiap produk memiliki tujuan penggunaan yang berbeda. Beberapa produk dapat dikonsumsi sebagai nutrisi harian, sementara produk lainnya ditujukan untuk kondisi kesehatan tertentu. Selalu ikuti petunjuk penggunaan pada kemasan atau konsultasikan dengan tenaga kesehatan.",
  },
  {
    question: "Di mana saya dapat membeli produk Medikal Nutrience?",
    answer:
      "Produk Medikal Nutrience tersedia di rumah sakit, apotek, serta distributor resmi. Anda juga dapat menggunakan fitur Cari Apotek untuk menemukan lokasi terdekat.",
    ctaLabel: "Cari Apotek",
    ctaHref: "/apotek-resmi",
  },
  {
    question: "Apakah saya memerlukan resep dokter?",
    answer:
      "Sebagian besar produk nutrisi dapat diperoleh tanpa resep. Namun, untuk produk yang ditujukan bagi kondisi kesehatan tertentu, kami menyarankan berkonsultasi dengan dokter atau ahli gizi sebelum mengonsumsinya.",
  },
  {
    question: "Apa perbedaan Entramix dan Entrasoy?",
    answer:
      "Entramix merupakan nutrisi berbasis susu. Entrasoy merupakan nutrisi berbasis protein kedelai yang dapat menjadi alternatif bagi Anda yang tidak mengonsumsi susu sapi atau lebih memilih nutrisi berbasis kedelai.",
  },
  {
    question: "Bagaimana jika saya memiliki kondisi kesehatan tertentu?",
    answer:
      "Medikal Nutrience menyediakan produk nutrisi untuk berbagai kebutuhan seperti ginjal, hati, stroke, pernapasan, pencernaan, pemulihan setelah sakit atau operasi, serta tumbuh kembang anak. Gunakan fitur Nutrition Finder atau konsultasikan dengan tenaga kesehatan untuk membantu menentukan pilihan yang sesuai.",
  },
  {
    question: "Apakah saya bisa mengunduh brosur atau materi edukasi?",
    answer:
      "Ya. Beberapa halaman produk menyediakan brosur yang dapat diunduh. Selain itu, halaman MERAKIDS menyediakan berbagai aktivitas edukatif seperti gambar mewarnai, diary si kecil, dan panduan origami.",
  },
  {
    question: "Bagaimana cara mengikuti event Medikal Nutrience?",
    answer:
      "Buka menu Event, pilih kegiatan yang ingin diikuti, lalu isi formulir pendaftaran secara online. Anda akan menerima informasi lebih lanjut setelah registrasi berhasil.",
  },
  {
    question: "Siapa yang dapat saya hubungi jika memiliki pertanyaan lebih lanjut?",
    answer:
      "Silakan hubungi kami melalui halaman Kontak atau tombol WhatsApp yang tersedia di website. Tim kami akan membantu menjawab pertanyaan Anda.",
    ctaLabel: "Hubungi Kami",
    ctaHref: "/kontak",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="bg-[#f4fbf8] px-5 py-16 md:py-24 lg:px-10">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="reveal text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#006b3f]">
            FAQ
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-medium leading-7 text-[#64748b] md:text-base">
            Temukan jawaban singkat seputar produk, cara memilih nutrisi, apotek,
            event, dan kanal konsultasi Medikal Nutrience.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {faqs.map((faq, index) => (
            <article
              key={faq.question}
              className="reveal rounded-[1.5rem] border border-black/5 bg-white p-6 shadow-lg shadow-slate-900/5 md:p-7"
            >
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e4f8ed] text-sm font-black text-[#006b3f]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h3 className="text-lg font-black leading-tight text-[#111827] md:text-xl">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-[#64748b] md:text-base md:leading-8">
                    {faq.answer}
                  </p>

                  {faq.ctaLabel && faq.ctaHref ? (
                    <a
                      href={faq.ctaHref}
                      className="mt-5 inline-flex rounded-full bg-[#006b3f] px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-[#005635]"
                    >
                      {faq.ctaLabel}
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
