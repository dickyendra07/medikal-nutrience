"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/shared/BrandLogo";

type MegaMenuItem = {
  label: string;
  href: string;
  description: string;
  badge?: string;
};

type MainMenuItem = {
  label: string;
  href: string;
  description?: string;
  children?: MegaMenuItem[];
};

const mainMenu: MainMenuItem[] = [
  {
    label: "Beranda",
    href: "/",
  },
  {
    label: "Produk",
    href: "/produk",
    description:
      "Rangkaian produk nutrisi untuk anak, dewasa, lansia, dan kondisi medis tertentu.",
    children: [
      {
        label: "Entrakid",
        href: "/produk/entrakid",
        description: "Nutrisi untuk tumbuh kembang anak usia 1–12 tahun.",
        badge: "Anak",
      },
      {
        label: "Entramix",
        href: "/produk/entramix",
        description: "Nutrisi lengkap dan seimbang untuk dewasa hingga lansia.",
        badge: "Lansia",
      },
      {
        label: "Entrasoy",
        href: "/produk/entrasoy",
        description: "Solusi gizi 100% protein nabati.",
        badge: "Nabati",
      },
      {
        label: "Peptisol",
        href: "/produk/peptisol",
        description: "Tinggi protein untuk pemulihan pasca sakit.",
        badge: "Pemulihan",
      },
      {
        label: "Peptibren",
        href: "/produk/peptibren",
        description: "Dukungan nutrisi untuk kebutuhan stroke/alzheimer.",
        badge: "Neuro",
      },
      {
        label: "Nephrisol",
        href: "/produk/nephrisol",
        description: "Dukungan nutrisi ginjal sebelum dialisis.",
        badge: "Ginjal",
      },
      {
        label: "Nephrisol-D",
        href: "/produk/nephrisol-d",
        description: "Nutrisi khusus untuk pasien ginjal dialisis.",
        badge: "Dialisis",
      },
      {
        label: "Hepatosol",
        href: "/produk/hepatosol",
        description: "Solusi gizi untuk gangguan fungsi hati kronik.",
        badge: "Hati",
      },
      {
        label: "Hepatosol Lola",
        href: "/produk/hepatosol-lola",
        description: "Nutrisi enteral untuk gangguan fungsi hati berat.",
        badge: "Hati",
      },
      {
        label: "Oligo",
        href: "/produk/oligo",
        description: "Nutrisi cepat serap untuk sistem saluran cerna.",
        badge: "Cerna",
      },
      {
        label: "Pulmosol",
        href: "/produk/pulmosol",
        description: "Solusi nutrisi untuk masalah pernafasan.",
        badge: "Napas",
      },
    ],
  },
  {
    label: "Solusi",
    href: "/solusi",
    description:
      "Temukan rekomendasi produk berdasarkan kondisi tubuh dan kebutuhan nutrisi.",
    children: [
      {
        label: "Ginjal",
        href: "/solusi/ginjal",
        description: "Rekomendasi untuk pra-dialisis dan dialisis.",
        badge: "Nephrisol",
      },
      {
        label: "Hati / Liver",
        href: "/solusi/hati-liver",
        description: "Dukungan nutrisi untuk gangguan fungsi hati.",
        badge: "Hepatosol",
      },
      {
        label: "Pernafasan",
        href: "/solusi/pernafasan",
        description: "Dukungan nutrisi untuk PPOK, asma, pneumonia, dan TB paru.",
        badge: "Pulmosol",
      },
      {
        label: "Pencernaan",
        href: "/solusi/pencernaan",
        description: "Solusi cepat serap untuk saluran cerna.",
        badge: "Oligo",
      },
      {
        label: "Pemulihan",
        href: "/solusi/pemulihan",
        description: "Dukungan nutrisi pasca operasi dan pemulihan.",
        badge: "Peptisol",
      },
      {
        label: "Anak",
        href: "/solusi/anak",
        description: "Dukungan nutrisi untuk tumbuh kembang anak.",
        badge: "Entrakid",
      },
      {
        label: "Dewasa & Lansia",
        href: "/solusi/dewasa-lansia",
        description: "Nutrisi seimbang untuk dewasa dan lansia.",
        badge: "Entramix",
      },
    ],
  },
  {
    label: "Support System",
    href: "/support-system",
    description:
      "Fitur pendukung untuk membantu pengguna memahami status gizi, membaca edukasi, dan mengikuti aktivitas kesehatan.",
    children: [
      {
        label: "Kalkulator Status Gizi",
        href: "/support-system/kalkulator-status-gizi",
        description: "Cek status gizi awal berdasarkan data tubuh pengguna.",
        badge: "BMI",
      },
      {
        label: "Kisah Sukses Pasien",
        href: "/support-system/kisah-sukses-pasien",
        description: "Cerita inspiratif perjalanan pasien dan dukungan nutrisi.",
        badge: "Story",
      },
      {
        label: "Dapur Sehat Fima",
        href: "/support-system/dapur-sehat-fima",
        description: "Inspirasi menu dan resep sehat untuk kebutuhan harian.",
        badge: "Resep",
      },
      {
        label: "Komunitas Sehat",
        href: "/support-system/komunitas-sehat",
        description: "Ruang edukasi dan aktivitas komunitas untuk hidup lebih sehat.",
        badge: "Community",
      },
    ],
  },
  {
    label: "Tentang",
    href: "/tentang",
  },
];

