import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { getLeads } from "@/lib/cms/leads-storage";

function getStatusClass(status: string) {
  if (status === "New") {
    return "bg-[#e4f8ed] text-[#006b3f]";
  }

  if (status === "Contacted") {
    return "bg-[#fff7ed] text-[#c2410c]";
  }

  if (status === "Converted") {
    return "bg-[#dbeafe] text-[#1d4ed8]";
  }

  return "bg-[#f1f5f9] text-[#64748b]";
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function CmsLeadsPage({
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

  const leads = await getLeads();

  const keyword = (query.q ?? "").toLowerCase();
  const selectedStatus = query.status ?? "All";

  const filteredLeads = leads.filter((lead) => {
    const matchesKeyword =
      !keyword ||
      [
        lead.name,
        lead.email,
        lead.phone,
        lead.source,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword);

    const matchesStatus =
      selectedStatus === "All" ||
      lead.status === selectedStatus;

    return matchesKeyword && matchesStatus;
  });

  const newCount = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const contactedCount = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const convertedCount = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  return (
    <CmsAdminShell
      active="leads"
      title="Leads Management"
      eyebrow="CMS Leads"
      description="Kelola seluruh leads yang masuk dari assessment, contact form, event registration, dan konsultasi Medikal Nutrience."
      actions={
        <a
          href="/"
          target="_blank"
          className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/8 ring-1 ring-black/5"
        >
          View Website
        </a>
      }
    >

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {[
          ["Total Leads", leads.length],
          ["New", newCount],
          ["Contacted", contactedCount],
          ["Converted", convertedCount],
        ].map(([label,value]) => (
          <article
            key={String(label)}
            className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5"
          >
            <p className="text-4xl font-black text-[#006b3f]">
              {value}
            </p>
            <p className="mt-2 text-sm font-black text-[#64748b]">
              {label}
            </p>
          </article>
        ))}

      </section>


      <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">

        <div className="border-b border-black/5 pb-6">

          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
            Leads Database
          </p>

          <h2 className="mt-3 text-3xl font-black text-[#111827]">
            Customer Leads
          </h2>

        </div>


        <form
          action="/cms/leads"
          className="mt-6 grid gap-3 lg:grid-cols-[1fr_220px_auto]"
        >

          <input
            name="q"
            defaultValue={query.q ?? ""}
            placeholder="Cari nama, email, phone..."
            className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold"
          />

          <select
            name="status"
            defaultValue={selectedStatus}
            className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold"
          >
            <option value="All">
              Semua Status
            </option>
            <option value="New">
              New
            </option>
            <option value="Contacted">
              Contacted
            </option>
            <option value="Converted">
              Converted
            </option>
          </select>


          <button
            className="rounded-2xl bg-[#006b3f] px-6 py-4 text-xs font-black text-white"
          >
            Search
          </button>

        </form>


        <div className="mt-6 grid gap-4">

          {filteredLeads.map((lead)=>(
            <article
              key={lead.id}
              className="grid gap-5 rounded-[1.7rem] bg-[#f8fcfa] p-5 ring-1 ring-black/5 lg:grid-cols-[1.2fr_0.5fr_0.4fr]"
            >

              <div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-black ${getStatusClass(
                    lead.status
                  )}`}
                >
                  {lead.status}
                </span>

                <h3 className="mt-4 text-2xl font-black text-[#111827]">
                  {lead.name}
                </h3>

                <p className="mt-2 text-sm font-medium text-[#64748b]">
                  {lead.email} · {lead.phone}
                </p>

                <p className="mt-3 text-sm text-[#64748b]">
                  Source: {lead.source}
                </p>

              </div>


              <div>
                <p className="text-xs font-black uppercase text-[#94a3b8]">
                  Created
                </p>

                <p className="mt-2 font-bold text-[#475569]">
                  {formatDate(lead.createdAt)}
                </p>
              </div>


              <div className="flex items-center lg:justify-end">

                <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#64748b] ring-1 ring-black/5">
                  Detail Next
                </span>

              </div>


            </article>
          ))}

        </div>


      </section>

    </CmsAdminShell>
  );
}
