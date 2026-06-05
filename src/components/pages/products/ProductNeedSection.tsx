import { productNeeds } from "@/data/products";

export function ProductNeedSection() {
  return (
    <section className="bg-white px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#006b3f]">
              Rekomendasi Awal
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-[#0f172a] md:text-5xl">
              Temukan Produk Berdasarkan Kebutuhan
            </h2>

            <p className="mt-5 text-sm leading-8 text-[#475569]">
              Untuk memudahkan pengguna, produk dapat diarahkan berdasarkan usia,
              kebutuhan nutrisi harian, atau kondisi kesehatan tertentu.
            </p>
          </div>

          <div className="grid gap-5">
            {productNeeds.map((item, index) => (
              <article
                key={item.title}
                className="grid gap-5 rounded-[2rem] bg-[#f4fbf8] p-6 ring-1 ring-black/5 md:grid-cols-[auto_1fr_auto] md:items-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#006b3f] text-xl font-black text-white">
                  0{index + 1}
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#0f172a]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#64748b]">
                    {item.description}
                  </p>
                </div>

                <div className="rounded-2xl bg-white px-5 py-4 text-sm font-black text-[#006b3f] shadow-sm">
                  {item.product}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
