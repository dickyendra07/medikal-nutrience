import { PERMISSIONS, SYSTEM_ROLES, SYSTEM_ROLE_PERMISSIONS } from "./permissions";

describe("system permission matrix", () => {
  it("keeps Medical Affairs in review scope without create, delete, publish, or settings access", () => {
    const medical = SYSTEM_ROLE_PERMISSIONS[SYSTEM_ROLES.MEDICAL_AFFAIRS];
    expect(medical).toEqual(expect.arrayContaining([
      PERMISSIONS.PRODUCT_EDIT,
      PERMISSIONS.ARTICLE_EDIT,
      PERMISSIONS.ARTICLE_MEDICAL_REVIEW,
      PERMISSIONS.CONSULTATION_REVIEW,
    ]));
    for (const denied of [
      PERMISSIONS.PRODUCT_CREATE,
      PERMISSIONS.PRODUCT_DELETE,
      PERMISSIONS.ARTICLE_PUBLISH,
      PERMISSIONS.SETTINGS_MANAGE,
      PERMISSIONS.USERS_MANAGE,
    ]) expect(medical).not.toContain(denied);
  });

  it("allows DTC content operations without final article publish or system administration", () => {
    const dtc = SYSTEM_ROLE_PERMISSIONS[SYSTEM_ROLES.DTC];
    expect(dtc).toEqual(expect.arrayContaining([
      PERMISSIONS.ARTICLE_CREATE,
      PERMISSIONS.ARTICLE_EDIT,
      PERMISSIONS.ARTICLE_SUBMIT_REVIEW,
      PERMISSIONS.EVENT_PUBLISH,
      PERMISSIONS.MARKETING_EDIT,
    ]));
    for (const denied of [
      PERMISSIONS.ARTICLE_PUBLISH,
      PERMISSIONS.CONSULTATION_DELETE,
      PERMISSIONS.SETTINGS_MANAGE,
      PERMISSIONS.USERS_MANAGE,
    ]) expect(dtc).not.toContain(denied);
  });

  it("grants Admin Marketing every registered permission", () => {
    expect(new Set(SYSTEM_ROLE_PERMISSIONS[SYSTEM_ROLES.ADMIN_MARKETING])).toEqual(
      new Set(Object.values(PERMISSIONS)),
    );
  });
});
