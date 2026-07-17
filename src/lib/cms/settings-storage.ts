import { promises as fs } from "fs";
import path from "path";

export type CmsSettings = {
  siteName: string;
  siteDescription: string;

  seoTitle: string;
  seoDescription: string;

  logo: string;

  phone: string;
  email: string;
  whatsapp: string;
  address: string;

  instagram: string;
  facebook: string;
  youtube: string;

  updatedAt: string | null;
};

const filePath = path.join(
  process.cwd(),
  "src/data/cms/cms-settings.json"
);

const defaultSettings: CmsSettings = {
  siteName: "Medikal Nutrience",

  siteDescription:
    "Solusi nutrisi medis untuk mendukung kebutuhan kesehatan masyarakat Indonesia.",

  seoTitle:
    "Medikal Nutrience | Solusi Nutrisi Medis",

  seoDescription:
    "Medikal Nutrience menghadirkan solusi nutrisi medis terpercaya untuk berbagai kebutuhan kesehatan.",

  logo:
    "/images/brand/medikal-nutrience-logo.png",

  phone: "",
  email: "",
  whatsapp: "",
  address: "",

  instagram: "",
  facebook: "",
  youtube: "",

  updatedAt: null,
};

export async function readSettingsStorage(): Promise<CmsSettings> {
  try {
    const file = await fs.readFile(
      filePath,
      "utf8"
    );

    if (!file.trim()) {
      return defaultSettings;
    }

    return {
      ...defaultSettings,
      ...(JSON.parse(file) as Partial<CmsSettings>),
    };
  } catch {
    return defaultSettings;
  }
}


export async function writeSettingsStorage(
  data: CmsSettings
) {
  await fs.writeFile(
    filePath,
    JSON.stringify(data, null, 2),
    "utf8"
  );
}


export async function getSettings() {
  return readSettingsStorage();
}
