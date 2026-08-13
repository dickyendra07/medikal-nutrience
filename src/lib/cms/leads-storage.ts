import { promises as fs } from "fs";
import path from "path";

export type CmsLead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  source:
    | "Assessment"
    | "Contact Form"
    | "Event Registration"
    | "Consultation";
  status:
    | "New"
    | "Contacted"
    | "Converted"
    | "Closed";
  message: string;
  assessment?: CmsAssessmentData;
  medicalNotes?: string;
  reviewStatus?: CmsMedicalReviewStatus | "Follow Up";
  createdAt: string;
};

export type CmsMedicalReviewStatus = "Pending" | "Reviewed" | "Approved" | "Rejected";

export type CmsAssessmentData = {
  assessmentType?: string;
  nutritionCategory?: string;
  recommendedProduct?: string;
  recommendationNotes?: string;
  answers?: Record<string, unknown>;
  schemaVersion?: number;
};

const filePath = path.join(
  process.cwd(),
  "src/data/cms/cms-leads.json"
);

export async function readLeadsStorage(): Promise<CmsLead[]> {
  try {
    const file = await fs.readFile(filePath, "utf8");

    if (!file.trim()) {
      return [];
    }

    return JSON.parse(file) as CmsLead[];
  } catch {
    return [];
  }
}

export async function writeLeadsStorage(
  data: CmsLead[]
) {
  await fs.writeFile(
    filePath,
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

export async function getLeads() {
  return readLeadsStorage();
}

export async function getLeadById(id: string) {
  const leads = await readLeadsStorage();

  return leads.find(
    (lead) => lead.id === id
  );
}
