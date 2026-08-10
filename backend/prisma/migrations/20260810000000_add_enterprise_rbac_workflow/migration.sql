-- Enterprise RBAC and healthcare content approval workflow.

ALTER TYPE "ArticleAuditAction" ADD VALUE IF NOT EXISTS 'SUBMIT_REVIEW';
ALTER TYPE "ArticleAuditAction" ADD VALUE IF NOT EXISTS 'APPROVE_REVIEW';
ALTER TYPE "ArticleAuditAction" ADD VALUE IF NOT EXISTS 'REQUEST_CHANGES';

CREATE TYPE "ArticleReviewStatus" AS ENUM ('DRAFT', 'MEDICAL_REVIEW', 'APPROVED', 'PUBLISHED');

CREATE TABLE "CmsRole" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CmsRole_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RolePermission" (
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("roleId", "permissionId")
);

CREATE TABLE "CmsAuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "resourceId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CmsAuditLog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CmsRole_slug_key" ON "CmsRole"("slug");
CREATE INDEX "CmsRole_isSystem_idx" ON "CmsRole"("isSystem");
CREATE UNIQUE INDEX "Permission_key_key" ON "Permission"("key");
CREATE INDEX "Permission_module_idx" ON "Permission"("module");
CREATE INDEX "RolePermission_permissionId_idx" ON "RolePermission"("permissionId");
CREATE INDEX "CmsAuditLog_actorId_createdAt_idx" ON "CmsAuditLog"("actorId", "createdAt");
CREATE INDEX "CmsAuditLog_resource_resourceId_idx" ON "CmsAuditLog"("resource", "resourceId");
CREATE INDEX "CmsAuditLog_action_idx" ON "CmsAuditLog"("action");

INSERT INTO "CmsRole" ("id", "slug", "name", "description", "isSystem", "updatedAt") VALUES
('role_medical_affairs', 'medical-affairs', 'Medical Affairs / Dokter', 'Validasi dan pengelolaan konten medis.', true, CURRENT_TIMESTAMP),
('role_dtc', 'dtc', 'Direct To Customer (DTC)', 'Konten digital, event, dan copywriting.', true, CURRENT_TIMESTAMP),
('role_admin_marketing', 'admin-marketing', 'Admin Marketing Medical Nutrience', 'Administrator penuh website dan CMS.', true, CURRENT_TIMESTAMP);

