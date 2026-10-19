// Best-effort per-client throttle for CMS login attempts. State is in-memory,
// so on serverless it is enforced per instance; use Vercel WAF rate limiting
// for a hard global limit. Per-account lockout is enforced by the backend.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;
const MAX_TRACKED_CLIENTS = 5000;

const attempts = new Map<string, { count: number; resetAt: number }>();

export function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

export function isLoginRateLimited(key: string, now = Date.now()) {
  if (attempts.size > MAX_TRACKED_CLIENTS) {
    for (const [trackedKey, entry] of attempts) {
      if (entry.resetAt <= now) attempts.delete(trackedKey);
    }
  }

  const entry = attempts.get(key);

  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;

  return entry.count > MAX_ATTEMPTS;
}

export function clearLoginAttempts(key: string) {
  attempts.delete(key);
}
