"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
    image: "/images/mednut/support/bmi-calculator.jpg",
    imageFit: "cover",
    visible: publicNavigationVisibility.nutritionCalculator,
  },
  {
    label: "Dapur Sehat Mednut",
    href: "/support-system/dapur-sehat-fima",
    desc: "Edukasi dan inspirasi nutrisi",
    image: "/images/mednut/support/education-health.jpg",
    imageFit: "cover",
    visible: true,
  },
  {
    label: "Artikel",
    href: "/artikel",
    desc: "Informasi nutrisi dan edukasi kesehatan",
    image: "/images/client-assets/img/stacked-books-pencil-stethoscope-white-surface.jpg",
    imageFit: "cover",
    visible: true,
  },
  {
    label: "Kisah Sukses Pasien",
    href: "/support-system/kisah-sukses-pasien",
    desc: "Cerita dan pengalaman pasien",
    image: "/images/mednut/support/doctor-consultation.jpg",
    imageFit: "cover",
    visible: true,
  },
  {
    label: "Komunitas Sehat",
    href: "/support-system/komunitas-sehat",
    desc: "Program komunitas dan edukasi",
    image: "/images/mednut/banners/brand-artboard-2.png",
    imageFit: "cover",
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
      { label: "Entrakid", href: "/produk/entrakid", desc: "Nutrisi untuk anak", image: "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRAKID/ENTRAKID VANILA 1.png", imageFit: "contain" },
      { label: "Entramix", href: "/produk/entramix", desc: "Nutrisi lengkap harian", image: "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRAMIX/ENTRAMIX VANILA 1.png", imageFit: "contain" },
      { label: "Entrasoy", href: "/produk/entrasoy", desc: "Nutrisi berbasis soya", image: "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRASOY PACKSHOOT/ENTRASOY.png", imageFit: "contain" },
      { label: "Peptisol", href: "/produk/peptisol", desc: "Nutrisi tinggi protein", image: "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/PEPTISOL/Peptisol Vanila 1.png", imageFit: "contain" },
      { label: "Peptibren", href: "/produk/peptibren", desc: "Nutrisi Kesehatan Syaraf", image: "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/PEPTIBREN/PEPTIBREN VANILA 1.png", imageFit: "contain" },
      { label: "Nephrisol", href: "/produk/nephrisol", desc: "Dukungan nutrisi ginjal", image: "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/NEPHRISOL/NEPHRISOL CAPPUCINO 1.png", imageFit: "contain" },
      { label: "Hepatosol", href: "/produk/hepatosol", desc: "Dukungan nutrisi hati", image: "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/HEPATOSOL/HEPATOSOL VANILA 1.png", imageFit: "contain" },
      { label: "Pulmosol", href: "/produk/pulmosol", desc: "Nutrisi Kesehatan Pernapasan", image: "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/PULMOSOL/PULMOSOL 1.png", imageFit: "contain" },
      { label: "Oligo", href: "/produk/oligo", desc: "Nutrisi Cepat Serap", image: "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/OLIGO/OLIGO 1.png", imageFit: "contain" },
    ],
  },
  solusi: {
    eyebrow: "Solusi Kesehatan",
    title: "Solusi nutrisi berdasarkan kebutuhan",
    description:
      "Temukan pilihan nutrisi untuk kebutuhan keluarga di setiap tahap kehidupan.",
    items: [
      { label: "Entramix", href: "/produk/entramix", desc: "Kebutuhan Harian Dewasa & Lansia", image: "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRAMIX/ENTRAMIX VANILA 1.png", imageFit: "contain" },
      { label: "Entrakid", href: "/produk/entrakid", desc: "Tumbuh Kembang Anak", image: "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRAKID/ENTRAKID VANILA 1.png", imageFit: "contain" },
      { label: "Entrasoy", href: "/produk/entrasoy", desc: "Pilihan Nutrisi Berbasis Kedelai", image: "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRASOY PACKSHOOT/ENTRASOY.png", imageFit: "contain" },
      { label: "Peptisol", href: "/produk/peptisol", desc: "Dukungan Nutrisi Masa Pemulihan", image: "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/PEPTISOL/Peptisol Vanila 1.png", imageFit: "contain" },
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
        image: "/images/mednut/events/hgn-2026.webp",
        imageFit: "cover",
      },
      {
        label: "Clinical Nutrition Symposium 2026",
        href: "/event",
        desc: "Seminar nutrisi klinis untuk tenaga kesehatan",
        image: "/images/mednut/events/hgn-2026.webp",
        imageFit: "cover",
      },
      {
        label: "Edukasi Nutrisi Keluarga",
        href: "/event",
        desc: "Webinar edukasi nutrisi keluarga",
        image: "/images/mednut/events/hgn-2026.webp",
        imageFit: "cover",
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

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {megaMenus[activeMega].items.map((item) => (
                <a
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  className="group grid grid-cols-[4.5rem_1fr] items-center gap-4 rounded-[1.5rem] border border-black/5 bg-[#f8fcfa] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#006b3f]/20 hover:bg-[#eefaf4] hover:shadow-xl hover:shadow-green-900/10"
                >
                  <span className="relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="72px"
                      className={item.imageFit === "cover" ? "object-cover" : "object-contain p-2"}
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-base font-black text-[#111827]">{item.label}</span>
                    <span className="mt-1 block text-sm font-medium leading-5 text-[#6b7280]">{item.desc}</span>
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
