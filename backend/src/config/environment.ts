type Environment = Record<string, string | undefined>;

const allowedNodeEnvironments = new Set(["development", "test", "production"]);
const allowedSameSiteValues = new Set(["lax", "strict", "none"]);
const allowedStorageDrivers = new Set(["local", "s3"]);

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
  const storageDriver = environment.STORAGE_DRIVER?.trim() || "local";
  const mediaMaxFileSizeBytes = parsePositiveInteger(
    environment.MEDIA_MAX_FILE_SIZE_BYTES?.trim() || "10485760",
    "MEDIA_MAX_FILE_SIZE_BYTES",
  );
  const mediaMaxImagePixels = parsePositiveInteger(
    environment.MEDIA_MAX_IMAGE_PIXELS?.trim() || "40000000",
    "MEDIA_MAX_IMAGE_PIXELS",
  );

  if (!allowedSameSiteValues.has(cookieSameSite)) {
    throw new Error("COOKIE_SAME_SITE must be lax, strict, or none.");
  }

  if (cookieSameSite === "none" && !cookieSecure) {
    throw new Error("COOKIE_SECURE must be true when COOKIE_SAME_SITE is none.");
  }

  if (nodeEnv === "production" && !cookieSecure) {
    throw new Error("COOKIE_SECURE must be true in production.");
  }

  if (!allowedStorageDrivers.has(storageDriver)) {
    throw new Error("STORAGE_DRIVER must be local or s3.");
  }

  if (mediaMaxFileSizeBytes > 100 * 1024 * 1024) {
    throw new Error("MEDIA_MAX_FILE_SIZE_BYTES must not exceed 100 MB.");
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

  const mediaPublicBaseUrl = requireValue(
    {
      ...environment,
      MEDIA_PUBLIC_BASE_URL:
        environment.MEDIA_PUBLIC_BASE_URL?.trim() || "http://localhost:4000/uploads/media",
    },
    "MEDIA_PUBLIC_BASE_URL",
  ).replace(/\/$/, "");

  try {
    const parsedMediaUrl = new URL(mediaPublicBaseUrl);

    if (!new Set(["http:", "https:"]).has(parsedMediaUrl.protocol)) throw new Error();
  } catch {
    throw new Error("MEDIA_PUBLIC_BASE_URL must be a valid HTTP(S) URL.");
  }

  if (storageDriver === "s3") {
    [
      "S3_REGION",
      "S3_BUCKET",
      "S3_ACCESS_KEY_ID",
      "S3_SECRET_ACCESS_KEY",
    ].forEach((key) => requireValue(environment, key));
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
    STORAGE_DRIVER: storageDriver,
    MEDIA_LOCAL_STORAGE_PATH: environment.MEDIA_LOCAL_STORAGE_PATH?.trim() || "storage/media",
    MEDIA_PUBLIC_BASE_URL: mediaPublicBaseUrl,
    MEDIA_MAX_FILE_SIZE_BYTES: mediaMaxFileSizeBytes,
    MEDIA_MAX_IMAGE_PIXELS: mediaMaxImagePixels,
    S3_ENDPOINT: environment.S3_ENDPOINT?.trim() || undefined,
    S3_REGION: environment.S3_REGION?.trim() || undefined,
    S3_BUCKET: environment.S3_BUCKET?.trim() || undefined,
    S3_ACCESS_KEY_ID: environment.S3_ACCESS_KEY_ID?.trim() || undefined,
    S3_SECRET_ACCESS_KEY: environment.S3_SECRET_ACCESS_KEY?.trim() || undefined,
    S3_FORCE_PATH_STYLE: parseBoolean(
      environment.S3_FORCE_PATH_STYLE?.trim() || "false",
      "S3_FORCE_PATH_STYLE",
    ),
  };
}
