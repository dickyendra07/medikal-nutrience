const cmsMenus = [
  { title: "Dashboard", desc: "Ringkasan konten dan aktivitas website", count: "Overview" },
  { title: "Produk", desc: "Kelola produk, logo, packshot, manfaat, dan CTA", count: "11 produk" },
  { title: "Solusi", desc: "Kelola solusi berdasarkan kebutuhan tubuh", count: "7 solusi" },
  { title: "Support System", desc: "Kelola kalkulator, komunitas, kisah pasien, dan edukasi", count: "4 modul" },
  { title: "Dapur Sehat FIMA", desc: "Kelola artikel resep dan detail konten nutrisi", count: "3 artikel" },
  { title: "Event", desc: "Kelola event, registrasi, dan data peserta", count: "Dummy" },
  { title: "Apotek", desc: "Kelola daftar apotek, area, dan link Google Maps", count: "Partner" },
  { title: "Leads / Registrasi", desc: "Data dari assessment, konsultasi, dan event", count: "Coming soon" },
  { title: "Pengaturan Website", desc: "SEO, banner, navigasi, dan informasi perusahaan", count: "Settings" },
];

const quickStats = [
  { label: "Produk Aktif", value: "11" },
  { label: "Solusi Nutrisi", value: "7" },
  { label: "Apotek Partner", value: "33+" },
  { label: "Konten Support", value: "8" },
];

export default function CmsPage() {
  return (
    <main className="min-h-screen bg-[#eef8f3] text-[#0f172a]">
      <div className="grid min-h-screen lg:grid-cols-[300px_1fr]">
        <aside className="hidden border-r border-black/5 bg-[#004b34] p-6 text-white lg:block">
          <div className="rounded-[2rem] bg-white/10 p-5 ring-1 ring-white/10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-white/50">
              CMS Preview
            </p>
            <h1 className="mt-3 text-2xl font-black leading-tight">
              Medikal Nutrience Admin
            </h1>
            <p className="mt-3 text-sm leading-7 text-white/65">
              Draft awal CMS untuk mengelola konten website Medikal Nutrience.
            </p>
          </div>

          <nav className="mt-8 space-y-2">
            {cmsMenus.map((menu, index) => (
              <a
                key={menu.title}
                href={`#section-${index}`}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-black text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                <span>{menu.title}</span>
                <span className="text-white/35">→</span>
              </a>
            ))}
          </nav>
        </aside>

        <section className="p-5 md:p-8 lg:p-10">
          <div className="mx-auto max-w-[1440px]">
            <header className="rounded-[2.5rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
                    Medikal Nutrience CMS
                  </p>
                  <h2 className="mt-4 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
                    Website Content Management Preview
                  </h2>
                  <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-[#64748b] md:text-base md:leading-8">
                    Halaman ini adalah draft awal CMS untuk menunjukkan arah
                    pengelolaan konten kepada client. Data masih dummy dan
                    nantinya dapat dihubungkan ke backend NestJS.
                  </p>
                </div>

                <div className="rounded-[2rem] bg-[#f4fbf8] p-5 ring-1 ring-black/5">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#006b3f]">
                    Status
                  </p>
                  <p className="mt-3 text-2xl font-black text-[#0f172a]">
                    Preview Mode
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#64748b]">
                    Frontend CMS scaffold
                  </p>
                </div>
              </div>
            </header>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {quickStats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5"
                >
                  <p className="text-4xl font-black text-[#006b3f]">{stat.value}</p>
                  <p className="mt-2 text-sm font-black text-[#64748b]">
                    {stat.label}
                  </p>
                </article>
              ))}
            </div>

            <section className="mt-8 grid gap-5 xl:grid-cols-3">
              {cmsMenus.map((menu, index) => (
                <article
                  id={`section-${index}`}
                  key={menu.title}
                  className="group rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-900/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-[#006b3f]">
                        Module
                      </p>
                      <h3 className="mt-3 text-2xl font-black leading-tight">
                        {menu.title}
                      </h3>
                    </div>

                    <span className="rounded-full bg-[#e4f8ed] px-3 py-1.5 text-xs font-black text-[#006b3f]">
                      {menu.count}
                    </span>
                  </div>

                  <p className="mt-4 text-sm font-medium leading-7 text-[#64748b]">
                    {menu.desc}
                  </p>

                  <div className="mt-6 grid gap-3">
                    <div className="rounded-2xl bg-[#f8fafc] px-4 py-3 text-sm font-bold text-[#64748b]">
                      List data
                    </div>
                    <div className="rounded-2xl bg-[#f8fafc] px-4 py-3 text-sm font-bold text-[#64748b]">
                      Create / edit form
                    </div>
                    <div className="rounded-2xl bg-[#f8fafc] px-4 py-3 text-sm font-bold text-[#64748b]">
                      Publish / draft status
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-6 inline-flex rounded-full bg-[#006b3f] px-5 py-3 text-sm font-black text-white transition group-hover:bg-[#005432]"
                  >
                    Preview Module
                  </button>
                </article>
              ))}
            </section>

            <section className="mt-8 rounded-[2.5rem] bg-[#006b3f] p-6 text-white shadow-2xl shadow-green-900/15 md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-white/60">
                Next Development Step
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
                Tahap berikutnya: bikin module Produk dan Event lebih detail.
              </h2>
              <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-white/75 md:text-base md:leading-8">
                Setelah CMS preview ini disetujui, module pertama yang paling
                masuk akal dikerjakan adalah Produk, Event Registration, dan
                Dapur Sehat FIMA karena langsung terlihat manfaatnya untuk client.
              </p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
