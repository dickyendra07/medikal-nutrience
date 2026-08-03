import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { RequestWithAdmin } from "../types/request-with-admin";

export const CurrentAdmin = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    context.switchToHttp().getRequest<RequestWithAdmin>().admin,
);
