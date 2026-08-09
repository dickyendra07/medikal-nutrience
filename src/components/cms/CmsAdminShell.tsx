import { BrandLogo } from "@/components/shared/BrandLogo";

type CmsMenuKey =
  | "dashboard"
  | "media"
  | "articles"
  | "products"
  | "solutions"
  | "events"
  | "support-system"
  | "pharmacies"
  | "faq"
  | "leads"
  | "settings";

type CmsMenu = {
  key: CmsMenuKey;
  title: string;
  desc: string;
  href: string;
  icon: "grid" | "image" | "edit" | "calendar" | "box" | "spark" | "plus" | "pin" | "help" | "mail" | "settings";
};

const cmsMenuGroups: Array<{ label: string; menus: CmsMenu[] }> = [
  {
    label: "Workspace",
    menus: [{ key: "dashboard", title: "Dashboard", desc: "Ringkasan website", href: "/cms", icon: "grid" }],
  },
  {
    label: "Konten",
    menus: [
      { key: "media", title: "Media Library", desc: "Aset gambar", href: "/cms/media", icon: "image" },
      { key: "articles", title: "Artikel", desc: "Editorial", href: "/cms/articles", icon: "edit" },
      { key: "events", title: "Event", desc: "Agenda & registrasi", href: "/cms/events", icon: "calendar" },
      { key: "products", title: "Produk", desc: "Informasi produk", href: "/cms/products", icon: "box" },
      { key: "solutions", title: "Solusi", desc: "Solusi nutrisi", href: "/cms/solutions", icon: "spark" },
    ],
  },
  {
    label: "Operasional",
    menus: [
      { key: "support-system", title: "Support System", desc: "Edukasi & layanan", href: "/cms/support-system", icon: "plus" },
      { key: "pharmacies", title: "Apotek", desc: "Partner resmi", href: "/cms/pharmacies", icon: "pin" },
      { key: "faq", title: "FAQ", desc: "Pertanyaan umum", href: "/cms/faq", icon: "help" },
      { key: "leads", title: "Leads", desc: "Assessment & form", href: "/cms/leads", icon: "mail" },
    ],
  },
  {
    label: "Sistem",
    menus: [{ key: "settings", title: "Pengaturan", desc: "SEO & website", href: "/cms/settings", icon: "settings" }],
  },
];

const cmsMenus = cmsMenuGroups.flatMap((group) => group.menus);

type CmsAdminShellProps = {
  active: CmsMenuKey;
  title: string;
  eyebrow?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

const iconPaths: Record<CmsMenu["icon"], React.ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 15-5-5L5 20" /></>,
  edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
  box: <><path d="m21 8-9 5-9-5 9-5Z" /><path d="m3 8 9 5 9-5v8l-9 5-9-5Z" /><path d="M12 13v8" /></>,
  spark: <path d="m12 3-1.4 4.1L6.5 8.5l4.1 1.4L12 14l1.4-4.1 4.1-1.4-4.1-1.4ZM5 14l-.8 2.2L2 17l2.2.8L5 20l.8-2.2L8 17l-2.2-.8Z" />,
  plus: <><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.7 2.7 0 1 1 4.2 2.3c-1 .7-1.7 1.2-1.7 2.7M12 18h.01" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
};

function CmsNavIcon({ icon }: { icon: CmsMenu["icon"] }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {iconPaths[icon]}
    </svg>
  );
}

