import type { Metadata } from "next";
import { PageShell } from "@/components/shared/PageShell";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Medikal Nutrience",
  description:
    "Kebijakan Privasi Website Medikal Nutrience mengenai pengelolaan dan perlindungan data pribadi pengguna.",
};

const sections = [
  {
    title: "Pendahuluan",
    content: `
Kami adalah PT. Finusolprima Farma Internasional.

Dalam penyediaan layanan ini, Data Pribadi Anda akan dikendalikan oleh PT. Finusolprima Farma Internasional yang merupakan bagian dari Grup Kalbe dan bertindak sebagai Pengendali Data Pribadi.

Kebijakan Privasi ini menjelaskan informasi terkait pemrosesan Data Pribadi yang Kami lakukan mulai dari pemerolehan, pengumpulan, analisis, penyimpanan, perubahan, penghapusan, dan bentuk pengelolaan lainnya.
`,
  },
  {
    title: "Dasar Pemrosesan Data Pribadi",
    content: `
Kami memproses Data Pribadi Anda berdasarkan:

• Persetujuan (Consent)
• Pemenuhan pelaksanaan perjanjian
• Pemenuhan kewajiban hukum
• Kepentingan yang sah (Legitimate Interest)
`,
  },
  {
    title: "Cara Kami Memperoleh Data Pribadi",
    content: `
Data Pribadi Anda dapat diperoleh melalui:

• Data yang diberikan langsung oleh Anda.
• Data yang terekam saat menggunakan layanan Kami.
• Data yang diperoleh melalui pihak ketiga sesuai peraturan yang berlaku.
`,
  },
  {
    title: "Tujuan Pemrosesan Data",
    content: `
Kami memproses Data Pribadi untuk:

• Menyediakan layanan dan pengalaman pengguna.
• Memberikan rekomendasi yang sesuai kebutuhan.
• Berkomunikasi mengenai layanan dan informasi terkait.
• Aktivitas analisis dan pemasaran.
`,
  },
  {
    title: "Jenis Data Pribadi Yang Dikumpulkan",
    content: `
Data Umum:

• Nama lengkap
• Usia
• Jenis kelamin
• Nomor WhatsApp
• Email
• Data teknis seperti IP Address, Cookies, dan ID perangkat


Data Spesifik:

• Informasi kesehatan
• Kebutuhan atau kondisi kesehatan pengguna
`,
  },
  {
    title: "Hak Subjek Data Pribadi",
    content: `
Anda memiliki hak untuk:

• Mendapatkan informasi mengenai penggunaan data.
• Memperbaiki data yang tidak sesuai.
• Mendapatkan akses dan salinan data.
• Meminta penghapusan data sesuai ketentuan.
• Menarik kembali persetujuan pemrosesan data.
`,
  },
  {
    title: "Keamanan Data Pribadi",
    content: `
Kami menerapkan langkah keamanan fisik, elektronik, dan organisasi untuk menjaga keamanan Data Pribadi Anda.

Pemrosesan data oleh pihak ketiga dilakukan berdasarkan perjanjian dan tujuan yang telah ditentukan.
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
    <PageShell>

      <section className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-[#006b3f]
        via-[#00894f]
        to-[#10b981]
        px-6
        py-24
        text-white
      ">

        <div className="
          absolute
          right-0
          top-0
          h-96
          w-96
          rounded-full
          bg-white/10
          blur-3xl
        "/>


        <div className="
          relative
          mx-auto
          max-w-7xl
        ">

          <p className="
            text-xs
            font-black
            tracking-[0.35em]
            text-white/70
          ">
            LEGAL & PRIVACY
          </p>


          <h1 className="
            mt-6
            max-w-3xl
            text-5xl
            font-black
            leading-tight
            md:text-7xl
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
            Komitmen Medikal Nutrience dalam menjaga keamanan,
            transparansi, dan perlindungan data pribadi pengguna.
          </p>

        </div>

      </section>



      <section className="
        px-6
        py-20
      ">

        <div className="
          mx-auto
          grid
          max-w-7xl
          gap-10
          lg:grid-cols-[280px_1fr]
        ">


          <aside className="
            hidden
            h-fit
            rounded-[2rem]
            bg-white
            p-6
            shadow-sm
            lg:block
            lg:sticky
            lg:top-28
          ">

            <p className="
              text-xs
              font-black
              tracking-widest
              text-[#006b3f]
            ">
              DAFTAR ISI
            </p>


            <div className="mt-6 space-y-3">

            {sections.map((item,index)=>(
              <div
                key={item.title}
                className="
                  text-sm
                  font-bold
                  text-slate-500
                "
              >
                {index + 1}. {item.title}
              </div>
            ))}

            </div>

          </aside>



          <div className="space-y-6">

          {sections.map((section,index)=>(

            <article
              key={section.title}
              className="
                rounded-[2rem]
                border
                border-slate-100
                bg-white
                p-8
                shadow-sm
                transition
                hover:shadow-md
                md:p-10
              "
            >

              <div className="
                flex
                items-start
                gap-5
              ">

                <div className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#e5f7ee]
                  font-black
                  text-[#006b3f]
                ">
                  {index + 1}
                </div>


                <div>

                <h2 className="
                  text-2xl
                  font-black
                  text-[#111827]
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

                </div>

              </div>

            </article>

          ))}

          </div>

        </div>

      </section>

    </PageShell>
  );
}
