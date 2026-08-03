# Medikal Nutrience CMS Backend

NestJS CMS API foundation for Medikal Nutrience. This service is intentionally isolated from the existing Next.js frontend and does not read or modify the legacy JSON CMS storage.

## Stack

- NestJS 11
- Prisma 6
- PostgreSQL 16
- Database-backed opaque admin sessions
- bcrypt password hashing
- Global authentication and role guards

## Local setup

1. Copy `.env.example` to `.env` and replace the bootstrap credentials.
2. Start PostgreSQL:

   ```bash
   docker compose up -d postgres
   ```

3. Install dependencies and prepare the database:

   ```bash
   npm install
   npm run prisma:generate
   npm run prisma:migrate:deploy
   npm run prisma:seed
   ```

4. Start the API:

   ```bash
   npm run start:dev
   ```

The API defaults to `http://localhost:4000/api`.

## Authentication endpoints

| Method | Endpoint | Access |
| --- | --- | --- |
| `GET` | `/api/health` | Public liveness check |
| `GET` | `/api/health/ready` | Public database readiness check |
| `POST` | `/api/admin/auth/login` | Public; creates an admin session |
| `GET` | `/api/admin/auth/me` | Authenticated admin |
| `POST` | `/api/admin/auth/logout` | Authenticated admin |

Login returns only safe admin data. The opaque session token is set by the API as an `httpOnly` cookie and its SHA-256 hash is stored in PostgreSQL. Logout revokes the database session before clearing the cookie.

All future routes are protected by default. Mark intentionally public endpoints with `@Public()`. Restrict protected handlers with `@Roles(AdminRole.SUPER_ADMIN, AdminRole.ADMIN)`.

## Security defaults

- Password hashes use bcrypt with cost 12.
- Five failed logins lock an account for 15 minutes.
- Session tokens contain 256 bits of randomness and expire after eight hours by default.
- Cookies use `httpOnly`, `SameSite=Strict`, a limited `/api/admin` path, and mandatory `Secure` mode in production.
- CORS is restricted to explicit `FRONTEND_ORIGIN` values with credentials enabled.
- Helmet security headers and strict DTO validation are enabled globally.
- Unknown request fields are rejected.
- Production dependencies currently pass `npm audit` with zero vulnerabilities.

Deploy the API behind HTTPS. Use a host-only cookie unless the final frontend/API topology requires a carefully scoped `COOKIE_DOMAIN`. The frontend must send admin API requests with credentials included when integration begins in a later sprint.

## Verification

```bash
npm run prisma:validate
npm run build
npm test
npm audit
```

Database migrations should be applied with `npm run prisma:migrate:deploy` during deployment. Bootstrap credentials are read only by the explicit seed command and must come from the deployment secret manager.
