import { SetMetadata } from "@nestjs/common";
import { REQUIRED_PERMISSIONS } from "../auth.constants";
import type { PermissionKey } from "../permissions";

export const Permissions = (...permissions: PermissionKey[]) =>
  SetMetadata(REQUIRED_PERMISSIONS, permissions);
