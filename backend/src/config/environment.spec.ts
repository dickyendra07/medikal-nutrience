import { validateEnvironment } from "./environment";

describe("validateEnvironment", () => {
  it("normalizes a valid development configuration", () => {
    expect(
      validateEnvironment({
        DATABASE_URL: "postgresql://user:password@localhost:5432/cms",
        FRONTEND_ORIGIN: "http://localhost:3000",
      }),
    ).toMatchObject({
      NODE_ENV: "development",
      PORT: 4000,
      SESSION_TTL_HOURS: 8,
      COOKIE_SECURE: false,
      COOKIE_SAME_SITE: "strict",
      STORAGE_DRIVER: "local",
      MEDIA_MAX_FILE_SIZE_BYTES: 10_485_760,
      MEDIA_MAX_IMAGE_PIXELS: 40_000_000,
      MEDIA_PUBLIC_BASE_URL: "http://localhost:4000/uploads/media",
    });
  });

  it("requires secure cookies in production", () => {
    expect(() =>
      validateEnvironment({
        NODE_ENV: "production",
        DATABASE_URL: "postgresql://user:password@localhost:5432/cms",
        FRONTEND_ORIGIN: "https://www.example.com",
        COOKIE_SECURE: "false",
      }),
    ).toThrow("COOKIE_SECURE must be true in production.");
  });

  it("rejects non-PostgreSQL database URLs", () => {
    expect(() =>
      validateEnvironment({
        DATABASE_URL: "mysql://user:password@localhost:3306/cms",
        FRONTEND_ORIGIN: "http://localhost:3000",
      }),
    ).toThrow("DATABASE_URL must be a valid PostgreSQL connection URL.");
  });

  it("requires S3 credentials when the S3 storage driver is selected", () => {
    expect(() =>
      validateEnvironment({
        DATABASE_URL: "postgresql://user:password@localhost:5432/cms",
        FRONTEND_ORIGIN: "http://localhost:3000",
        STORAGE_DRIVER: "s3",
        MEDIA_PUBLIC_BASE_URL: "https://cdn.example.com/media",
      }),
    ).toThrow("S3_REGION is required.");
  });

  it("accepts an AWS S3 configuration without a custom endpoint", () => {
    expect(
      validateEnvironment({
        DATABASE_URL: "postgresql://user:password@localhost:5432/cms",
        FRONTEND_ORIGIN: "http://localhost:3000",
        STORAGE_DRIVER: "s3",
        MEDIA_PUBLIC_BASE_URL: "https://cdn.example.com/media",
        S3_REGION: "ap-southeast-1",
        S3_BUCKET: "mednut-media",
        S3_ACCESS_KEY_ID: "access-key",
        S3_SECRET_ACCESS_KEY: "secret-key",
      }),
    ).toMatchObject({
      STORAGE_DRIVER: "s3",
      S3_ENDPOINT: undefined,
      S3_FORCE_PATH_STYLE: false,
    });
  });
});
