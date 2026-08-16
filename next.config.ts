import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";
const isHttpsDeployment =
  process.env.VERCEL === "1" ||
  process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://") === true;

const mediaBaseUrl = new URL(
  process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "http://localhost:4000/uploads/media",
);
const mediaPath = mediaBaseUrl.pathname.replace(/\/$/, "");

function configuredOrigin(value: string | undefined) {
  if (!value?.startsWith("http://") && !value?.startsWith("https://")) {
    return null;
  }

  return new URL(value).origin;
}

const cmsApiOrigin = configuredOrigin(process.env.NEXT_PUBLIC_CMS_API_URL);
const mediaOrigin = mediaBaseUrl.origin;
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

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
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

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: mediaBaseUrl.protocol.replace(":", "") as "http" | "https",
        hostname: mediaBaseUrl.hostname,
        port: mediaBaseUrl.port,
        pathname: `${mediaPath}/**`,
      },
    ],
  },
  headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
