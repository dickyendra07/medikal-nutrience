import type { ProductDetail } from "@/data/product-details";
import { mednutAssets } from "@/data/mednut-assets";
import {
  getProductAsset,
  ProductVisual,
} from "@/components/pages/product-detail/ProductVisual";


function getBenefitIcons(product: ProductDetail) {
  const iconMap: Record<string, string[] | undefined> = {
    entrakid: mednutAssets.productIcons.entrakid,
    entramix: mednutAssets.productIcons.entramix,
    entrasoy: mednutAssets.productIcons.entrasoy,
    peptisol: mednutAssets.productIcons.peptisol,
    nephrisol: mednutAssets.productIcons.nephrisol,
    "nephrisol-d": mednutAssets.productIcons.nephrisolD,
    hepatosol: mednutAssets.productIcons.hepatosol,
    "hepatosol-lola": mednutAssets.productIcons.hepatosolLola,
    oligo: mednutAssets.productIcons.oligo,
    pulmosol: mednutAssets.productIcons.pulmosol,
  };

  return iconMap[product.slug] ?? [];
}

export function ProductDetailTemplate({ product }: { product: ProductDetail }) {
  const asset = getProductAsset(product);
  const benefitIcons = getBenefitIcons(product);

  return (
    <>
      <section className="relative overflow-hidden bg-[#f4fbf8] px-5 py-12 md:py-20 lg:px-10">
        <div
          className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full opacity-15"
          style={{ backgroundColor: product.theme.primary }}
        />
        <div
          className="absolute bottom-[-220px] right-[-140px] h-[480px] w-[480px] rounded-full opacity-15"
          style={{ backgroundColor: product.theme.primary }}
        />

        <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="reveal-left">
            <p
              className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.25em] shadow-lg shadow-green-900/8 ring-1 ring-black/5"
              style={{ color: product.theme.primary }}
            >
              {product.category}
            </p>

            {asset.logo ? (
              <div className="mt-7 flex h-24 w-fit max-w-full items-center rounded-[1.5rem] bg-white px-7 py-5 shadow-xl shadow-slate-900/8 ring-1 ring-black/5">
                <img
                  src={asset.logo}
                  alt={`${product.name} logo`}
                  className="max-h-16 w-auto max-w-[340px] object-contain"
                />
              </div>
            ) : null}

            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-[#111827] md:text-6xl">
              {product.heroTitle}
            </h1>

            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[#5f6b76] md:text-lg md:leading-9">
              {product.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/apotek-resmi"
                className="inline-flex items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-0.5"
                style={{ backgroundColor: product.theme.primary }}
              >
                {product.ctaLabel}
                <span>→</span>
              </a>

              <a
                href="/kontak"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-black shadow-xl shadow-green-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
                style={{ color: product.theme.primary }}
              >
                Konsultasi
                <span>→</span>
              </a>
            </div>
          </div>

          <div className="reveal-scale reveal-delay-2">
            <ProductVisual product={product} />
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:py-16 lg:px-10">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mx-auto max-w-3xl text-center reveal">
            <p
              className="text-xs font-black uppercase tracking-[0.35em]"
              style={{ color: product.theme.primary }}
            >
              Kebutuhan Nutrisi
            </p>

            <h2 className="mt-5 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
              {product.needTitle}
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {product.needs.map((item, index) => (
              <article
                key={item.title}
                className="reveal rounded-[2rem] bg-white p-6 text-center shadow-xl shadow-slate-900/8 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1"
              >
                <div
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-black text-white"
                  style={{ backgroundColor: product.theme.primary }}
                >
                  {index + 1}
                </div>

                <h3 className="mt-5 text-xl font-black leading-tight text-[#111827]">
                  {item.title}
                </h3>

                {item.description ? (
                  <p className="mt-3 text-sm font-medium leading-7 text-[#6b7280]">
                    {item.description}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 md:py-16 lg:px-10">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="reveal-left">
            <p
              className="text-xs font-black uppercase tracking-[0.35em]"
              style={{ color: product.theme.primary }}
            >
              Keunggulan Produk
            </p>

            <h2 className="mt-5 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
              {product.benefitTitle}
            </h2>

            <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-[#6b7280] md:text-base md:leading-8">
              Rangkaian keunggulan produk disusun untuk membantu pengguna memahami
              manfaat utama dan kesesuaian produk dengan kebutuhan nutrisinya.
            </p>

            <a
              href="/apotek-resmi"
              className="mt-8 inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5"
              style={{ backgroundColor: product.theme.primary }}
            >
              Temukan di Apotek Resmi
              <span>→</span>
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 reveal-right">
            {product.benefits.map((benefit, index) => {
              const icon = benefitIcons[index];

              return (
                <article
                  key={benefit}
                  className="rounded-[1.7rem] bg-[#f8fcfa] p-6 shadow-lg shadow-slate-900/5 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-3 shadow-md shadow-slate-900/5 ring-1 ring-black/5">
                    {icon ? (
                      <img
                        src={icon}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span
                        className="flex h-full w-full items-center justify-center rounded-xl text-lg font-black text-white"
                        style={{ backgroundColor: product.theme.primary }}
                      >
                        ✓
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-black leading-tight text-[#111827]">
                    {benefit}
                  </h3>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {product.crossSell ? (
        <section className="bg-[#f4fbf8] px-5 py-12 lg:px-10">
          <div
            className="mx-auto w-full max-w-[1440px] overflow-hidden rounded-[2.5rem] p-8 text-white shadow-2xl md:p-12 reveal-scale"
            style={{ backgroundColor: product.theme.primary }}
          >
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-white/70">
                  Rekomendasi Lanjutan
                </p>

                <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
                  {product.crossSell.title}
                </h2>

                <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/80 md:text-base md:leading-8">
                  {product.crossSell.description}
                </p>
              </div>

              <a
                href={product.crossSell.href}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-black shadow-xl transition hover:-translate-y-0.5"
                style={{ color: product.theme.primary }}
              >
                {product.crossSell.buttonLabel}
                <span>→</span>
              </a>
            </div>
          </div>
        </section>
      ) : null}

      <section
        className="px-5 py-14 text-white md:py-20 lg:px-10"
        style={{ backgroundColor: product.theme.dark }}
      >
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 md:grid-cols-[1fr_auto] md:items-center reveal">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-white/60">
              {product.name}
            </p>

            <h2 className="mt-4 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
              {product.closingTitle}
            </h2>

            <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-white/75 md:text-base md:leading-8">
              {product.closingDescription}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/apotek-resmi"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black transition hover:-translate-y-0.5"
              style={{ color: product.theme.primary }}
            >
              Apotek Resmi
            </a>

            <a
              href="/kontak"
              className="inline-flex items-center justify-center rounded-full bg-white/15 px-6 py-4 text-sm font-black text-white ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              Konsultasi
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
