const supportItems = [
  {
    title: "Cek Status Gizi",
    description:
      "Hitung status gizi awal melalui fitur BMI untuk membantu memahami kebutuhan tubuh.",
    href: "/support-system/kalkulator-status-gizi",
    image: "/images/support/bmi-calculator.png",
  },
  {
    title: "Mitra Medis & Rumah Sakit",
    description:
      "Dukungan kolaborasi bersama tenaga medis, klinik, rumah sakit, dan institusi kesehatan.",
    href: "/mitra-enterprise",
    image: "/images/support/medical-partner.png",
  },
  {
    title: "Artikel FIMA",
    description:
      "Konten edukasi nutrisi dan kesehatan yang disusun untuk membantu masyarakat memahami kebutuhan gizi.",
    href: "/support-system/dapur-sehat-fima",
    image: "/images/support/edu-article.png",
  },
];

export function SupportSystem() {
  return (
    <section className="bg-white px-5 py-20 lg:px-10 md:py-24">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mx-auto max-w-3xl text-center reveal">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#006b3f]">
            Support System
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#0f172a] md:text-6xl">
            Pendamping Nutrisi untuk Kebutuhan Anda
          </h2>

          <p className="mt-5 text-base leading-8 text-[#64748b]">
            Fitur pendukung, edukasi, dan akses mitra resmi untuk membantu
            perjalanan nutrisi Anda.
          </p>
        </div>

        <div className="no-scrollbar mt-8 flex snap-x gap-4 overflow-x-auto pb-5 lg:mt-14 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:pb-0">
          {supportItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group reveal min-w-[82%] snap-start overflow-hidden rounded-[1.8rem] bg-white shadow-xl shadow-slate-900/8 ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-green-900/15 sm:min-w-[58%] lg:min-w-0 lg:rounded-[2.5rem] lg:shadow-2xl"
            >
              <div className="relative overflow-hidden bg-[#eaf8f1] p-3 lg:p-5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-auto w-full rounded-[2rem] object-contain transition duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-5 lg:p-8">
                <h3 className="text-2xl font-black leading-tight text-[#0f172a]">
                  {item.title}
                </h3>

                <p className="mt-5 min-h-24 text-base leading-8 text-[#64748b]">
                  {item.description}
                </p>

                <span className="mt-8 inline-flex rounded-full bg-[#006b3f] px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-green-900/20">
                  Selengkapnya
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