INSERT INTO "Permission" ("id", "key", "module", "description", "updatedAt") VALUES
('perm_dashboard_view', 'dashboard.view', 'dashboard', 'Melihat dashboard CMS', CURRENT_TIMESTAMP),
('perm_analytics_view', 'analytics.view', 'analytics', 'Melihat analitik CMS', CURRENT_TIMESTAMP),
('perm_product_view', 'product.view', 'product', 'Melihat produk', CURRENT_TIMESTAMP),
('perm_product_create', 'product.create', 'product', 'Membuat produk', CURRENT_TIMESTAMP),
('perm_product_edit', 'product.edit', 'product', 'Mengubah produk', CURRENT_TIMESTAMP),
('perm_product_delete', 'product.delete', 'product', 'Menghapus produk', CURRENT_TIMESTAMP),
('perm_product_publish', 'product.publish', 'product', 'Menerbitkan produk', CURRENT_TIMESTAMP),
('perm_article_view', 'article.view', 'article', 'Melihat artikel', CURRENT_TIMESTAMP),
('perm_article_create', 'article.create', 'article', 'Membuat artikel', CURRENT_TIMESTAMP),
('perm_article_edit', 'article.edit', 'article', 'Mengubah artikel', CURRENT_TIMESTAMP),
('perm_article_delete', 'article.delete', 'article', 'Menghapus artikel', CURRENT_TIMESTAMP),
('perm_article_publish', 'article.publish', 'article', 'Menerbitkan artikel', CURRENT_TIMESTAMP),
('perm_article_submit_review', 'article.submit_review', 'article', 'Mengirim artikel untuk medical review', CURRENT_TIMESTAMP),
('perm_article_medical_review', 'article.medical_review', 'article', 'Menyetujui medical review', CURRENT_TIMESTAMP),
('perm_faq_view', 'faq.view', 'faq', 'Melihat FAQ', CURRENT_TIMESTAMP),
('perm_faq_create', 'faq.create', 'faq', 'Membuat FAQ', CURRENT_TIMESTAMP),
('perm_faq_edit', 'faq.edit', 'faq', 'Mengubah FAQ', CURRENT_TIMESTAMP),
('perm_faq_delete', 'faq.delete', 'faq', 'Menghapus FAQ', CURRENT_TIMESTAMP),
('perm_event_view', 'event.view', 'event', 'Melihat event', CURRENT_TIMESTAMP),
('perm_event_create', 'event.create', 'event', 'Membuat event', CURRENT_TIMESTAMP),
('perm_event_edit', 'event.edit', 'event', 'Mengubah event', CURRENT_TIMESTAMP),
('perm_event_delete', 'event.delete', 'event', 'Menghapus event', CURRENT_TIMESTAMP),
('perm_event_publish', 'event.publish', 'event', 'Menerbitkan event', CURRENT_TIMESTAMP),
('perm_media_view', 'media.view', 'media', 'Melihat Media Library', CURRENT_TIMESTAMP),
('perm_media_upload', 'media.upload', 'media', 'Mengunggah media', CURRENT_TIMESTAMP),
('perm_media_edit', 'media.edit', 'media', 'Mengubah metadata media', CURRENT_TIMESTAMP),
('perm_media_delete', 'media.delete', 'media', 'Menghapus media', CURRENT_TIMESTAMP),
('perm_consultation_view', 'consultation.view', 'consultation', 'Melihat consultation/leads', CURRENT_TIMESTAMP),
('perm_consultation_review', 'consultation.review', 'consultation', 'Memberi status dan catatan medis', CURRENT_TIMESTAMP),
('perm_consultation_update', 'consultation.update', 'consultation', 'Mengubah consultation/leads', CURRENT_TIMESTAMP),
('perm_consultation_delete', 'consultation.delete', 'consultation', 'Menghapus consultation/leads', CURRENT_TIMESTAMP),
('perm_consultation_export', 'consultation.export', 'consultation', 'Mengekspor consultation/leads', CURRENT_TIMESTAMP),
('perm_pharmacy_view', 'pharmacy.view', 'pharmacy', 'Melihat apotek', CURRENT_TIMESTAMP),
('perm_pharmacy_create', 'pharmacy.create', 'pharmacy', 'Membuat apotek', CURRENT_TIMESTAMP),
('perm_pharmacy_edit', 'pharmacy.edit', 'pharmacy', 'Mengubah apotek', CURRENT_TIMESTAMP),
('perm_pharmacy_delete', 'pharmacy.delete', 'pharmacy', 'Menghapus apotek', CURRENT_TIMESTAMP),
('perm_solution_view', 'solution.view', 'solution', 'Melihat solusi', CURRENT_TIMESTAMP),
('perm_solution_create', 'solution.create', 'solution', 'Membuat solusi', CURRENT_TIMESTAMP),
('perm_solution_edit', 'solution.edit', 'solution', 'Mengubah solusi', CURRENT_TIMESTAMP),
('perm_solution_delete', 'solution.delete', 'solution', 'Menghapus solusi', CURRENT_TIMESTAMP),
('perm_solution_publish', 'solution.publish', 'solution', 'Menerbitkan solusi', CURRENT_TIMESTAMP),
('perm_support_view', 'support.view', 'support', 'Melihat Support System', CURRENT_TIMESTAMP),
('perm_support_edit', 'support.edit', 'support', 'Mengubah Support System', CURRENT_TIMESTAMP),
('perm_fima_view', 'fima.view', 'fima', 'Melihat FIMA', CURRENT_TIMESTAMP),
('perm_fima_create', 'fima.create', 'fima', 'Membuat konten FIMA', CURRENT_TIMESTAMP),
('perm_fima_edit', 'fima.edit', 'fima', 'Mengubah konten FIMA', CURRENT_TIMESTAMP),
('perm_fima_delete', 'fima.delete', 'fima', 'Menghapus konten FIMA', CURRENT_TIMESTAMP),
('perm_fima_publish', 'fima.publish', 'fima', 'Menerbitkan konten FIMA', CURRENT_TIMESTAMP),
('perm_settings_manage', 'settings.manage', 'settings', 'Mengelola pengaturan website', CURRENT_TIMESTAMP),
('perm_seo_manage', 'seo.manage', 'seo', 'Mengelola SEO global', CURRENT_TIMESTAMP),
('perm_users_manage', 'users.manage', 'users', 'Mengelola user CMS', CURRENT_TIMESTAMP),
('perm_roles_manage', 'roles.manage', 'roles', 'Mengelola role dan permission', CURRENT_TIMESTAMP),
('perm_marketing_view', 'marketing.view', 'marketing', 'Melihat konten marketing', CURRENT_TIMESTAMP),
('perm_marketing_edit', 'marketing.edit', 'marketing', 'Mengubah CTA dan campaign', CURRENT_TIMESTAMP),
('perm_downloadable_view', 'downloadable.view', 'downloadable', 'Melihat downloadable content', CURRENT_TIMESTAMP),
('perm_downloadable_create', 'downloadable.create', 'downloadable', 'Mengunggah downloadable content', CURRENT_TIMESTAMP),
('perm_downloadable_edit', 'downloadable.edit', 'downloadable', 'Mengubah downloadable content', CURRENT_TIMESTAMP),
('perm_downloadable_delete', 'downloadable.delete', 'downloadable', 'Menghapus downloadable content', CURRENT_TIMESTAMP),
('perm_nutrition_finder_manage', 'nutrition_finder.manage', 'tools', 'Mengelola Nutrition Finder', CURRENT_TIMESTAMP),
('perm_assessment_manage', 'assessment.manage', 'tools', 'Mengelola Assessment', CURRENT_TIMESTAMP),
('perm_nutrition_calculator_manage', 'nutrition_calculator.manage', 'tools', 'Mengelola Nutrition Calculator', CURRENT_TIMESTAMP);

