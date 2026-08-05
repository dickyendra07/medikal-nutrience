import type { NextConfig } from "next";

const mediaBaseUrl = new URL(
  process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "http://localhost:4000/uploads/media",
);
const mediaPath = mediaBaseUrl.pathname.replace(/\/$/, "");

const nextConfig: NextConfig = {
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
};

export default nextConfig;
