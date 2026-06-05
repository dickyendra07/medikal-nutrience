type ComingSoonSectionProps = {
  title: string;
  description: string;
  items: string[];
};

export function ComingSoonSection({
  title,
  description,
  items,
}: ComingSoonSectionProps) {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-[#006b3f] p-8 text-white shadow-2xl shadow-green-900/20 md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#b7f7d0]">
              Page Planning
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">
              {title}
            </h2>

            <p className="mt-5 leading-8 text-white/80">{description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <article
                key={item}
                className="rounded-3xl bg-white p-6 shadow-xl shadow-green-900/5 ring-1 ring-black/5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e4f8ed] text-lg font-black text-[#006b3f]">
                  ✓
                </div>

                <h3 className="text-lg font-black text-[#111827]">{item}</h3>

                <p className="mt-3 text-sm leading-7 text-[#6b7280]">
                  Konten section ini akan kita detailkan setelah struktur routing
                  utama selesai dan visual homepage sudah disetujui.
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
