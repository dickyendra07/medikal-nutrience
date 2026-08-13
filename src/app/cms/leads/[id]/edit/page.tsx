import { redirect } from "next/navigation";
import { AssessmentAnswerList } from "@/components/cms/leads/AssessmentAnswerList";
import {
  CmsBadge,
  CmsButton,
  CmsCard,
  CmsSectionHeader,
  cmsFieldClass,
} from "@/components/cms/CmsUi";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { parseAssessmentResult } from "@/lib/cms/assessment-result";
import { requireCmsPermission } from "@/lib/cms/auth";
import { getLeadById, type CmsMedicalReviewStatus } from "@/lib/cms/leads-storage";
import { CMS_PERMISSIONS } from "@/lib/cms/permissions";
import { deleteLead, updateLead } from "./actions";

const reviewTone: Record<CmsMedicalReviewStatus, "warning" | "info" | "success" | "danger"> = {
  Pending: "warning",
  Reviewed: "info",
  Approved: "success",
  Rejected: "danger",
};

function formatDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(parsed);
}

function DetailValue({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 px-4 py-3.5">
      <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">{label}</dt>
      <dd className="mt-1.5 text-[13px] font-semibold leading-5 text-slate-800">{value || "Not available"}</dd>
    </div>
  );
}

export default async function CmsLeadEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const identity = await requireCmsPermission(CMS_PERMISSIONS.CONSULTATION_VIEW);
  const { id } = await params;
  const query = await searchParams;
  const lead = await getLeadById(id);

  if (!lead) redirect("/cms/leads");

  const canUpdate = identity.permissions.includes(CMS_PERMISSIONS.CONSULTATION_UPDATE);
  const canReview = identity.permissions.includes(CMS_PERMISSIONS.CONSULTATION_REVIEW);
  const canDelete = identity.permissions.includes(CMS_PERMISSIONS.CONSULTATION_DELETE);
  const assessment = parseAssessmentResult(lead.assessment ?? (lead.source === "Assessment" ? lead.message : null));
  const reviewStatus: CmsMedicalReviewStatus = lead.reviewStatus === "Follow Up"
    ? "Reviewed"
    : lead.reviewStatus ?? "Pending";

  return (
    <CmsAdminShell
      active="leads"
      title="Consultation Detail"
      eyebrow="Healthcare CRM"
      description="Review customer information, nutrition assessment, and medical validation in one secure workspace."
      actions={(
        <a href="/cms/leads" className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50 sm:px-4">
          <span className="sm:hidden">← Back</span>
          <span className="hidden sm:inline">← Back to consultations</span>
        </a>
      )}
    >
      {query.saved === "1" ? (
        <div role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700">
          Consultation and medical validation were successfully updated.
        </div>
      ) : null}

      <form action={updateLead.bind(null, id)} className="space-y-5">
        <CmsCard>
          <CmsSectionHeader
            eyebrow="Customer profile"
            title="Customer Information"
            description="Contact and submission details captured from the Medikal Nutrience website."
            action={<CmsBadge tone={lead.status === "New" ? "success" : lead.status === "Contacted" ? "warning" : "info"}>{lead.status}</CmsBadge>}
          />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="text-[11px] font-medium text-slate-600">Full name<input name="name" disabled={!canUpdate} defaultValue={lead.name} maxLength={120} className={`mt-1.5 ${cmsFieldClass}`} /></label>
            <label className="text-[11px] font-medium text-slate-600">WhatsApp / Phone<input name="phone" disabled={!canUpdate} defaultValue={lead.phone} maxLength={40} className={`mt-1.5 ${cmsFieldClass}`} /></label>
            <label className="text-[11px] font-medium text-slate-600">Email<input name="email" type="email" disabled={!canUpdate} defaultValue={lead.email} maxLength={254} placeholder="Not provided" className={`mt-1.5 ${cmsFieldClass}`} /></label>
            <label className="text-[11px] font-medium text-slate-600">Submission source<select name="source" disabled={!canUpdate} defaultValue={lead.source} className={`mt-1.5 ${cmsFieldClass}`}><option>Assessment</option><option>Contact Form</option><option>Event Registration</option><option>Consultation</option></select></label>
            <label className="text-[11px] font-medium text-slate-600 md:max-w-xs">Customer journey status<select name="status" disabled={!canUpdate} defaultValue={lead.status} className={`mt-1.5 ${cmsFieldClass}`}><option>New</option><option>Contacted</option><option>Converted</option><option>Closed</option></select></label>
          </div>
          {lead.source !== "Assessment" ? <label className="mt-4 block text-[11px] font-medium text-slate-600">Submission notes<textarea name="message" disabled={!canUpdate} defaultValue={lead.message} rows={4} maxLength={4000} className={`mt-1.5 ${cmsFieldClass} resize-none py-3`} /></label> : null}
        </CmsCard>

        <CmsCard>
          <CmsSectionHeader
            eyebrow="Nutrition finder"
            title="Assessment Result"
            description="A structured summary of the customer’s nutrition assessment submission."
          />
          {assessment.status === "empty" ? (
            <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-5 py-10 text-center">
              <p className="text-[13px] font-medium text-slate-600">No assessment data available</p>
            </div>
          ) : (
            <>
              {assessment.status === "incomplete" ? <div role="note" className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-800">Assessment data incomplete. Please review submission.</div> : null}
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                <DetailValue label="Assessment Type" value={assessment.assessmentType} />
                <DetailValue label="Nutrition Category" value={assessment.nutritionCategory} />
                <DetailValue label="Recommended Product" value={assessment.recommendedProduct} />
                <DetailValue label="Recommendation Notes" value={assessment.recommendationNotes} />
              </dl>
            </>
          )}
        </CmsCard>

        <CmsCard>
          <CmsSectionHeader
            eyebrow="Submission details"
            title="Customer Answers"
            description="Responses are converted into readable labels and remain compatible with future assessment questions."
          />
          <div className="mt-5"><AssessmentAnswerList answers={assessment.answers} /></div>
        </CmsCard>

        <CmsCard>
          <CmsSectionHeader
            eyebrow="Clinical review"
            title="Medical Validation"
            description="Medical Affairs can record review status and notes without changing the original assessment response."
            action={<CmsBadge tone={reviewTone[reviewStatus]}><span aria-hidden="true" className="mr-1">●</span>{reviewStatus}</CmsBadge>}
          />
          <div className="mt-5 grid gap-4 lg:grid-cols-[220px_1fr]">
            <label className="text-[11px] font-medium text-slate-600">Review Status<select name="reviewStatus" disabled={!canReview} defaultValue={reviewStatus} className={`mt-1.5 ${cmsFieldClass}`}><option>Pending</option><option>Reviewed</option><option>Approved</option><option>Rejected</option></select></label>
            <label className="text-[11px] font-medium text-slate-600">Medical Notes<textarea name="medicalNotes" disabled={!canReview} defaultValue={lead.medicalNotes ?? ""} rows={5} maxLength={2000} placeholder={canReview ? "Add clinical context, validation notes, or recommended follow-up…" : "No medical notes recorded"} className={`mt-1.5 ${cmsFieldClass} resize-none py-3 leading-5`} /></label>
          </div>
          {!canReview ? <p className="mt-3 text-[11px] text-slate-400">Medical validation can only be updated by an authorized reviewer.</p> : null}
        </CmsCard>

        <CmsCard>
          <CmsSectionHeader eyebrow="Record activity" title="Activity & Actions" description="Submission provenance and available actions for your access level." />
          <dl className="mt-5 grid gap-3 sm:grid-cols-3">
            <DetailValue label="Created" value={formatDate(lead.createdAt)} />
            <DetailValue label="Source" value={lead.source} />
            <DetailValue label="Record ID" value={lead.id} />
          </dl>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <p className="text-[11px] text-slate-400">Original customer answers remain read-only during medical validation.</p>
            {canUpdate || canReview ? <CmsButton type="submit">Save changes</CmsButton> : <CmsBadge>Read-only access</CmsBadge>}
          </div>
        </CmsCard>
      </form>

      {canDelete ? (
        <CmsCard className="mt-5 border-red-100 bg-red-50/40">
          <CmsSectionHeader eyebrow="Restricted action" title="Delete consultation" description="This action permanently removes the consultation record from the current local CMS storage." />
          <form action={deleteLead.bind(null, id)} className="mt-4"><CmsButton type="submit" tone="danger">Delete consultation</CmsButton></form>
        </CmsCard>
      ) : null}
    </CmsAdminShell>
  );
}
