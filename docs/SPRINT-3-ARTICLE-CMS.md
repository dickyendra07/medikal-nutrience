# Sprint 3 — Article CMS

## Architecture

The Article module is an end-to-end CMS feature built on the existing Next.js, NestJS, Prisma, PostgreSQL, authentication, RBAC, and Media Library foundation. TipTap JSON is the canonical article body. The public renderer maps supported nodes to React elements and does not render arbitrary HTML.

Admin browser requests use the same-origin `/api/admin/*` proxy. Next.js forwards the opaque `httpOnly` session cookie to NestJS. The login proxy preserves the backend cookie security attributes and changes only its path to `/`, allowing server-rendered `/cms/*` pages to validate the session.

## Local setup

1. Copy `backend/.env.example` to `backend/.env` and configure PostgreSQL and media storage.
2. Use `frontend.env.example` as the reference for the root `.env.local`.
3. Install dependencies in the repository root and `backend/`.
4. From `backend/`, run `npm run prisma:migrate:deploy` and `npm run prisma:seed`.
5. To import the eight legacy articles, set `ARTICLE_IMPORT_AUTHOR_EMAIL` and run `npm run prisma:import-articles`.
6. Start the backend on port 4000 and the Next.js application on port 3000.

The importer is idempotent. It upserts categories, tags, legacy public media references, and articles by slug; repeated execution updates the same eight records without duplicates. `src/data/articles.ts` remains available as a rollback source.

## Cache and publication behavior

Public Article pages use server-only API reads with a controlled five-minute revalidation window and cache tags (`articles` and `article:<slug>`). Admin and preview requests are uncached. A successful empty public list and an Article API `404` are authoritative, so archived or deleted legacy slugs never reappear from static fallback.

`CMS_STATIC_ARTICLE_FALLBACK=true` is an emergency availability fallback only when the backend cannot be reached or returns a server error. Set it to `false` after production migration and health checks are established if strict database-only behavior is preferred.

## Deployment

1. Provision PostgreSQL and configure `DATABASE_URL` for the backend.
2. Configure local persistent storage or S3/R2 variables from `backend/.env.example`.
3. Deploy the backend and run `npm run prisma:migrate:deploy` before routing traffic.
4. Seed the first admin only when required; never reuse bootstrap credentials.
5. Run the legacy Article importer once with an existing active admin email, then verify eight unique slugs.
6. Configure the frontend server-only `CMS_INTERNAL_API_URL`, public site URL, and media URL.
7. Build both applications, verify authenticated CMS login, then validate `/artikel` and representative detail URLs.

## Operational notes and current limitations

- Publication changes become visible publicly within five minutes; on-demand revalidation is intentionally deferred.
- Article revisions/version history are not part of Sprint 3. `contentVersion` is reserved for future TipTap schema migrations.
- The taxonomy screen supports create and safe delete. API-level rename/edit is available, while inline taxonomy editing can be added in a later UX iteration.
- The repository has no established frontend unit-test runner. Article frontend behavior is verified through TypeScript, scoped ESLint, production build, and browser smoke testing; adding a shared test harness should be handled as a separate foundation task.
- Static article data is intentionally retained for rollback and legacy product/key-point enrichment.
