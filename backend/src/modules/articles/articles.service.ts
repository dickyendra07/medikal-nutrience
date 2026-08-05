import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  ArticleAuditAction,
  ArticleStatus,
  Prisma,
} from "@prisma/client";
import type { CurrentAdminUser } from "../../auth/types/current-admin";
import { CreateArticleDto } from "./dto/create-article.dto";
import { ListArticlesDto, PublicArticlesQueryDto } from "./dto/list-articles.dto";
import {
  CreateArticleCategoryDto,
  CreateTagDto,
  UpdateArticleCategoryDto,
  UpdateTagDto,
} from "./dto/taxonomy.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { normalizeName, slugify } from "./helpers/slug";
import { validateTipTapDocument } from "./helpers/tiptap-validator";
import { articleInclude, type ArticleWithRelations, ArticlesRepository } from "./articles.repository";

type Transaction = Prisma.TransactionClient;

function optionalText(value: string | undefined) {
  const normalized = value?.trim();
  return normalized || null;
}

function toDate(value: string | undefined) {
  return value ? new Date(value) : null;
}

@Injectable()
export class ArticlesService {
  constructor(private readonly repository: ArticlesRepository) {}

  async listAdmin(query: ListArticlesDto) {
    await this.publishDueScheduled();
    const where: Prisma.ArticleWhereInput = {
      deletedAt: query.trash ? { not: null } : null,
      status: query.status,
      categoryId: query.category,
      authorId: query.author,
      isFeatured: query.featured,
      ...(query.search?.trim()
        ? {
            OR: [
              { title: { contains: query.search.trim(), mode: "insensitive" } },
              { slug: { contains: query.search.trim(), mode: "insensitive" } },
              { excerpt: { contains: query.search.trim(), mode: "insensitive" } },
            ],
          }
        : {}),
      ...(query.dateFrom || query.dateTo
        ? {
            publishedAt: {
              ...(query.dateFrom ? { gte: new Date(query.dateFrom) } : {}),
              ...(query.dateTo ? { lte: new Date(query.dateTo) } : {}),
            },
          }
        : {}),
    };
    const orderBy: Prisma.ArticleOrderByWithRelationInput =
      query.sort === "published-desc"
        ? { publishedAt: "desc" }
        : query.sort === "created-desc"
          ? { createdAt: "desc" }
          : query.sort === "title-asc"
            ? { title: "asc" }
            : { updatedAt: "desc" };
    const skip = (query.page - 1) * query.limit;
    const prisma = this.repository.prisma;

    const [items, total, publishedCount, draftCount, scheduledCount, archivedCount, trashCount, recentActivity] = await prisma.$transaction([
      prisma.article.findMany({ where, include: articleInclude, orderBy, skip, take: query.limit }),
      prisma.article.count({ where }),
      prisma.article.count({ where: { deletedAt: null, status: ArticleStatus.PUBLISHED } }),
      prisma.article.count({ where: { deletedAt: null, status: ArticleStatus.DRAFT } }),
      prisma.article.count({ where: { deletedAt: null, status: ArticleStatus.SCHEDULED } }),
      prisma.article.count({ where: { deletedAt: null, status: ArticleStatus.ARCHIVED } }),
      prisma.article.count({ where: { deletedAt: { not: null } } }),
      prisma.articleAuditLog.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        include: {
          article: { select: { id: true, title: true } },
          actor: { select: { id: true, name: true } },
        },
      }),
    ]);
    return {
      items: items.map((item) => this.serialize(item)),
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
      summary: {
        total: publishedCount + draftCount + scheduledCount + archivedCount,
        published: publishedCount,
        draft: draftCount,
        scheduled: scheduledCount,
        archived: archivedCount,
        trash: trashCount,
      },
      recentActivity,
    };
  }

  async getAdmin(id: string) {
    const article = await this.repository.findById(id, true);
    if (!article) throw new NotFoundException("Artikel tidak ditemukan.");
    return this.serialize(article);
  }

  async meta() {
    const prisma = this.repository.prisma;
    const [categories, tags, authors] = await Promise.all([
      prisma.articleCategory.findMany({ where: { deletedAt: null }, orderBy: { name: "asc" } }),
      prisma.tag.findMany({ orderBy: { name: "asc" } }),
      prisma.adminUser.findMany({
        where: { isActive: true },
        select: { id: true, name: true, email: true, role: true },
        orderBy: { name: "asc" },
      }),
    ]);
    return { categories, tags, authors };
  }

  async slugAvailability(slug: string, excludeId?: string) {
    const normalized = slugify(slug);
    if (!normalized) return { slug: normalized, available: false };
    const existing = await this.repository.prisma.article.findFirst({
      where: { slug: normalized, ...(excludeId ? { id: { not: excludeId } } : {}) },
      select: { id: true },
    });
    return { slug: normalized, available: !existing };
  }

  async create(dto: CreateArticleDto, admin: CurrentAdminUser) {
    const content = validateTipTapDocument(dto.contentJson);
    await this.ensureRelations(dto.categoryId, dto.authorId, dto.coverMediaId, content.mediaIds);
    const workflow = this.workflow(dto.status ?? ArticleStatus.DRAFT, dto.publishedAt, dto.scheduledAt);
    const tags = this.sanitizeTags(dto.tags ?? []);

    try {
      const articleId = await this.repository.prisma.$transaction(async (tx) => {
        const tagRecords = await this.resolveTags(tx, tags);
        const article = await tx.article.create({
          data: {
            title: dto.title.trim(),
            slug: slugify(dto.slug),
            excerpt: dto.excerpt.trim(),
            contentJson: dto.contentJson as Prisma.InputJsonValue,
            coverMediaId: optionalText(dto.coverMediaId),
            categoryId: dto.categoryId,
            authorId: dto.authorId,
            seoTitle: optionalText(dto.seoTitle),
            seoDescription: optionalText(dto.seoDescription),
            status: workflow.status,
            isFeatured: dto.isFeatured ?? false,
            publishedAt: workflow.publishedAt,
            scheduledAt: workflow.scheduledAt,
            createdById: admin.id,
            updatedById: admin.id,
            tags: { create: tagRecords.map((tag) => ({ tagId: tag.id })) },
          },
        });
        await this.audit(tx, article.id, admin.id, this.actionForStatus(workflow.status, ArticleAuditAction.CREATE), {
          title: article.title,
          status: article.status,
        });
        return article.id;
      });
      return this.getAdmin(articleId);
    } catch (error) {
      this.handleUniqueError(error);
    }
  }

  async update(id: string, dto: UpdateArticleDto, admin: CurrentAdminUser) {
    const existing = await this.repository.findById(id);
    if (!existing || existing.deletedAt) throw new NotFoundException("Artikel tidak ditemukan.");
    const contentValidation = dto.contentJson ? validateTipTapDocument(dto.contentJson) : null;
    await this.ensureRelations(
      dto.categoryId ?? existing.categoryId,
      dto.authorId ?? existing.authorId,
      dto.coverMediaId !== undefined ? dto.coverMediaId : existing.coverMediaId ?? undefined,
      contentValidation?.mediaIds ?? [],
    );
    const resultingStatus = dto.status ?? existing.status;
    const workflow = this.workflow(
      resultingStatus,
      dto.publishedAt ?? existing.publishedAt?.toISOString(),
      dto.scheduledAt ?? existing.scheduledAt?.toISOString(),
    );

    try {
      await this.repository.prisma.$transaction(async (tx) => {
        if (dto.tags !== undefined) {
          const tags = await this.resolveTags(tx, this.sanitizeTags(dto.tags));
          await tx.articleTag.deleteMany({ where: { articleId: id } });
          if (tags.length) {
            await tx.articleTag.createMany({ data: tags.map((tag) => ({ articleId: id, tagId: tag.id })) });
          }
        }
        await tx.article.update({
          where: { id },
          data: {
            ...(dto.title !== undefined ? { title: dto.title.trim() } : {}),
            ...(dto.slug !== undefined ? { slug: slugify(dto.slug) } : {}),
            ...(dto.excerpt !== undefined ? { excerpt: dto.excerpt.trim() } : {}),
            ...(dto.contentJson !== undefined ? { contentJson: dto.contentJson as Prisma.InputJsonValue } : {}),
            ...(dto.coverMediaId !== undefined ? { coverMediaId: optionalText(dto.coverMediaId) } : {}),
            ...(dto.categoryId !== undefined ? { categoryId: dto.categoryId } : {}),
            ...(dto.authorId !== undefined ? { authorId: dto.authorId } : {}),
            ...(dto.seoTitle !== undefined ? { seoTitle: optionalText(dto.seoTitle) } : {}),
            ...(dto.seoDescription !== undefined ? { seoDescription: optionalText(dto.seoDescription) } : {}),
            ...(dto.isFeatured !== undefined ? { isFeatured: dto.isFeatured } : {}),
            status: workflow.status,
            publishedAt: workflow.publishedAt,
            scheduledAt: workflow.scheduledAt,
            updatedById: admin.id,
          },
        });
        await this.audit(tx, id, admin.id, this.actionForStatus(workflow.status, ArticleAuditAction.UPDATE), {
          fields: Object.keys(dto),
          previousStatus: existing.status,
          status: workflow.status,
        });
      });
      return this.getAdmin(id);
    } catch (error) {
      this.handleUniqueError(error);
    }
  }

  publish(id: string, admin: CurrentAdminUser) {
    return this.setStatus(id, ArticleStatus.PUBLISHED, ArticleAuditAction.PUBLISH, admin);
  }

  unpublish(id: string, admin: CurrentAdminUser) {
    return this.setStatus(id, ArticleStatus.DRAFT, ArticleAuditAction.UNPUBLISH, admin);
  }

  archive(id: string, admin: CurrentAdminUser) {
    return this.setStatus(id, ArticleStatus.ARCHIVED, ArticleAuditAction.ARCHIVE, admin);
  }

  async softDelete(id: string, admin: CurrentAdminUser) {
    const existing = await this.repository.findById(id);
    if (!existing || existing.deletedAt) throw new NotFoundException("Artikel tidak ditemukan.");
    await this.repository.prisma.$transaction(async (tx) => {
      await tx.article.update({ where: { id }, data: { deletedAt: new Date(), updatedById: admin.id } });
      await this.audit(tx, id, admin.id, ArticleAuditAction.DELETE);
    });
    return { success: true };
  }

  async restore(id: string, admin: CurrentAdminUser) {
    const existing = await this.repository.findById(id);
    if (!existing || !existing.deletedAt) throw new NotFoundException("Artikel di sampah tidak ditemukan.");
    await this.repository.prisma.$transaction(async (tx) => {
      await tx.article.update({
        where: { id },
        data: { deletedAt: null, status: ArticleStatus.DRAFT, publishedAt: null, scheduledAt: null, updatedById: admin.id },
      });
      await this.audit(tx, id, admin.id, ArticleAuditAction.RESTORE);
    });
    return this.getAdmin(id);
  }

  async duplicate(id: string, admin: CurrentAdminUser) {
    const existing = await this.repository.findById(id);
    if (!existing || existing.deletedAt) throw new NotFoundException("Artikel tidak ditemukan.");
    const slug = await this.uniqueDuplicateSlug(existing.slug);
    const duplicateId = await this.repository.prisma.$transaction(async (tx) => {
      const article = await tx.article.create({
        data: {
          title: `${existing.title} (Salinan)`.slice(0, 200),
          slug,
          excerpt: existing.excerpt,
          contentJson: existing.contentJson as Prisma.InputJsonValue,
          contentVersion: existing.contentVersion,
          coverMediaId: existing.coverMediaId,
          categoryId: existing.categoryId,
          authorId: existing.authorId,
          seoTitle: existing.seoTitle,
          seoDescription: existing.seoDescription,
          status: ArticleStatus.DRAFT,
          isFeatured: false,
          createdById: admin.id,
          updatedById: admin.id,
          tags: { create: existing.tags.map((item) => ({ tagId: item.tagId })) },
        },
      });
      await this.audit(tx, article.id, admin.id, ArticleAuditAction.DUPLICATE, { sourceArticleId: id });
      return article.id;
    });
    return this.getAdmin(duplicateId);
  }

  async listPublic(query: PublicArticlesQueryDto) {
    await this.publishDueScheduled();
    const now = new Date();
    const where: Prisma.ArticleWhereInput = {
      status: ArticleStatus.PUBLISHED,
      deletedAt: null,
      publishedAt: { lte: now },
      ...(query.category ? { category: { slug: query.category, deletedAt: null } } : {}),
      ...(query.tag ? { tags: { some: { tag: { slug: query.tag } } } } : {}),
      ...(query.search?.trim()
        ? {
            OR: [
              { title: { contains: query.search.trim(), mode: "insensitive" } },
              { excerpt: { contains: query.search.trim(), mode: "insensitive" } },
            ],
          }
        : {}),
    };
    const skip = (query.page - 1) * query.limit;
    const [items, total] = await this.repository.prisma.$transaction([
      this.repository.prisma.article.findMany({
        where,
        include: articleInclude,
        orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
        skip,
        take: query.limit,
      }),
      this.repository.prisma.article.count({ where }),
    ]);
    return {
      items: items.map((item) => this.serializePublic(item)),
      pagination: { page: query.page, limit: query.limit, total, totalPages: Math.ceil(total / query.limit) },
    };
  }

  async getPublic(slug: string) {
    await this.publishDueScheduled();
    const article = await this.repository.prisma.article.findFirst({
      where: { slug, status: ArticleStatus.PUBLISHED, deletedAt: null, publishedAt: { lte: new Date() } },
      include: articleInclude,
    });
    if (!article) throw new NotFoundException("Artikel tidak ditemukan.");
    return this.serializePublic(article);
  }

  listCategories() {
    return this.repository.prisma.articleCategory.findMany({ where: { deletedAt: null }, orderBy: { name: "asc" } });
  }

  async createCategory(dto: CreateArticleCategoryDto) {
    try {
      return await this.repository.prisma.articleCategory.create({
        data: { name: normalizeName(dto.name), slug: slugify(dto.slug), description: optionalText(dto.description) },
      });
    } catch (error) { this.handleUniqueError(error, "Slug kategori sudah digunakan."); }
  }

  async updateCategory(id: string, dto: UpdateArticleCategoryDto) {
    await this.requireCategory(id);
    try {
      return await this.repository.prisma.articleCategory.update({
        where: { id },
        data: {
          ...(dto.name !== undefined ? { name: normalizeName(dto.name) } : {}),
          ...(dto.slug !== undefined ? { slug: slugify(dto.slug) } : {}),
          ...(dto.description !== undefined ? { description: optionalText(dto.description) } : {}),
        },
      });
    } catch (error) { this.handleUniqueError(error, "Slug kategori sudah digunakan."); }
  }

  async deleteCategory(id: string) {
    await this.requireCategory(id);
    const used = await this.repository.prisma.article.count({ where: { categoryId: id, deletedAt: null } });
    if (used) throw new ConflictException("Kategori masih digunakan oleh artikel aktif.");
    await this.repository.prisma.articleCategory.update({ where: { id }, data: { deletedAt: new Date() } });
    return { success: true };
  }

  listTags() { return this.repository.prisma.tag.findMany({ orderBy: { name: "asc" } }); }

  async createTag(dto: CreateTagDto) {
    const name = normalizeName(dto.name);
    try {
      return await this.repository.prisma.tag.create({ data: { name, slug: slugify(dto.slug || name) } });
    } catch (error) { this.handleUniqueError(error, "Tag sudah tersedia."); }
  }

  async updateTag(id: string, dto: UpdateTagDto) {
    const existing = await this.repository.prisma.tag.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("Tag tidak ditemukan.");
    const name = dto.name !== undefined ? normalizeName(dto.name) : existing.name;
    try {
      return await this.repository.prisma.tag.update({
        where: { id },
        data: { ...(dto.name !== undefined ? { name } : {}), ...(dto.slug !== undefined ? { slug: slugify(dto.slug || name) } : {}) },
      });
    } catch (error) { this.handleUniqueError(error, "Tag sudah tersedia."); }
  }

  async deleteTag(id: string) {
    const existing = await this.repository.prisma.tag.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("Tag tidak ditemukan.");
    await this.repository.prisma.tag.delete({ where: { id } });
    return { success: true };
  }

  private async setStatus(id: string, status: ArticleStatus, action: ArticleAuditAction, admin: CurrentAdminUser) {
    const existing = await this.repository.findById(id);
    if (!existing || existing.deletedAt) throw new NotFoundException("Artikel tidak ditemukan.");
    const workflow = this.workflow(status, status === ArticleStatus.PUBLISHED ? new Date().toISOString() : undefined, undefined);
    await this.repository.prisma.$transaction(async (tx) => {
      await tx.article.update({
        where: { id },
        data: { status, publishedAt: workflow.publishedAt, scheduledAt: workflow.scheduledAt, updatedById: admin.id },
      });
      await this.audit(tx, id, admin.id, action, { previousStatus: existing.status, status });
    });
    return this.getAdmin(id);
  }

  private workflow(status: ArticleStatus, publishedAt?: string, scheduledAt?: string) {
    if (status === ArticleStatus.PUBLISHED) {
      return { status, publishedAt: toDate(publishedAt) ?? new Date(), scheduledAt: null };
    }
    if (status === ArticleStatus.SCHEDULED) {
      const schedule = toDate(scheduledAt);
      if (!schedule || schedule.getTime() <= Date.now()) {
        throw new BadRequestException("Tanggal terbit terjadwal harus berada di masa depan.");
      }
      return { status, publishedAt: schedule, scheduledAt: schedule };
    }
    return { status, publishedAt: status === ArticleStatus.ARCHIVED ? toDate(publishedAt) : null, scheduledAt: null };
  }

  private async publishDueScheduled() {
    const due = await this.repository.prisma.article.findMany({
      where: { status: ArticleStatus.SCHEDULED, deletedAt: null, scheduledAt: { lte: new Date() } },
      select: { id: true, scheduledAt: true },
      take: 100,
    });
    if (!due.length) return;
    await this.repository.prisma.$transaction(async (tx) => {
      for (const article of due) {
        await tx.article.update({
          where: { id: article.id },
          data: { status: ArticleStatus.PUBLISHED, publishedAt: article.scheduledAt, scheduledAt: null },
        });
        await this.audit(tx, article.id, null, ArticleAuditAction.PUBLISH, { source: "scheduler" });
      }
    });
  }

  private async ensureRelations(categoryId: string, authorId: string, coverMediaId: string | undefined, inlineMediaIds: string[]) {
    const prisma = this.repository.prisma;
    const mediaIds = [...new Set([...(coverMediaId?.trim() ? [coverMediaId.trim()] : []), ...inlineMediaIds])];
    const [category, author, mediaCount] = await Promise.all([
      prisma.articleCategory.findFirst({ where: { id: categoryId, deletedAt: null }, select: { id: true } }),
      prisma.adminUser.findFirst({ where: { id: authorId, isActive: true }, select: { id: true } }),
      mediaIds.length ? prisma.mediaAsset.count({ where: { id: { in: mediaIds }, deletedAt: null } }) : 0,
    ]);
    if (!category) throw new BadRequestException("Kategori artikel tidak valid.");
    if (!author) throw new BadRequestException("Penulis artikel tidak valid.");
    if (mediaCount !== mediaIds.length) throw new BadRequestException("Satu atau lebih media artikel tidak valid.");
  }

  private sanitizeTags(values: string[]) {
    const unique = new Map<string, string>();
    for (const value of values) {
      const name = normalizeName(value);
      const slug = slugify(name);
      if (name && slug && !unique.has(slug)) unique.set(slug, name);
    }
    return [...unique].map(([slug, name]) => ({ slug, name }));
  }

  private async resolveTags(tx: Transaction, tags: { slug: string; name: string }[]) {
    const records = [];
    for (const tag of tags) {
      records.push(await tx.tag.upsert({ where: { slug: tag.slug }, update: { name: tag.name }, create: tag }));
    }
    return records;
  }

  private async audit(tx: Transaction, articleId: string, actorId: string | null, action: ArticleAuditAction, changes?: Prisma.InputJsonObject) {
    await tx.articleAuditLog.create({ data: { articleId, actorId, action, changes } });
  }

  private actionForStatus(status: ArticleStatus, fallback: ArticleAuditAction) {
    if (status === ArticleStatus.PUBLISHED) return ArticleAuditAction.PUBLISH;
    if (status === ArticleStatus.SCHEDULED) return ArticleAuditAction.SCHEDULE;
    if (status === ArticleStatus.ARCHIVED) return ArticleAuditAction.ARCHIVE;
    return fallback;
  }

  private serialize<T extends ArticleWithRelations>(article: T) {
    return { ...article, tags: article.tags.map((item) => item.tag) };
  }

  private serializePublic(article: ArticleWithRelations) {
    const serialized = this.serialize(article);
    return {
      id: serialized.id,
      title: serialized.title,
      slug: serialized.slug,
      excerpt: serialized.excerpt,
      contentJson: serialized.contentJson,
      contentVersion: serialized.contentVersion,
      coverMedia: serialized.coverMedia,
      category: serialized.category,
      author: serialized.author,
      seoTitle: serialized.seoTitle,
      seoDescription: serialized.seoDescription,
      isFeatured: serialized.isFeatured,
      publishedAt: serialized.publishedAt,
      updatedAt: serialized.updatedAt,
      tags: serialized.tags,
    };
  }

  private async uniqueDuplicateSlug(source: string) {
    for (let suffix = 1; suffix <= 100; suffix++) {
      const candidate = `${source}-salinan${suffix === 1 ? "" : `-${suffix}`}`.slice(0, 180);
      const exists = await this.repository.prisma.article.findUnique({ where: { slug: candidate }, select: { id: true } });
      if (!exists) return candidate;
    }
    throw new ConflictException("Tidak dapat membuat slug salinan yang unik.");
  }

  private async requireCategory(id: string) {
    const category = await this.repository.prisma.articleCategory.findFirst({ where: { id, deletedAt: null } });
    if (!category) throw new NotFoundException("Kategori tidak ditemukan.");
    return category;
  }

  private handleUniqueError(error: unknown, message = "Slug artikel sudah digunakan."): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new ConflictException(message);
    }
    throw error;
  }
}
