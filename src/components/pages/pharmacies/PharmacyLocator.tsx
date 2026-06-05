"use client";

import { useMemo, useState } from "react";
import { cityFilters, pharmacies } from "@/data/pharmacies";

export function PharmacyLocator() {
  const [city, setCity] = useState("Semua Kota");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return pharmacies.filter((item) => {
      const matchCity = city === "Semua Kota" || item.city === city;
      const q = search.toLowerCase();
      const matchSearch =
        item.name.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q) ||
        item.stock.join(" ").toLowerCase().includes(q);

      return matchCity && matchSearch;
    });
  }, [city, search]);

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#006b3f]">
              Jaringan Distribusi Resmi
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-[#0f172a] md:text-5xl">
              Temukan Produk Kami di Kota Anda
            </h2>

            <p className="mt-5 text-sm leading-8 text-[#475569]">
              Dapatkan produk Medikal Nutrience di jaringan apotek rekanan resmi
              kami. Terjamin asli dan kualitas terjaga.
            </p>

            <div className="mt-8 rounded-[2rem] bg-white p-5 shadow-xl shadow-green-900/5 ring-1 ring-black/5">
              <label className="mb-2 block text-sm font-black text-[#006b3f]">
                Cari Lokasi
              </label>
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari apotek, kota, atau produk..."
                className="w-full rounded-2xl border border-black/10 bg-[#f8fafc] px-5 py-4 text-sm font-bold outline-none focus:border-[#006b3f]"
              />

              <div className="mt-4 flex flex-wrap gap-2">
                {cityFilters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCity(item)}
                    className={`rounded-full px-4 py-2 text-xs font-black transition ${
                      city === item
                        ? "bg-[#006b3f] text-white"
                        : "bg-[#f4fbf8] text-[#334155] hover:text-[#006b3f]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <article
                  key={`${item.name}-${item.address}`}
                  className="rounded-[2rem] bg-white p-6 shadow-xl shadow-green-900/5 ring-1 ring-black/5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wide ${
                            item.status === "Buka"
                              ? "bg-[#dcfce7] text-[#166534]"
                              : "bg-[#fee2e2] text-[#b91c1c]"
                          }`}
                        >
                          {item.status}
                        </span>

                        <span className="rounded-full bg-[#e4f8ed] px-3 py-1 text-[11px] font-black uppercase tracking-wide text-[#006b3f]">
                          {item.city}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-[#0f172a]">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-[#64748b]">
                        {item.address}
                      </p>

                      <div className="mt-4">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#006b3f]">
                          Stok Tersedia
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {item.stock.map((stock) => (
                            <span
                              key={stock}
                              className="rounded-full bg-[#f8fafc] px-3 py-1.5 text-xs font-bold text-[#475569] ring-1 ring-black/5"
                            >
                              {stock}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 md:flex-col">
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        className="rounded-full bg-[#006b3f] px-5 py-3 text-center text-xs font-black text-white"
                      >
                        Peta
                      </a>

                      <a
                        href="/kontak"
                        className="rounded-full border border-[#006b3f]/20 bg-[#f4fbf8] px-5 py-3 text-center text-xs font-black text-[#006b3f]"
                      >
                        {item.contactType}
                      </a>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-[2rem] bg-white p-8 text-center shadow-xl shadow-green-900/5 ring-1 ring-black/5">
                <h3 className="text-2xl font-black text-[#0f172a]">
                  Apotek Tidak Ditemukan
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#64748b]">
                  Coba cari dengan kata kunci lain atau ubah filter kota.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
