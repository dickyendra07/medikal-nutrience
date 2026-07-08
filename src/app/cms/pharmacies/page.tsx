import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { pharmacies } from "@/data/pharmacies";
import { promises as fs } from "fs";
import path from "path";

type CmsPharmacyDraft = {
  no: number;
  name: string;
  onlineStore: string;
  area: string;
  city: string;
  pic: string;
  status: string;
  contactType: string;
  stock: string[];
  logo: string;
  updatedAt: string;
};

async function getPharmacyDrafts() {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "src/data/cms/cms-pharmacies.json"),
      "utf8"
    );

    if (!file.trim()) {
      return {};
    }

    return JSON.parse(file) as Record<string, CmsPharmacyDraft>;
  } catch {
    return {};
  }
}


function getMapsUrl(name: string, area: string, city: string) {
  const query = [name, city, area].filter(Boolean).join(" ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default async function CmsPharmaciesPage() {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const drafts = await getPharmacyDrafts();

  const staticRows = pharmacies.map((partner) => {
    const draft = drafts[String(partner.no)];

    const viewPartner = {
      ...partner,
      name: draft?.name ?? partner.name,
      onlineStore: draft?.onlineStore ?? partner.onlineStore ?? "",
      area: draft?.area ?? partner.area,
      city: draft?.city ?? partner.city,
      pic: draft?.pic ?? partner.pic,
      status: draft?.status ?? partner.status,
      contactType: draft?.contactType ?? partner.contactType,
      stock: draft?.stock ?? partner.stock,
      logo: draft?.logo ?? partner.logo ?? "",
      updatedAt: draft?.updatedAt ?? null,
    };

    return {
      ...viewPartner,
      mapsUrl: getMapsUrl(viewPartner.name, viewPartner.area, viewPartner.city),
    };
  });

  const staticNos = new Set(pharmacies.map((partner) => String(partner.no)));

  const cmsCreatedRows = Object.entries(drafts)
    .filter(([key]) => !staticNos.has(key))
    .map(([, partner]) => ({
      ...partner,
      mapsUrl: getMapsUrl(partner.name, partner.area, partner.city),
    }));

  const pharmacyRows = [...staticRows, ...cmsCreatedRows].sort(
    (a, b) => a.no - b.no
  );

  const officialCount = pharmacyRows.filter(
    (partner) => partner.status === "Official Partner"
  ).length;

  const nonOfficialCount = pharmacyRows.filter(
    (partner) => partner.status !== "Official Partner"
  ).length;

  const areaCount = new Set(pharmacyRows.map((partner) => partner.area)).size;

  return (
    <CmsAdminShell
      active="pharmacies"
      title="Pharmacies Management"
      eyebrow="CMS Apotek"
      description="Kelola daftar apotek, offline store, modern channel, area, PIC, status partner, dan ketersediaan produk."
      actions={
        <div className="flex flex-wrap gap-3">
          <a
            href="/cms/pharmacies/new"
            className="rounded-full bg-[#006b3f] px-6 py-4 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-slate-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
          >
            Add Partner
          </a>

          <a
            href="/apotek-resmi"
            target="_blank"
            className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
          >
            View Public Page
          </a>
        </div>
      }
    >
      <section className="grid gap-4 md:grid-cols-4">
        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-4xl font-black text-[#006b3f]">
            {pharmacyRows.length}
          </p>
          <p className="mt-2 text-sm font-black text-[#64748b]">
            Total Partner
          </p>
        </article>

        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-4xl font-black text-[#006b3f]">
            {officialCount}
          </p>
          <p className="mt-2 text-sm font-black text-[#64748b]">
            Official Partner
          </p>
        </article>

        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-4xl font-black text-[#006b3f]">
            {nonOfficialCount}
          </p>
          <p className="mt-2 text-sm font-black text-[#64748b]">
            Non Official
          </p>
        </article>

        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-4xl font-black text-[#006b3f]">
            {areaCount}
          </p>
          <p className="mt-2 text-sm font-black text-[#64748b]">
            Area
          </p>
        </article>
      </section>

      <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
        <div className="flex flex-col gap-4 border-b border-black/5 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              Partner List
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#111827]">
              Daftar Apotek & Partner
            </h2>
          </div>

          <p className="max-w-xl text-sm font-medium leading-7 text-[#64748b]">
            Module ini masih tahap list CMS. Batch berikutnya kita buat halaman
            edit apotek dan save draft seperti module Products, Solutions, dan FAQ.
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          {pharmacyRows.map((partner) => (
            <article
              key={`${partner.no}-${partner.name}-${partner.updatedAt ?? "static"}`}
              className="grid gap-4 rounded-[1.7rem] bg-[#f8fcfa] p-5 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-xl hover:shadow-green-900/8 xl:grid-cols-[1fr_220px_180px]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#e4f8ed] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#006b3f]">
                    #{partner.no}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${
                      partner.status === "Official Partner"
                        ? "bg-[#e4f8ed] text-[#006b3f]"
                        : "bg-[#fff7ed] text-[#c2410c]"
                    }`}
                  >
                    {partner.status}
                  </span>

                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#475569] ring-1 ring-black/5">
                    {partner.contactType}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-black text-[#111827]">
                  {partner.name}
                </h3>

                <p className="mt-2 text-sm font-bold text-[#64748b]">
                  {partner.city} • {partner.area}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {partner.stock.length > 0 ? (
                    partner.stock.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-white px-3 py-1 text-[11px] font-black uppercase tracking-wide text-[#006b3f] ring-1 ring-black/5"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-black uppercase tracking-wide text-[#94a3b8] ring-1 ring-black/5">
                      Stock belum diisi
                    </span>
                  )}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#94a3b8]">
                  PIC
                </p>
                <p className="mt-2 text-xl font-black text-[#006b3f]">
                  {partner.pic || "-"}
                </p>
                <p className="mt-2 text-sm font-bold text-[#64748b]">
                  {partner.onlineStore ? "Online Store Available" : "Offline / Maps"}
                </p>
                <p className="mt-2 text-xs font-semibold text-[#94a3b8]">
                  {partner.updatedAt
                    ? `Last draft: ${new Date(partner.updatedAt).toLocaleString("id-ID")}`
                    : "Belum ada draft"}
                </p>
              </div>

              <div className="flex items-center gap-2 xl:justify-end">
                <a
                  href={partner.mapsUrl}
                  target="_blank"
                  className="relative z-20 inline-flex rounded-full bg-[#f1f5f9] px-4 py-2 text-xs font-black text-[#475569] transition hover:bg-[#e2e8f0]"
                >
                  Maps
                </a>

                <a
                  href={`/cms/pharmacies/${partner.no}/edit`}
                  className="relative z-20 inline-flex rounded-full bg-[#006b3f] px-4 py-2 text-xs font-black text-white transition hover:bg-[#005635]"
                >
                  Edit
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-[2rem] bg-[#004b34] p-6 text-white shadow-2xl shadow-green-900/15">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-white/60">
          Next Development Step
        </p>
        <h2 className="mt-4 text-3xl font-black leading-tight">
          Module Apotek sudah masuk ke CMS.
        </h2>
        <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-white/70">
          Tahap berikutnya adalah membuat halaman edit apotek, menyimpan draft,
          lalu menghubungkan draft ke halaman public /apotek-resmi.
        </p>
      </section>
    </CmsAdminShell>
  );
}
