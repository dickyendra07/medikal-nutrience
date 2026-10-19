const isDevelopment = process.env.NODE_ENV === "development";
const isHttpsDeployment =
  process.env.VERCEL === "1" ||
  process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://") === true;

function configuredOrigin(value: string | undefined) {
  if (!value?.startsWith("http://") && !value?.startsWith("https://")) {
    return null;
  }

  return new URL(value).origin;
}

export function buildContentSecurityPolicy(nonce: string) {
  const mediaOrigin = new URL(
    process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "http://localhost:4000/uploads/media",
  ).origin;
  const cmsApiOrigin = configuredOrigin(process.env.NEXT_PUBLIC_CMS_API_URL);

  const connectSources = [
    "'self'",
    ...(cmsApiOrigin ? [cmsApiOrigin] : []),
    ...(isDevelopment ? ["ws://localhost:*", "ws://127.0.0.1:*"] : []),
  ];
  const imageSources = [
    "'self'",
    "blob:",
    "data:",
    ...(process.env.NEXT_PUBLIC_MEDIA_BASE_URL || isDevelopment ? [mediaOrigin] : []),
  ];

  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDevelopment ? " 'unsafe-eval'" : ""}`,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    `img-src ${[...new Set(imageSources)].join(" ")}`,
    "font-src 'self'",
    `connect-src ${[...new Set(connectSources)].join(" ")}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isHttpsDeployment ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
}
