"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSettings, writeSettingsStorage } from "@/lib/cms/settings-storage";
import { requireCmsPermission } from "@/lib/cms/auth";
import { CMS_PERMISSIONS } from "@/lib/cms/permissions";

export async function updateSettings(
  formData: FormData
) {
  await requireCmsPermission(CMS_PERMISSIONS.SETTINGS_MANAGE);

  const currentSettings = await getSettings();

  await writeSettingsStorage({
    ...currentSettings,

    siteName: String(
      formData.get("siteName")
    ),

    siteDescription: String(
      formData.get("siteDescription")
    ),

    seoTitle: String(
      formData.get("seoTitle")
    ),

    seoDescription: String(
      formData.get("seoDescription")
    ),

    logo: String(
      formData.get("logo")
    ),

    phone: String(
      formData.get("phone")
    ),

    email: String(
      formData.get("email")
    ),

    whatsapp: String(
      formData.get("whatsapp")
    ),

    address: String(
      formData.get("address")
    ),

    instagram: String(
      formData.get("instagram")
    ),

    facebook: String(
      formData.get("facebook")
    ),

    youtube: String(
      formData.get("youtube")
    ),

    updatedAt: new Date().toISOString(),
  });

  revalidatePath("/", "layout");
  redirect(
    "/cms/settings?saved=1"
  );
}
