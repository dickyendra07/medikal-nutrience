import { BrandLogo } from "@/components/shared/BrandLogo";

const cmsMenuGroups = [
  {
    label: "Workspace",
    menus: [
      {
        title: "Dashboard",
        desc: "Overview website",
        count: "Overview",
        href: "/cms",
        icon: "▦",
      },
    ],
  },
  {
    label: "Content",
    menus: [
      {
        title: "Media Library",
        desc: "Asset gambar terpusat",
        count: "New",
        href: "/cms/media",
        icon: "▧",
      },
      {
        title: "Artikel",
        desc: "Artikel & publikasi",
        count: "CMS",
        href: "/cms/articles",
        icon: "✎",
      },
      {
        title: "Event",
        desc: "Event & registrasi",
        count: "3",
        href: "/cms/events",
        icon: "◉",
      },
      {
        title: "Produk",
        desc: "Kelola produk",
        count: "11",
        href: "/cms/products",
        icon: "◈",
      },
      {
        title: "Solusi",
        desc: "Solusi nutrisi",
        count: "7",
        href: "/cms/solutions",
        icon: "✦",
      },
    ],
  },
  {
    label: "Operations",
    menus: [
      {
        title: "Support System",
        desc: "Edukasi & layanan",
        count: "4",
        href: "/cms/support-system",
        icon: "✚",
      },
      {
        title: "Apotek",
        desc: "Partner apotek",
        count: "33+",
        href: "/cms/pharmacies",
        icon: "⌖",
      },
      {
        title: "FAQ",
        desc: "Pertanyaan umum",
        count: "10",
        href: "/cms/faq",
        icon: "?",
      },
      {
        title: "Leads",
        desc: "Assessment & form",
        count: "2",
        href: "/cms/leads",
        icon: "✉",
      },
    ],
  },
  {
    label: "System",
    menus: [
      {
        title: "Pengaturan",
        desc: "SEO & website",
        count: "CMS",
        href: "/cms/settings",
        icon: "⚙",
      },
    ],
  },
];

const cmsMenus = cmsMenuGroups.flatMap((group) => group.menus);