const quickLinks = [
  {
    label: "Mitra Enterprise",
    href: "/mitra-enterprise",
  },
  {
    label: "Apotek Resmi",
    href: "/apotek-resmi",
  },
  {
    label: "Kontak",
    href: "/kontak",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  const activeMenu = mainMenu.find((item) => item.label === activeMegaMenu);

  return (
    <header
      className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur"
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-5">
        <a
          href="/"
          className="flex items-center"
          onClick={() => {
            setIsOpen(false);
            setActiveMegaMenu(null);
          }}
        >
          <BrandLogo />
        </a>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="flex w-full max-w-md items-center rounded-full border border-black/10 bg-white px-5 py-2.5 shadow-sm">
            <input
              type="text"
              placeholder="Cari produk, solusi, atau artikel..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#9ca3af]"
            />
            <span className="text-sm text-[#006b3f]">⌕</span>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#374151] lg:flex">
          {mainMenu.map((item) => (
            <div
              key={item.label}
              className="py-2"
              onMouseEnter={() => {
                if (item.children) {
                  setActiveMegaMenu(item.label);
                } else {
                  setActiveMegaMenu(null);
                }
              }}
            >
              <a
                href={item.href}
                onFocus={() => {
                  if (item.children) {
                    setActiveMegaMenu(item.label);
                  }
                }}
                className={`inline-flex items-center gap-1 transition hover:text-[#006b3f] ${
                  isActive(item.href) ? "font-black text-[#006b3f]" : ""
                }`}
              >
                {item.label}
                {item.children ? <span className="text-xs">⌄</span> : null}
              </a>
            </div>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex items-center gap-2 rounded-full bg-[#006b3f] px-4 py-2 text-sm font-semibold text-white lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span>{isOpen ? "Tutup" : "Menu"}</span>
          <span className="text-base leading-none">{isOpen ? "×" : "☰"}</span>
        </button>
      </div>

      {activeMenu?.children ? (
        <div
          className="hidden border-t border-black/5 bg-white shadow-2xl shadow-green-900/10 lg:block"
          onMouseEnter={() => setActiveMegaMenu(activeMenu.label)}
        >
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="rounded-[2rem] bg-[#006b3f] p-8 text-white">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#b7f7d0]">
                {activeMenu.label}
              </p>

              <h3 className="mt-4 text-3xl font-black leading-tight">
                Jelajahi {activeMenu.label}
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/80">
                {activeMenu.description}
              </p>

              <a
                href={activeMenu.href}
                className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-black text-[#006b3f]"
                onClick={() => setActiveMegaMenu(null)}
              >
                Lihat Semua {activeMenu.label}
              </a>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {activeMenu.children.map((child) => (
                <a
                  key={child.href}
                  href={child.href}
                  onClick={() => setActiveMegaMenu(null)}
                  className="group rounded-[1.5rem] bg-[#f8fafc] p-5 ring-1 ring-black/5 transition hover:bg-[#e4f8ed] hover:ring-[#006b3f]/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-black text-[#0f172a] group-hover:text-[#006b3f]">
                        {child.label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#64748b]">
                        {child.description}
                      </p>
                    </div>

                    {child.badge ? (
                      <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#006b3f] shadow-sm">
                        {child.badge}
                      </span>
                    ) : null}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {isOpen ? (
        <div className="border-t border-black/5 bg-white px-5 pb-6 pt-2 shadow-2xl shadow-green-900/10 lg:hidden">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5 flex rounded-full border border-black/10 bg-[#f8fafc] px-5 py-3 shadow-sm md:hidden">
              <input
                type="text"
                placeholder="Cari produk, solusi, atau artikel..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#9ca3af]"
              />
              <span className="text-sm text-[#006b3f]">⌕</span>
            </div>

            <nav className="grid gap-3">
              {mainMenu.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.5rem] bg-[#f4fbf8] p-2"
                >
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex rounded-2xl px-5 py-4 text-sm font-black transition ${
                      isActive(item.href)
                        ? "bg-[#006b3f] text-white"
                        : "bg-white text-[#334155] hover:bg-[#e4f8ed] hover:text-[#006b3f]"
                    }`}
                  >
                    {item.label}
                  </a>

                  {item.children ? (
                    <div className="mt-2 grid gap-1 px-2 pb-2">
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="rounded-xl px-4 py-3 text-sm font-bold text-[#475569] transition hover:bg-white hover:text-[#006b3f]"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>

            <div className="mt-5 rounded-[1.5rem] bg-[#f8fafc] p-4 ring-1 ring-black/5">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-[#006b3f]">
                Akses Cepat
              </p>

              <div className="grid gap-2 sm:grid-cols-3">
                {quickLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#334155] shadow-sm transition hover:text-[#006b3f]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="/kontak"
              onClick={() => setIsOpen(false)}
              className="mt-5 flex items-center justify-center rounded-full bg-[#006b3f] px-6 py-4 text-sm font-black text-white shadow-lg shadow-green-900/20"
            >
              Konsultasi Sekarang
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
