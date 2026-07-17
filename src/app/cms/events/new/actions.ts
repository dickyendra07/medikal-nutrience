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

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createEventDraft(formData: FormData) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const title = String(formData.get("title") ?? "").trim();

  if (!title) {
    throw new Error("Judul event wajib diisi.");
  }

  const requestedSlug = String(formData.get("slug") ?? "").trim();
  const slug = createSlug(requestedSlug || title);

  if (!slug) {
    throw new Error("Slug event tidak valid.");
  }

  const storage = await readStorage();
  const currentEvents = storage.page?.events ?? eventPageData.events;

  const slugExists = currentEvents.some(
    (eventItem) => eventItem.slug === slug
  );

  if (slugExists) {
    throw new Error("Slug event sudah digunakan.");
  }

  const newEvent: EventItem = {
    slug,
    category: String(formData.get("category") ?? "").trim(),
    title,
    date: String(formData.get("date") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    href: String(formData.get("href") ?? "#registrasi-event").trim(),
    status: String(
      formData.get("status") ?? "Draft"
    ) as EventItem["status"],
  };

  await writeStorage({
    ...storage,
    page: {
      ...storage.page,
      events: [...currentEvents, newEvent],
      updatedAt: new Date().toISOString(),
    },
  });

  redirect(`/cms/events/${slug}/edit?created=1`);
}
