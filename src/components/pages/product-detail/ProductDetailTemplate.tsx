import type { ProductDetail } from "@/data/product-details";
import { mednutAssets } from "@/data/mednut-assets";
import {
  getProductAsset,
  ProductVisual,
} from "@/components/pages/product-detail/ProductVisual";



const productBanners: Record<string, string> = {
  entrakid: "/images/products/banners/entrakid-banner.png",
  entramix: "/images/products/banners/entramix-banner.png",
  entrasoy: "/images/products/banners/entrasoy-banner.png",
  hepatosol: "/images/products/banners/hepatosol-banner.png",
  "hepatosol-lola": "/images/products/banners/hepatosol-lola-banner.png",
  nephrisol: "/images/products/banners/nephrisol-banner.png",
  "nephrisol-d": "/images/products/banners/nephrisol-d-banner.png",
  oligo: "/images/products/banners/oligo-banner.png",
  peptibren: "/images/products/banners/peptibren-banner.png",
  peptisol: "/images/products/banners/peptisol-banner.png",
  pulmosol: "/images/products/banners/pulmosol-banner.png",
};

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

      {productBanners[product.slug] ? (
        <section className="px-5 py-10 md:py-14 lg:px-10">
          <div className="mx-auto w-full max-w-[1440px] overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-green-900/10 ring-1 ring-black/5 reveal-scale">
            <img
              src={productBanners[product.slug]}
              alt={`${product.name} Banner`}
              className="h-auto w-full object-cover"
            />
          </div>
        </section>
      ) : null}

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

      {product.slug === "entrakid" ? (
        <EntrakidMerakidsSection product={product} />
      ) : null}

      {product.crossSell && product.slug !== "entrakid" ? (
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

      {product.slug !== "entrakid" ? (
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
                Apotek
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
      ) : null}
    </>
  );
}

function EntrakidMerakidsSection({ product }: { product: ProductDetail }) {
  const activities = [
    {
      title: "MERAKIDS Coloring Fun",
      description:
        "Aktivitas mewarnai seru untuk melatih kreativitas, fokus, dan motorik anak.",
      color: "#25adc7",
    },
    {
      title: "My Little Diary",
      description:
        "Tempat si kecil mencatat aktivitas, perasaan, dan momen seru setiap hari.",
      color: "#2687cf",
    },
    {
      title: "Fun Origami Guide",
      description:
        "Tutorial origami sederhana untuk melatih kreativitas dan koordinasi anak.",
      color: "#2227d8",
    },
  ];

  return (
    <section className="bg-[#f4fbf8] px-5 py-12 lg:px-10">
      <div className="mx-auto w-full max-w-[1440px] overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-900/8 ring-1 ring-black/5 reveal-scale">
        <div className="grid gap-8 px-8 py-10 md:px-12 md:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p
              className="text-xs font-black uppercase tracking-[0.35em]"
              style={{ color: product.theme.primary }}
            >
              MERAKIDS
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-[#10265f] md:text-5xl">
              Serunya Aktivitas Kreatif Bersama{" "}
              <span style={{ color: product.theme.primary }}>MERAKIDS</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm font-bold leading-7 text-[#0f172a] md:text-base md:leading-8">
              Temukan berbagai aktivitas seru untuk mendukung kreativitas dan
              tumbuh kembang si kecil di rumah.
            </p>
          </div>

          <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-[2rem] bg-white p-5 md:min-h-[300px]">
            <div className="absolute inset-0 bg-white" />
            <img
              src="/images/mednut/merakids/merakids-banner.png"
              alt="MERAKIDS"
              className="relative z-10 h-auto w-full max-w-[520px] object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        <div className="overflow-hidden">
          {activities.map((activity) => (
            <article
              key={activity.title}
              className="grid gap-4 px-8 py-7 text-white md:grid-cols-[1fr_auto] md:items-center md:px-12"
              style={{ backgroundColor: activity.color }}
            >
              <div>
                <h3 className="text-2xl font-black leading-tight md:text-3xl">
                  {activity.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-7 text-white/90 md:text-base">
                  {activity.description}
                </p>
              </div>

              <a
                href="/support-system"
                className="inline-flex w-fit rounded-full bg-[#f7b500] px-7 py-4 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5"
              >
                Download Content
              </a>
            </article>
          ))}
        </div>

        <div
          className="relative overflow-hidden px-8 py-12 text-center text-white md:px-12 md:py-14"
          style={{ backgroundColor: "#f7b500" }}
        >
          <div className="absolute left-[20%] top-[-30px] h-28 w-28 rounded-full border-8 border-white/20" />
          <div className="absolute bottom-[-50px] left-1/2 h-36 w-36 rounded-full border-8 border-white/20" />
          <div className="absolute right-[12%] top-10 h-28 w-28 rounded-full border-8 border-white/20" />

          <h2 className="relative text-3xl font-black leading-tight md:text-5xl">
            {product.closingTitle}
          </h2>

          <p className="relative mx-auto mt-4 max-w-3xl text-sm font-bold leading-7 text-white/95 md:text-base md:leading-8">
            {product.closingDescription}
          </p>
        </div>
      </div>
    </section>
  );
}

