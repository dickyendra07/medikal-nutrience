"use server";

import { redirect } from "next/navigation";
import {
  getLeads,
  writeLeadsStorage,
  type CmsLead,
} from "@/lib/cms/leads-storage";
import { requireAnyCmsPermission, requireCmsPermission } from "@/lib/cms/auth";
import { CMS_PERMISSIONS } from "@/lib/cms/permissions";

export async function updateLead(
  id: string,
  formData: FormData
) {
  const identity = await requireAnyCmsPermission([
    CMS_PERMISSIONS.CONSULTATION_REVIEW,
    CMS_PERMISSIONS.CONSULTATION_UPDATE,
  ]);
  const leads = await getLeads();

  const currentLead = leads.find(
    (lead) => lead.id === id
  );

  if (!currentLead) {
    throw new Error("Lead tidak ditemukan.");
  }

  const canUpdate = identity.permissions.includes(CMS_PERMISSIONS.CONSULTATION_UPDATE);
  const canReview = identity.permissions.includes(CMS_PERMISSIONS.CONSULTATION_REVIEW);
  const allowedSources: CmsLead["source"][] = ["Assessment", "Contact Form", "Event Registration", "Consultation"];
  const allowedStatuses: CmsLead["status"][] = ["New", "Contacted", "Converted", "Closed"];
  const allowedReviewStatuses: Array<Exclude<CmsLead["reviewStatus"], undefined | "Follow Up">> = ["Pending", "Reviewed", "Approved", "Rejected"];
  const source = String(formData.get("source") ?? "") as CmsLead["source"];
  const status = String(formData.get("status") ?? "") as CmsLead["status"];
  const reviewStatus = String(formData.get("reviewStatus") ?? "") as Exclude<CmsLead["reviewStatus"], undefined | "Follow Up">;
  const updatedLead: CmsLead = {
    ...currentLead,
    ...(canUpdate ? {
      name: String(formData.get("name") ?? "").trim().slice(0, 120) || currentLead.name,
      phone: String(formData.get("phone") ?? "").trim().slice(0, 40),
      email: String(formData.get("email") ?? "").trim().toLowerCase().slice(0, 254),
      source: allowedSources.includes(source) ? source : currentLead.source,
      status: allowedStatuses.includes(status) ? status : currentLead.status,
      message: String(formData.get("message") ?? currentLead.message).trim().slice(0, 4000),
    } : {}),
    ...(canReview ? {
      medicalNotes: String(formData.get("medicalNotes") ?? "").trim().slice(0, 2000),
      reviewStatus: allowedReviewStatuses.includes(reviewStatus) ? reviewStatus : "Pending",
    } : {}),
  };

  const updatedLeads = leads.map(
    (lead) =>
      lead.id === id
        ? updatedLead
        : lead
  );

  await writeLeadsStorage(
    updatedLeads
  );

  redirect(
    `/cms/leads/${id}/edit?saved=1`
  );
}


export async function deleteLead(
  id: string
) {
  await requireCmsPermission(CMS_PERMISSIONS.CONSULTATION_DELETE);
  const leads = await getLeads();

  const filteredLeads = leads.filter(
    (lead) => lead.id !== id
  );

  await writeLeadsStorage(
    filteredLeads
  );

  redirect(
    "/cms/leads?deleted=1"
  );
}
