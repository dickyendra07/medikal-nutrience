import { promises as fs } from "fs";
import path from "path";
import { FaqClientPage } from "@/components/pages/faq/FaqClientPage";
import { faqCategories, faqs, type FaqItem } from "@/data/faqs";

type CmsFaqDraft = FaqItem & {
  index: number;
  status: "published" | "draft" | "review";
  updatedAt: string;
};

async function getFaqDrafts() {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "src/data/cms/cms-faqs.json"),
      "utf8"
    );

    const drafts = JSON.parse(file) as Record<string, CmsFaqDraft>;

    return Object.fromEntries(
      Object.entries(drafts).filter(([, draft]) => draft.status === "published")
    ) as Record<string, CmsFaqDraft>;
  } catch {
    return {};
  }
}

export default async function FaqPage() {
  const drafts = await getFaqDrafts();

  const viewFaqs = faqs.map((faq, index) => {
    const draft = drafts[String(index)];

    return {
      ...faq,
      category: draft?.category ?? faq.category,
      question: draft?.question ?? faq.question,
      answer: draft?.answer ?? faq.answer,
      ctaLabel: draft?.ctaLabel ?? faq.ctaLabel,
      ctaHref: draft?.ctaHref ?? faq.ctaHref,
    };
  });

  const categories = [
    "Semua",
    ...Array.from(new Set(viewFaqs.map((faq) => faq.category))),
  ];

  return <FaqClientPage initialFaqs={viewFaqs} initialCategories={categories} />;
}
