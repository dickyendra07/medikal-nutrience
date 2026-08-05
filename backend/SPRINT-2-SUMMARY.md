# Sprint 2 — Media Library Foundation

## Scope completed

- Added the `MediaAsset` Prisma model and an additive PostgreSQL migration.
- Added authenticated media CRUD endpoints under `/api/admin/media` with role-based write/delete permissions.
- Added repository/service separation, validated query/update DTOs, pagination, search, and soft deletion.
- Added a storage contract with local-development and S3-compatible providers.
- Added unique generated storage keys, upload size/type checks, image signature and dimension validation, and hardened SVG validation.
- Added the `/cms/media` management page with grid view, upload preview, search/type filtering, detail drawer, alt/caption editing, and delete confirmation.
- Added a reusable `MediaPicker` component for future Article, Product, and Event modules.

## Files added

- Prisma migration: `prisma/migrations/20260805000000_add_media_asset/migration.sql`.
- Media backend module: `src/modules/media/`, including controller, DTOs, repository, service, validator, storage providers, and tests.
- Media CMS page: `../src/app/cms/media/page.tsx`.
- Media UI components: `../src/components/cms/media/`.
- Browser API client/types: `../src/lib/cms/media-api.ts`.

## Existing files changed

- Backend Prisma schema, app module, bootstrap, environment configuration/template, package manifest/lockfile, gitignore, and README.
- CMS shell navigation to add the Content group and Media Library entry.
- Next.js image configuration to allow only the configured media host/path.

## Existing functionality preserved

- No Article schema or Article migration was added.
- No legacy CMS JSON file was changed or removed.
- No public page, Product Detail, Entrakid, Hepatosol, or public content component was modified.
- Existing frontend content continues to use its current data sources.

## Required deployment configuration

- Apply Prisma migrations with `npm run prisma:migrate:deploy` from `backend/`.
- Configure `NEXT_PUBLIC_CMS_API_URL` for the browser-facing CMS API base URL.
- Configure the same media public base URL in backend `MEDIA_PUBLIC_BASE_URL` and frontend `NEXT_PUBLIC_MEDIA_BASE_URL`.
- For S3-compatible storage, set `STORAGE_DRIVER=s3` and the `S3_*` credentials described in `.env.example`.

## Verification result

- Prisma schema validation: passed.
- Backend production build: passed.
- Backend tests: 7 suites, 23 tests passed.
- Frontend production build: passed; all 66 routes generated successfully.
- Production dependency audit: zero known vulnerabilities.
