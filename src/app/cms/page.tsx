import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { productDetails } from "@/data/product-details";
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
    { title: "Dapur Sehat FIMA", desc: "Kelola artikel resep dan detail konten nutrisi", count: "3 artikel", href: "#" },
    { title: "Event", desc: "Kelola event, registrasi, dan data peserta", count: "3 event", href: "/cms/events" },
    { title: "Apotek", desc: "Kelola daftar apotek, area, dan link Google Maps", count: "Partner", href: "/cms/pharmacies" },
    { title: "FAQ", desc: "Kelola halaman FAQ dan accordion", count: "10 FAQ", href: "/cms/faq" },
    { title: "Leads / Registrasi", desc: "Data dari assessment, konsultasi, dan event", count: "2 leads", href: "/cms/leads" },
    { title: "Pengaturan Website", desc: "SEO, banner, navigasi, dan informasi perusahaan", count: "Settings", href: "#" },
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
    { label: "Published Draft", value: String(publishedDraftCount) },
    { label: "Draft / Review", value: String(pendingDraftCount) },
    { label: "Last CMS Update", value: formatLastUpdate(lastUpdate) },
  ];
}

export default async function CmsPage() {
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

  return (
    <CmsAdminShell
      active="dashboard"
      title="CMS Dashboard"
      eyebrow="Medikal Nutrience Admin"
      description="Dashboard awal untuk mengelola konten website Medikal Nutrience, mulai dari produk, solusi, event, apotek, FAQ, hingga leads."
    >
      <section className="grid gap-4 md:grid-cols-4">
        {quickStats.map((stat) => (
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

      <section className="mt-6 grid gap-5 xl:grid-cols-3">
        {cmsMenus.map((menu) => (
          <article
            key={menu.title}
            className="group rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-900/10"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#006b3f]">
                  Module
                </p>
                <h3 className="mt-3 text-2xl font-black leading-tight">
                  {menu.title}
                </h3>
              </div>

              <span className="rounded-full bg-[#e4f8ed] px-3 py-1.5 text-xs font-black text-[#006b3f]">
                {menu.count}
              </span>
            </div>

            <p className="mt-4 text-sm font-medium leading-7 text-[#64748b]">
              {menu.desc}
            </p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl bg-[#f8fafc] px-4 py-3 text-sm font-bold text-[#64748b]">
                List data
              </div>
              <div className="rounded-2xl bg-[#f8fafc] px-4 py-3 text-sm font-bold text-[#64748b]">
                Create / edit form
              </div>
              <div className="rounded-2xl bg-[#f8fafc] px-4 py-3 text-sm font-bold text-[#64748b]">
                Publish / draft status
              </div>
            </div>

            <a
              href={menu.href}
              className={`mt-6 inline-flex rounded-full px-5 py-3 text-sm font-black transition ${
                menu.href === "#"
                  ? "cursor-not-allowed bg-[#e2e8f0] text-[#64748b]"
                  : "bg-[#006b3f] text-white group-hover:bg-[#005432]"
              }`}
            >
              {menu.href === "#" ? "Coming Soon" : "Open Module"}
            </a>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-[2rem] bg-[#004b34] p-6 text-white shadow-2xl shadow-green-900/15">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-white/60">
          Next Development Step
        </p>
        <h2 className="mt-4 text-3xl font-black leading-tight">
          CMS sudah memiliki shell utama, login, dashboard, dan module Products.
        </h2>
        <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-white/70">
          Module Products sudah bisa menyimpan draft, reset draft, dan membaca
          draft untuk halaman public produk. Tahap berikutnya adalah memperluas
          modul CMS lain seperti solusi, FAQ, event, dan apotek.
        </p>
      </section>
    </CmsAdminShell>
  );
}
