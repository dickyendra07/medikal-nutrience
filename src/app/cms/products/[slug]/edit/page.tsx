import { notFound, redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { productDetails } from "@/data/product-details";
import { deleteProductDraft, saveProductDraft } from "./actions";
import { promises as fs } from "fs";
import path from "path";

type CmsProductDraft = {
  slug: string;
  name: string;
  category: string;
  heroTitle: string;
  description: string;
  ctaLabel: string;
  status: "published" | "draft" | "review";
  updatedAt: string;
};

async function getProductDraft(slug: string) {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "src/data/cms/cms-products.json"),
      "utf8"
    );
    const drafts = JSON.parse(file) as Record<string, CmsProductDraft>;
    return drafts[slug] ?? null;
  } catch {
    return null;
  }
}


export default async function CmsProductEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string; reset?: string }>;
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

  const draft = await getProductDraft(slug);
  const paramsQuery = await searchParams;
  const isSaved = paramsQuery.saved === "1";
  const isReset = paramsQuery.reset === "1";

  const viewData = {
    name: draft?.name ?? product.name,
    slug: draft?.slug ?? product.slug,
    category: draft?.category ?? product.category,
    heroTitle: draft?.heroTitle ?? product.heroTitle,
    description: draft?.description ?? product.description,
    ctaLabel: draft?.ctaLabel ?? "Temukan di Apotek",
    status: draft?.status ?? "published",
    updatedAt: draft?.updatedAt ?? null,
  };

  return (
    <CmsAdminShell
      active="products"
      title={`Edit ${viewData.name}`}
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
              Form ini sudah dapat menyimpan draft ke storage JSON lokal untuk
              kebutuhan staging/demo CMS.
            </p>

            {isSaved ? (
              <div className="mt-5 rounded-2xl bg-[#e4f8ed] px-5 py-4 text-sm font-black text-[#006b3f] ring-1 ring-[#006b3f]/10">
                Draft produk berhasil disimpan.
              </div>
            ) : null}

            {isReset ? (
              <div className="mt-5 rounded-2xl bg-[#fff7ed] px-5 py-4 text-sm font-black text-[#c2410c] ring-1 ring-[#fb923c]/20">
                Draft produk berhasil dihapus. Konten kembali menggunakan data original.
              </div>
            ) : null}
          </div>

          <form action={saveProductDraft} className="mt-7 grid gap-5">
            <input type="hidden" name="originalSlug" value={product.slug} />
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-black text-[#111827]">
                  Nama Produk
                </label>
                <input
                  name="name"
                  defaultValue={viewData.name}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">
                  Slug
                </label>
                <input
                  name="slug"
                  defaultValue={viewData.slug}
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
                defaultValue={viewData.category}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:bg-white"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Hero Title
              </label>
              <textarea
                name="heroTitle"
                defaultValue={viewData.heroTitle}
                rows={3}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold leading-7 outline-none transition focus:border-[#006b3f] focus:bg-white"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Hero Description
              </label>
              <textarea
                name="description"
                defaultValue={viewData.description}
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
                  defaultValue={viewData.ctaLabel}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">
                  Publish Status
                </label>
                <select
                  name="status"
                  defaultValue={viewData.status}
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
                type="submit"
                className="rounded-full bg-[#006b3f] px-6 py-4 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-[#005635]"
              >
                Save Draft
              </button>

              <a
                href={`/produk/${viewData.slug}`}
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
                  /produk/{viewData.slug}
                </code>
              </div>

              <div className="rounded-2xl bg-[#f8fafc] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#64748b]">
                  Last Draft Update
                </p>
                <p className="mt-2 text-sm font-black text-[#475569]">
                  {viewData.updatedAt
                    ? new Date(viewData.updatedAt).toLocaleString("id-ID")
                    : "Belum ada draft"}
                </p>
              </div>

              <div className="rounded-2xl bg-[#fff7ed] p-4 ring-1 ring-[#fed7aa]">
                <p className="text-xs font-black uppercase tracking-wide text-[#c2410c]">
                  Reset Draft
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-[#9a3412]">
                  Hapus draft CMS dan kembalikan produk ke data original.
                </p>

                <form action={deleteProductDraft} className="mt-4">
                  <input type="hidden" name="originalSlug" value={product.slug} />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#c2410c] px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:bg-[#9a3412]"
                  >
                    Reset Draft
                  </button>
                </form>
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
