import { NextResponse } from "next/server";
import {
  getLeads,
  writeLeadsStorage,
  type CmsLead,
} from "@/lib/cms/leads-storage";
import { assessmentDataFromSubmission } from "@/lib/cms/assessment-result";

const MAX_REQUEST_BYTES = 32_000;
const MAX_ANSWER_BYTES = 12_000;

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json({ success: false }, { status: 415 });
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_REQUEST_BYTES) {
      return NextResponse.json({ success: false }, { status: 413 });
    }

    const body = await request.json();
    const answerText = JSON.stringify(body.answers ?? {});

    if (answerText.length > MAX_ANSWER_BYTES) {
      return NextResponse.json({ success: false }, { status: 413 });
    }

    const name = cleanText(body.lead?.name, 120) || "Anonymous";
    const phone = cleanText(body.lead?.whatsapp, 40);
    const assessment = assessmentDataFromSubmission(body);

    if (!assessment?.recommendedProduct) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const leads = await getLeads();

    const newLead: CmsLead = {
      id: `lead-${Date.now()}`,

      name,

      phone,

      email:
        "",

      source:
        "Assessment",

      status:
        "New",

      message: "Nutrition assessment submitted through the Medikal Nutrience website.",

      assessment,

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
