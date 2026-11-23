// Optional network allowlist for the CMS. When CMS_ALLOWED_IPS is unset or empty
// the CMS stays reachable from anywhere (login + backend lockout still apply).
// Format: comma-separated IPv4 addresses, IPv4 CIDR ranges, or IPv6 addresses.
//   CMS_ALLOWED_IPS="203.0.113.10,198.51.100.0/24"

function ipv4ToInt(ip: string): number | null {
  const parts = ip.split(".");

  if (parts.length !== 4) return null;

  let value = 0;

  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return null;

    const octet = Number(part);

    if (octet > 255) return null;

    value = value * 256 + octet;
  }

  return value;
}

function matchesEntry(ip: string, entry: string): boolean {
  if (!entry.includes("/")) {
    return ip.toLowerCase() === entry.toLowerCase();
  }

  const [base, bitsText] = entry.split("/");
  const bits = Number(bitsText);
  const ipInt = ipv4ToInt(ip);
  const baseInt = ipv4ToInt(base);

  if (ipInt === null || baseInt === null || !Number.isInteger(bits) || bits < 0 || bits > 32) {
    return false;
  }

  if (bits === 0) return true;

  const blockSize = 2 ** (32 - bits);

  return Math.floor(ipInt / blockSize) === Math.floor(baseInt / blockSize);
}

export function getCmsAllowlist(): string[] {
  return (process.env.CMS_ALLOWED_IPS ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function getClientIp(headers: Headers): string | null {
  // On Vercel these headers are set by the platform (not client-controlled).
  const realIp = headers.get("x-real-ip")?.trim();

  if (realIp) return realIp;

  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
}

export function isCmsPath(pathname: string): boolean {
  return (
    pathname === "/cms" ||
    pathname.startsWith("/cms/") ||
    pathname === "/api/cms" ||
    pathname.startsWith("/api/cms/") ||
    pathname === "/api/admin" ||
    pathname.startsWith("/api/admin/")
  );
}

export function isCmsClientAllowed(headers: Headers): boolean {
  const allowlist = getCmsAllowlist();

  if (allowlist.length === 0) return true;

  const ip = getClientIp(headers);

  if (!ip) return false;

  return allowlist.some((entry) => matchesEntry(ip, entry));
}
