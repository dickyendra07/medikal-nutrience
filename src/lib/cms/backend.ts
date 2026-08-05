const configuredInternalUrl = process.env.CMS_INTERNAL_API_URL;
const configuredPublicUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

export const cmsInternalApiUrl = (
  configuredInternalUrl ??
  (configuredPublicUrl?.startsWith("http://") || configuredPublicUrl?.startsWith("https://")
    ? configuredPublicUrl
    : "http://localhost:4000/api")
).replace(/\/$/, "");
