import { promises as fs } from "fs";
import path from "path";
import { notFound, redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import {
  eventPageData,
  type EventItem,
  type EventPageData,
  type EventProgram,
} from "@/data/events";
import { saveEventDraft } from "./actions";

type EventPageDraft = {
  featuredEvent?: Partial<EventPageData["featuredEvent"]>;
  programs?: EventProgram[];
  events?: EventItem[];
  productOptions?: string[];
  infoSources?: string[];
  updatedAt?: string;
};

async function getEventPageDraft(): Promise<EventPageDraft | null> {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "src/data/cms/cms-events.json"),
      "utf8"
    );

    if (!file.trim()) {
      return null;
    }

    const parsed = JSON.parse(file) as {
      page?: EventPageDraft;
    };

    return parsed.page ?? null;
  } catch {
    return null;
  }
}

function formatLastUpdate(value?: string) {
  if (!value) {
    return "Belum ada draft";
  }

  return new Date(value).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function CmsEventEditPage({
  params,
  searchParams,
}: {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    saved?: string;
  }>;
}) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const { slug } = await params;
  const query = await searchParams;
  const draft = await getEventPageDraft();
  const events = draft?.events ?? eventPageData.events;

  const eventItem = events.find((item) => item.slug === slug);

  if (!eventItem) {
    notFound();
  }

  const isSaved = query.saved === "1";

  return (
    <CmsAdminShell
      active="events"
      title={`Edit ${eventItem.title}`}
      eyebrow="CMS Events"
      description="Kelola judul, kategori, jadwal, lokasi, link registrasi, dan status publikasi event."
      actions={
        <a
          href="/cms/events"
          className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
        >
          Back to Events
        </a>
      }
    >
      {isSaved ? (
        <div className="mb-6 rounded-2xl bg-[#e4f8ed] px-5 py-4 text-sm font-black text-[#006b3f] ring-1 ring-[#006b3f]/10">
          Draft event berhasil disimpan dan sudah terhubung ke halaman public.
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
          <div className="border-b border-black/5 pb-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              Event Content
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#111827]">
              Informasi Event
            </h2>
          </div>

          <form action={saveEventDraft} className="mt-7 grid gap-5">
            <input
              type="hidden"
              name="originalSlug"
              value={eventItem.slug}
            />

            <div>
              <label className="text-sm font-black text-[#111827]">
                Slug
              </label>
              <input
                value={eventItem.slug}
                disabled
                className="mt-2 w-full cursor-not-allowed rounded-2xl border border-black/10 bg-[#f1f5f9] px-5 py-4 text-sm font-bold text-[#64748b]"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Judul Event
              </label>
              <input
                name="title"
                defaultValue={eventItem.title}
                required
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
                  defaultValue={eventItem.category}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={eventItem.status}
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
                  defaultValue={eventItem.date}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#111827]">
                  Lokasi
                </label>
                <input
                  name="location"
                  defaultValue={eventItem.location}
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
                defaultValue={eventItem.href}
                placeholder="#registrasi-event atau https://..."
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
              />
            </div>

            <div className="border-t border-black/5 pt-6">
              <button
                type="submit"
                className="rounded-full bg-[#006b3f] px-7 py-4 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-[#005635]"
              >
                Save Event Draft
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-5">
          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              Event Status
            </p>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl bg-[#f8fafc] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#94a3b8]">
                  Current Status
                </p>
                <p className="mt-2 text-lg font-black text-[#006b3f]">
                  {eventItem.status}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f8fafc] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#94a3b8]">
                  Public Visibility
                </p>
                <p className="mt-2 text-sm font-black text-[#475569]">
                  {eventItem.status === "Published"
                    ? "Tampil di halaman public"
                    : "Tidak tampil di halaman public"}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f8fafc] p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#94a3b8]">
                  Last CMS Update
                </p>
                <p className="mt-2 text-sm font-black leading-6 text-[#475569]">
                  {formatLastUpdate(draft?.updatedAt)}
                </p>
              </div>
            </div>
          </section>

          <a
            href="/event"
            target="_blank"
            className="flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/5 ring-1 ring-black/5 transition hover:-translate-y-0.5"
          >
            View Public Event Page
          </a>
        </aside>
      </div>
    </CmsAdminShell>
  );
}
