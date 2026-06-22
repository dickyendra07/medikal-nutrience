"use client";

import { useMemo, useState } from "react";
import { pharmacies } from "@/data/pharmacies";

const allAreaLabel = "Semua Area";

function getMapsUrl(name: string, area: string, city: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${name} ${area} ${city}`
  )}`;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function getPartnerTypeLabel(type: string) {
  const lowered = type.toLowerCase();

  if (lowered.includes("apotek")) return "Apotek";
  if (lowered.includes("modern")) return "Modern Channel";
  if (lowered.includes("baby")) return "Baby Shop";
  return "Official Store";
}

function getPartnerTypeIcon(type: string) {
  const lowered = type.toLowerCase();

  if (lowered.includes("apotek")) return "✚";
  if (lowered.includes("modern")) return "▦";
  if (lowered.includes("baby")) return "★";
  return "✓";
}

export function PharmacyLocator() {
  const [selectedArea, setSelectedArea] = useState(allAreaLabel);
  const [search, setSearch] = useState("");

  const areas = useMemo(() => {
    return [
      allAreaLabel,
      ...Array.from(new Set(pharmacies.map((item) => item.area))).sort(),
    ];
  }, []);

  const partnersWithLogo = useMemo(() => {
    return pharmacies.filter((item) => item.logo).slice(0, 12);
  }, []);

  const filteredPartners = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return pharmacies.filter((item) => {
      const matchesArea =
        selectedArea === allAreaLabel || item.area === selectedArea;

      const searchableText = [
        item.name,
        item.onlineStore,
        item.area,
        item.city,
        item.pic,
        item.contactType,
        item.status,
        ...item.stock,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesArea && searchableText.includes(keyword);
    });
  }, [search, selectedArea]);

  const totalAreas = areas.length - 1;
  const totalPartners = pharmacies.length;
  const totalApotek = pharmacies.filter((item) =>
    item.contactType.toLowerCase().includes("apotek")
  ).length;

  return (
    <section className="relative overflow-hidden bg-[#f4fbf8] px-5 py-12 md:py-16 lg:px-10">
      <div className="absolute left-[-180px] top-[-160px] h-[420px] w-[420px] rounded-full bg-[#d9f3e8]" />
      <div className="absolute bottom-[-220px] right-[-140px] h-[480px] w-[480px] rounded-full bg-[#c6f1df]" />
      <div className="absolute left-[35%] top-[260px] hidden h-64 w-64 rounded-full bg-white/60 blur-3xl lg:block" />

      <div className="relative mx-auto w-full max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="reveal-left">
            <p className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-[#006b3f] shadow-lg shadow-green-900/8 ring-1 ring-black/5">
              Official Partner Medikal Nutrience
            </p>

            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-[#111827] md:text-6xl">
              Temukan Outlet Resmi Produk Medikal Nutrience
            </h1>

            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[#5f6b76] md:text-lg md:leading-9">
              Daftar official partner FIMA Mednut 2026 yang membantu pelanggan
              menemukan produk Medikal Nutrience melalui apotek, toko susu,
              baby shop, dan modern channel pilihan.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#partner-list"
                className="inline-flex items-center justify-center rounded-full bg-[#006b3f] px-6 py-4 text-sm font-black text-white shadow-xl shadow-green-900/15 transition hover:-translate-y-0.5"
              >
                Lihat Partner
              </a>
              <a
                href="/kontak"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#006b3f] shadow-xl shadow-green-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
              >
                Konsultasi Produk
              </a>
            </div>
          </div>

          <div className="reveal-scale reveal-delay-2">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-5 shadow-2xl shadow-green-900/10 ring-1 ring-black/5 md:p-7">
              <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-[#d9f3e8]" />
              <div className="absolute bottom-[-120px] left-[-80px] h-72 w-72 rounded-full bg-[#e8f8f1]" />

              <div className="relative z-10 grid grid-cols-3 gap-3">
                <div className="rounded-[1.5rem] bg-[#006b3f] p-5 text-center text-white shadow-xl shadow-green-900/15">
                  <p className="text-4xl font-black">{totalPartners}</p>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
                    Partner
                  </p>
                </div>

                <div className="rounded-[1.5rem] bg-[#f4fbf8] p-5 text-center ring-1 ring-black/5">
                  <p className="text-4xl font-black text-[#006b3f]">
                    {totalAreas}
                  </p>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#6b7280]">
                    Area
                  </p>
                </div>

                <div className="rounded-[1.5rem] bg-[#f4fbf8] p-5 text-center ring-1 ring-black/5">
                  <p className="text-4xl font-black text-[#006b3f]">
                    {totalApotek}
                  </p>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#6b7280]">
                    Apotek
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-5 rounded-[1.8rem] bg-[#f8fcfa] p-4 ring-1 ring-black/5">
                <p className="px-2 text-xs font-black uppercase tracking-[0.28em] text-[#006b3f]">
                  Partner Logo
                </p>

                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {partnersWithLogo.map((item) => (
                    <div
                      key={`logo-${item.no}-${item.name}`}
                      className="flex h-20 items-center justify-center rounded-2xl bg-white p-3 shadow-md shadow-slate-900/5 ring-1 ring-black/5"
                    >
                      <img
                        src={item.logo}
                        alt={`${item.name} logo`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="partner-list" className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="reveal-left rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/8 ring-1 ring-black/5 lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#006b3f]">
                  Filter Partner
                </p>
                <p className="mt-2 text-sm font-medium text-[#6b7280]">
                  Cari berdasarkan nama, area, jenis outlet, atau produk.
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7f7ef] text-lg font-black text-[#006b3f]">
                ⌕
              </div>
            </div>

            <label className="mt-6 block text-sm font-black text-[#111827]">
              Cari Outlet
            </label>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Contoh: Roxy, Bekasi, Apotek"
              className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 py-4 text-sm font-bold text-[#111827] outline-none transition focus:border-[#006b3f] focus:bg-white"
            />

            <label className="mt-5 block text-sm font-black text-[#111827]">
              Pilih Area
            </label>
            <select
              value={selectedArea}
              onChange={(event) => setSelectedArea(event.target.value)}
              className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 py-4 text-sm font-bold text-[#111827] outline-none transition focus:border-[#006b3f] focus:bg-white"
            >
              {areas.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <div className="mt-5 flex flex-wrap gap-2">
              {areas.slice(0, 10).map((area) => (
                <button
                  key={`chip-${area}`}
                  type="button"
                  onClick={() => setSelectedArea(area)}
                  className={`rounded-full px-4 py-2 text-xs font-black transition ${
                    selectedArea === area
                      ? "bg-[#006b3f] text-white"
                      : "bg-[#f4fbf8] text-[#006b3f] ring-1 ring-black/5 hover:bg-[#e7f7ef]"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-[#f4fbf8] p-5">
              <p className="text-sm font-black text-[#111827]">
                Catatan Ketersediaan
              </p>
              <p className="mt-2 text-sm font-medium leading-7 text-[#6b7280]">
                Ketersediaan produk dapat berbeda di setiap outlet. Gunakan Maps
                untuk menemukan lokasi terdekat, atau konsultasikan kebutuhan
                nutrisi Anda melalui tim Medikal Nutrience.
              </p>
            </div>

            <a
              href="/kontak"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#006b3f] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5"
            >
              Konsultasi Produk
            </a>
          </aside>

          <div className="reveal-right">
            <div className="mb-5 flex flex-col justify-between gap-3 rounded-[1.5rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-black text-[#111827]">
                  {filteredPartners.length} partner ditemukan
                </p>
                <p className="mt-1 text-sm font-medium text-[#6b7280]">
                  Berdasarkan area dan kata kunci yang dipilih.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="w-fit rounded-full bg-[#e7f7ef] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#006b3f]">
                  Official Partner 2026
                </span>

                {selectedArea !== allAreaLabel ? (
                  <button
                    type="button"
                    onClick={() => setSelectedArea(allAreaLabel)}
                    className="w-fit rounded-full bg-[#f8fafc] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#334155] ring-1 ring-black/10"
                  >
                    Reset Area
                  </button>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredPartners.map((item) => (
                <article
                  key={`${item.no}-${item.name}`}
                  className="group overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-900/8 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-900/10"
                >
                  <div className="relative p-5">
                    <div className="absolute right-4 top-4 rounded-full bg-[#f4fbf8] px-3 py-1 text-[10px] font-black text-[#006b3f]">
                      #{String(item.no).padStart(2, "0")}
                    </div>

                    <div className="flex items-start gap-4 pr-10">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem] bg-[#f4fbf8] p-3 shadow-md shadow-slate-900/5 ring-1 ring-black/5">
                        {item.logo ? (
                          <img
                            src={item.logo}
                            alt={`${item.name} logo`}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-xl font-black text-[#006b3f]">
                            {getInitials(item.name)}
                          </span>
                        )}
                      </div>

                      <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#e7f7ef] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#006b3f]">
                          <span>{getPartnerTypeIcon(item.contactType)}</span>
                          {getPartnerTypeLabel(item.contactType)}
                        </span>

                        <h2 className="mt-3 text-xl font-black leading-tight text-[#111827]">
                          {item.name}
                        </h2>

                        <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-[#6b7280]">
                          {item.area} · {item.city}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-[#f8fcfa] p-4">
                        <p className="text-[10px] font-black uppercase tracking-wide text-[#6b7280]">
                          Status
                        </p>
                        <p className="mt-1 text-sm font-black text-[#006b3f]">
                          Resmi
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#f8fcfa] p-4">
                        <p className="text-[10px] font-black uppercase tracking-wide text-[#6b7280]">
                          PIC Area
                        </p>
                        <p className="mt-1 text-sm font-black text-[#111827]">
                          {item.pic}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#6b7280]">
                        Produk Umum
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.stock.slice(0, 4).map((stock) => (
                          <span
                            key={`${item.name}-${stock}`}
                            className="rounded-full bg-[#f4fbf8] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-[#006b3f]"
                          >
                            {stock}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black/5">
                    <a
                      href={getMapsUrl(item.name, item.area, item.city)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] transition hover:bg-[#f4fbf8]"
                    >
                      Buka Maps
                      <span>↗</span>
                    </a>

                    <a
                      href="/kontak"
                      className="inline-flex items-center justify-center gap-2 bg-[#006b3f] px-5 py-4 text-xs font-black uppercase tracking-wide text-white transition hover:bg-[#005535]"
                      aria-label={`Konsultasi ${item.name}`}
                    >
                      Konsultasi
                      <span>→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {filteredPartners.length === 0 ? (
              <div className="rounded-[2rem] bg-white p-10 text-center shadow-xl shadow-slate-900/8 ring-1 ring-black/5">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e7f7ef] text-2xl font-black text-[#006b3f]">
                  ⌕
                </div>
                <p className="mt-5 text-xl font-black text-[#111827]">
                  Partner tidak ditemukan
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-7 text-[#6b7280]">
                  Coba ganti kata kunci, pilih area lainnya, atau reset filter
                  untuk melihat seluruh daftar official partner.
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
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
