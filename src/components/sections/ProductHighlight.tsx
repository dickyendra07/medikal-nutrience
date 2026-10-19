import { ProductFrontTile } from "@/components/shared/ProductFrontTile";
import { mednutAssets } from "@/data/mednut-assets";

const products = [
  {
    name: "ENTRASOY",
    scene: mednutAssets.scenes.entrasoy,
    href: "/produk/entrasoy",
    image: mednutAssets.packshots.entrasoy,
    tagline: "Protein Nabati",
    tint: "#e3f1e8",
    accent: "#00432e",
  },
  {
    name: "ENTRAMIX",
    scene: mednutAssets.scenes.entramix,
    href: "/produk/entramix",
    image: mednutAssets.packshots.entramixVanila,
    tagline: "Nutrisi Lansia & Dewasa",
    tint: "#fdf0dc",
    accent: "#d4860f",
  },
  {
    name: "PEPTISOL",
    scene: mednutAssets.scenes.peptisol,
    href: "/produk/peptisol",
    image: mednutAssets.packshots.peptisolVanila,
    tagline: "Tinggi Protein & Zinc",
    tint: "#fde4e8",
    accent: "#f0707f",
  },
  {
    name: "ENTRAKID",
    scene: mednutAssets.scenes.entrakid,
    href: "/produk/entrakid",
    image: mednutAssets.packshots.entrakidVanila,
    tagline: "Tumbuh Kembang Anak",
    tint: "#dff5fc",
    accent: "#2bb5de",
  },
];

export function ProductHighlight() {
  return (
    <section className="bg-[#004b34] px-5 py-20 lg:px-10 text-white md:py-24">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-end reveal">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#b7f7d0]">
              Produk Unggulan
            </p>

            <h2 className="mt-5 max-w-2xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Pilihan Nutrisi Keluarga Indonesia
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-white/75 md:justify-self-end">
            Rangkaian produk nutrisi yang dikembangkan untuk membantu memenuhi
            kebutuhan tubuh pada berbagai tahap kehidupan dan kondisi kesehatan.
          </p>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:mt-14 xl:grid-cols-4 xl:gap-6">
          {products.map((product) => (
            <a
              key={product.name}
              href={product.href}
              className="group reveal block overflow-hidden rounded-[1.4rem] bg-white/5 transition duration-300 hover:-translate-y-2 lg:rounded-[2rem]"
              aria-label={`Lihat produk ${product.name}`}
            >
              <ProductFrontTile
                name={product.name}
                tagline={product.tagline}
                image={product.image}
                tint={product.tint}
                accent={product.accent}
                scene={product.scene}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
