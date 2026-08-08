import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { productDetails } from "@/data/product-details";
import { promises as fs } from "fs";
import path from "path";
import { ArticleDashboardMetrics } from "@/components/cms/articles/ArticleDashboardMetrics";

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

async function getProductDrafts() {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "src/data/cms/cms-products.json"),
      "utf8"
    );

    return JSON.parse(file) as Record<string, CmsProductDraft>;
  } catch {
    return {};
  }
}

function formatLastUpdate(value: string | null) {
  if (!value) {
    return "Belum ada";
  }

  return new Date(value).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}


function getCmsMenus(productCount: number) {
  return [
    {
      title: "Produk",
      desc: "Kelola produk, logo, packshot, manfaat, dan CTA",
      count: `${productCount} produk`,
      href: "/cms/products",
    },
    { title: "Solusi", desc: "Kelola solusi berdasarkan kebutuhan tubuh", count: "7 solusi", href: "/cms/solutions" },
    { title: "Support System", desc: "Kelola kalkulator, komunitas, kisah pasien, dan edukasi", count: "4 modul", href: "/cms/support-system" },
    { title: "Dapur Sehat FIMA", desc: "Kelola artikel resep dan detail konten nutrisi", count: "3 artikel", href: "/cms/support-system/fima" },
    { title: "Event", desc: "Kelola event, registrasi, dan data peserta", count: "3 event", href: "/cms/events" },
    { title: "Apotek", desc: "Kelola daftar apotek, area, dan link Google Maps", count: "Partner", href: "/cms/pharmacies" },
    { title: "FAQ", desc: "Kelola halaman FAQ dan accordion", count: "10 FAQ", href: "/cms/faq" },
    { title: "Leads / Registrasi", desc: "Data dari assessment, konsultasi, dan event", count: "2 leads", href: "/cms/leads" },
    { title: "Pengaturan Website", desc: "SEO, banner, navigasi, dan informasi perusahaan", count: "CMS", href: "/cms/settings" },
  ];
}

function getQuickStats({
  productCount,
  publishedDraftCount,
  pendingDraftCount,
  lastUpdate,
}: {
  productCount: number;
  publishedDraftCount: number;
  pendingDraftCount: number;
  lastUpdate: string | null;
}) {
  return [
    { label: "Produk Aktif", value: String(productCount) },
    { label: "Konten Terbit", value: String(publishedDraftCount) },
    { label: "Perlu Ditinjau", value: String(pendingDraftCount) },
    { label: "Pembaruan Terakhir", value: formatLastUpdate(lastUpdate) },
  ];
}

export default async function CmsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const drafts = await getProductDrafts();
  const draftList = Object.values(drafts);
  const publishedDraftCount = draftList.filter(
    (draft) => draft.status === "published"
  ).length;
  const pendingDraftCount = draftList.filter(
    (draft) => draft.status === "draft" || draft.status === "review"
  ).length;
  const lastUpdate =
    draftList
      .map((draft) => draft.updatedAt)
      .filter(Boolean)
      .sort()
      .at(-1) ?? null;

  const quickStats = getQuickStats({
    productCount: productDetails.length,
    publishedDraftCount,
    pendingDraftCount,
    lastUpdate,
  });

  const cmsMenus = getCmsMenus(productDetails.length);
  const { error } = await searchParams;

  return (
    <CmsAdminShell
      active="dashboard"
      title="Dashboard"
      eyebrow="Medikal Nutrience Admin"
      description="Ringkasan konten, aktivitas editorial, dan akses cepat pengelolaan website."
    >
      {error === "forbidden" ? (
        <div
          role="alert"
          className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-bold text-amber-900"
        >
          Akun Anda hanya memiliki akses baca. Hubungi Super Admin jika Anda perlu mengubah konten.
        </div>
      ) : null}
      <ArticleDashboardMetrics />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickStats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-[1.5rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5"
          >
            <p className="text-3xl font-black leading-tight text-[#006b3f]">{stat.value}</p>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-[#64748b]">
              {stat.label}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
        <div className="flex flex-col gap-3 border-b border-black/5 p-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#006b3f]">Akses Cepat</p>
            <h2 className="mt-2 text-2xl font-black text-[#111827]">Kelola konten website</h2>
          </div>
          <p className="max-w-xl text-sm font-medium leading-6 text-[#64748b]">Pilih modul yang ingin diperbarui. Perubahan berstatus draft tidak akan tampil ke publik.</p>
        </div>
        <div className="grid gap-px bg-black/5 sm:grid-cols-2 xl:grid-cols-3">
        {cmsMenus.map((menu) => (
          <a
            key={menu.title}
            href={menu.href}
            className="group bg-white p-6 transition hover:bg-[#f4fbf8] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-[#006b3f]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-black leading-tight text-[#111827]">
                  {menu.title}
                </h3>
              </div>

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e4f8ed] text-lg font-black text-[#006b3f] transition group-hover:translate-x-1">
                →
              </span>
            </div>

            <p className="mt-3 text-sm font-medium leading-6 text-[#64748b]">
              {menu.desc}
            </p>
            <p className="mt-4 text-xs font-black text-[#006b3f]">{menu.count}</p>
          </a>
        ))}
        </div>
      </section>
    </CmsAdminShell>
  );
}
