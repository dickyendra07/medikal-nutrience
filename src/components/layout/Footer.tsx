"use client";

import { useState } from "react";
import { footerHelp, footerProducts, footerSupport } from "@/data/home";
import { BrandLogo } from "@/components/shared/BrandLogo";

const instagramAccounts = [
  {
    handle: "@ahlinyagizi.id",
    label: "Ahlinya Gizi",
    description: "Edukasi nutrisi dan konsultasi gizi untuk keluarga Indonesia.",
    href: "https://www.instagram.com/ahlinyagizi.id/",
  },
  {
    handle: "@nephrisol_id",
    label: "Nephrisol",
    description: "Informasi nutrisi untuk kebutuhan ginjal.",
    href: "https://www.instagram.com/nephrisol_id/",
  },
  {
    handle: "@katamama_official",
    label: "Kata Mama",
    description: "Edukasi dan inspirasi untuk keluarga dan ibu Indonesia.",
    href: "https://www.instagram.com/katamama_official/",
  },
  {
    handle: "@pedulistroke",
    label: "Peduli Stroke",
    description: "Edukasi seputar stroke, pemulihan, dan dukungan nutrisi.",
    href: "https://www.instagram.com/pedulistroke/",
  },
];

export function Footer() {
  const [isInstagramOpen, setIsInstagramOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#004b34] px-5 pt-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-5">
              <BrandLogo variant="light" />
            </div>

            <p className="max-w-sm text-sm leading-7 text-white/70">
              Kami menyediakan produk nutrisi gizi seimbang yang diformulasikan
              untuk berbagai kondisi kesehatan, guna membantu meningkatkan kualitas
              hidup dan mendukung proses pemulihan.
            </p>

            <button
              type="button"
              onClick={() => setIsInstagramOpen(true)}
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-sm font-black text-white ring-1 ring-white/15 transition hover:bg-white hover:text-[#006b3f]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#006b3f]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                </svg>
              </span>
              Instagram Medikal Nutrience
            </button>
          </div>

          <FooterColumn title="Produk" links={footerProducts} />
          <FooterColumn title="Support System" links={footerSupport} />
          <FooterColumn title="Bantuan" links={footerHelp} />
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-4 py-8 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            Copyright © 2026 PT Finusolprima Farma Internasional - All Right
            Reserved.
          </p>

          <div className="flex gap-6">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </footer>

      {isInstagramOpen ? (
        <div className="fixed inset-0 z-[140] flex items-end justify-center bg-[#0f172a]/55 px-4 py-6 backdrop-blur-md md:items-center">
          <button
            type="button"
            onClick={() => setIsInstagramOpen(false)}
            className="absolute inset-0 cursor-default"
            aria-label="Close Instagram popup"
          />

          <div className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white p-6 shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.32em] text-[#006b3f]">
                  Instagram
                </p>
                <h2 className="mt-3 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
                  Ikuti Kanal Edukasi Kami
                </h2>
                <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-[#64748b]">
                  Pilih salah satu akun Instagram untuk mendapatkan edukasi dan
                  informasi terbaru dari ekosistem Medikal Nutrience.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsInstagramOpen(false)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e4f8ed] text-xl font-black text-[#006b3f] transition hover:bg-[#006b3f] hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {instagramAccounts.map((account) => (
                <a
                  key={account.handle}
                  href={account.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[1.5rem] bg-[#f8fcfa] p-5 ring-1 ring-black/5 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-green-900/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#006b3f] to-[#10b981] text-white shadow-lg shadow-green-900/15">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                      </svg>
                    </div>

                    <div>
                      <p className="text-lg font-black text-[#111827]">
                        {account.label}
                      </p>
                      <p className="mt-1 text-sm font-black text-[#006b3f]">
                        {account.handle}
                      </p>
                      <p className="mt-3 text-sm font-medium leading-7 text-[#64748b]">
                        {account.description}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm font-black text-[#006b3f]">
                    Buka Instagram →
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

const footerHrefMap: Record<string, string> = {
  Entrakid: "/produk/entrakid",
  Entrasoy: "/produk/entrasoy",
  Peptisol: "/produk/peptisol",
  Entramix: "/produk/entramix",
  "Blog Edukasi": "/support-system/dapur-sehat-fima",
  "Kisah Sukses Pasien": "/support-system/kisah-sukses-pasien",
  "Dapur Sehat": "/support-system/dapur-sehat-fima",
  "Kalkulator Status Gizi": "/support-system/kalkulator-status-gizi",
  "Komunitas Sehat": "/support-system/komunitas-sehat",
  Event: "/event",
  Apotek: "/apotek-resmi",
  FAQ: "/faq",
  Kontak: "/kontak",
};

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div>
      <h3 className="mb-5 font-bold">{title}</h3>
      <ul className="space-y-3 text-sm text-white/70">
        {links.map((link) => (
          <li key={`${title}-${link}`}>
            <a
              href={footerHrefMap[link] ?? "/"}
              className="transition hover:text-white"
            >
              &gt;&gt; {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
