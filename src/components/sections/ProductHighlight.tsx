import { products } from "@/data/home";

export function ProductHighlight() {
  return (
    <section className="bg-[#004b34] px-5 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#b7f7d0]">
              Produk Unggulan
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight md:text-5xl">
              Pilihan Nutrisi Keluarga Indonesia
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-white/75">
            Rangkaian produk nutrisi yang dikembangkan untuk membantu memenuhi
            kebutuhan tubuh pada berbagai tahap kehidupan dan kondisi kesehatan.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.name}
              className="group overflow-hidden rounded-[2rem] bg-white text-[#111827] shadow-2xl shadow-black/10 transition duration-300 hover:-translate-y-2"
            >
              <div className="flex h-56 items-end justify-center bg-[#ecfff3] p-6">
                <div className="relative flex h-40 w-28 items-center justify-center rounded-3xl bg-white p-2 shadow-xl">
                  <div
                    className={`flex h-full w-full flex-col items-center justify-center rounded-[1.3rem] bg-gradient-to-b ${product.color} px-3 text-center text-white`}
                  >
                    <p className="text-[10px] font-bold tracking-wide">
                      MEDIKAL
                    </p>
                    <p className="mt-2 text-sm font-black leading-tight">
                      {product.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="mb-3 inline-flex rounded-full bg-[#e4f8ed] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#006b3f]">
                  {product.category}
                </p>

                <h3 className="text-xl font-black text-[#006b3f]">
                  {product.name}
                </h3>

                <p className="mt-3 min-h-20 text-sm leading-7 text-[#64748b]">
                  {product.desc}
                </p>

                <a
                  href="/produk"
                  className="mt-5 inline-flex text-sm font-black text-[#006b3f]"
                >
                  Lihat Produk →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
