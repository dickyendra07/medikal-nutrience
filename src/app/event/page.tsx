import { promises as fs } from "fs";
import path from "path";
import { EventClientPage } from "@/components/pages/events/EventClientPage";
import {
  eventPageData,
  type EventPageData,
  type EventItem,
  type EventProgram,
} from "@/data/events";

type EventPageDraft = {
  featuredEvent?: Partial<EventPageData["featuredEvent"]>;
  programs?: EventProgram[];
  events?: EventItem[];
  productOptions?: string[];
  infoSources?: string[];
  updatedAt?: string;
};

async function getEventPageDraft(): Promise<EventPageDraft | null> {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "src/data/cms/cms-events.json"),
      "utf8"
    );

    if (!file.trim()) {
      return null;
    }

    const parsed = JSON.parse(file) as {
      page?: EventPageDraft;
    };

    return parsed.page ?? null;
  } catch {
    return null;
  }
}

export default async function EventPage() {
  const draft = await getEventPageDraft();

  const viewData: EventPageData = {
    featuredEvent: {
      ...eventPageData.featuredEvent,
      ...draft?.featuredEvent,
    },
    programs: draft?.programs ?? eventPageData.programs,
    events: draft?.events ?? eventPageData.events,
    productOptions:
      draft?.productOptions ?? eventPageData.productOptions,
    infoSources: draft?.infoSources ?? eventPageData.infoSources,
  };

  return <EventClientPage initialData={viewData} />;
}
