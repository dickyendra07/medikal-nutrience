"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BrandLogo } from "@/components/shared/BrandLogo";

const publicNavigationVisibility = {
  event: false,
  contact: false,
  consultation: false,
  nutritionCalculator: false,
};

const menuItems = [
  { label: "Home", href: "/", visible: true },
  { label: "Tentang", href: "/tentang", visible: true },
  { label: "Produk", href: "/produk", mega: "produk", visible: true },
  { label: "Solusi", href: "/solusi", mega: "solusi", visible: true },
  {
    label: "Support System",
    href: "/support-system",
    mega: "support",
    visible: true,
  },
  {
    label: "Event",
    href: "/event",
    mega: "event",
    visible: publicNavigationVisibility.event,
  },
  {
    label: "Kontak",
    href: "/kontak",
    visible: publicNavigationVisibility.contact,
  },
].filter((item) => item.visible);

const supportMenuItems = [
  {
    label: "Kalkulator Status Gizi",
    href: "/support-system/kalkulator-status-gizi",
    desc: "Cek BMI/IMT",
    visible: publicNavigationVisibility.nutritionCalculator,
  },
  {
    label: "Dapur Sehat Mednut",
    href: "/support-system/dapur-sehat-fima",
    desc: "Edukasi dan inspirasi nutrisi",
    visible: true,
  },
  {
    label: "Artikel",
    href: "/artikel",
    desc: "Informasi nutrisi dan edukasi kesehatan",
    visible: true,
  },
  {
    label: "Kisah Sukses Pasien",
    href: "/support-system/kisah-sukses-pasien",
    desc: "Cerita dan pengalaman pasien",
    visible: true,
  },
  {
    label: "Komunitas Sehat",
    href: "/support-system/komunitas-sehat",
    desc: "Program komunitas dan edukasi",
    visible: false,
  },
].filter((item) => item.visible);

