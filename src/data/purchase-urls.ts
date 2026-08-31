export const officialShopeeStoreUrl =
  "https://shopee.co.id/kalbefarmaofficial#product_list";

export const purchaseUrls = {
  entrakid:
    "https://shopee.co.id/Entrakid-Minuman-Nutrisi-Lengkap-Untuk-Anak-i.17326605.163992916",
  entramix:
    "https://shopee.co.id/Entramix-174-gram-Nutrisi-Seimbang-Khusus-Dewasa-i.17326605.2350049067",
  entrasoy:
    "https://shopee.co.id/Entrasoy-Nutrisi-Khusus-dan-Lengkap-dengan-Protein-Nabati-i.17326605.23919063661",
  peptisol:
    "https://shopee.co.id/Peptisol-180-gram-Susu-Tinggi-Protein-i.17326605.2350052967",
  peptibren:
    "https://shopee.co.id/Peptibren-195-gram-Nutrisi-Kaya-Protein-dan-Kolin-i.17326605.2350069612",
  nephrisol:
    "https://shopee.co.id/Nephrisol-201-gram-Nutrisi-Rendah-Protein-Ginjal-Kronik-i.17326605.2350059229",
  "nephrisol-d":
    "https://shopee.co.id/Nephrisol-D-Vanilla-210-gram-Nutrisi-Khusus-Pasien-Ginjal-Kronik-HD-CAPD-i.17326605.2350064022",
  hepatosol:
    "https://shopee.co.id/Hepatosol-Nutrisi-Kesehatan-Hati-240-Gram-i.17326605.2350085906",
  "hepatosol-lola": officialShopeeStoreUrl,
  pulmosol:
    "https://shopee.co.id/Pulmosol-Susu-Nutrisi-Kesehatan-Pernapasan-i.17326605.4177353022",
  oligo:
    "https://shopee.co.id/Oligo-Nutrisi-Khusus-Tinggi-Protein-Terhidrolisa-i.17326605.23426694099",
} as const;

export type PurchasableProductSlug = keyof typeof purchaseUrls;

export function getPurchaseUrl(slug: string) {
  return purchaseUrls[slug as PurchasableProductSlug] ?? officialShopeeStoreUrl;
}
