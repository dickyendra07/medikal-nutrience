import { ArticleAuditAction, ArticleStatus, Prisma, PrismaClient } from "@prisma/client";
import { stat } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import sharp from "sharp";
import { articles } from "../../src/data/articles";

const prisma = new PrismaClient();
const workspaceRoot = join(__dirname, "../..");

const monthNumbers: Record<string, number> = {
  januari: 0,
  februari: 1,
  maret: 2,
  april: 3,
  mei: 4,
  juni: 5,
  juli: 6,
  agustus: 7,
  september: 8,
  oktober: 9,
  november: 10,
  desember: 11,
};

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/&/g, " dan ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function publishedDate(value: string) {
  const [day, month, year] = value.toLowerCase().split(/\s+/);
  const monthNumber = monthNumbers[month];
  if (!day || monthNumber === undefined || !year) throw new Error(`Tanggal artikel tidak valid: ${value}`);
  return new Date(Date.UTC(Number(year), monthNumber, Number(day), 2, 0, 0));
}

function tipTapDocument(article: (typeof articles)[number]): Prisma.InputJsonObject {
  const content: Prisma.InputJsonValue[] = [];
  if (article.keyPoints.length) {
    content.push(
      { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Poin penting" }] },
      {
        type: "bulletList",
        content: article.keyPoints.map((point) => ({
          type: "listItem",
          content: [{ type: "paragraph", content: [{ type: "text", text: point }] }],
        })),
      },
    );
  }
  for (const section of article.content) {
    content.push({ type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: section.heading }] });
    for (const paragraph of section.paragraphs) {
      content.push({ type: "paragraph", content: [{ type: "text", text: paragraph }] });
    }
  }
  return { type: "doc", content };
}

async function legacyMedia(url: string, altText: string) {
  if (!url.startsWith("/")) throw new Error(`URL media legacy harus berupa path publik: ${url}`);
  const storageKey = `legacy-public:${url}`;
  const absolutePath = join(workspaceRoot, "public", url.slice(1));
  const [file, metadata] = await Promise.all([stat(absolutePath), sharp(absolutePath).metadata()]);
  if (!metadata.width || !metadata.height) throw new Error(`Dimensi gambar tidak dapat dibaca: ${url}`);
  const extension = extname(url).toLowerCase();
  const mimeType = extension === ".png" ? "image/png" : extension === ".webp" ? "image/webp" : "image/jpeg";
  return prisma.mediaAsset.upsert({
    where: { storageKey },
    update: { url, altText, size: file.size, width: metadata.width, height: metadata.height, deletedAt: null },
    create: {
      filename: `legacy-${basename(url)}`,
      originalName: basename(url),
      storageKey,
      url,
      mimeType,
      size: file.size,
      width: metadata.width,
      height: metadata.height,
      altText,
    },
  });
}

async function main() {
  const requestedAuthor = (process.env.ARTICLE_IMPORT_AUTHOR_EMAIL ?? process.env.BOOTSTRAP_ADMIN_EMAIL)?.trim().toLowerCase();
  const author = await prisma.adminUser.findFirst({
    where: { isActive: true, ...(requestedAuthor ? { email: requestedAuthor } : {}) },
    orderBy: [{ role: "asc" }, { createdAt: "asc" }],
  });
  if (!author) {
    throw new Error("Admin aktif tidak ditemukan. Jalankan seed admin atau isi ARTICLE_IMPORT_AUTHOR_EMAIL terlebih dahulu.");
  }

  let created = 0;
  let updated = 0;
  for (const source of articles) {
    const categorySlug = slugify(source.category);
    const category = await prisma.articleCategory.upsert({
      where: { slug: categorySlug },
      update: { name: source.category, deletedAt: null },
      create: { name: source.category, slug: categorySlug, description: `Artikel seputar ${source.category.toLowerCase()}.` },
    });
    const cover = await legacyMedia(source.image, source.title);
    const tags: Array<{ id: string; name: string; slug: string }> = [];
    for (const name of source.tags) {
      const slug = slugify(name);
      if (!slug || tags.some((tag) => tag.slug === slug)) continue;
      tags.push(await prisma.tag.upsert({ where: { slug }, update: { name: name.trim() }, create: { name: name.trim(), slug } }));
    }

    const existing = await prisma.article.findUnique({ where: { slug: source.slug }, select: { id: true } });
    const common = {
      title: source.title,
      excerpt: source.excerpt,
      contentJson: tipTapDocument(source),
      contentVersion: 1,
      coverMediaId: cover.id,
      categoryId: category.id,
      authorId: author.id,
      seoTitle: source.seoTitle,
      seoDescription: source.seoDescription,
      status: ArticleStatus.PUBLISHED,
      isFeatured: Boolean(source.featured),
      publishedAt: publishedDate(source.date),
      scheduledAt: null,
      deletedAt: null,
      updatedById: author.id,
    } satisfies Prisma.ArticleUncheckedUpdateInput;

    const saved = await prisma.$transaction(async (tx) => {
      if (existing) {
        await tx.articleTag.deleteMany({ where: { articleId: existing.id } });
        return tx.article.update({
          where: { id: existing.id },
          data: { ...common, tags: { create: tags.map((tag) => ({ tagId: tag.id })) } },
        });
      }
      const article = await tx.article.create({
        data: {
          ...common,
          slug: source.slug,
          createdAt: publishedDate(source.date),
          createdById: author.id,
          tags: { create: tags.map((tag) => ({ tagId: tag.id })) },
        },
      });
      await tx.articleAuditLog.create({
        data: { articleId: article.id, actorId: author.id, action: ArticleAuditAction.CREATE, changes: { source: "static-article-import" } },
      });
      return article;
    });
    if (existing) updated += 1;
    else created += 1;
    console.log(`${existing ? "Updated" : "Created"}: ${saved.slug}`);
  }

  const slugs = await prisma.article.findMany({
    where: { slug: { in: articles.map((article) => article.slug) } },
    select: { slug: true },
    orderBy: { slug: "asc" },
  });
  if (slugs.length !== articles.length) throw new Error(`Verifikasi gagal: ${slugs.length}/${articles.length} slug ditemukan.`);
  console.log(`Import selesai: ${created} dibuat, ${updated} diperbarui, ${slugs.length} slug terverifikasi.`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
