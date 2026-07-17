import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { createEventDraft } from "./actions";

export default async function CmsNewEventPage() {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  return (
    <CmsAdminShell
      active="events"
      title="Add New Event"
      eyebrow="CMS Events"
      description="Tambahkan event baru untuk ditampilkan pada halaman public Medikal Nutrience."
      actions={
        <a
          href="/cms/events"
          className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
        >
          Back to Events
        </a>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
          <div className="border-b border-black/5 pb-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              New Event
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#111827]">
              Informasi Event Baru
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-[#64748b]">
              Jika slug dikosongkan, sistem akan membuat slug otomatis dari
              judul event.
            </p>
          </div>

          <form action={createEventDraft} className="mt-7 grid gap-5">
            <div>
              <label className="text-sm font-black text-[#111827]">
                Judul Event
              </label>
              <input
                name="title"
                required
                placeholder="Contoh: Seminar Nutrisi Klinis 2026"
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Slug
              </label>
              <input
                name="slug"
                placeholder="Kosongkan untuk generate otomatis"
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-black text-[#111827]">
                  Kategori
                </label>
                <input
                  name="category"
                  placeholder="Seminar Nutrisi"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue="Draft"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-black text-[#111827]">
                  Tanggal
                </label>
                <input
                  name="date"
                  placeholder="Contoh: Sabtu, 12 September 2026"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">
                  Lokasi
                </label>
                <input
                  name="location"
                  placeholder="Jakarta / Online"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Link Registrasi
              </label>
              <input
                name="href"
                defaultValue="#registrasi-event"
                placeholder="#registrasi-event atau https://..."
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div className="border-t border-black/5 pt-6">
              <button
                type="submit"
                className="rounded-full bg-[#006b3f] px-7 py-4 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-[#005635]"
              >
                Create Event
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-5">
          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              Publishing Guide
            </p>

            <div className="mt-5 space-y-3 text-sm font-medium leading-7 text-[#64748b]">
              <p>
                <strong className="text-[#111827]">Published:</strong> langsung
                tampil di halaman public.
              </p>
              <p>
                <strong className="text-[#111827]">Draft:</strong> tersimpan di
                CMS tetapi tidak tampil di public.
              </p>
              <p>
                <strong className="text-[#111827]">Hidden:</strong> disembunyikan
                dari halaman public.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </CmsAdminShell>
  );
}
