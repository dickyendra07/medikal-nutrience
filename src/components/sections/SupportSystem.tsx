import { supports } from "@/data/home";

export function SupportSystem() {
  return (
    <section className="bg-white px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#006b3f]">
            Support System
          </p>

          <h2 className="mt-3 text-3xl font-black leading-tight text-[#172554] md:text-5xl">
            Dukungan Nutrisi Terintegrasi
          </h2>

          <p className="mt-5 text-sm leading-8 text-[#475569]">
            Lebih dari sekadar produk, Medikal Nutrience menghadirkan dukungan
            edukasi, konsultasi, dan akses informasi untuk membantu perjalanan
            nutrisi Anda.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {supports.map((item, index) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-900/10 ring-1 ring-black/5 transition duration-300 hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden bg-[#edf7f2]">
                <div className="absolute inset-6 rounded-[2rem] bg-gradient-to-br from-[#d8f6e8] to-[#ffffff]" />
                <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/80 p-5 shadow-lg backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#006b3f]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-3xl font-black text-[#0f172a]">
                    0{index + 1}
                  </p>
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-xl font-black text-[#111827]">
                  {item.title}
                </h3>

                <p className="mt-3 min-h-24 text-sm leading-7 text-[#475569]">
                  {item.desc}
                </p>

                <a
                  href="/support-system"
                  className="mt-6 inline-flex items-center rounded-full bg-[#006b3f] px-5 py-3 text-xs font-black uppercase tracking-wide text-white"
                >
                  Selengkapnya
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
