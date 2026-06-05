import type { ProductDetail } from "@/data/product-details";
import { ProductVisual } from "@/components/pages/product-detail/ProductVisual";

export function ProductDetailTemplate({ product }: { product: ProductDetail }) {
  return (
    <>
      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div
            className="rounded-[2rem] p-8 md:p-12"
            style={{ backgroundColor: product.theme.soft }}
          >
            <p
              className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black shadow-sm"
              style={{ color: product.theme.primary }}
            >
              {product.category}
            </p>

            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-[#0f172a] md:text-6xl">
              {product.heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-[#475569] md:text-base">
              {product.description}
            </p>
          </div>

          <ProductVisual product={product} />
        </div>
      </section>

      <section
        className="px-5 py-20 text-white"
        style={{ backgroundColor: product.theme.primary }}
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-black leading-tight md:text-5xl">
            {product.needTitle}
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {product.needs.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.7rem] bg-white p-6 text-center shadow-xl shadow-black/10"
              >
                <div
                  className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-xl font-black text-white"
                  style={{ backgroundColor: product.theme.dark }}
                >
                  ✓
                </div>

                <h3
                  className="text-lg font-black leading-tight"
                  style={{ color: product.theme.dark }}
                >
                  {item.title}
                </h3>

                {item.description ? (
                  <p className="mt-3 text-sm leading-6 text-[#64748b]">
                    {item.description}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p
              className="text-sm font-bold uppercase tracking-[0.25em]"
              style={{ color: product.theme.primary }}
            >
              Keunggulan Produk
            </p>

            <h2
              className="mt-3 text-3xl font-black leading-tight md:text-5xl"
              style={{ color: product.theme.dark }}
            >
              {product.benefitTitle}
            </h2>

            <a
              href="/kontak"
              className="mt-8 inline-flex rounded-full px-7 py-4 text-sm font-black text-white shadow-lg"
              style={{ backgroundColor: product.theme.primary }}
            >
              {product.ctaLabel}
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {product.benefits.map((benefit) => (
              <article
                key={benefit}
                className="rounded-3xl bg-[#f8fafc] p-6 ring-1 ring-black/5"
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black text-white"
                  style={{ backgroundColor: product.theme.primary }}
                >
                  +
                </div>

                <h3 className="text-base font-black leading-tight text-[#0f172a]">
                  {benefit}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {product.crossSell ? (
        <section className="px-5 py-12">
          <div
            className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] p-8 text-white shadow-2xl md:p-10"
            style={{ backgroundColor: product.theme.primary }}
          >
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-3xl font-black leading-tight md:text-4xl">
                  {product.crossSell.title}
                </h2>
                <p className="mt-4 max-w-2xl leading-8 text-white/80">
                  {product.crossSell.description}
                </p>
              </div>

              <a
                href={product.crossSell.href}
                className="inline-flex rounded-full bg-white px-7 py-4 text-sm font-black shadow-xl"
                style={{ color: product.theme.primary }}
              >
                {product.crossSell.buttonLabel}
              </a>
            </div>
          </div>
        </section>
      ) : null}

      <section
        className="px-5 py-20 text-center text-white"
        style={{ backgroundColor: product.theme.dark }}
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black leading-tight md:text-5xl">
            {product.closingTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/80">
            {product.closingDescription}
          </p>
        </div>
      </section>
    </>
  );
}
