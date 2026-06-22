import type { ProductDetail } from "@/data/product-details";
import { mednutAssets } from "@/data/mednut-assets";

const productAssets: Record<
  string,
  {
    logo?: string;
    packshot: string;
    secondaryPackshot?: string;
  }
> = {
  peptibren: {
    logo: mednutAssets.productLogos.peptibren,
    packshot: mednutAssets.packshots.peptibrenVanila,
    secondaryPackshot: mednutAssets.packshots.peptibrenKacangHijau,
  },
  entrakid: {
    packshot: mednutAssets.packshots.entrakidVanila,
    secondaryPackshot: mednutAssets.packshots.entrakidCokelat,
  },
  entramix: {
    logo: mednutAssets.productLogos.entramix,
    packshot: mednutAssets.packshots.entramixVanila,
    secondaryPackshot: mednutAssets.packshots.entramixCokelat,
  },
  entrasoy: {
    logo: mednutAssets.productLogos.entrasoy,
    packshot: mednutAssets.packshots.entrasoy,
  },
  "hepatosol-lola": {
    logo: mednutAssets.productLogos.hepatosolLola,
    packshot: mednutAssets.packshots.hepatosolLola,
  },
  hepatosol: {
    logo: mednutAssets.productLogos.hepatosol,
    packshot: mednutAssets.packshots.hepatosolVanila,
    secondaryPackshot: mednutAssets.packshots.hepatosolCokelat,
  },
  "nephrisol-d": {
    logo: mednutAssets.productLogos.nephrisolD,
    packshot: mednutAssets.packshots.nephrisolDVanila,
    secondaryPackshot: mednutAssets.packshots.nephrisolDCappucino,
  },
  nephrisol: {
    logo: mednutAssets.productLogos.nephrisol,
    packshot: mednutAssets.packshots.nephrisolCappucino,
  },
  oligo: {
    logo: mednutAssets.productLogos.oligo,
    packshot: mednutAssets.packshots.oligo,
  },
  peptisol: {
    logo: mednutAssets.productLogos.peptisol,
    packshot: mednutAssets.packshots.peptisolVanila,
    secondaryPackshot: mednutAssets.packshots.peptisolCokelat,
  },
  pulmosol: {
    logo: mednutAssets.productLogos.pulmosol,
    packshot: mednutAssets.packshots.pulmosol,
  },
};

export function getProductAsset(product: ProductDetail) {
  return productAssets[product.slug] ?? {
    packshot: mednutAssets.packshots.entrasoy,
  };
}

export function ProductVisual({ product }: { product: ProductDetail }) {
  const asset = getProductAsset(product);

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-5 shadow-2xl shadow-black/5 ring-1 ring-black/5 md:p-7">
      <div
        className="absolute right-[-90px] top-[-90px] h-72 w-72 rounded-full opacity-20"
        style={{ backgroundColor: product.theme.primary }}
      />
      <div
        className="absolute bottom-[-120px] left-[-90px] h-80 w-80 rounded-full opacity-15"
        style={{ backgroundColor: product.theme.primary }}
      />

      <div className="relative z-10">
        <div
          className="rounded-[2rem] p-5 md:p-7"
          style={{ backgroundColor: product.theme.soft }}
        >
          <div className="flex min-h-[92px] items-center justify-center rounded-[1.5rem] bg-white px-6 py-5 shadow-lg shadow-black/5">
            {asset.logo ? (
              <img
                src={asset.logo}
                alt={`${product.name} logo`}
                className="max-h-16 w-auto max-w-[320px] object-contain"
              />
            ) : (
              <p
                className="text-3xl font-black tracking-tight"
                style={{ color: product.theme.primary }}
              >
                {product.name}
              </p>
            )}
          </div>

          <div className="relative mt-6 flex min-h-[360px] items-center justify-center md:min-h-[460px]">
            <div
              className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 md:h-[380px] md:w-[380px]"
              style={{ backgroundColor: product.theme.primary }}
            />

            {asset.secondaryPackshot ? (
              <img
                src={asset.secondaryPackshot}
                alt={`${product.name} varian lainnya`}
                className="absolute right-[4%] top-[18%] z-10 h-auto w-[34%] max-w-[190px] rotate-6 object-contain opacity-80 blur-[0.2px] transition duration-500"
              />
            ) : null}

            <img
              src={asset.packshot}
              alt={product.name}
              className="relative z-20 h-auto w-[78%] max-w-[420px] object-contain drop-shadow-2xl transition duration-500 hover:scale-[1.03]"
            />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[#f8fcfa] p-4 ring-1 ring-black/5">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#6b7280]">
              Kategori
            </p>
            <p
              className="mt-2 text-sm font-black"
              style={{ color: product.theme.primary }}
            >
              {product.category}
            </p>
          </div>

          <div className="rounded-2xl bg-[#f8fcfa] p-4 ring-1 ring-black/5">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#6b7280]">
              Produk
            </p>
            <p
              className="mt-2 text-sm font-black"
              style={{ color: product.theme.primary }}
            >
              {product.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
