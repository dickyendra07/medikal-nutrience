# Docker deployment

The root `Dockerfile` builds the Next.js standalone server. `backend/Dockerfile`
builds NestJS and generates Prisma Client on Debian with OpenSSL. Both services
run as the unprivileged `node` user. The frontend listens on 3000; the backend
listens on 4000. PostgreSQL stays on the private Compose network.

## Build images

Run these commands from the repository root. Browser-facing values must be
chosen **before** the frontend build: Next.js embeds `NEXT_PUBLIC_*` values in
the output. `NEXT_PUBLIC_CMS_API_URL` defaults to `/api`, which uses the
frontend's existing same-origin API proxy. The browser-facing media URL must
match the backend's `MEDIA_PUBLIC_BASE_URL`. `CMS_INTERNAL_API_URL` is a
separate **runtime** setting for server-to-server calls; never give the browser
the Compose hostname `backend`.

```sh
docker build -t mednut-frontend:local \
  --build-arg NEXT_PUBLIC_SITE_URL=https://example.com \
  --build-arg NEXT_PUBLIC_MEDIA_BASE_URL=https://api.example.com/uploads/media \
  --build-arg NEXT_PUBLIC_CMS_API_URL=/api .
docker build -t mednut-backend:local ./backend
```

No `.env` file enters either build context. Give `DATABASE_URL`, frontend
origin, media settings, and any S3 credentials to the **running** backend.
Give `CMS_INTERNAL_API_URL` and `CMS_STATIC_ARTICLE_FALLBACK` to the running
frontend. The backend's existing environment validation requires secure
cookies in production. Use HTTPS at the reverse proxy for CMS login. Keep
`COOKIE_SECURE=true`; an HTTP smoke test can check pages and health, but
cannot exercise the secure login cookie. Preserve trusted forwarding headers
at the proxy. If using local media storage, persist `/app/storage/media`; if
using S3, set the existing `STORAGE_DRIVER=s3` and S3 variables instead.

The frontend CMS currently updates JSON files under `/app/src/data/cms`.
Persist this directory and keep it writable by UID 1000. A new empty Docker
named volume is populated from the image's initial files; an existing volume
retains its own content during later image upgrades. Back it up alongside
the database and media. The image includes the directory even though Next.js
standalone tracing cannot infer these dynamic file writes.

## Local or staging Compose run

The root `compose.yaml` supplies frontend, backend, and PostgreSQL with named
volumes. It binds frontend and backend to the host's loopback interface only;
PostgreSQL has no published port. Set these values in your shell or an
operator-managed environment file used by Compose (never put credentials in
image build arguments):

```sh
export POSTGRES_PASSWORD='choose-a-local-password'
export DATABASE_URL='postgresql://mednut_cms:choose-a-local-password@postgres:5432/mednut_cms?schema=public'
export PUBLIC_SITE_URL='http://localhost:3000'
export PUBLIC_MEDIA_BASE_URL='http://localhost:4000/uploads/media'
docker compose config --quiet
docker compose up -d --build
docker compose ps
curl -f http://localhost:4000/api/health
curl -f http://localhost:4000/api/health/ready
curl -f http://localhost:3000/
docker compose logs --tail=100 frontend backend
```

Use the same password in `POSTGRES_PASSWORD` and `DATABASE_URL`, and URL-encode
special characters in the latter. For a staging or production hostname, supply
public HTTPS URLs at build time and route both services through HTTPS. Do not
use the loopback port bindings unchanged on a remote host; put the services
behind an authenticated deployment network or reverse proxy as appropriate.

Migrations are an explicit deployment step, never an image startup action.
After backing up the database and reviewing the migration set, build and run
the dedicated migration target with the same runtime `DATABASE_URL`:

```sh
docker build --target migrations -t mednut-migrations:local ./backend
docker run --rm --network medikal-nutrience_default \
  -e DATABASE_URL="$DATABASE_URL" mednut-migrations:local
```

The network name can differ if Compose uses a custom project name; check
`docker network ls` first. For Compose, run migrations before relying on
database-backed pages and CMS workflows. Never run `prisma migrate dev` or
database seed automatically in the production service.
