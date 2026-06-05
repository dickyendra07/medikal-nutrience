type ProductCardProps = {
  product: {
    name: string;
    category: string;
    tagline: string;
    description: string;
    color: string;
    benefits: string[];
  };
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-green-900/5 ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="flex h-64 items-end justify-center bg-[#ecfff3] p-7">
        <div className="relative flex h-48 w-32 items-center justify-center rounded-[2rem] bg-white p-2 shadow-2xl">
          <div
            className={`flex h-full w-full flex-col items-center justify-center rounded-[1.5rem] bg-gradient-to-b ${product.color} px-4 text-center text-white`}
          >
            <p className="text-[10px] font-bold tracking-[0.25em]">MEDIKAL</p>
            <p className="mt-3 text-lg font-black leading-tight">
              {product.name}
            </p>
            <p className="mt-3 text-[10px] font-semibold leading-4 text-white/75">
              Nutrition Care
            </p>
          </div>
        </div>
      </div>

      <div className="p-7">
        <p className="mb-3 inline-flex rounded-full bg-[#e4f8ed] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#006b3f]">
          {product.category}
        </p>

        <h3 className="text-2xl font-black text-[#0f172a]">{product.name}</h3>

        <p className="mt-2 text-sm font-bold text-[#006b3f]">
          {product.tagline}
        </p>

        <p className="mt-4 min-h-20 text-sm leading-7 text-[#64748b]">
          {product.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {product.benefits.map((benefit) => (
            <span
              key={benefit}
              className="rounded-full bg-[#f8fafc] px-3 py-1.5 text-xs font-semibold text-[#475569] ring-1 ring-black/5"
            >
              {benefit}
            </span>
          ))}
        </div>

        <div className="mt-7 flex gap-3">
          <a
            href="#"
            className="flex-1 rounded-full bg-[#006b3f] px-5 py-3 text-center text-sm font-black text-white shadow-lg shadow-green-900/20"
          >
            Detail
          </a>

          <a
            href="/kontak"
            className="flex-1 rounded-full border border-[#006b3f]/20 bg-[#f4fbf8] px-5 py-3 text-center text-sm font-black text-[#006b3f]"
          >
            Konsultasi
          </a>
        </div>
      </div>
    </article>
  );
}
