import { promises as fs } from "fs";
import path from "path";
import { notFound, redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { pharmacies } from "@/data/pharmacies";
import { savePharmacyDraft } from "./actions";

type CmsPharmacyEditPageProps = {
  params: Promise<{
    no: string;
  }>;
  searchParams: Promise<{
    saved?: string;
  }>;
};

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

async function getPharmacyDraft(no: string) {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "src/data/cms/cms-pharmacies.json"),
      "utf8"
    );
    const drafts = JSON.parse(file) as Record<string, CmsPharmacyDraft>;
    return drafts[no] ?? null;
  } catch {
    return null;
  }
}

export default async function CmsPharmacyEditPage({
  params,
  searchParams,
}: CmsPharmacyEditPageProps) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const { no } = await params;
  const pharmacyNo = Number(no);
  const pharmacy = pharmacies.find((item) => item.no === pharmacyNo);

  if (!pharmacy || Number.isNaN(pharmacyNo)) {
    notFound();
  }

  const draft = await getPharmacyDraft(no);
  const paramsQuery = await searchParams;
  const isSaved = paramsQuery.saved === "1";

  const viewData = {
    no: draft?.no ?? pharmacy.no,
    name: draft?.name ?? pharmacy.name,
    onlineStore: draft?.onlineStore ?? pharmacy.onlineStore ?? "",
    area: draft?.area ?? pharmacy.area,
    city: draft?.city ?? pharmacy.city,
    pic: draft?.pic ?? pharmacy.pic,
    status: draft?.status ?? pharmacy.status,
    contactType: draft?.contactType ?? pharmacy.contactType,
    stock: draft?.stock ?? pharmacy.stock,
    logo: draft?.logo ?? pharmacy.logo ?? "",
    updatedAt: draft?.updatedAt ?? null,
  };

  return (
    <CmsAdminShell
      active="pharmacies"
      title={`Edit ${viewData.name}`}
      eyebrow="CMS Apotek"
      description="Kelola data apotek, area, kota, PIC, status partner, tipe partner, stock produk, logo, dan online store."
      actions={
        <div className="flex flex-wrap gap-3">
          <a
            href="/cms/pharmacies"
            className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
          >
            Back to Pharmacies
          </a>

          <a
            href="/apotek-resmi"
            target="_blank"
            className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
          >
            View Public
          </a>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
          <div className="border-b border-black/5 pb-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              Pharmacy Content
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#111827]">
              Informasi Apotek
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-[#64748b]">
              Form ini sudah dapat menyimpan draft apotek ke storage JSON lokal.
              Batch berikutnya kita hubungkan draft ke list CMS dan halaman public.
            </p>

            {isSaved ? (
              <div className="mt-5 rounded-2xl bg-[#e4f8ed] px-5 py-4 text-sm font-black text-[#006b3f] ring-1 ring-[#006b3f]/10">
                Draft apotek berhasil disimpan.
              </div>
            ) : null}
          </div>

          <form action={savePharmacyDraft} className="mt-7 grid gap-5">
            <input type="hidden" name="originalNo" value={pharmacy.no} />

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-black text-[#111827]">
                  No
                </label>
                <input
                  name="no"
                  type="number"
                  defaultValue={viewData.no}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={viewData.status}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                >
                  <option value="Official Partner">Official Partner</option>
                  <option value="Non Official">Non Official</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Nama Partner
              </label>
              <input
                name="name"
                defaultValue={viewData.name}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-black text-[#111827]">
                  Area
                </label>
                <input
                  name="area"
                  defaultValue={viewData.area}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">
                  City
                </label>
                <input
                  name="city"
                  defaultValue={viewData.city}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-black text-[#111827]">
                  PIC
                </label>
                <input
                  name="pic"
                  defaultValue={viewData.pic}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">
                  Contact Type
                </label>
                <input
                  name="contactType"
                  defaultValue={viewData.contactType}
                  placeholder="Apotek / Offline Store / Baby Shop"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Stock Produk
              </label>
              <textarea
                name="stock"
                defaultValue={viewData.stock.join("\n")}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold leading-7 outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
              <p className="mt-2 text-xs font-semibold text-[#94a3b8]">
                Satu produk per baris.
              </p>
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Logo Path
              </label>
              <input
                name="logo"
                defaultValue={viewData.logo}
                placeholder="/images/mednut/pharmacies/logo.png"
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Online Store URL
              </label>
              <input
                name="onlineStore"
                defaultValue={viewData.onlineStore}
                placeholder="https://..."
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div className="border-t border-black/5 pt-6">
              <button
                type="submit"
                className="rounded-full bg-[#006b3f] px-6 py-4 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-[#005635]"
              >
                Save Draft
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-5">
          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              Pharmacy Status
            </p>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl bg-[#f0fdf4] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#64748b]">
                  Current Status
                </p>
                <p className="mt-2 text-xl font-black text-[#006b3f]">
                  {viewData.status}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f8fafc] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#64748b]">
                  Partner Type
                </p>
                <p className="mt-2 text-sm font-black text-[#475569]">
                  {viewData.contactType}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f8fafc] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#64748b]">
                  Stock Count
                </p>
                <p className="mt-2 text-3xl font-black text-[#006b3f]">
                  {viewData.stock.length}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f8fafc] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#64748b]">
                  Last Draft Update
                </p>
                <p className="mt-2 text-sm font-black text-[#475569]">
                  {viewData.updatedAt
                    ? new Date(viewData.updatedAt).toLocaleString("id-ID")
                    : "Belum ada draft"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] bg-[#004b34] p-6 text-white shadow-2xl shadow-green-900/15">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-white/50">
              Next Step
            </p>
            <h2 className="mt-4 text-2xl font-black leading-tight">
              Batch berikutnya: add dan delete apotek.
            </h2>
            <p className="mt-4 text-sm font-medium leading-7 text-white/70">
              Setelah edit draft apotek aman, kita tambahkan fitur Add Partner
              dan Delete/Hide Partner dari CMS.
            </p>
          </section>
        </aside>
      </div>
    </CmsAdminShell>
  );
}
