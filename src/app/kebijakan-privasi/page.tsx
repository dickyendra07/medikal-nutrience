import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Medikal Nutrience",
  description:
    "Kebijakan Privasi Website Medikal Nutrience mengenai pengelolaan dan perlindungan data pribadi pengguna.",
};

const sections = [
  {
    title: "Pendahuluan",
    content: `
Kami adalah PT. Finusolprima Farma Internasional. Dalam rangka penyediaan layanan ini,
Data Pribadi Anda akan dikendalikan oleh PT. Finusolprima Farma Internasional yang
merupakan bagian dari Grup Kalbe dan bertindak sebagai Pengendali Data Pribadi.

Kebijakan Privasi ini menjelaskan informasi terkait pemrosesan Data Pribadi yang Kami
lakukan mulai dari pemerolehan, pengumpulan, analisis, penyimpanan, perubahan,
penghapusan, dan bentuk pengelolaan lainnya.
`,
  },
  {
    title: "Dasar Pemrosesan Data Pribadi",
    content: `
Kami melakukan pemrosesan Data Pribadi berdasarkan:
• Persetujuan (Consent)
• Pemenuhan pelaksanaan perjanjian
• Pemenuhan kewajiban hukum
• Pemenuhan kepentingan yang sah (Legitimate Interest)
`,
  },
  {
    title: "Cara Kami Memperoleh Data Pribadi",
    content: `
Data Pribadi dapat diperoleh dari:
• Data yang diberikan langsung maupun tidak langsung oleh Anda.
• Data yang terekam saat Anda menggunakan layanan Kami.
• Data yang dikumpulkan oleh pihak ketiga sesuai peraturan yang berlaku.
`,
  },
  {
    title: "Tujuan Pemrosesan Data Pribadi",
    content: `
Data Pribadi Anda diproses untuk:
• Menyediakan layanan dan memberikan pengalaman yang relevan.
• Memahami kebutuhan pengguna dan memberikan rekomendasi personal.
• Berkomunikasi terkait layanan dan informasi Grup Kalbe.
• Aktivitas pemasaran dan analisis.
`,
  },
  {
    title: "Jenis Data Pribadi Yang Dikumpulkan",
    content: `
Data yang dapat dikumpulkan meliputi:

Data Umum:
• Nama lengkap
• Usia
• Jenis kelamin
• Nomor WhatsApp
• Email
• Data teknis seperti IP Address, cookies, dan ID perangkat

Data Spesifik:
• Informasi terkait kesehatan
• Kebutuhan atau kondisi kesehatan pengguna
`,
  },
  {
    title: "Hak Subjek Data Pribadi",
    content: `
Anda memiliki hak untuk:
• Mendapatkan informasi mengenai pemrosesan Data Pribadi.
• Memperbaiki data yang tidak akurat.
• Mendapatkan akses dan salinan data.
• Meminta penghapusan data sesuai ketentuan.
• Menarik persetujuan pemrosesan data.
`,
  },
  {
    title: "Keamanan Data Pribadi",
    content: `
Kami menerapkan langkah keamanan fisik, elektronik, dan organisasi yang sesuai
untuk menjaga Data Pribadi Anda.

Kami juga memastikan pemrosesan oleh pihak ketiga dilakukan berdasarkan
ketentuan dan tujuan yang telah ditetapkan.
`,
  },
  {
    title: "Hubungi Kami",
    content: `
PT. Finusolprima Farma Internasional
(A Kalbe Company)

Jl. Jend. Ahmad Yani No. 2 RT. 3/RW. 13
Kayu Putih, Kec. Pulo Gadung,
Pulomas Jakarta Timur 13210

Telp 021 – 5086 7667
`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white">

      <section className="
        bg-gradient-to-br
        from-[#006b3f]
        to-[#10b981]
        px-6
        py-24
        text-white
      ">
        <div className="mx-auto max-w-5xl">

          <p className="
            text-xs
            font-black
            tracking-[0.3em]
            text-white/70
          ">
            MEDIKAL NUTRIENCE
          </p>

          <h1 className="
            mt-6
            text-5xl
            font-black
            leading-tight
            md:text-6xl
          ">
            Kebijakan Privasi
          </h1>

          <p className="
            mt-6
            max-w-2xl
            text-lg
            leading-8
            text-white/80
          ">
            Informasi mengenai pengelolaan, perlindungan,
            dan penggunaan data pribadi pengguna Website Medikal Nutrience.
          </p>

        </div>
      </section>


      <section className="
        px-6
        py-20
      ">
        <div className="
          mx-auto
          max-w-5xl
          space-y-8
        ">

        {sections.map((section)=>(
          <article
            key={section.title}
            className="
              rounded-[2rem]
              border
              border-slate-100
              bg-white
              p-8
              shadow-sm
              md:p-10
            "
          >

            <h2 className="
              text-2xl
              font-black
              text-[#006b3f]
            ">
              {section.title}
            </h2>

            <p className="
              mt-5
              whitespace-pre-line
              text-sm
              leading-8
              text-slate-600
            ">
              {section.content}
            </p>

          </article>
        ))}

        </div>
      </section>

    </main>
  );
}
