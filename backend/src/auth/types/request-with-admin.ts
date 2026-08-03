import type { Request } from "express";
import type { CurrentAdminUser } from "./current-admin";

export type RequestWithAdmin = Request & {
  admin?: CurrentAdminUser;
};
