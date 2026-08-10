import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

export const articleInclude = {
  coverMedia: true,
  category: true,
  author: { select: { id: true, name: true, email: true } },
  createdBy: { select: { id: true, name: true } },
  updatedBy: { select: { id: true, name: true } },
  reviewedBy: { select: { id: true, name: true } },
  tags: { include: { tag: true } },
} satisfies Prisma.ArticleInclude;

export type ArticleWithRelations = Prisma.ArticleGetPayload<{ include: typeof articleInclude }>;

@Injectable()
export class ArticlesRepository {
  constructor(readonly prisma: PrismaService) {}

  findById(id: string, includeAudit = false) {
    return this.prisma.article.findUnique({
      where: { id },
      include: {
        ...articleInclude,
        ...(includeAudit
          ? { auditLogs: { orderBy: { createdAt: "desc" as const }, take: 30, include: { actor: { select: { id: true, name: true } } } } }
          : {}),
      },
    });
  }

  findBySlug(slug: string) {
    return this.prisma.article.findUnique({ where: { slug }, include: articleInclude });
  }
}
