import { promises as fs } from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import {
  eventPageData,
  type EventItem,
  type EventPageData,
} from "@/data/events";

type EventPageDraft = {
  featuredEvent?: Partial<EventPageData["featuredEvent"]>;
  events?: EventItem[];
  updatedAt?: string;
};

async function getEventDraft(): Promise<EventPageDraft | null> {
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

function getStatusClass(status: EventItem["status"]) {
  if (status === "Published") {
    return "bg-[#e4f8ed] text-[#006b3f]";
  }

  if (status === "Draft") {
    return "bg-[#fff7ed] text-[#c2410c]";
  }

  return "bg-[#f1f5f9] text-[#64748b]";
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

export default async function CmsEventsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: string;
  }>;
}) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const query = await searchParams;
  const keyword = (query.q ?? "").trim().toLowerCase();
  const selectedStatus = query.status ?? "All";

  const draft = await getEventDraft();
  const events = draft?.events ?? eventPageData.events;

  const filteredEvents = events.filter((eventItem) => {
    const matchesKeyword =
      !keyword ||
      [
        eventItem.title,
        eventItem.category,
        eventItem.date,
        eventItem.location,
        eventItem.slug,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword);

    const matchesStatus =
      selectedStatus === "All" || eventItem.status === selectedStatus;

    return matchesKeyword && matchesStatus;
  });

  const publishedCount = events.filter(
    (eventItem) => eventItem.status === "Published"
  ).length;

  const draftCount = events.filter(
    (eventItem) => eventItem.status === "Draft"
  ).length;

  const hiddenCount = events.filter(
    (eventItem) => eventItem.status === "Hidden"
  ).length;

  return (
    <CmsAdminShell
      active="events"
      title="Events Management"
      eyebrow="CMS Events"
      description="Kelola daftar event, kategori, jadwal, lokasi, status publikasi, dan konten registrasi Medikal Nutrience."
      actions={
        <div className="flex flex-wrap gap-3">
          <a
            href="/cms/events/new"
            className="rounded-full bg-[#006b3f] px-6 py-4 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-[#005635]"
          >
            Add Event
          </a>

          <a
            href="/event"
            target="_blank"
            className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
          >
            View Public Page
          </a>
        </div>
      }
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-4xl font-black text-[#006b3f]">{events.length}</p>
          <p className="mt-2 text-sm font-black text-[#64748b]">Total Event</p>
        </article>

        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-4xl font-black text-[#006b3f]">
            {publishedCount}
          </p>
          <p className="mt-2 text-sm font-black text-[#64748b]">Published</p>
        </article>

        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-4xl font-black text-[#c2410c]">{draftCount}</p>
          <p className="mt-2 text-sm font-black text-[#64748b]">Draft</p>
        </article>

        <article className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-lg font-black leading-tight text-[#006b3f]">
            {formatLastUpdate(draft?.updatedAt)}
          </p>
          <p className="mt-2 text-sm font-black text-[#64748b]">
            Last CMS Update
          </p>
        </article>
      </section>

      <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
        <div className="flex flex-col gap-4 border-b border-black/5 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              Events List
            </p>
            <h2 className="mt-3 text-3xl font-black text-[#111827]">
              Daftar Event Medikal Nutrience
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-[#64748b]">
              Cari event berdasarkan nama, kategori, lokasi, tanggal, atau slug.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#e4f8ed] px-3 py-2 text-xs font-black text-[#006b3f]">
              {publishedCount} Published
            </span>
            <span className="rounded-full bg-[#fff7ed] px-3 py-2 text-xs font-black text-[#c2410c]">
              {draftCount} Draft
            </span>
            <span className="rounded-full bg-[#f1f5f9] px-3 py-2 text-xs font-black text-[#64748b]">
              {hiddenCount} Hidden
            </span>
          </div>
        </div>

        <form
          action="/cms/events"
          className="mt-6 grid gap-3 lg:grid-cols-[1fr_220px_auto]"
        >
          <input
            name="q"
            defaultValue={query.q ?? ""}
            placeholder="Cari nama event, kategori, lokasi, tanggal..."
            className="w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
          />

          <select
            name="status"
            defaultValue={selectedStatus}
            className="w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10"
          >
            <option value="All">Semua Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Hidden">Hidden</option>
          </select>

          <button
            type="submit"
            className="rounded-2xl bg-[#006b3f] px-6 py-4 text-xs font-black uppercase tracking-wide text-white transition hover:bg-[#005635]"
          >
            Search
          </button>
        </form>

        {keyword || selectedStatus !== "All" ? (
          <div className="mt-4 rounded-2xl bg-[#e4f8ed] px-5 py-4 text-sm font-black text-[#006b3f] ring-1 ring-[#006b3f]/10">
            Menampilkan {filteredEvents.length} dari {events.length} event.
            <a href="/cms/events" className="ml-2 underline">
              Reset Filter
            </a>
          </div>
        ) : null}

        <div className="mt-6 grid gap-4">
          {filteredEvents.map((eventItem) => (
            <article
              key={eventItem.slug}
              className="grid gap-5 rounded-[1.7rem] bg-[#f8fcfa] p-5 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-xl hover:shadow-green-900/8 lg:grid-cols-[1.2fr_0.65fr_0.45fr]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${getStatusClass(
                      eventItem.status
                    )}`}
                  >
                    {eventItem.status}
                  </span>

                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#006b3f] ring-1 ring-black/5">
                    {eventItem.category}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-black text-[#111827]">
                  {eventItem.title}
                </h3>

                <p className="mt-3 text-xs font-bold text-[#94a3b8]">
                  Slug: {eventItem.slug}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#94a3b8]">
                  Schedule
                </p>
                <p className="mt-3 text-sm font-black leading-6 text-[#334155]">
                  {eventItem.date}
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-[#64748b]">
                  {eventItem.location}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                <a
                  href="/event"
                  target="_blank"
                  className="inline-flex rounded-full bg-[#f1f5f9] px-4 py-2 text-xs font-black text-[#475569] transition hover:bg-[#e2e8f0]"
                >
                  View
                </a>

                <a
                  href={`/cms/events/${eventItem.slug}/edit`}
                  className="inline-flex rounded-full bg-[#006b3f] px-4 py-2 text-xs font-black text-white transition hover:bg-[#005635]"
                >
                  Edit
                </a>
              </div>
            </article>
          ))}

          {filteredEvents.length === 0 ? (
            <div className="rounded-[1.7rem] bg-[#f8fcfa] p-10 text-center ring-1 ring-black/5">
              <p className="text-xl font-black text-[#111827]">
                Event tidak ditemukan
              </p>
              <p className="mt-3 text-sm font-medium text-[#64748b]">
                Ubah kata pencarian atau reset filter.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mt-6 rounded-[2rem] bg-[#004b34] p-6 text-white shadow-2xl shadow-green-900/15">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-white/60">
          Next Development Step
        </p>
        <h2 className="mt-4 text-3xl font-black leading-tight">
          Module Events sudah terbuka di CMS.
        </h2>
        <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-white/70">
          Tahap berikutnya adalah membuat halaman edit event, save draft,
          reset draft, add event baru, serta delete atau hide event.
        </p>
      </section>
    </CmsAdminShell>
  );
}
