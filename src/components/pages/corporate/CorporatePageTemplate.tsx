type CorporatePageTemplateProps = {
  page: {
    eyebrow: string;
    title: string;
    description: string;
    highlights: string[];
    cta: string;
    href: string;
  };
};

export function CorporatePageTemplate({ page }: CorporatePageTemplateProps) {
  return (
    <>
      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="rounded-[2.5rem] bg-[#e4f8ed] p-8 md:p-12">
            <p className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-[#006b3f] shadow-sm">
              {page.eyebrow}
            </p>

            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-[#0f172a] md:text-6xl">
              {page.title}
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-[#475569] md:text-base">
              {page.description}
            </p>

            <a
              href={page.href}
              className="mt-8 inline-flex rounded-full bg-[#006b3f] px-7 py-4 text-sm font-black text-white shadow-lg shadow-green-900/20"
            >
              {page.cta}
            </a>
          </div>

          <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[2.5rem] bg-[#006b3f] p-8 text-white shadow-2xl">
            <div className="absolute left-[-70px] top-[-70px] h-44 w-44 rounded-full bg-white/10" />
            <div className="absolute bottom-[-90px] right-[-90px] h-60 w-60 rounded-full bg-white/10" />

            <div className="relative rounded-[2rem] bg-white/10 p-8 text-center backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-white/70">
                Medikal Nutrience
              </p>
              <p className="mt-4 text-4xl font-black">{page.eyebrow}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#006b3f]">
              Informasi Utama
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#0f172a] md:text-5xl">
              Yang Perlu Diketahui
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {page.highlights.map((item, index) => (
              <article
                key={item}
                className="rounded-[2rem] bg-[#f8fafc] p-6 ring-1 ring-black/5"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#006b3f] text-xl font-black text-white">
                  0{index + 1}
                </div>

                <h3 className="text-lg font-black leading-tight text-[#0f172a]">
                  {item}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
