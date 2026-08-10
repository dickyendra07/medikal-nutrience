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
  const updatedLead: CmsLead = {
    ...currentLead,
    ...(canUpdate ? {
      name: String(formData.get("name")),
      phone: String(formData.get("phone")),
      email: String(formData.get("email")),
      source: String(formData.get("source")) as CmsLead["source"],
      status: String(formData.get("status")) as CmsLead["status"],
      message: String(formData.get("message")),
    } : {}),
    medicalNotes: String(formData.get("medicalNotes") ?? "").trim(),
    reviewStatus: String(formData.get("reviewStatus") ?? "Pending") as CmsLead["reviewStatus"],
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
