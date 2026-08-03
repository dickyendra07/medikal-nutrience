# Sprint 1 — CMS Backend Foundation

## Scope completed

- Added an isolated NestJS backend under `backend/`.
- Added PostgreSQL/Prisma configuration and the first migration.
- Added `AdminUser`, `AdminRole`, and revocable `AdminSession` models.
- Added secure login, current-session, and logout endpoints.
- Added database-backed opaque sessions using an `httpOnly` cookie.
- Added global deny-by-default authentication and role-based authorization guards.
- Added account lockout, strict validation, CORS allow-listing, Helmet, health checks, and a secure bootstrap-admin seed.
- Added unit and integration verification without connecting the existing frontend.

## Files added

- Backend project configuration: `package.json`, lockfile, Nest/TypeScript config, environment template, and Docker Compose.
- Prisma: schema, migration, Prisma config, and bootstrap seed.
- Application bootstrap, environment validation, Prisma module, health endpoints.
- Auth module: DTO, service, controller, decorators, cookie service, guards, and request/admin types.
- Test suites for environment validation, authentication, cookies, session protection, and RBAC.
- Backend setup and security documentation.

## Existing file changed

- Root `tsconfig.json`: excludes the isolated `backend/` application so the Next.js compiler does not type-check NestJS with frontend compiler settings.

## Existing files preserved

- No files under `src/app`, `src/components`, `src/data`, or `public` were changed.
- No public routes or frontend components were changed.
- Legacy files under `src/data/cms` remain untouched.
- No existing content was migrated.
- No Article module was created.

## Verification result

- Frontend production build: passed (65 existing routes generated successfully).
- Backend build: passed.
- Backend tests: 5 suites, 14 tests passed.
- Prisma validation: passed.
- PostgreSQL 16 migration: applied successfully to an isolated temporary database.
- Runtime checks: health, readiness, login, protected session, logout, and revoked-session rejection passed.
- Dependency audit: zero known vulnerabilities after the final dependency update.