-- Admin Marketing receives every permission.
INSERT INTO "RolePermission" ("roleId", "permissionId")
SELECT 'role_admin_marketing', "id" FROM "Permission";

-- Medical Affairs / Dokter.
INSERT INTO "RolePermission" ("roleId", "permissionId")
SELECT 'role_medical_affairs', "id" FROM "Permission" WHERE "key" IN (
  'dashboard.view', 'product.view', 'product.edit', 'article.view', 'article.edit',
  'article.submit_review', 'article.medical_review', 'faq.view', 'faq.edit',
  'consultation.view', 'consultation.review'
);

-- Direct To Customer.
INSERT INTO "RolePermission" ("roleId", "permissionId")
SELECT 'role_dtc', "id" FROM "Permission" WHERE "key" IN (
  'dashboard.view', 'article.view', 'article.create', 'article.edit', 'article.submit_review',
  'faq.view', 'faq.create', 'faq.edit', 'event.view', 'event.create', 'event.edit',
  'event.publish', 'media.view', 'media.upload', 'media.edit', 'downloadable.view',
  'downloadable.create', 'downloadable.edit', 'marketing.view', 'marketing.edit',
  'consultation.view'
);

ALTER TABLE "AdminUser" ADD COLUMN "roleId" TEXT;
UPDATE "AdminUser" SET "roleId" = CASE
  WHEN "role" IN ('SUPER_ADMIN', 'ADMIN') THEN 'role_admin_marketing'
  WHEN "role" = 'EDITOR' THEN 'role_dtc'
  ELSE 'role_medical_affairs'
END;
ALTER TABLE "AdminUser" ALTER COLUMN "roleId" SET NOT NULL;
CREATE INDEX "AdminUser_roleId_idx" ON "AdminUser"("roleId");

ALTER TABLE "Article" ADD COLUMN "reviewStatus" "ArticleReviewStatus" NOT NULL DEFAULT 'DRAFT';
ALTER TABLE "Article" ADD COLUMN "reviewNotes" TEXT;
ALTER TABLE "Article" ADD COLUMN "reviewedAt" TIMESTAMP(3);
ALTER TABLE "Article" ADD COLUMN "reviewedById" TEXT;
UPDATE "Article" SET "reviewStatus" = CASE WHEN "status" = 'PUBLISHED' THEN 'PUBLISHED'::"ArticleReviewStatus" ELSE 'DRAFT'::"ArticleReviewStatus" END;
CREATE INDEX "Article_reviewStatus_idx" ON "Article"("reviewStatus");

ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "CmsRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AdminUser" ADD CONSTRAINT "AdminUser_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "CmsRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CmsAuditLog" ADD CONSTRAINT "CmsAuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Article" ADD CONSTRAINT "Article_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