function SidebarNavigation({ active }: { active: CmsMenuKey }) {
  return (
    <nav aria-label="Navigasi CMS" className="flex-1 space-y-5 overflow-y-auto px-3 pb-5">
      {cmsMenuGroups.map((group) => (
        <div key={group.label}>
          <p className="mb-1.5 px-2.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {group.label}
          </p>
          <div className="space-y-0.5">
            {group.menus.map((menu) => {
              const selected = active === menu.key;
              return (
                <a
                  key={menu.key}
                  href={menu.href}
                  aria-current={selected ? "page" : undefined}
                  className={`group flex min-h-10 items-center gap-3 rounded-xl px-2.5 py-2 transition-colors ${
                    selected
                      ? "bg-[#eaf6f0] text-[#08704c]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${selected ? "bg-white shadow-sm ring-1 ring-emerald-100" : "text-slate-400 group-hover:text-slate-600"}`}>
                    <CmsNavIcon icon={menu.icon} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium">{menu.title}</span>
                    {selected ? <span className="mt-0.5 block truncate text-[10px] text-[#08704c]/65">{menu.desc}</span> : null}
                  </span>
                  {selected ? <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#16805b]" /> : null}
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function CmsAdminShell({
  active,
  title,
  eyebrow = "Medikal Nutrience CMS",
  description,
  children,
  actions,
}: CmsAdminShellProps) {
  return (
    <main className="min-h-screen bg-[#f5f7f6] text-slate-800">
      <div className="grid min-h-screen lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="hidden border-r border-slate-200/80 bg-white lg:sticky lg:top-0 lg:block lg:h-screen">
          <div className="flex h-full flex-col">
            <div className="px-4 pb-4 pt-5">
              <div className="flex h-12 items-center rounded-xl border border-slate-200/80 bg-white px-3 shadow-sm">
                <div className="w-[132px]"><BrandLogo /></div>
              </div>
              <div className="mt-3 px-2">
                <p className="text-[10px] font-medium text-slate-400">Content workspace</p>
              </div>
            </div>

            <SidebarNavigation active={active} />

            <div className="border-t border-slate-100 p-3">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-slate-50/70 p-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#08704c] text-[11px] font-semibold text-white">AD</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-slate-700">Admin CMS</p>
                  <p className="mt-0.5 text-[10px] text-slate-400">Sesi terlindungi</p>
                </div>
                <form action="/api/cms/logout" method="post">
                  <button type="submit" aria-label="Keluar dari CMS" title="Keluar" className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-700">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17l5-5-5-5M15 12H3M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /></svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-40 border-b border-slate-200/75 bg-white/90 px-4 py-3 backdrop-blur-xl md:px-7 lg:px-8">
            <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
                  <span>CMS</span><span aria-hidden="true">/</span><span className="truncate text-[#16805b]">{eyebrow}</span>
                </div>
                <h1 className="mt-1 truncate text-[26px] font-semibold tracking-[-0.025em] text-slate-900">{title}</h1>
                {description ? <p className="mt-1 hidden max-w-2xl truncate text-[12px] text-slate-500 sm:block">{description}</p> : null}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {actions ?? (
                  <a href="/" target="_blank" className="hidden h-9 items-center rounded-lg border border-slate-200 bg-white px-3.5 text-[11px] font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 md:inline-flex">
                    Lihat website
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-2 h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" /></svg>
                  </a>
                )}
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-[1360px] px-4 py-5 md:px-7 md:py-7 lg:px-8">
            <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:hidden">
              <div className="flex items-center justify-between gap-4">
                <div className="w-[132px]"><BrandLogo /></div>
                <form action="/api/cms/logout" method="post"><button className="h-8 rounded-lg border border-slate-200 px-3 text-[11px] font-semibold text-slate-600">Keluar</button></form>
              </div>
              <details className="mt-3 border-t border-slate-100 pt-2">
                <summary className="cursor-pointer list-none rounded-lg px-2 py-2 text-xs font-semibold text-slate-700">
                  Navigasi CMS <span aria-hidden="true" className="float-right text-slate-400">⌄</span>
                </summary>
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  {cmsMenus.map((menu) => (
                    <a key={menu.key} href={menu.href} aria-current={active === menu.key ? "page" : undefined} className={`flex min-h-9 items-center gap-2 rounded-lg px-2.5 text-[11px] font-medium ${active === menu.key ? "bg-[#eaf6f0] text-[#08704c]" : "bg-slate-50 text-slate-600"}`}>
                      <CmsNavIcon icon={menu.icon} />{menu.title}
                    </a>
                  ))}
                </div>
              </details>
            </div>
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
