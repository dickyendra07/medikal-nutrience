export type CurrentAdminUser = {
  id: string;
  name: string;
  email: string;
  role: {
    id: string;
    slug: string;
    name: string;
  };
  permissions: string[];
  sessionId: string;
};

export type SafeAdminUser = Omit<CurrentAdminUser, "sessionId">;
