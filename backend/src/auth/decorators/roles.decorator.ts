import { SetMetadata } from "@nestjs/common";
import { AdminRole } from "@prisma/client";
import { REQUIRED_ROLES } from "../auth.constants";

export const Roles = (...roles: AdminRole[]) => SetMetadata(REQUIRED_ROLES, roles);
