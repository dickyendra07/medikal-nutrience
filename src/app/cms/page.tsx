import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { productDetails } from "@/data/product-details";
import { promises as fs } from "fs";
import path from "path";
import { ArticleDashboardMetrics } from "@/components/cms/articles/ArticleDashboardMetrics";
import { CmsCard, CmsMetricCard, CmsSectionHeader } from "@/components/cms/CmsUi";

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
      <section aria-label="Ringkasan website" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {quickStats.map((stat, index) => <CmsMetricCard key={stat.label} label={stat.label} value={stat.value} tone={index === 2 ? "amber" : index === 3 ? "neutral" : "green"} />)}
      </section>

      <ArticleDashboardMetrics />

      <CmsCard padding="none" className="mt-5 overflow-hidden">
        <CmsSectionHeader
          className="border-b border-slate-100 px-5 py-4"
          eyebrow="Akses cepat"
          title="Kelola konten website"
          description="Pilih area kerja. Konten draft tetap aman dan tidak tampil di website publik."
        />
        <div className="grid gap-px bg-slate-200 sm:grid-cols-2 xl:grid-cols-3">
        {cmsMenus.map((menu) => (
          <a
            key={menu.title}
            href={menu.href}
            className="group bg-white px-5 py-4 transition hover:bg-slate-50 focus-visible:z-10"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-sm font-semibold text-slate-800">{menu.title}</h3>
              <span aria-hidden="true" className="text-sm text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#16805b]">→</span>
            </div>
            <p className="mt-1.5 line-clamp-1 text-[11px] leading-5 text-slate-500">{menu.desc}</p>
            <p className="mt-2.5 text-[10px] font-medium text-[#16805b]">{menu.count}</p>
          </a>
        ))}
        </div>
      </CmsCard>
    </CmsAdminShell>
  );
}
