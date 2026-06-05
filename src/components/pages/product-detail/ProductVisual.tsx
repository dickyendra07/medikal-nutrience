import type { ProductDetail } from "@/data/product-details";

export function ProductVisual({ product }: { product: ProductDetail }) {
  return (
    <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[2rem] bg-white p-8 shadow-2xl shadow-black/5">
      <div
        className="absolute inset-0 opacity-15"
        style={{ backgroundColor: product.theme.primary }}
      />

      <div className="relative flex h-56 w-40 items-center justify-center rounded-[2rem] bg-white p-3 shadow-2xl">
        <div
          className={`flex h-full w-full flex-col items-center justify-center rounded-[1.5rem] bg-gradient-to-b ${product.theme.gradient} px-4 text-center text-white`}
        >
          <p className="text-[10px] font-bold tracking-[0.25em]">MEDIKAL</p>
          <p className="mt-4 text-xl font-black leading-tight">{product.name}</p>
          <p className="mt-4 text-[10px] font-semibold leading-4 text-white/75">
            Nutrition Care
          </p>
        </div>
      </div>
    </div>
  );
}
