import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageShell } from "@/components/shared/PageShell";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan Privasi Website Medikal Nutrience mengenai pengelolaan dan pelindungan Data Pribadi.",
};

const tableOfContents = [
  "Dasar Pemrosesan Data Pribadi",
  "Cara Kami Memperoleh Data Pribadi Anda",
  "Tujuan Pemrosesan Data Pribadi",
  "Jenis Data Pribadi yang Dikumpulkan",
  "Jangka Waktu Pemrosesan dan Retensi Data Pribadi",
  "Hak Subjek Data Pribadi",
  "Pemrosesan Data Pribadi Oleh Pihak Ketiga",
  "Keamanan Data Pribadi",
  "Pembaruan Kebijakan Privasi",
  "Hubungi Kami",
] as const;

function LegalSection({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <section id={`bagian-${number}`} aria-labelledby={`judul-bagian-${number}`} className="scroll-mt-28 border-t border-slate-200 pt-10 first:border-t-0 first:pt-0">
      <div className="flex items-start gap-4">
        <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e5f7ee] text-sm font-black text-[#006b3f]">{number}</span>
        <h2 id={`judul-bagian-${number}`} className="pt-1 text-2xl font-black leading-tight tracking-[-0.02em] text-slate-900 md:text-3xl">{title}</h2>
      </div>
      <div className="mt-6 space-y-5 text-[15px] leading-7 text-slate-700 md:text-base md:leading-8">{children}</div>
    </section>
  );
}

