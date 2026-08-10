import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { requireCmsPermission } from "@/lib/cms/auth";
import { CMS_PERMISSIONS } from "@/lib/cms/permissions";
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

  const identity = await requireCmsPermission(CMS_PERMISSIONS.CONSULTATION_VIEW);


  const { id } = await params;
  const query = await searchParams;

  const lead = await getLeadById(id);


  if (!lead) {
    redirect("/cms/leads");
  }

  const canUpdate = identity.permissions.includes(CMS_PERMISSIONS.CONSULTATION_UPDATE);
  const canReview = identity.permissions.includes(CMS_PERMISSIONS.CONSULTATION_REVIEW);
  const canDelete = identity.permissions.includes(CMS_PERMISSIONS.CONSULTATION_DELETE);


  return (
    <CmsAdminShell
      active="leads"
      title="Detail Lead"
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
              disabled={!canUpdate}
              defaultValue={lead.name}
              placeholder="Name"
              className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold"
            />


            <input
              name="phone"
              disabled={!canUpdate}
              defaultValue={lead.phone}
              placeholder="Phone"
              className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold"
            />


            <input
              name="email"
              disabled={!canUpdate}
              defaultValue={lead.email}
              placeholder="Email"
              className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold"
            />


            <select
              name="source"
              disabled={!canUpdate}
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
              disabled={!canUpdate}
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
            disabled={!canUpdate}
            defaultValue={lead.message}
            rows={6}
            placeholder="Message"
            className="mt-5 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold"
          />


          {canReview ? <div className="mt-5 grid gap-4 rounded-2xl border border-violet-100 bg-violet-50/60 p-4 md:grid-cols-[200px_1fr]"><label className="text-xs font-semibold text-violet-900">Status review<select name="reviewStatus" defaultValue={lead.reviewStatus ?? "Pending"} className="mt-2 h-11 w-full rounded-xl border border-violet-200 bg-white px-3 text-xs font-medium"><option>Pending</option><option>Reviewed</option><option>Follow Up</option></select></label><label className="text-xs font-semibold text-violet-900">Catatan medis<textarea name="medicalNotes" defaultValue={lead.medicalNotes ?? ""} rows={3} maxLength={2000} placeholder="Tambahkan catatan validasi medis…" className="mt-2 w-full rounded-xl border border-violet-200 bg-white px-3 py-2.5 text-xs font-medium" /></label></div> : <input type="hidden" name="reviewStatus" value={lead.reviewStatus ?? "Pending"} />}

          {canUpdate || canReview ? <button
            type="submit"
            className="mt-6 rounded-full bg-[#006b3f] px-8 py-4 text-xs font-black uppercase tracking-wide text-white"
          >
            Simpan Perubahan
          </button> : <p className="mt-6 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">Akses Anda hanya untuk melihat data konsultasi.</p>}

        </section>

      </form>


      {canDelete ? <section className="mt-6 rounded-[2rem] bg-[#fff7ed] p-6 ring-1 ring-[#fed7aa]">

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

      </section> : null}


    </CmsAdminShell>
  );
}
