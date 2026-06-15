"use client";

import { useMemo, useState } from "react";
import { pharmacies } from "@/data/pharmacies";

export function PharmacyLocator() {
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState("Semua Provinsi");
  const [city, setCity] = useState("Semua Kota");

  const provinces = useMemo(() => {
    return [
      "Semua Provinsi",
      ...Array.from(new Set(pharmacies.map((item) => item.province))).sort(),
    ];
  }, []);

  const cities = useMemo(() => {
    const filtered =
      province === "Semua Provinsi"
        ? pharmacies
        : pharmacies.filter((item) => item.province === province);

    return [
      "Semua Kota",
      ...Array.from(new Set(filtered.map((item) => item.city))).sort(),
    ];
  }, [province]);

  const filteredPharmacies = useMemo(() => {
    return pharmacies.filter((item) => {
      const keyword = `${item.name} ${item.city} ${item.province} ${item.address}`.toLowerCase();

      const matchSearch = keyword.includes(search.toLowerCase());
      const matchProvince =
        province === "Semua Provinsi" || item.province === province;
      const matchCity = city === "Semua Kota" || item.city === city;

      return matchSearch && matchProvince && matchCity;
    });
  }, [search, province, city]);

  function resetFilter() {
    setSearch("");
    setProvince("Semua Provinsi");
    setCity("Semua Kota");
  }

  return (
    <section className="bg-[#f4fbf8] px-5 py-12 md:py-16 lg:px-10">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-green-900/10 ring-1 ring-black/5">
              <div className="bg-gradient-to-br from-[#006b3f] via-[#087a4c] to-[#10b981] p-7 text-white md:p-8">
                <p className="text-xs font-black uppercase tracking-[0.35em] text-white/70">
                  Official Pharmacy
                </p>

                <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
                  Temukan Apotek Resmi Terdekat
                </h2>

                <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-white/80 md:text-base">
                  Gunakan pencarian dan filter lokasi untuk menemukan apotek
                  resmi yang menyediakan produk Medikal Nutrience.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/12 p-4 ring-1 ring-white/15">
                    <p className="text-2xl font-black">
                      {pharmacies.length}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-white/70">
                      Total Apotek
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/12 p-4 ring-1 ring-white/15">
                    <p className="text-2xl font-black">
                      {provinces.length - 1}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-white/70">
                      Provinsi
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-5 md:p-6">
                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-[#006b3f]">
                    Cari Apotek
                  </label>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Nama apotek, kota, atau alamat"
                    className="h-12 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 text-sm font-semibold text-[#111827] outline-none transition placeholder:text-[#9ca3af] focus:border-[#006b3f] focus:bg-white focus:ring-4 focus:ring-[#006b3f]/10"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-[#006b3f]">
                      Provinsi
                    </label>
                    <select
                      value={province}
                      onChange={(event) => {
                        setProvince(event.target.value);
                        setCity("Semua Kota");
                      }}
                      className="h-12 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 text-sm font-semibold text-[#111827] outline-none transition focus:border-[#006b3f] focus:bg-white focus:ring-4 focus:ring-[#006b3f]/10"
                    >
                      {provinces.map((item, index) => (
                        <option key={`province-${item}-${index}`} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-[#006b3f]">
                      Kota
                    </label>
                    <select
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      className="h-12 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 text-sm font-semibold text-[#111827] outline-none transition focus:border-[#006b3f] focus:bg-white focus:ring-4 focus:ring-[#006b3f]/10"
                    >
                      {cities.map((item, index) => (
                        <option key={`city-${item}-${index}`} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetFilter}
                  className="h-11 w-full rounded-2xl border border-[#006b3f]/15 bg-[#eaf8f1] text-sm font-black text-[#006b3f] transition hover:bg-[#006b3f] hover:text-white"
                >
                  Reset Filter
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-900/8 ring-1 ring-black/5">
            <div className="flex flex-col gap-3 border-b border-black/5 bg-white p-5 md:flex-row md:items-center md:justify-between md:p-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#006b3f]">
                  Hasil Pencarian
                </p>
                <h3 className="mt-2 text-2xl font-black text-[#111827]">
                  {filteredPharmacies.length} Apotek Ditemukan
                </h3>
              </div>

              <span className="w-fit rounded-full bg-[#eaf8f1] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#006b3f]">
                Official Partner
              </span>
            </div>

            <div className="no-scrollbar max-h-none space-y-3 overflow-y-auto p-4 md:p-5 lg:max-h-[720px]">
              {filteredPharmacies.length ? (
                filteredPharmacies.map((item, index) => (
                  <article
                    key={`${item.name}-${item.city}-${index}`}
                    className="group rounded-[1.5rem] border border-black/5 bg-[#f8fcfa] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[#006b3f]/20 hover:bg-white hover:shadow-xl hover:shadow-green-900/8"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e1f5eb] text-base font-black text-[#006b3f] transition group-hover:bg-[#006b3f] group-hover:text-white">
                        {index + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                          <div>
                            <h4 className="text-base font-black leading-tight text-[#111827] md:text-lg">
                              {item.name}
                            </h4>

                            <div className="mt-2 flex flex-wrap gap-2">
                              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-black uppercase tracking-wide text-[#006b3f] ring-1 ring-[#006b3f]/10">
                                {item.city}
                              </span>
                              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-black uppercase tracking-wide text-[#6b7280] ring-1 ring-black/5">
                                {item.province}
                              </span>
                            </div>
                          </div>

                          {item.mapUrl ? (
                            <a
                              href={item.mapUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#006b3f] px-4 py-2 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-[#005635]"
                            >
                              Maps
                              <span>→</span>
                            </a>
                          ) : null}
                        </div>

                        <p className="mt-3 line-clamp-2 text-sm font-medium leading-6 text-[#6b7280]">
                          {item.address}
                        </p>

                        {item.phone ? (
                          <p className="mt-2 text-xs font-bold text-[#111827]">
                            Telp: {item.phone}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-[#006b3f]/20 bg-[#f8fcfa] p-8 text-center">
                  <h4 className="text-xl font-black text-[#111827]">
                    Apotek tidak ditemukan
                  </h4>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#6b7280]">
                    Coba gunakan kata kunci lain atau reset filter lokasi.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilter}
                    className="mt-5 rounded-full bg-[#006b3f] px-5 py-3 text-sm font-black text-white"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
