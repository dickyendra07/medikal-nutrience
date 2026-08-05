import { BadRequestException, ConflictException } from "@nestjs/common";
import { AdminRole, ArticleAuditAction, ArticleStatus, Prisma } from "@prisma/client";
import type { CurrentAdminUser } from "../../auth/types/current-admin";
import type { ArticlesRepository } from "./articles.repository";
import { ArticlesService } from "./articles.service";

const admin: CurrentAdminUser = {
  id: "admin-1",
  name: "Editor",
  email: "editor@example.com",
  role: AdminRole.EDITOR,
  sessionId: "session-1",
};

const document = {
  type: "doc",
  content: [{ type: "paragraph", content: [{ type: "text", text: "Konten artikel yang aman." }] }],
};

function article(overrides: Record<string, unknown> = {}) {
  return {
    id: "article-1",
    title: "Artikel Nutrisi",
    slug: "artikel-nutrisi",
    excerpt: "Ringkasan artikel nutrisi yang cukup panjang.",
    contentJson: document,
    contentVersion: 1,
    coverMediaId: "media-1",
    categoryId: "category-1",
    authorId: "admin-1",
    seoTitle: null,
    seoDescription: null,
    status: ArticleStatus.DRAFT,
    isFeatured: false,
    publishedAt: null,
    scheduledAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    createdById: "admin-1",
    updatedById: "admin-1",
    coverMedia: { id: "media-1", filename: "media.png", originalName: "media.png", storageKey: "private/media.png", url: "/media.png", mimeType: "image/png", size: 100, width: 100, height: 50, altText: "Nutrisi", caption: null, createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
    category: { id: "category-1", name: "Nutrisi", slug: "nutrisi", description: null, createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
    author: { id: "admin-1", name: "Editor", email: "editor@example.com" },
    createdBy: { id: "admin-1", name: "Editor" },
    updatedBy: { id: "admin-1", name: "Editor" },
    tags: [],
    ...overrides,
  };
}

function createSetup() {
  let current = article();
  const tx = {
    tag: { upsert: jest.fn(({ create }) => Promise.resolve({ id: `tag-${create.slug}`, ...create })) },
    article: {
      create: jest.fn(({ data }) => {
        current = article({ ...data, id: "article-1", tags: [] });
        return Promise.resolve(current);
      }),
      update: jest.fn(({ data }) => {
        current = article({ ...current, ...data });
        return Promise.resolve(current);
      }),
    },
    articleTag: {
      deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
      createMany: jest.fn().mockResolvedValue({ count: 1 }),
    },
    articleAuditLog: { create: jest.fn().mockResolvedValue({}) },
  };
  const prisma = {
    $transaction: jest.fn(async (input: unknown) => {
      if (typeof input === "function") return (input as (client: typeof tx) => unknown)(tx);
      return Promise.all(input as Promise<unknown>[]);
    }),
    articleCategory: {
      findFirst: jest.fn().mockResolvedValue({ id: "category-1" }),
      findMany: jest.fn().mockResolvedValue([]),
    },
    adminUser: {
      findFirst: jest.fn().mockResolvedValue({ id: "admin-1" }),
      findMany: jest.fn().mockResolvedValue([]),
    },
    mediaAsset: { findMany: jest.fn().mockResolvedValue([{ id: "media-1", url: "/media.png", width: 100, height: 50, altText: null, caption: null }]) },
    article: {
      findFirst: jest.fn().mockResolvedValue(null),
      findMany: jest.fn().mockResolvedValue([]),
      count: jest.fn().mockResolvedValue(0),
      findUnique: jest.fn().mockResolvedValue(null),
    },
    articleAuditLog: { findMany: jest.fn().mockResolvedValue([]) },
    tag: { findMany: jest.fn().mockResolvedValue([]) },
  };
  const repository = {
    prisma,
    findById: jest.fn(() => Promise.resolve(current)),
    findBySlug: jest.fn(),
  };
  return {
    service: new ArticlesService(repository as unknown as ArticlesRepository),
    repository,
    prisma,
    tx,
    setCurrent: (value: ReturnType<typeof article>) => { current = value; },
  };
}

function createDto(overrides: Record<string, unknown> = {}) {
  return {
    title: "Artikel Nutrisi",
    slug: "artikel-nutrisi",
    excerpt: "Ringkasan artikel nutrisi yang cukup panjang.",
    contentJson: document,
    coverMediaId: "media-1",
    categoryId: "category-1",
    authorId: "admin-1",
    tags: ["Nutrisi", "nutrisi", "Kesehatan"],
    ...overrides,
  };
}

describe("ArticlesService", () => {
  it("creates an article, sanitizes duplicate tags, and writes an audit log", async () => {
    const { service, tx } = createSetup();
    const result = await service.create(createDto(), admin);

    expect(result.slug).toBe("artikel-nutrisi");
    expect(tx.tag.upsert).toHaveBeenCalledTimes(2);
    expect(tx.articleAuditLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ articleId: "article-1", actorId: admin.id, action: ArticleAuditAction.CREATE }),
    });
  });

  it("edits only explicit fields and records the updater", async () => {
    const { service, tx } = createSetup();
    await service.update("article-1", { title: "Judul Baru" }, admin);
    expect(tx.article.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ title: "Judul Baru", updatedById: admin.id }),
    }));
  });

  it("rejects a duplicate slug with a conflict response", async () => {
    const { service, tx } = createSetup();
    tx.article.create.mockRejectedValueOnce(
      new Prisma.PrismaClientKnownRequestError("Unique", { code: "P2002", clientVersion: "6.19.3" }),
    );
    await expect(service.create(createDto(), admin)).rejects.toBeInstanceOf(ConflictException);
  });

  it("publishes immediately with a published date", async () => {
    const { service, tx } = createSetup();
    const result = await service.publish("article-1", admin);
    expect(result.status).toBe(ArticleStatus.PUBLISHED);
    expect(tx.article.update).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: ArticleStatus.PUBLISHED, publishedAt: expect.any(Date) }),
    }));
  });

  it("requires a future date when scheduling", async () => {
    const { service } = createSetup();
    await expect(service.create(createDto({ status: ArticleStatus.SCHEDULED }), admin)).rejects.toBeInstanceOf(
      BadRequestException,
    );
    const scheduledAt = new Date(Date.now() + 86_400_000).toISOString();
    await expect(service.create(createDto({ status: ArticleStatus.SCHEDULED, scheduledAt }), admin)).resolves.toMatchObject({
      status: ArticleStatus.SCHEDULED,
    });
  });

  it("requires every referenced media asset to be active", async () => {
    const { service, prisma } = createSetup();
    prisma.mediaAsset.findMany.mockResolvedValueOnce([]);
    await expect(service.create(createDto(), admin)).rejects.toThrow("media artikel tidak valid");
  });

  it("replaces untrusted inline image URLs with Media Library metadata", async () => {
    const { service, tx } = createSetup();
    await service.create(createDto({
      contentJson: {
        type: "doc",
        content: [
          { type: "paragraph", content: [{ type: "text", text: "Konten artikel dengan gambar yang aman." }] },
          { type: "mediaImage", attrs: { mediaId: "media-1", url: "https://attacker.invalid/image.png", alt: "Nutrisi", alignment: "center", width: 100 } },
        ],
      },
    }), admin);

    expect(tx.article.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ contentJson: expect.objectContaining({ content: expect.arrayContaining([
        expect.objectContaining({ attrs: expect.objectContaining({ mediaId: "media-1", url: "/media.png", naturalWidth: 100, naturalHeight: 50 }) }),
      ]) }) }),
    }));
  });

  it("soft deletes and restores an article safely", async () => {
    const { service, tx, setCurrent } = createSetup();
    await expect(service.softDelete("article-1", admin)).resolves.toEqual({ success: true });
    expect(tx.article.update).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ deletedAt: expect.any(Date) }) }));

    setCurrent(article({ deletedAt: new Date(), status: ArticleStatus.PUBLISHED }));
    const restored = await service.restore("article-1", admin);
    expect(restored.status).toBe(ArticleStatus.DRAFT);
    expect(tx.article.update).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ status: ArticleStatus.DRAFT, deletedAt: null }) }));
  });

  it("public queries enforce published, non-deleted, elapsed publication dates", async () => {
    const { service, prisma } = createSetup();
    prisma.article.findMany.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    await service.listPublic({ page: 1, limit: 20 });
    expect(prisma.article.findMany).toHaveBeenLastCalledWith(expect.objectContaining({
      where: expect.objectContaining({ status: ArticleStatus.PUBLISHED, deletedAt: null, publishedAt: { lte: expect.any(Date) } }),
    }));
  });

  it("returns a minimal public payload without author email or media storage keys", async () => {
    const { service, prisma } = createSetup();
    prisma.article.findFirst.mockResolvedValueOnce(article({ status: ArticleStatus.PUBLISHED, publishedAt: new Date() }));
    const result = await service.getPublic("artikel-nutrisi");
    expect(result.author).toEqual({ id: "admin-1", name: "Editor" });
    expect(result.coverMedia).toEqual(expect.objectContaining({ id: "media-1", url: "/media.png" }));
    expect(result.coverMedia).not.toHaveProperty("storageKey");
  });
});