type CmsAdminShellProps = {
  active:
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
  title: string;
  eyebrow?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

function isActiveMenu(active: CmsAdminShellProps["active"], href: string) {
  if (active === "dashboard") return href === "/cms";
  if (active === "media") return href === "/cms/media";
  if (active === "articles") return href === "/cms/articles";
  if (active === "products") return href === "/cms/products";
  if (active === "solutions") return href === "/cms/solutions";
  if (active === "events") return href === "/cms/events";
  if (active === "support-system") return href === "/cms/support-system";
  if (active === "faq") return href === "/cms/faq";
  if (active === "pharmacies") return href === "/cms/pharmacies";
  if (active === "leads") return href === "/cms/leads";
  if (active === "settings") return href === "/cms/settings";
  return false;
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
    <main className="min-h-screen bg-[#eef8f3] text-[#0f172a]">
      <div className="grid min-h-screen lg:grid-cols-[284px_minmax(0,1fr)]">
        <aside className="hidden border-r border-white/10 bg-[#003f2d] text-white lg:sticky lg:top-0 lg:block lg:h-screen">
          <div className="flex h-full flex-col">
            <div className="p-5 pb-3">
              <div className="rounded-[1.5rem] bg-white p-4 shadow-xl shadow-black/10">
                <BrandLogo />
              </div>

              <div className="mt-4 px-2 py-3">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-white/45">
                  Admin Workspace
                </p>
                <h2 className="mt-2 text-xl font-black leading-tight">
                  Medikal Nutrience
                </h2>
                <p className="mt-2 text-xs font-medium leading-5 text-white/55">
                  Kelola konten dan publikasi website.
                </p>
              </div>
            </div>

            <nav className="flex-1 space-y-4 overflow-y-auto px-3 pb-4">
              {cmsMenuGroups.map((group) => (
                <div key={group.label}>
                  <p className="mb-2 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.menus.map((menu) => {
                      const selected = isActiveMenu(active, menu.href);
                      const disabled = menu.href === "#";

                      return (
                        <a
                          key={menu.title}
                          href={disabled ? undefined : menu.href}
                          aria-disabled={disabled}
                          className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition ${
                            selected
                              ? "bg-white text-[#004b34] shadow-xl shadow-black/10"
                              : disabled
                                ? "cursor-not-allowed text-white/35"
                                : "text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black transition ${
                              selected
                                ? "bg-[#e4f8ed] text-[#006b3f]"
                                : "bg-white/10 text-white/70 group-hover:bg-white/15"
                            }`}
                          >
                            {menu.icon}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-black">
                              {menu.title}
                            </span>
                            {selected ? <span className="mt-0.5 block truncate text-[11px] font-medium text-[#006b3f]/65">{menu.desc}</span> : null}
                          </span>
                          <span aria-hidden="true" className={selected ? "text-[#006b3f]" : "text-white/25"}>›</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            <div className="border-t border-white/10 p-4">
              <div className="rounded-[1.25rem] bg-white/10 p-3.5 ring-1 ring-white/10">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black">Admin Mode</p>
                    <p className="mt-1 text-xs font-medium text-white/45">
                      Protected session
                    </p>
                  </div>

                  <span className="h-3 w-3 rounded-full bg-emerald-300 shadow-lg shadow-emerald-300/30" />
                </div>

                <form action="/api/cms/logout" method="post" className="mt-4">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-white px-4 py-2.5 text-xs font-black text-[#004b34] transition hover:bg-[#eaf8f0]"
                  >
                    Logout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-40 border-b border-black/5 bg-[#eef8f3]/92 px-5 py-4 backdrop-blur-xl md:px-8 lg:px-10">
            <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#006b3f]">
                  {eyebrow}
                </p>
                <h1 className="mt-1.5 text-2xl font-black leading-tight text-[#111827] md:text-3xl">
                  {title}
                </h1>
                {description ? (
                  <p className="mt-1.5 max-w-3xl text-sm font-medium leading-6 text-[#64748b]">
                    {description}
                  </p>
                ) : null}
              </div>

              <div className="flex shrink-0 items-center gap-3">
                {actions}
                <a
                  href="/"
                  target="_blank"
                  className="hidden rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/5 ring-1 ring-black/5 transition hover:-translate-y-0.5 md:inline-flex"
                >
                  View Site
                </a>
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-[1440px] px-5 py-6 md:px-8 lg:px-10">
            <div className="mb-5 rounded-[1.5rem] bg-white p-4 shadow-lg shadow-slate-900/5 ring-1 ring-black/5 lg:hidden">
              <div className="flex items-center justify-between gap-4">
                <BrandLogo />
                <form action="/api/cms/logout" method="post">
                  <button className="rounded-full bg-[#006b3f] px-4 py-2 text-xs font-black text-white">
                    Logout
                  </button>
                </form>
              </div>

              <details className="mt-4 rounded-2xl bg-[#f4fbf8] p-2">
                <summary className="cursor-pointer list-none rounded-xl px-3 py-2 text-sm font-black text-[#006b3f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006b3f]">
                  Navigasi CMS <span aria-hidden="true" className="float-right">⌄</span>
                </summary>
                <div className="mt-2 grid grid-cols-2 gap-2 border-t border-[#006b3f]/10 pt-2">
                  {cmsMenus.map((menu) => (
                    <a
                      key={menu.title}
                      href={menu.href}
                      className={`rounded-xl px-3 py-2.5 text-sm font-black ${
                        isActiveMenu(active, menu.href)
                          ? "bg-[#006b3f] text-white"
                          : "bg-white text-[#006b3f]"
                      }`}
                    >
                      {menu.title}
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
