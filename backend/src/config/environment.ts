type Environment = Record<string, string | undefined>;

const allowedNodeEnvironments = new Set(["development", "test", "production"]);
const allowedSameSiteValues = new Set(["lax", "strict", "none"]);

function requireValue(environment: Environment, key: string) {
  const value = environment[key]?.trim();

  if (!value) {
    throw new Error(`${key} is required.`);
  }

  return value;
}

function parsePositiveInteger(value: string, key: string) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${key} must be a positive integer.`);
  }

  return parsed;
}

function parseBoolean(value: string, key: string) {
  if (value === "true") return true;
  if (value === "false") return false;

  throw new Error(`${key} must be either true or false.`);
}

export function validateEnvironment(environment: Environment) {
  const nodeEnv = environment.NODE_ENV?.trim() || "development";

  if (!allowedNodeEnvironments.has(nodeEnv)) {
    throw new Error("NODE_ENV must be development, test, or production.");
  }

  const databaseUrl = requireValue(environment, "DATABASE_URL");
  const frontendOrigin = requireValue(environment, "FRONTEND_ORIGIN");
  const port = parsePositiveInteger(environment.PORT?.trim() || "4000", "PORT");
  const sessionTtlHours = parsePositiveInteger(
    environment.SESSION_TTL_HOURS?.trim() || "8",
    "SESSION_TTL_HOURS",
  );
  const cookieSecure = parseBoolean(
    environment.COOKIE_SECURE?.trim() || (nodeEnv === "production" ? "true" : "false"),
    "COOKIE_SECURE",
  );
  const cookieSameSite = environment.COOKIE_SAME_SITE?.trim() || "strict";

  if (!allowedSameSiteValues.has(cookieSameSite)) {
    throw new Error("COOKIE_SAME_SITE must be lax, strict, or none.");
  }

  if (cookieSameSite === "none" && !cookieSecure) {
    throw new Error("COOKIE_SECURE must be true when COOKIE_SAME_SITE is none.");
  }

  if (nodeEnv === "production" && !cookieSecure) {
    throw new Error("COOKIE_SECURE must be true in production.");
  }

  try {
    const parsedDatabaseUrl = new URL(databaseUrl);

    if (parsedDatabaseUrl.protocol !== "postgresql:" && parsedDatabaseUrl.protocol !== "postgres:") {
      throw new Error();
    }
  } catch {
    throw new Error("DATABASE_URL must be a valid PostgreSQL connection URL.");
  }

  const origins = frontendOrigin.split(",").map((origin) => origin.trim()).filter(Boolean);

  if (origins.length === 0 || origins.some((origin) => !/^https?:\/\//.test(origin))) {
    throw new Error("FRONTEND_ORIGIN must contain one or more HTTP(S) origins.");
  }

  return {
    ...environment,
    NODE_ENV: nodeEnv,
    PORT: port,
    DATABASE_URL: databaseUrl,
    FRONTEND_ORIGIN: origins.join(","),
    SESSION_COOKIE_NAME: environment.SESSION_COOKIE_NAME?.trim() || "mednut_admin_session",
    SESSION_TTL_HOURS: sessionTtlHours,
    COOKIE_SECURE: cookieSecure,
    COOKIE_SAME_SITE: cookieSameSite,
    COOKIE_DOMAIN: environment.COOKIE_DOMAIN?.trim() || undefined,
  };
}
