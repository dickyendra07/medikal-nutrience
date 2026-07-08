import { notFound, redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { productDetails } from "@/data/product-details";

export default async function CmsProductEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const { slug } = await params;
  const product = Object.values(productDetails).find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <CmsAdminShell
      active="products"
      title={`Edit ${product.name}`}
      eyebrow="CMS Products"
      description="Kelola konten utama produk seperti nama, kategori, slug, headline, deskripsi, CTA, dan status publikasi."
      actions={
        <a
          href="/cms/products"
          className="rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/5 ring-1 ring-black/5 transition hover:-translate-y-0.5"
        >
          Back to Products
        </a>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[0.72fr_0.28fr]">
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5 md:p-8">
          <div className="border-b border-black/5 pb-6">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#006b3f]">
              Product Content
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#111827]">
              Informasi Produk
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-[#64748b]">
              Form ini masih tahap UI CMS. Save action akan dihubungkan ke
              storage/database pada batch berikutnya.
            </p>
          </div>

          <form className="mt-7 grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-black text-[#111827]">
                  Nama Produk
                </label>
                <input
                  name="name"
                  defaultValue={product.name}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">
                  Slug
                </label>
                <input
                  name="slug"
                  defaultValue={product.slug}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Kategori
              </label>
              <input
                name="category"
                defaultValue={product.category}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:bg-white"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Hero Title
              </label>
              <textarea
                name="heroTitle"
                defaultValue={product.heroTitle}
                rows={3}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold leading-7 outline-none transition focus:border-[#006b3f] focus:bg-white"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Hero Description
              </label>
              <textarea
                name="heroDescription"
                defaultValue={product.description}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold leading-7 outline-none transition focus:border-[#006b3f] focus:bg-white"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-black text-[#111827]">
                  CTA Label
                </label>
                <input
                  name="ctaLabel"
                  defaultValue="Temukan di Apotek"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">
                  Publish Status
                </label>
                <select
                  name="status"
                  defaultValue="published"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:bg-white"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="review">Need Review</option>
                </select>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-3 border-t border-black/5 pt-6">
              <button
                type="button"
                className="rounded-full bg-[#006b3f] px-6 py-4 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-[#005635]"
              >
                Save Draft UI
              </button>

              <a
                href={`/produk/${product.slug}`}
                target="_blank"
                className="rounded-full bg-[#e4f8ed] px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] transition hover:-translate-y-0.5"
              >
                Preview Page
              </a>
            </div>
          </form>
        </section>

        <aside className="space-y-5">
          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#006b3f]">
              Product Status
            </p>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-[#f4fbf8] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#64748b]">
                  Current Status
                </p>
                <p className="mt-2 text-lg font-black text-[#006b3f]">
                  Published
                </p>
              </div>

              <div className="rounded-2xl bg-[#f8fafc] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#64748b]">
                  Public URL
                </p>
                <code className="mt-2 block break-all text-xs font-black text-[#475569]">
                  /produk/{product.slug}
                </code>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] bg-[#004b34] p-6 text-white shadow-2xl shadow-green-900/15">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/55">
              Next Step
            </p>
            <h3 className="mt-3 text-2xl font-black leading-tight">
              Batch berikutnya: save data.
            </h3>
            <p className="mt-4 text-sm font-medium leading-7 text-white/70">
              Setelah UI edit ini aman, kita buat server action / API untuk
              menyimpan draft ke storage sementara atau database.
            </p>
          </section>
        </aside>
      </div>
    </CmsAdminShell>
  );
}
