"use server";

import { promises as fs } from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import {
  eventPageData,
  type EventItem,
  type EventPageData,
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

type CmsEventsStorage = {
  page?: EventPageDraft;
};

const cmsEventsPath = path.join(
  process.cwd(),
  "src/data/cms/cms-events.json"
);

async function readStorage(): Promise<CmsEventsStorage> {
  try {
    const file = await fs.readFile(cmsEventsPath, "utf8");

    if (!file.trim()) {
      return {};
    }

    return JSON.parse(file) as CmsEventsStorage;
  } catch {
    return {};
  }
}

async function writeStorage(storage: CmsEventsStorage) {
  await fs.mkdir(path.dirname(cmsEventsPath), { recursive: true });
  await fs.writeFile(
    cmsEventsPath,
    `${JSON.stringify(storage, null, 2)}\n`,
    "utf8"
  );
}

export async function saveEventDraft(formData: FormData) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const originalSlug = String(formData.get("originalSlug") ?? "").trim();

  if (!originalSlug) {
    throw new Error("Slug event tidak valid.");
  }

  const storage = await readStorage();
  const currentEvents = storage.page?.events ?? eventPageData.events;

  const eventExists = currentEvents.some(
    (eventItem) => eventItem.slug === originalSlug
  );

  if (!eventExists) {
    throw new Error("Event tidak ditemukan.");
  }

  const updatedEvent: EventItem = {
    slug: originalSlug,
    category: String(formData.get("category") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    date: String(formData.get("date") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    href: String(formData.get("href") ?? "#registrasi-event").trim(),
    status: String(
      formData.get("status") ?? "Published"
    ) as EventItem["status"],
  };

  if (!updatedEvent.title) {
    throw new Error("Judul event wajib diisi.");
  }

  const updatedEvents = currentEvents.map((eventItem) =>
    eventItem.slug === originalSlug ? updatedEvent : eventItem
  );

  await writeStorage({
    ...storage,
    page: {
      ...storage.page,
      events: updatedEvents,
      updatedAt: new Date().toISOString(),
    },
  });

  redirect(`/cms/events/${originalSlug}/edit?saved=1`);
}

export async function resetEventDraft(formData: FormData) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const originalSlug = String(formData.get("originalSlug") ?? "").trim();

  if (!originalSlug) {
    throw new Error("Slug event tidak valid.");
  }

  const originalEvent = eventPageData.events.find(
    (eventItem) => eventItem.slug === originalSlug
  );

  if (!originalEvent) {
    redirect(`/cms/events/${originalSlug}/edit?resetUnavailable=1`);
  }

  const storage = await readStorage();
  const currentEvents = storage.page?.events ?? eventPageData.events;

  const restoredEvents = currentEvents.map((eventItem) =>
    eventItem.slug === originalSlug ? originalEvent : eventItem
  );

  await writeStorage({
    ...storage,
    page: {
      ...storage.page,
      events: restoredEvents,
      updatedAt: new Date().toISOString(),
    },
  });

  redirect(`/cms/events/${originalSlug}/edit?reset=1`);
}

export async function deleteOrHideEvent(formData: FormData) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const originalSlug = String(formData.get("originalSlug") ?? "").trim();

  if (!originalSlug) {
    throw new Error("Slug event tidak valid.");
  }

  const storage = await readStorage();
  const currentEvents = storage.page?.events ?? eventPageData.events;

  const targetEvent = currentEvents.find(
    (eventItem) => eventItem.slug === originalSlug
  );

  if (!targetEvent) {
    throw new Error("Event tidak ditemukan.");
  }

  const isOriginalEvent = eventPageData.events.some(
    (eventItem) => eventItem.slug === originalSlug
  );

  const updatedEvents = isOriginalEvent
    ? currentEvents.map((eventItem) =>
        eventItem.slug === originalSlug
          ? {
              ...eventItem,
              status: "Hidden" as const,
            }
          : eventItem
      )
    : currentEvents.filter(
        (eventItem) => eventItem.slug !== originalSlug
      );

  await writeStorage({
    ...storage,
    page: {
      ...storage.page,
      events: updatedEvents,
      updatedAt: new Date().toISOString(),
    },
  });

  redirect(
    isOriginalEvent
      ? "/cms/events?hidden=1"
      : "/cms/events?deleted=1"
  );
}
