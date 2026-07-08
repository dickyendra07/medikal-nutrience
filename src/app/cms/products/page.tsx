import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { productDetails } from "@/data/product-details";

const productRows = Object.values(productDetails).map((product) => ({
  name: product.name,
  slug: product.slug,
  category: product.category,
  heroTitle: product.heroTitle,
  status: "Published",
  href: `/produk/${product.slug}`,
}));

export default async function CmsProductsPage() {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  return (
    <CmsAdminShell
      active="products"
      title="Products Management"
      eyebrow="CMS Module"
      description="Kelola daftar produk Medikal Nutrience, mulai dari nama produk, kategori, slug halaman, status publikasi, hingga kebutuhan konten detail produk."
      actions={
        <button
          type="button"
          className="rounded-full bg-[#006b3f] px-5 py-3 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-[#005635]"
        >
          Add Product
        </button>
      }
    >
      <section className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Produk", value: productRows.length },
          { label: "Published", value: productRows.length },
          { label: "Draft", value: 0 },
          { label: "Need Review", value: 0 },
        ].map((stat) => (
          <article
            key={stat.label}
            className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5"
          >
            <p className="text-4xl font-black text-[#006b3f]">{stat.value}</p>
            <p className="mt-2 text-sm font-black text-[#64748b]">
              {stat.label}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
        <div className="border-b border-black/5 px-6 py-5">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#006b3f]">
            Product List
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#111827]">
            Daftar Produk Website
          </h2>
        </div>

        <div className="hidden grid-cols-[0.9fr_0.7fr_0.8fr_0.6fr_0.7fr] gap-4 border-b border-black/5 bg-[#f8fcfa] px-6 py-4 text-xs font-black uppercase tracking-wide text-[#64748b] lg:grid">
          <span>Produk</span>
          <span>Kategori</span>
          <span>Slug</span>
          <span>Status</span>
          <span className="text-right">Action</span>
        </div>

        <div className="divide-y divide-black/5">
          {productRows.map((product) => (
            <article
              key={product.slug}
              className="grid gap-4 px-6 py-5 transition hover:bg-[#f8fcfa] lg:grid-cols-[0.9fr_0.7fr_0.8fr_0.6fr_0.7fr] lg:items-center"
            >
              <div>
                <p className="text-lg font-black text-[#111827]">
                  {product.name}
                </p>
                <p className="mt-1 line-clamp-1 text-sm font-medium text-[#64748b]">
                  {product.heroTitle}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#94a3b8] lg:hidden">
                  Kategori
                </p>
                <p className="mt-1 text-sm font-bold text-[#0f172a] lg:mt-0">
                  {product.category}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#94a3b8] lg:hidden">
                  Slug
                </p>
                <code className="mt-1 inline-flex rounded-full bg-[#f1f5f9] px-3 py-1.5 text-xs font-black text-[#475569] lg:mt-0">
                  /produk/{product.slug}
                </code>
              </div>

              <div>
                <span className="inline-flex rounded-full bg-[#e4f8ed] px-3 py-1.5 text-xs font-black uppercase tracking-wide text-[#006b3f]">
                  {product.status}
                </span>
              </div>

              <div className="relative z-20 flex gap-2 lg:justify-end">
                <a
                  href={product.href}
                  target="_blank"
                  className="relative z-20 inline-flex rounded-full bg-[#f1f5f9] px-4 py-2 text-xs font-black text-[#475569] transition hover:bg-[#e2e8f0]"
                >
                  View
                </a>
                <a
                  href={`/cms/products/${product.slug}/edit`}
                  className="relative z-20 inline-flex rounded-full bg-[#006b3f] px-4 py-2 text-xs font-black text-white transition hover:bg-[#005635]"
                >
                  Edit
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-[2rem] bg-[#004b34] p-6 text-white shadow-2xl shadow-green-900/15">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-white/60">
          CMS Development Note
        </p>
        <h2 className="mt-4 text-3xl font-black leading-tight">
          Module Products sudah masuk ke layout CMS utama.
        </h2>
        <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-white/70">
          Tahap berikutnya adalah membuat halaman edit produk, lalu menyambungkan
          data ke storage atau database supaya konten dapat diubah dari CMS.
        </p>
      </section>
    </CmsAdminShell>
  );
}
