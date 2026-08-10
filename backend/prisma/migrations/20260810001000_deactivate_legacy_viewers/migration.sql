-- A legacy VIEWER cannot be safely mapped to any of the three new editing roles.
-- Require an Admin Marketing user to explicitly assign and reactivate the account.
UPDATE "AdminUser" SET "isActive" = false WHERE "role" = 'VIEWER';