function LegalClause({ label, title, children }: { label: string; title?: ReactNode; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3">
      <span className="font-semibold text-slate-900">{label}.</span>
      <div className="min-w-0 space-y-3">
        {title ? <h3 className="font-bold text-slate-900">{title}</h3> : null}
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <header className="relative overflow-hidden bg-gradient-to-br from-[#006b3f] via-[#00894f] to-[#10b981] px-6 py-16 text-white md:py-20">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs font-black tracking-[0.3em] text-white/70">LEGAL &amp; PRIVACY</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight tracking-[-0.035em] md:text-6xl">Kebijakan Privasi Website Medikal Nutrience</h1>
          <p className="mt-4 text-lg font-semibold italic text-white/85 md:text-xl">(Privacy Policy of Website Medikal Nutrience)</p>
          <p className="mt-7 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white">Berlaku mulai tanggal 01 November 2024</p>
        </div>
      </header>

      <main className="bg-[#f6faf8] px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm md:p-10">
            <div className="space-y-5 text-[15px] leading-7 text-slate-700 md:text-base md:leading-8">
              <p>Kami adalah PT. Finusolprima Farma Internasional. Dalam rangka penyediaan layanan ini, Data pribadi Anda akan dikendalikan oleh PT. Finusolprima Farma Internasional, yang merupakan bagian dari Grup Kalbe dan bertindak sebagai Pengendali Data Pribadi untuk keperluan pengelolaan dan pemrosesan data ini. PT. Finusolprima Farma Internasional dapat membagi Data Pribadi Anda kepada perusahaan lain dalam Grup Kalbe dan/atau afiliasi dan/atau mitra kerja yang ditunjuk (untuk selanjutnya disebut sebagai ”Kami”), yang saat ini berkomitmen untuk melindungi kepentingan dan kenyamanan Anda sebagai pelanggan Kami (selanjutnya disebut ”Anda”) termasuk pada lingkup Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (selanjutnya disebut sebagai ”UU PDP”) dan peraturan perundang-undangan lainnya yang terkait dengan Pelindungan Data Pribadi yang ada di Indonesia.</p>
              <p>Kebijakan Privasi ini menjelaskan informasi terkait pemrosesan Data Pribadi yang Kami lakukan dimulai dari pemerolehan, pengumpulan, penganalisisan, penampilan, pengiriman, pengungkapan, penyimpanan, perubahan, penghapusan, dan/atau segala bentuk pengelolaan yang terkait dengan Data Pribadi Anda sebagai wujud kepatuhan Kami terhadap UU PDP dan peraturan perundang-undangan lainnya yang terkait dengan Pelindungan Data Pribadi yang ada di Indonesia. Website MediKAL Nutrience merupakan bagian dari Kami. Dengan melakukan akses terhadap halaman website MediKAL Nutrience, maka Anda menyatakan telah membaca, dan mengerti segala bentuk pemrosesan yang terkait dengan Data Pribadi Anda.</p>
            </div>
          </div>

          <nav aria-label="Daftar isi Kebijakan Privasi" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-black tracking-[0.2em] text-[#006b3f]">DAFTAR ISI</p>
            <ol className="mt-5 grid gap-x-8 gap-y-3 md:grid-cols-2">
              {tableOfContents.map((title, index) => (
                <li key={title}>
                  <a href={`#bagian-${index + 1}`} className="group flex gap-3 text-sm font-semibold leading-6 text-slate-600 transition hover:text-[#006b3f] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16805b]">
                    <span className="text-[#006b3f]">{index + 1}.</span>
                    <span className="group-hover:underline">{title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="mt-8 space-y-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
            <LegalSection number={1} title="Dasar Pemrosesan Data Pribadi">
              <p>Dalam memproses Data Pribadi Anda untuk tujuan-tujuan yang kami sampaikan dalam Kebijakan Privasi ini, Kami akan menggunakan dasar-dasar pemrosesan berikut ini untuk memproses Data Pribadi Anda:</p>
              <div className="space-y-5">
                <LegalClause label="a" title={<>Persetujuan (<em>Consent</em>)</>}><p>Kami membutuhkan persetujuan Anda dalam melakukan pemrosesan Data Pribadi untuk tujuan-tujuan tertentu dan apabila disyaratkan oleh peraturan perundang-undangan yang berlaku.</p></LegalClause>
                <LegalClause label="b" title="Pemenuhan Pelaksanaan Perjanjian"><p>Kami dapat memproses Data Pribadi Anda jika diperlukan dalam hal melakukan transaksi atau pengiriman produk yang dibeli oleh Anda.</p></LegalClause>
                <LegalClause label="c" title="Pemenuhan Kewajiban Hukum"><p>Kami dapat memproses Data Pribadi Anda jika diwajibkan oleh hukum dan peraturan perundang-undangan yang berlaku, putusan pengadilan, atau perintah pejabat atau instansi negara yang berwenang.</p></LegalClause>
                <LegalClause label="d" title={<>Pemenuhan Kepentingan yang Sah (<em>Legitimate Interest</em>)</>}><p>Kami dapat memproses Data Pribadi Anda jika diperlukan berdasarkan kepentingan Kami yang sah lainnya, seperti pengembangan produk atau pencegahan penipuan, dengan tetap memperhatikan tujuan, kebutuhan, dan keseimbangan kepentingan Kami dan hak Anda sebagai Subjek Data Pribadi.</p></LegalClause>
              </div>
            </LegalSection>

            <LegalSection number={2} title="Cara Kami Memperoleh Data Pribadi Anda">
              <p>Pengumpulan Data Pribadi Anda diperoleh dari:</p>
              <div className="space-y-4">
                <LegalClause label="a"><p>Data yang diserahkan oleh Anda secara langsung atau tidak langsung;</p></LegalClause>
                <LegalClause label="b"><p>Data yang didapat saat Anda melakukan pendaftaran akun dan/atau yang terekam secara otomatis pada sistem elektronik yang dimiliki dan/atau dioperasikan oleh Kami; dan</p></LegalClause>
                <LegalClause label="c"><p>Data yang diperoleh melalui pihak ketiga dengan tetap memperhatikan peraturan perundang-undangan yang berlaku.</p></LegalClause>
              </div>
            </LegalSection>

            <LegalSection number={3} title="Tujuan Pemrosesan Data Pribadi">
              <p>Kami memproses Data Pribadi Anda untuk tujuan-tujuan sebagai berikut:</p>
              <div className="space-y-4">
                <LegalClause label="a"><p>Memproses transaksi/pesanan: Mengirimkan produk, memberikan info pengiriman, bantuan pelanggan, dan verifikasi transaksi. Kami menggunakan data rekening untuk proses transaksi, alamat e-mail Anda sebagai bentuk notifikasi dan komunikasi, serta alamat terdaftar untuk pengiriman produk Kami;</p></LegalClause>
                <LegalClause label="b"><p>Menyediakan layanan: Mengidentifikasi Anda sebagai pengguna, memahami pengalaman Anda, melakukan survei, menyediakan info yang relevan, tren aktivitas, memahami Anda untuk membuat rekomendasi dan personalisasi. Kami mengumpulkan data identitas, data pencarian, cookies, data lokasi riil, dan data riwayat Anda untuk aktivitas ini;</p></LegalClause>
                <LegalClause label="c"><p>Pemasaran dan analisis dalam penelitian: Memberikan informasi penawaran dan iklan yang relevan dengan Anda. Kami mengumpulkan data pencarian, cookies, IP address, dan data riwayat Anda untuk aktivitas ini;</p></LegalClause>
                <LegalClause label="d"><p>Berkomunikasi dengan Anda melalui saluran yang berbeda terkait layanan organisasi Grup Kalbe dan untuk menanggapi permintaan Anda. Kami memproses alamat e-mail, ID akun, nama, dan alamat terdaftar untuk tujuan ini;</p></LegalClause>
                <LegalClause label="e"><p>Mematuhi kewajiban: Kepatuhan hukum dan pencegahan penipuan. Untuk tujuan ini Kami menggunakan data identitas, kontak, transaksi, dan profil akun; dan</p></LegalClause>
                <LegalClause label="f"><p>Mengungkapkan dan membagikan informasi Anda atas kondisi tertentu yang diperbolehkan oleh peraturan perundang-undangan yang berlaku dan/atau atas persetujuan Anda.</p></LegalClause>
              </div>
            </LegalSection>

            <LegalSection number={4} title="Jenis Data Pribadi yang Dikumpulkan">
              <p>Informasi mengenai Data Pribadi Anda yang dikumpulkan oleh Kami untuk memenuhi tujuan pemrosesan Data Pribadi Kami adalah sebagai berikut:</p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16805b]" role="region" aria-label="Tabel jenis Data Pribadi yang dikumpulkan" tabIndex={0}>
                <table className="min-w-[720px] w-full border-collapse text-left text-sm leading-6 text-slate-700 md:text-[15px]">
                  <caption className="sr-only">Kategori dan informasi Data Pribadi yang dikumpulkan</caption>
                  <thead><tr className="bg-[#eef8f3] text-slate-900"><th scope="col" className="w-[24%] border-b border-r border-slate-200 px-5 py-4 font-black">Kategori Data</th><th scope="col" className="border-b border-slate-200 px-5 py-4 font-black">Informasi Data</th></tr></thead>
                  <tbody>
                    <tr className="align-top">
                      <th scope="row" className="border-b border-r border-slate-200 px-5 py-5 text-base font-bold text-slate-900">Data Umum</th>
                      <td className="border-b border-slate-200 px-5 py-5"><div className="space-y-5">
                        <div><p>a. Data terkait identitas Anda, seperti:</p><ul className="mt-2 list-disc space-y-1 pl-8"><li>Nama Lengkap;</li><li>Usia; dan</li><li>Jenis kelamin;</li></ul></div>
                        <div><p>b. Informasi kontak Anda, seperti:</p><ul className="mt-2 list-disc space-y-1 pl-8"><li>Nomor whatsapp; dan</li><li>Alamat surat elektronik.</li></ul></div>
                        <div><p>c. Data teknis Anda, seperti:</p><ul className="mt-2 list-disc space-y-1 pl-8"><li>Alamat IP;</li><li>Cookies; dan</li><li>ID perangkat</li></ul></div>
                      </div></td>
                    </tr>
                    <tr className="align-top">
                      <th scope="row" className="border-r border-slate-200 px-5 py-5 text-base font-bold text-slate-900">Data Spesifik</th>
                      <td className="px-5 py-5"><p>a. Data terkait kesehatan Anda, seperti:</p><ul className="mt-2 list-disc space-y-1 pl-8"><li>Jenis Kelamin;</li><li>Usia;</li><li>Tinggi (cm);</li><li>Berat (kg);</li><li>Aktivitas Harian; dan</li><li>Kebutuhan/Kondisi.</li></ul></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </LegalSection>

            <LegalSection number={5} title="Jangka Waktu Pemrosesan dan Retensi Data Pribadi">
              <p>Kami akan mulai memproses Data Pribadi Anda sejak pertama kali Anda menggunakan atau mendaftar layanan Kami, dan akan terus memprosesnya selama Anda masih menjadi pelanggan atau menggunakan layanan Kami. Setelah hubungan hukum berakhir, Data Pribadi Anda akan disimpan berdasarkan kebijakan retensi Kami dan sejauh yang diizinkan oleh UU PDP dan/atau peraturan perundang-undangan yang berlaku.</p>
              <p>Kami juga dapat menyimpan dan/atau memproses Data Pribadi Anda di luar wilayah Indonesia, dengan tetap mematuhi ketentuan peraturan perundang-undangan yang berlaku. Jika Data Pribadi Anda tidak lagi diperlukan, dan tidak ada kewajiban hukum untuk menyimpannya, Kami akan menghapus, memusnahkan, atau menganonimkan Data Pribadi tersebut sesuai prosedur internal. Permintaan penutupan akun oleh Anda akan ditindaklanjuti dengan penghapusan Data Pribadi, kecuali diatur lain oleh hukum.</p>
            </LegalSection>

            <LegalSection number={6} title="Hak Subjek Data Pribadi">
              <p>Hak yang dimiliki oleh Anda selaku pengguna terhadap Data Pribadi Anda, antara lain:</p>
              <div className="space-y-5">
                <LegalClause label="a" title="Hak atas Informasi Data"><p>Anda berhak untuk mendapatkan informasi mengenai Data Pribadi Anda yang Kami proses, dasar kepentingan hukum, dan tujuan permintaan penggunaan Data Pribadi Anda.</p></LegalClause>
                <LegalClause label="b" title="Hak Perbaikan Data"><p>Anda memiliki hak untuk melengkapi, memperbarui, dan/atau memperbaiki kesalahan dan/atau ketidakakuratan tentang diri Anda.</p></LegalClause>
                <LegalClause label="c" title="Hak Memperoleh Akses dan/atau Salinan"><p>Anda berhak untuk mendapatkan akses dan memperoleh salinan Data Pribadi tentang Anda sesuai dengan ketentuan peraturan perundang-undangan yang berlaku. Kami akan memberikan akses tersebut melalui media resmi yang telah Kami sediakan. Adapun jika ditemukan biaya-biaya yang diperlukan untuk memproses salinan data Anda, maka hal tersebut akan dibebankan kepada Anda.</p></LegalClause>
                <LegalClause label="d" title="Hak Penghapusan Data">
                  <p>Anda berhak untuk meminta mengakhiri pemrosesan, menghapus, dan/atau memusnahkan Data Pribadi tentang diri Anda sesuai ketentuan peraturan perundang-undangan yang berlaku, namun dikecualikan untuk:</p>
                  <ul className="list-disc space-y-2 pl-6"><li>Kepentingan pertahanan dan keamanan nasional;</li><li>Kepentingan proses penegakan hukum;</li><li>Kepentingan umum dalam rangka penyelenggaraan negara; atau</li><li>Kepentingan pengawasan sektor jasa keuangan, moneter, sistem pembayaran, dan stabilitas system keuangan yang dilakukan dalam rangka penyelenggaraan negara.</li></ul>
                </LegalClause>
                <LegalClause label="e" title="Hak Penarikan Persetujuan"><p>Anda berhak untuk menarik kembali persetujuan pemrosesan Data Pribadi Anda yang telah diberikan kepada Kami. Namun perlu dipahami bahwa melakukan penarikan persetujuan akan dapat mempengaruhi Kami dalam menyediakan produk, layanan, dan jasa untuk Anda serta akibat-akibat lainnya yang mungkin terdampak.</p></LegalClause>
                <LegalClause label="f" title="Hak Mengajukan Keberatan Terhadap Pemrosesan"><p>Anda berhak mengajukan keberatan atas tindakan pengambilan keputusan yang hanya didasarkan pada pemrosesan secara otomatis, termasuk pemrofilan, yang menimbulkan akibat hukum atau berdampak signifikan pada Anda.</p></LegalClause>
                <LegalClause label="g" title="Hak atas Pembatasan"><p>Anda berhak untuk menunda atau membatasi pemrosesan Data Pribadi secara proporsional sesuai dengan tujuan pemrosesan Data Pribadi Anda. Namun, perlu dipahami bahwa melakukan permintaan penundaan atau pembatasan akan dapat mempengaruhi kemampuan Kami dalam menyediakan produk, layanan, dan jasa untuk Anda serta akibat-akibat lainnya yang mungkin terdampak.</p></LegalClause>
                <LegalClause label="h" title="Hak lainnya"><p>Anda berhak mengajukan hak lainnya terkait pemrosesan Data Pribadi sepanjang hak tersebut diatur dalam peraturan perundang-undangan yang berlaku di wilayah Negara Kesatuan Republik Indonesia.</p></LegalClause>
              </div>
            </LegalSection>

            <LegalSection number={7} title="Pemrosesan Data Pribadi Oleh Pihak Ketiga">
              <p>Sejauh untuk memenuhi tujuan pemrosesan Data Pribadi yang disampaikan di atas, Kami dapat mengungkapkan, memberikan akses, atau membagikan Data Pribadi Anda kepada pihak-pihak sebagai berikut:</p>
              <div className="space-y-4">
                <LegalClause label="a"><p>Grup perusahaan PT. Finusolprima Farma Internasional.</p></LegalClause>
                <LegalClause label="b"><p>Kara Digital, alasan berbagi adalah dikarenakan Kami memiliki kantor yang menjalankan kegiatan operasional bisnis Kami sehari-hari untuk dapat mempertahankan kualitas pelayanan Kami kepada Anda;</p></LegalClause>
                <LegalClause label="c"><p>Penyedia layanan, alasan berbagi untuk membantu Kami dalam memberikan pelayanan terbaik bagi Anda melalui layanan infrastruktur, pengamanan sistem, pemasaran, dan lainnya;</p></LegalClause>
                <LegalClause label="d"><p>Pemroses pembayaran, alasan berbagi agar proses pembayaran Anda dilakukan secara legal dan terpercaya agar terhindar dari penipuan;</p></LegalClause>
                <LegalClause label="e"><p>Mitra periklanan, alasan berbagi untuk membantu Kami dalam menghadirkan iklan yang lebih relevan bagi Anda;</p></LegalClause>
                <LegalClause label="f"><p>Mitra pemasaran, alasan berbagi untuk membantu mempromosikan produk, layanan, dan jasa Kami. Mitra Kami juga dapat menggabungkan Data Pribadi Anda dengan data lain yang mereka kumpulkan yang dapat digunakan untuk penawaran, promosi, atau aktivitas pemasaran lainnya yang Kami yakini relevan bagi Anda;</p></LegalClause>
                <LegalClause label="g"><p>Peneliti akademis, alasan berbagi untuk berbagi aktivitas, seperti analisis statistik dan studi akademis, tetapi hanya dalam format pseudonim;</p></LegalClause>
                <LegalClause label="h"><p>Penegakan hukum dan otoritas lainnya, alasan berbagi untuk memenuhi kewajiban hukum dalam memenuhi tujuan seperti untuk keamanan nasional, penegakan hukum, litigasi, penyelidikan, pelindungan keamanan, mencegah terjadinya kematian atau bahaya fisik (<em>vital interest of Data Subject</em>);</p></LegalClause>
                <LegalClause label="i"><p>Pembeli bisnis Kami, alasan berbagi dalam situasi Kami menjual atau melakukan negosiasi terkait bisnis Kami kepada pembeli atau calon pembeli bisnis Kami, Kami akan memberikan pemberitahuan kepada Anda sebelum Data Pribadi Anda dialihkan kepada pembeli atau Kebijakan Privasi yang berbeda mulai berlaku; dan</p></LegalClause>
                <LegalClause label="j"><p>Pengungkapan, pemberian akses, dan pembagian Data Pribadi kepada pihak-pihak di atas dilakukan sepanjang tunduk pada ketentuan UU PDP dan peraturan perundang-undangan lainnya yang terkait.</p></LegalClause>
              </div>
            </LegalSection>

            <LegalSection number={8} title="Keamanan Data Pribadi">
              <p>Sebagai komitmen Kami dalam melindungi Data Pribadi Anda sebagai pelanggan Kami, berikut adalah langkah-langkah pengaman yang perlu Kami dan Anda lakukan dalam melindungi Data Pribadi Anda:</p>
              <div className="space-y-4">
                <LegalClause label="a"><p>Kami telah menerapkan prosedur fisik, elektronik, dan organisasional yang sesuai untuk menjaga dan mengamankan Data Pribadi Anda. Langkah-langkah ini termasuk enkripsi dan kontrol akses atas Data Pribadi Anda yang diproses Kami, sejauh mana relevan.</p></LegalClause>
                <LegalClause label="b"><p>Kami menganjurkan Anda untuk menjaga data-data rahasia seperti password, One Time Password (OTP), dan Personal Identification Number (PIN), tidak membagikan rincian akun-akun elektronik yang Anda gunakan dalam melakukan pekerjaan Anda kepada siapapun, serta menjaga keamanan perangkat yang Anda gunakan.</p></LegalClause>
                <LegalClause label="c"><p>Penggunaan Data Pribadi oleh Pihak Ketiga dalam rangka dengan kerjasama dengan Kami akan dilakukan berdasarkan perjanjian.</p></LegalClause>
                <LegalClause label="d"><p>Kami akan berusaha memastikan bahwa setiap pemrosesan data yang dilakukan oleh Pihak Ketiga yang ditunjuk oleh Kami akan sesuai dengan ketentuan dan tujuan pemrosesan yang Kami sampaikan melalui Kebijakan Privasi ini. Namun, Kami tidak dapat menjamin pemrosesan yang dilakukan oleh Pihak Ketiga sesuai dengan tujuan pemrosesan yang sudah Kami tetapkan. Apabila Pihak Ketiga dalam melakukan pemrosesan data Anda tidak berdasarkan dengan Kebijakan Privasi ini dan perjanjian antara Pihak Ketiga dengan Kami, maka Kami akan mengambil langkah hukum berdasarkan perjanjian antara Kami dan Pihak Ketiga tersebut dan peraturan perundang-undangan yang berlaku.</p></LegalClause>
                <LegalClause label="e"><p>Penggunaan Data Pribadi oleh Pihak Ketiga tanpa persetujuan Kami dan di luar tujuan yang disampaikan kepada Anda adalah tanggung jawab pihak ketiga tersebut. Anda berhak mengambil langkah hukum terhadap tindakan tersebut.</p></LegalClause>
                <LegalClause label="f"><p><em>Platform</em> Pihak Ketiga yang ditautkan melalui Kami bisa saja memiliki Kebijakan Privasi sendiri dan pengamanan tersendiri yang independen dan berada di luar kuasa Kami. Oleh sebab itu, Anda disarankan untuk selalu mempelajari Kebijakan Privasi Pihak Ketiga tersebut.</p></LegalClause>
                <LegalClause label="g"><p>Kami akan berusaha menyediakan tingkat keamanan yang terbaik untuk melindungi Data Pribadi Anda, namun Kami tidak akan bertanggung jawab jika terjadi keadaan memaksa/kahar di luar dari kuasa Kami. Kami akan tetap bertanggung jawab menginformasikan hal tersebut melalui media komunikasi yang ditentukan.</p></LegalClause>
              </div>
            </LegalSection>

            <LegalSection number={9} title="Pembaruan Kebijakan Privasi">
              <p>Kami dapat sewaktu-waktu melakukan perubahan atau pembaruan terhadap Kebijakan Privasi ini. Kami akan memberitahukan kepada Anda setiap perubahan atau pembaruan terhadap Kebijakan Privasi ini. Meskipun demikian, Anda tetap disarankan untuk membaca secara seksama dan memeriksa halaman Kebijakan Privasi dari waktu ke waktu untuk mengetahui perubahan apa pun. Dengan tetap mengakses dan menggunakan layanan Kami, maka Anda dianggap telah menyetujui perubahan-perubahan Kebijakan Privasi dari waktu ke waktu.</p>
            </LegalSection>

            <LegalSection number={10} title="Hubungi Kami">
              <p>Kami selalu berkomitmen untuk melindungi Data pribadi Anda sebagai pelanggan Kami yang setia dan berharga.</p>
              <p>Jika Anda memiliki pertanyaan lebih lanjut mengenai Kebijakan Privasi ini, silahkan menghubungi layanan pelanggan Kami pada alamat e-mail{" "}<a href="mailto:medicalnutrience@gmail.com" className="font-semibold text-[#006b3f] underline decoration-emerald-300 underline-offset-4">medicalnutrience@gmail.com</a>{" "}sebagai berikut:</p>
              <address className="rounded-2xl border border-emerald-100 bg-[#f4fbf7] p-5 not-italic text-slate-800 md:p-6">
                <p className="font-black text-slate-900">PT. Finusolprima Farma Internasional (A Kalbe Company)</p>
                <p className="mt-3">Jl. Jend. Ahmad Yani No. 2 RT. 3/RW. 13</p>
                <p>Kayu Putih, Kec. Pulo Gadung,</p>
                <p>Pulomas Jakarta Timur 13210</p>
                <p className="mt-3 font-semibold">Telp 021 – 5086 7667</p>
              </address>
            </LegalSection>
          </article>
        </div>
      </main>
    </PageShell>
  );
}
