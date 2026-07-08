import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { createPharmacyDraft } from "./actions";

export default async function CmsNewPharmacyPage() {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  return (
    <CmsAdminShell
      active="pharmacies"
      title="Add New Pharmacy"
      eyebrow="CMS Apotek"
      description="Tambah data apotek atau partner baru untuk ditampilkan di CMS dan halaman public Apotek Resmi."
      actions={
        <a
          href="/cms/pharmacies"
          className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
        >
          Back to Pharmacies
        </a>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
          <div className="border-b border-black/5 pb-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              New Partner
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#111827]">
              Informasi Apotek Baru
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-[#64748b]">
              Jika nomor dikosongkan, sistem akan otomatis membuat nomor berikutnya.
            </p>
          </div>

          <form action={createPharmacyDraft} className="mt-7 grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-black text-[#111827]">No</label>
                <input
                  name="no"
                  type="number"
                  placeholder="Auto jika kosong"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">Status</label>
                <select
                  name="status"
                  defaultValue="Official Partner"
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
                placeholder="Contoh: Apotek Sehat Baru"
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-black text-[#111827]">Area</label>
                <input
                  name="area"
                  placeholder="Jabodetabek"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">City</label>
                <input
                  name="city"
                  placeholder="Jakarta"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-black text-[#111827]">PIC</label>
                <input
                  name="pic"
                  placeholder="Nama PIC"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">
                  Contact Type
                </label>
                <input
                  name="contactType"
                  defaultValue="Apotek"
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
                defaultValue={"Entrakid\nEntramix\nEntrasoy\nPeptisol"}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold leading-7 outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
              <p className="mt-2 text-xs font-semibold text-[#94a3b8]">
                Satu produk per baris.
              </p>
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">Logo Path</label>
              <input
                name="logo"
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
                placeholder="https://..."
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div className="border-t border-black/5 pt-6">
              <button
                type="submit"
                className="rounded-full bg-[#006b3f] px-6 py-4 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-[#005635]"
              >
                Save New Partner
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-5">
          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              Add Partner Note
            </p>
            <p className="mt-4 text-sm font-medium leading-7 text-[#64748b]">
              Data baru akan disimpan ke storage CMS lokal sebagai draft created
              partner. Nanti saat migration, data ini dipindahkan ke PostgreSQL.
            </p>
          </section>
        </aside>
      </div>
    </CmsAdminShell>
  );
}
