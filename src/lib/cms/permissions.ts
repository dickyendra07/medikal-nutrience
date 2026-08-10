export const CMS_PERMISSIONS = {
  DASHBOARD_VIEW: "dashboard.view",
  ANALYTICS_VIEW: "analytics.view",
  PRODUCT_VIEW: "product.view",
  PRODUCT_CREATE: "product.create",
  PRODUCT_EDIT: "product.edit",
  PRODUCT_DELETE: "product.delete",
  PRODUCT_PUBLISH: "product.publish",
  ARTICLE_VIEW: "article.view",
  ARTICLE_CREATE: "article.create",
  ARTICLE_EDIT: "article.edit",
  ARTICLE_DELETE: "article.delete",
  ARTICLE_PUBLISH: "article.publish",
  ARTICLE_SUBMIT_REVIEW: "article.submit_review",
  ARTICLE_MEDICAL_REVIEW: "article.medical_review",
  FAQ_VIEW: "faq.view",
  FAQ_CREATE: "faq.create",
  FAQ_EDIT: "faq.edit",
  FAQ_DELETE: "faq.delete",
  EVENT_VIEW: "event.view",
  EVENT_CREATE: "event.create",
  EVENT_EDIT: "event.edit",
  EVENT_DELETE: "event.delete",
  EVENT_PUBLISH: "event.publish",
  MEDIA_VIEW: "media.view",
  MEDIA_UPLOAD: "media.upload",
  MEDIA_EDIT: "media.edit",
  MEDIA_DELETE: "media.delete",
  CONSULTATION_VIEW: "consultation.view",
  CONSULTATION_REVIEW: "consultation.review",
  CONSULTATION_UPDATE: "consultation.update",
  CONSULTATION_DELETE: "consultation.delete",
  CONSULTATION_EXPORT: "consultation.export",
  PHARMACY_VIEW: "pharmacy.view",
  PHARMACY_CREATE: "pharmacy.create",
  PHARMACY_EDIT: "pharmacy.edit",
  PHARMACY_DELETE: "pharmacy.delete",
  SOLUTION_VIEW: "solution.view",
  SOLUTION_CREATE: "solution.create",
  SOLUTION_EDIT: "solution.edit",
  SOLUTION_DELETE: "solution.delete",
  SOLUTION_PUBLISH: "solution.publish",
  SUPPORT_VIEW: "support.view",
  SUPPORT_EDIT: "support.edit",
  FIMA_VIEW: "fima.view",
  FIMA_CREATE: "fima.create",
  FIMA_EDIT: "fima.edit",
  FIMA_DELETE: "fima.delete",
  FIMA_PUBLISH: "fima.publish",
  SETTINGS_MANAGE: "settings.manage",
  SEO_MANAGE: "seo.manage",
  USERS_MANAGE: "users.manage",
  ROLES_MANAGE: "roles.manage",
  MARKETING_VIEW: "marketing.view",
  MARKETING_EDIT: "marketing.edit",
  DOWNLOADABLE_VIEW: "downloadable.view",
  DOWNLOADABLE_CREATE: "downloadable.create",
  DOWNLOADABLE_EDIT: "downloadable.edit",
  DOWNLOADABLE_DELETE: "downloadable.delete",
  NUTRITION_FINDER_MANAGE: "nutrition_finder.manage",
  ASSESSMENT_MANAGE: "assessment.manage",
  NUTRITION_CALCULATOR_MANAGE: "nutrition_calculator.manage",
} as const;

export type CmsPermission = (typeof CMS_PERMISSIONS)[keyof typeof CMS_PERMISSIONS];

export type CmsAdminIdentity = {
  id: string;
  name: string;
  email: string;
  role: { id: string; slug: string; name: string };
  permissions: string[];
};

export function hasCmsPermission(
  identity: Pick<CmsAdminIdentity, "permissions"> | null | undefined,
  permission: CmsPermission,
) {
  return Boolean(identity?.permissions.includes(permission));
}

export function hasAnyCmsPermission(
  identity: Pick<CmsAdminIdentity, "permissions"> | null | undefined,
  permissions: readonly CmsPermission[],
) {
  return permissions.some((permission) => hasCmsPermission(identity, permission));
}
