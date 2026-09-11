export const marketplaceRegistry = {
  shopee: {
    id: "shopee",
    label: "Shopee",
    icon: "/images/marketplaces/shopee.svg",
    ctaLabel: "Beli di Shopee",
    brandColor: "#ee4d2d",
  },
  tokopedia: {
    id: "tokopedia",
    label: "Tokopedia",
    icon: "/images/marketplaces/tokopedia.svg",
    ctaLabel: "Beli di Tokopedia",
    brandColor: "#03ac0e",
  },
  blibli: {
    id: "blibli",
    label: "Blibli",
    icon: "/images/marketplaces/blibli.svg",
    ctaLabel: "Beli di Blibli",
    brandColor: "#0095da",
  },
  lazada: {
    id: "lazada",
    label: "Lazada",
    icon: "/images/marketplaces/lazada.svg",
    ctaLabel: "Beli di Lazada",
    brandColor: "#0f146d",
  },
} as const;

export type MarketplaceId = keyof typeof marketplaceRegistry;

export type MarketplacePurchaseLink = {
  marketplace: MarketplaceId;
  url: string;
};

export const officialShopeeStoreUrl =
  "https://shopee.co.id/kalbefarmaofficial#product_list";

/**
 * Storefront references supplied by the client. These are intentionally kept
 * separate from exact product URLs and must never be rendered as purchase links.
 */
export const marketplaceStoreReferences: Record<MarketplaceId, string> = {
  shopee: officialShopeeStoreUrl,
  tokopedia:
    "https://www.tokopedia.com/sahabatkesehatan?source=universe&st=product",
  blibli:
    "https://www.blibli.com/merchant/sahabat-kesehatan-flagship-store/SAO-70302?pickupPointCode=PP-3438716&utm_campaign=linkinbio&utm_medium=referral&utm_source=later-linkinbio",
  lazada:
    "https://www.lazada.co.id/shop/sahabat-kesehatan-by-kalbe/?laz_trackid=2%3Amm_150050286_51200745_2010250750%3Aclkgk2dck1k286s1h3dguu&path=promotion-441301-0.htm&mkttid=clkgk2dck1k286s1h3dguu&tab=promotion&exlaz=c_lzd_byr%3Amm_150050286_51200745_2010250750%21172162923%3Aclkgk2dck1k286s1h3dguu%3A%3A",
};

/**
 * Single source of truth for product purchase destinations.
 * Only add a marketplace after its final product URL has been supplied.
 */
export const purchaseUrls = {
  entrakid: {
    shopee:
      "https://shopee.co.id/Entrakid-Minuman-Nutrisi-Lengkap-Untuk-Anak-i.17326605.163992916",
    blibli:
      "https://www.blibli.com/p/entrakid-minuman-nutrisi-khusus-untuk-anak/is--SAO-70302-00006-00001",
  },
  entramix: {
    shopee:
      "https://shopee.co.id/Entramix-174-gram-Nutrisi-Seimbang-Khusus-Dewasa-i.17326605.2350049067",
    blibli:
      "https://www.blibli.com/p/entramix-174-gram-nutrisi-seimbang-khusus-dewasa/ps--SAO-70302-00003",
  },
  entrasoy: {
    shopee:
      "https://shopee.co.id/Entrasoy-Nutrisi-Khusus-dan-Lengkap-dengan-Protein-Nabati-i.17326605.23919063661",
    blibli:
      "https://www.blibli.com/p/entrasoy-nutrisi-khusus-dan-lengkap-dengan-protein-nabati/ps--SAO-70302-00315",
  },
  peptisol: {
    shopee:
      "https://shopee.co.id/Peptisol-180-gram-Susu-Tinggi-Protein-i.17326605.2350052967",
    blibli:
      "https://www.blibli.com/p/peptisol-189-gram-nutrisi-tinggi-protein/ps--SAO-70302-00009",
  },
  peptibren: {
    shopee:
      "https://shopee.co.id/Peptibren-195-gram-Nutrisi-Kaya-Protein-dan-Kolin-i.17326605.2350069612",
    blibli:
      "https://www.blibli.com/p/peptibren-195-gram-nutrisi-kaya-protein-dan-kolin/is--SAO-70302-00181-00002",
  },
  nephrisol: {
    shopee:
      "https://shopee.co.id/Nephrisol-201-gram-Nutrisi-Rendah-Protein-Ginjal-Kronik-i.17326605.2350059229",
  },
  "nephrisol-d": {
    shopee:
      "https://shopee.co.id/Nephrisol-D-Vanilla-210-gram-Nutrisi-Khusus-Pasien-Ginjal-Kronik-HD-CAPD-i.17326605.2350064022",
    blibli:
      "https://www.blibli.com/p/nephrisol-d-vanilla-210-gram-nutrisi-khusus-pasien-ginjal-kronik-hd-capd/ps--SAO-70302-00165",
  },
  hepatosol: {
    shopee:
      "https://shopee.co.id/Hepatosol-Nutrisi-Kesehatan-Hati-240-Gram-i.17326605.2350085906",
    blibli:
      "https://www.blibli.com/p/hepatosol-nutrisi-kesehatan-hati-240-gram/ps--SAO-70302-00168",
  },
  "hepatosol-lola": {
    blibli:
      "https://www.blibli.com/p/hepatosol-lola-nutrisi-kesehatan-hati-spesifik/ps--SAO-70302-00079",
  },
  pulmosol: {
    shopee:
      "https://shopee.co.id/Pulmosol-Susu-Nutrisi-Kesehatan-Pernapasan-i.17326605.4177353022",
    blibli:
      "https://www.blibli.com/p/pulmosol-susu-nutrisi-kesehatan-pernapasan/ps--SAO-70302-00002",
  },
  oligo: {
    shopee:
      "https://shopee.co.id/Oligo-Nutrisi-Khusus-Tinggi-Protein-Terhidrolisa-i.17326605.23426694099",
    blibli:
      "https://www.blibli.com/p/oligo-nutrisi-khusus-tinggi-protein-terhidrolisa/is--SAO-70302-00309-00001",
  },
} as const satisfies Record<
  string,
  Partial<Record<MarketplaceId, string>>
>;

export type PurchasableProductSlug = keyof typeof purchaseUrls;

const marketplaceOrder: MarketplaceId[] = [
  "shopee",
  "tokopedia",
  "blibli",
  "lazada",
];

export function getPurchaseLinks(
  slug: string,
): readonly MarketplacePurchaseLink[] {
  if (!Object.hasOwn(purchaseUrls, slug)) {
    return [];
  }

  const productUrls = purchaseUrls[
    slug as PurchasableProductSlug
  ] as Partial<Record<MarketplaceId, string>>;

  return marketplaceOrder.flatMap((marketplace) => {
    const url = productUrls[marketplace];
    return url ? [{ marketplace, url }] : [];
  });
}
