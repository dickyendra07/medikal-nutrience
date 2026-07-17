import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { getLeadById } from "@/lib/cms/leads-storage";
import {
  updateLead,
  deleteLead,
} from "./actions";


export default async function CmsLeadEditPage({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    saved?: string;
  }>;
}) {

  const authenticated =
    await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }


  const { id } = await params;
  const query = await searchParams;

  const lead = await getLeadById(id);


  if (!lead) {
    redirect("/cms/leads");
  }


  return (
    <CmsAdminShell
      active="leads"
      title="Edit Lead"
      eyebrow="CMS Leads"
      description="Kelola informasi customer lead Medikal Nutrience."
      actions={
        <a
          href="/cms/leads"
          className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] ring-1 ring-black/5"
        >
          Back To Leads
        </a>
      }
    >

      {query.saved === "1" ? (
        <div className="mb-6 rounded-2xl bg-[#e4f8ed] px-5 py-4 text-sm font-black text-[#006b3f] ring-1 ring-[#006b3f]/10">
          Lead berhasil diperbarui.
        </div>
      ) : null}


      <form
        action={updateLead.bind(null, id)}
        className="space-y-6"
      >

        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
                Lead Information
              </p>

              <h2 className="mt-3 text-3xl font-black text-[#111827]">
                {lead.name}
              </h2>
            </div>


            <span className="rounded-full bg-[#e4f8ed] px-4 py-2 text-xs font-black text-[#006b3f]">
              {lead.status}
            </span>

          </div>


          <div className="mt-8 grid gap-5 md:grid-cols-2">


            <input
              name="name"
              defaultValue={lead.name}
              placeholder="Name"
              className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold"
            />


            <input
              name="phone"
              defaultValue={lead.phone}
              placeholder="Phone"
              className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold"
            />


            <input
              name="email"
              defaultValue={lead.email}
              placeholder="Email"
              className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold"
            />


            <select
              name="source"
              defaultValue={lead.source}
              className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold"
            >
              <option>
                Assessment
              </option>

              <option>
                Contact Form
              </option>

              <option>
                Event Registration
              </option>

              <option>
                Consultation
              </option>

            </select>


            <select
              name="status"
              defaultValue={lead.status}
              className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold"
            >

              <option>
                New
              </option>

              <option>
                Contacted
              </option>

              <option>
                Converted
              </option>

              <option>
                Closed
              </option>

            </select>


          </div>


          <textarea
            name="message"
            defaultValue={lead.message}
            rows={6}
            placeholder="Message"
            className="mt-5 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold"
          />


          <button
            type="submit"
            className="mt-6 rounded-full bg-[#006b3f] px-8 py-4 text-xs font-black uppercase tracking-wide text-white"
          >
            Save Lead
          </button>

        </section>

      </form>


      <section className="mt-6 rounded-[2rem] bg-[#fff7ed] p-6 ring-1 ring-[#fed7aa]">

        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#c2410c]">
          Danger Zone
        </p>


        <form
          action={deleteLead.bind(null,id)}
          className="mt-5"
        >

          <button
            type="submit"
            className="rounded-full bg-[#c2410c] px-8 py-4 text-xs font-black uppercase tracking-wide text-white"
          >
            Delete Lead
          </button>

        </form>

      </section>


    </CmsAdminShell>
  );
}