const megaMenus = {
  produk: {
    eyebrow: "Produk Nutrisi",
    title: "Pilihan nutrisi Medikal Nutrience",
    description:
      "Jelajahi produk nutrisi untuk kebutuhan anak, dewasa, lansia, dan kondisi kesehatan khusus.",
    items: [
      { label: "Entrakid", href: "/produk/entrakid", desc: "Nutrisi untuk anak" },
      { label: "Entramix", href: "/produk/entramix", desc: "Nutrisi lengkap harian" },
      { label: "Entrasoy", href: "/produk/entrasoy", desc: "Nutrisi berbasis soya" },
      { label: "Peptisol", href: "/produk/peptisol", desc: "Nutrisi tinggi protein" },
      { label: "Peptibren", href: "/produk/peptibren", desc: "Nutrisi Kesehatan Syaraf" },
      { label: "Nephrisol", href: "/produk/nephrisol", desc: "Dukungan nutrisi ginjal" },
      { label: "Hepatosol", href: "/produk/hepatosol", desc: "Dukungan nutrisi hati" },
      { label: "Pulmosol", href: "/produk/pulmosol", desc: "Nutrisi Kesehatan Pernapasan" },
      { label: "Oligo", href: "/produk/oligo", desc: "Nutrisi Cepat Serap" },
    ],
  },
  solusi: {
    eyebrow: "Solusi Kesehatan",
    title: "Solusi nutrisi berdasarkan kondisi",
    description:
      "Temukan rekomendasi nutrisi berdasarkan kebutuhan tubuh dan kondisi kesehatan.",
    items: [
      { label: "Ginjal", href: "/solusi/ginjal", desc: "Dukungan Nutrisi Ginjal" },
      { label: "Hati / Liver", href: "/solusi/hati-liver", desc: "Dukungan fungsi hati" },
      { label: "Pernapasan", href: "/solusi/pernafasan", desc: "Dukungan Nutrisi Pernapasan" },
      { label: "Pencernaan", href: "/solusi/pencernaan", desc: "Dukungan Cepat Serap" },
      { label: "Sistem Saraf", href: "/produk/peptibren", desc: "Dukungan Nutrisi Kesehatan Syaraf" },
    ],
  },
  event: {
    eyebrow: "Event Medikal Nutrience",
    title: "Pilih event edukasi yang ingin Anda ikuti",
    description:
      "Lihat daftar seminar, health talk, demo cooking, dan kegiatan edukasi Medikal Nutrience.",
    items: [
      {
        label: "Hari Gizi Nasional 2026",
        href: "/event",
        desc: "Health talk dan demo cooking untuk lansia kuat dan aktif",
      },
      {
        label: "Clinical Nutrition Symposium 2026",
        href: "/event",
        desc: "Seminar nutrisi klinis untuk tenaga kesehatan",
      },
      {
        label: "Edukasi Nutrisi Keluarga",
        href: "/event",
        desc: "Webinar edukasi nutrisi keluarga",
      },
    ],
  },
  support: {
    eyebrow: "Support System",
    title: "Tools dan edukasi pendukung",
    description:
      "Dukung perjalanan nutrisi dengan edukasi, inspirasi menu, dan cerita pasien.",
    items: supportMenuItems,
  },
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type MegaKey = keyof typeof megaMenus;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaKey | null>(null);
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl"
      onMouseLeave={() => setActiveMega(null)}
    >
      <div className="mx-auto flex h-24 w-full max-w-[1440px] items-center justify-between px-5 lg:px-10">
        <Link href="/" className="flex items-center" aria-label="Medikal Nutrience - Beranda">
          <BrandLogo className="h-12 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {menuItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            const hasMega = Boolean(item.mega);

            return (
              <div
                key={`${item.href}-${item.label}`}
                className="relative"
                onMouseEnter={() =>
                  hasMega ? setActiveMega(item.mega as MegaKey) : setActiveMega(null)
                }
              >
                <a
                  href={item.href}
                  className={`group relative inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold transition duration-300 ${
                    active
                      ? "bg-[#e7f7ef] text-[#006b3f]"
                      : "text-[#263238] hover:bg-[#f0faf5] hover:text-[#006b3f]"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {hasMega ? (
                    <span
                      className={`text-xs transition ${
                        activeMega === item.mega ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  ) : null}

                  <span
                    className={`absolute bottom-2 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#006b3f] via-[#10b981] to-[#8bd450] transition-all duration-300 ${
                      active
                        ? "w-8 opacity-100"
                        : "w-0 opacity-0 group-hover:w-8 group-hover:opacity-100"
                    }`}
                  />
                </a>
              </div>
            );
          })}
        </nav>

        {publicNavigationVisibility.consultation ? (
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="/kontak"
              className="group inline-flex items-center gap-3 rounded-full bg-[#006b3f] px-5 py-3 text-sm font-black text-white shadow-lg shadow-green-900/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#005635] hover:shadow-xl hover:shadow-green-900/20"
            >
              Konsultasi
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition group-hover:bg-white/30">
                →
              </span>
            </a>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-[#006b3f] shadow-sm lg:hidden"
          aria-label="Toggle menu"
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current transition ${
                isOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current transition ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-current transition ${
                isOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {activeMega ? (
        <div
          className="hidden border-t border-black/5 bg-white/95 shadow-2xl shadow-slate-900/10 backdrop-blur-xl lg:block"
          onMouseEnter={() => setActiveMega(activeMega)}
        >
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-[0.85fr_1.15fr] gap-10 px-10 py-8">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#006b3f] via-[#087a4c] to-[#10b981] p-8 text-white">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-white/70">
                {megaMenus[activeMega].eyebrow}
              </p>
              <h3 className="mt-5 max-w-md text-3xl font-black leading-tight">
                {megaMenus[activeMega].title}
              </h3>
              <p className="mt-4 max-w-md text-sm font-medium leading-7 text-white/80">
                {megaMenus[activeMega].description}
              </p>

              <a
                href={
                  activeMega === "produk"
                    ? "/produk"
                    : activeMega === "solusi"
                      ? "/solusi"
                      : activeMega === "event"
                        ? "/event"
                        : "/support-system"
                }
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-black text-[#006b3f] transition hover:-translate-y-0.5"
              >
                Lihat Semua
                <span>→</span>
              </a>
            </div>

            <div className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {megaMenus[activeMega].items.map((item) => (
                <a
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  className="group rounded-[1.5rem] border border-black/5 bg-[#f8fcfa] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#006b3f]/20 hover:bg-[#eefaf4] hover:shadow-xl hover:shadow-green-900/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006b3f]"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="min-w-0">
                      <span className="block text-base font-black text-[#111827]">{item.label}</span>
                      <span className="mt-2 block text-sm font-medium leading-6 text-[#6b7280]">{item.desc}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e1f5eb] text-sm font-black text-[#006b3f] transition group-hover:bg-[#006b3f] group-hover:text-white"
                    >
                      →
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {isOpen ? (
        <div className="border-t border-black/5 bg-white px-5 py-5 shadow-2xl shadow-slate-900/10 lg:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-2">
            {menuItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <a
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`relative overflow-hidden rounded-2xl px-5 py-4 text-base font-bold transition ${
                    active
                      ? "bg-[#006b3f] text-white shadow-lg shadow-green-900/15"
                      : "bg-[#f6fbf8] text-[#263238] hover:bg-[#e7f7ef] hover:text-[#006b3f]"
                  }`}
                >
                  {item.label}

                  {active ? (
                    <span className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#8bd450] via-[#10b981] to-[#006b3f]" />
                  ) : null}
                </a>
              );
            })}

            {publicNavigationVisibility.consultation ? (
              <a
                href="/kontak"
                onClick={() => setIsOpen(false)}
                className="mt-3 rounded-2xl bg-[#006b3f] px-5 py-4 text-center text-base font-black text-white shadow-lg shadow-green-900/15"
              >
                Konsultasi Sekarang
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
