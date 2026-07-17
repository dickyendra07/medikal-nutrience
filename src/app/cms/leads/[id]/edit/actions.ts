"use server";

import { redirect } from "next/navigation";
import {
  getLeads,
  writeLeadsStorage,
  type CmsLead,
} from "@/lib/cms/leads-storage";

export async function updateLead(
  id: string,
  formData: FormData
) {
  const leads = await getLeads();

  const currentLead = leads.find(
    (lead) => lead.id === id
  );

  if (!currentLead) {
    throw new Error("Lead tidak ditemukan.");
  }

  const updatedLead: CmsLead = {
    ...currentLead,

    name: String(
      formData.get("name")
    ),

    phone: String(
      formData.get("phone")
    ),

    email: String(
      formData.get("email")
    ),

    source: String(
      formData.get("source")
    ) as CmsLead["source"],

    status: String(
      formData.get("status")
    ) as CmsLead["status"],

    message: String(
      formData.get("message")
    ),
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
