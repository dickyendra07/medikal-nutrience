import { NextResponse } from "next/server";
import {
  getLeads,
  writeLeadsStorage,
  type CmsLead,
} from "@/lib/cms/leads-storage";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const leads = await getLeads();

    const newLead: CmsLead = {
      id: `lead-${Date.now()}`,

      name:
        body.lead?.name ||
        "Anonymous",

      phone:
        body.lead?.whatsapp ||
        "",

      email:
        "",

      source:
        "Assessment",

      status:
        "New",

      message: [
        `Assessment: ${body.flowLabel}`,
        `Rekomendasi: ${body.recommendedProduct}`,
        "",
        "Jawaban:",
        JSON.stringify(body.answers, null, 2),
      ].join("\n"),

      createdAt:
        body.createdAt ||
        new Date().toISOString(),
    };

    await writeLeadsStorage([
      newLead,
      ...leads,
    ]);

    return NextResponse.json({
      success: true,
      lead: newLead,
    });

  } catch (error) {
    console.error(
      "Lead API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
