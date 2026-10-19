import type { NextConfig } from "next";

const mediaBaseUrl = new URL(
  process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "http://localhost:4000/uploads/media",
);
const mediaPath = mediaBaseUrl.pathname.replace(/\/$/, "");

// Content-Security-Policy is set per request in src/proxy.ts (it needs a nonce).
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
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
  // Standalone output is only needed for the Docker image; Vercel builds without it.
  ...(process.env.NEXT_OUTPUT === "standalone" ? { output: "standalone" as const } : {}),
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
  redirects() {
    return [
      {
        source: "/solusi/pernafasan",
        destination: "/solusi/pernapasan",
        permanent: true,
      },
    ];
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
