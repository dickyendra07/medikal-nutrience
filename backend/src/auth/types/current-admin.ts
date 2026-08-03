import { AdminRole } from "@prisma/client";

export type CurrentAdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  sessionId: string;
};

export type SafeAdminUser = Omit<CurrentAdminUser, "sessionId">;
