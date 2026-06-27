"use client";

import { useMemo, useState } from "react";
import { pharmacies, type PharmacyPartner } from "@/data/pharmacies";

const allAreaLabel = "Semua Area";

const preferredAreaOrder = [
  allAreaLabel,
  "Jabodetabek",
  "Jawa Barat",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Bali",
  "Sumatera",
  "Kalimantan",
  "Sulawesi",
  "Lainnya",
];

function getMapsUrl(name: string, area: string, city: string) {
  const query = [name, city, area].filter(Boolean).join(" ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getPartnerTypeLabel(type: string) {
  if (type.toLowerCase().includes("modern")) return "Modern Channel";
  if (type.toLowerCase().includes("baby")) return "Baby Shop";
  return "Apotek";
}

function getPartnerTypeIcon(type: string) {
  if (type.toLowerCase().includes("modern")) return "▦";
  if (type.toLowerCase().includes("baby")) return "★";
  return "✚";
}

function normalizeArea(area: string) {
  const cleaned = area.trim();

  if (
    ["JK1", "JK 1", "JK2", "JK 2", "JKT", "Jakarta", "Bekasi", "Bogor", "Depok", "Tangerang"].includes(
      cleaned
    )
  ) {
    return "Jabodetabek";
  }

  if (["BDG", "JBR", "JABAR", "Bandung"].includes(cleaned)) {
    return "Jawa Barat";
  }

  if (["JTG", "JATENG", "Semarang"].includes(cleaned)) {
    return "Jawa Tengah";
  }

  if (["DIY", "Yogyakarta"].includes(cleaned)) {
    return "DI Yogyakarta";
  }

  return cleaned || "Lainnya";
}

function getDisplayArea(partner: PharmacyPartner) {
  return normalizeArea(partner.area);
}

export function PharmacyLocator() {
  const [selectedArea, setSelectedArea] = useState(allAreaLabel);
  const [search, setSearch] = useState("");

  const normalizedPartners = useMemo(() => {
    return pharmacies.map((partner) => ({
      ...partner,
      displayArea: getDisplayArea(partner),
    }));
  }, []);

  const areas = useMemo(() => {
    const uniqueAreas = Array.from(
      new Set(normalizedPartners.map((partner) => partner.displayArea))
    ).filter(Boolean);

    return preferredAreaOrder.filter((area) => {
      if (area === allAreaLabel) return true;
      return uniqueAreas.includes(area);
    }).concat(
      uniqueAreas.filter((area) => !preferredAreaOrder.includes(area)).sort()
    );
  }, [normalizedPartners]);

  const filteredPartners = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return normalizedPartners.filter((partner) => {
      const matchesArea =
        selectedArea === allAreaLabel || partner.displayArea === selectedArea;

      const matchesSearch =
        !keyword ||
        [partner.name, partner.city, partner.displayArea]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(keyword);

      return matchesArea && matchesSearch;
    });
  }, [normalizedPartners, search, selectedArea]);

  const partnersWithLogo = normalizedPartners
    .filter((partner) => partner.logo)
    .slice(0, 12);

  return (
    <main className="bg-[#f4fbf8]">
      <section className="relative overflow-hidden px-5 py-12 md:py-20 lg:px-10">
        <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#d9f3e8]" />
        <div className="absolute bottom-[-220px] right-[-140px] h-[480px] w-[480px] rounded-full bg-[#c6f1df]" />

        <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="reveal-left">
            <p className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-[#006b3f] shadow-lg shadow-green-900/8 ring-1 ring-black/5">
              Apotek Official Partner
            </p>

            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-[#111827] md:text-6xl">
              Temukan Apotek Partner Medikal Nutrience
            </h1>

            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[#5f6b76] md:text-lg md:leading-9">
              Cari lokasi apotek dan partner Medikal Nutrience berdasarkan area
              untuk membantu Anda menemukan produk yang dibutuhkan.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-5 shadow-lg shadow-green-900/5 ring-1 ring-black/5">
                <p className="text-3xl font-black text-[#006b3f]">
                  {normalizedPartners.length}+
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#64748b]">
                  Partner Terdaftar
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-lg shadow-green-900/5 ring-1 ring-black/5">
                <p className="text-3xl font-black text-[#006b3f]">
                  {areas.length - 1}+
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#64748b]">
                  Area
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-lg shadow-green-900/5 ring-1 ring-black/5">
                <p className="text-3xl font-black text-[#006b3f]">
                  2+
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#64748b]">
                  Partner Nasional
                </p>
              </div>
            </div>
          </div>

          <div className="reveal-scale reveal-delay-2">
            <div className="rounded-[2.5rem] bg-white p-6 shadow-2xl shadow-green-900/10 ring-1 ring-black/5 md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
                Partner Highlight
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
                Apotek dan partner terpercaya.
              </h2>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {partnersWithLogo.map((partner) => (
                  <div
                    key={partner.name}
                    className="flex aspect-[1.35] items-center justify-center rounded-2xl bg-[#f8fcfa] p-4 ring-1 ring-black/5"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-12 w-auto max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.6rem] bg-[#006b3f] p-5 text-white">
                <p className="text-sm font-bold leading-7 text-white/85">
                  Gunakan filter area untuk menemukan partner terdekat, lalu buka
                  Google Maps untuk melihat rute dan detail lokasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="partner-list" className="px-5 pb-16 lg:px-10">
        <div className="mx-auto grid w-full max-w-[1440px] gap-7 lg:grid-cols-[360px_1fr]">
          <aside className="reveal-left lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-900/8 ring-1 ring-black/5">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
                Filter Apotek
              </p>

              <div className="mt-5">
                <label className="text-sm font-black text-[#111827]">
                  Cari Apotek
                </label>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Nama apotek atau kota"
                  className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 py-4 text-sm font-bold text-[#111827] outline-none transition focus:border-[#006b3f] focus:bg-white"
                />
              </div>

              <div className="mt-5">
                <label className="text-sm font-black text-[#111827]">
                  Pilih Area
                </label>
                <select
                  value={selectedArea}
                  onChange={(event) => setSelectedArea(event.target.value)}
                  className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 py-4 text-sm font-bold text-[#111827] outline-none transition focus:border-[#006b3f] focus:bg-white"
                >
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {areas.slice(0, 6).map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => setSelectedArea(area)}
                    className={`rounded-full px-4 py-2 text-xs font-black transition ${
                      selectedArea === area
                        ? "bg-[#006b3f] text-white"
                        : "bg-[#e4f8ed] text-[#006b3f]"
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="reveal-right">
            <div className="mb-5 flex flex-col justify-between gap-4 rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-900/8 ring-1 ring-black/5 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
                  Daftar Apotek
                </p>
                <h2 className="mt-2 text-3xl font-black text-[#111827]">
                  {filteredPartners.length} partner ditemukan
                </h2>
              </div>

              <span className="inline-flex w-fit rounded-full bg-[#e4f8ed] px-5 py-3 text-xs font-black uppercase tracking-wide text-[#006b3f]">
                Official Partner
              </span>
            </div>

            {filteredPartners.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredPartners.map((partner) => (
                  <article
                    key={`${partner.no}-${partner.name}`}
                    className="group overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-900/8 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-900/10"
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f8fcfa] p-3 ring-1 ring-black/5">
                          {partner.logo ? (
                            <img
                              src={partner.logo}
                              alt={partner.name}
                              className="max-h-12 w-auto max-w-full object-contain"
                            />
                          ) : (
                            <span className="text-xl font-black text-[#006b3f]">
                              {getInitials(partner.name)}
                            </span>
                          )}
                        </div>

                        <span className="inline-flex rounded-full bg-[#e4f8ed] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-[#006b3f]">
                          Official Partner
                        </span>
                      </div>

                      <div className="mt-5">
                        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006b3f]">
                          {getPartnerTypeIcon(partner.contactType)}{" "}
                          {getPartnerTypeLabel(partner.contactType)}
                        </p>

                        <h3 className="mt-3 text-2xl font-black leading-tight text-[#111827]">
                          {partner.name}
                        </h3>

                        <p className="mt-3 text-sm font-bold leading-7 text-[#64748b]">
                          {partner.city || partner.displayArea}
                        </p>

                        <p className="text-sm font-medium leading-7 text-[#64748b]">
                          Area: {partner.displayArea}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-black/5 p-5">
                      <a
                        href={getMapsUrl(
                          partner.name,
                          partner.displayArea,
                          partner.city
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-full bg-[#006b3f] px-5 py-4 text-sm font-black text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-[#005432]"
                      >
                        Buka Maps
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] bg-white p-8 text-center shadow-xl shadow-slate-900/8 ring-1 ring-black/5">
                <h3 className="text-2xl font-black text-[#111827]">
                  Apotek belum ditemukan
                </h3>
                <p className="mt-3 text-sm font-medium leading-7 text-[#64748b]">
                  Coba gunakan kata kunci lain atau pilih area berbeda.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSelectedArea(allAreaLabel);
                  }}
                  className="mt-6 rounded-full bg-[#006b3f] px-6 py-3 text-sm font-black text-white"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
