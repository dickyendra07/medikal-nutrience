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
});
