import { BadRequestException } from "@nestjs/common";

type JsonRecord = Record<string, unknown>;

const blockNodes = new Set([
  "paragraph",
  "heading",
  "bulletList",
  "orderedList",
  "blockquote",
  "horizontalRule",
  "codeBlock",
  "mediaImage",
  "table",
]);
const allNodes = new Set([
  "doc",
  ...blockNodes,
  "text",
  "hardBreak",
  "listItem",
  "tableRow",
  "tableHeader",
  "tableCell",
]);
const allowedMarks = new Set(["bold", "italic", "underline", "strike", "link", "code"]);
const allowedAlignments = new Set(["left", "center", "right", "justify"]);
const allowedImageAlignments = new Set(["left", "center", "right", "full"]);

function isRecord(value: unknown): value is JsonRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function fail(message: string): never {
  throw new BadRequestException(`Konten artikel tidak valid: ${message}`);
}

function validateLink(href: unknown) {
  if (typeof href !== "string" || href.length > 2048) fail("tautan tidak valid.");
  if (!/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(href)) {
    fail("protokol tautan tidak diizinkan.");
  }
}

function validateMarks(value: unknown) {
  if (value === undefined) return;
  if (!Array.isArray(value) || value.length > 12) fail("format teks tidak valid.");

  for (const mark of value) {
    if (!isRecord(mark) || typeof mark.type !== "string" || !allowedMarks.has(mark.type)) {
      fail("format teks tidak didukung.");
    }
    if (mark.type === "link") validateLink(isRecord(mark.attrs) ? mark.attrs.href : undefined);
  }
}

function validateAttrs(node: JsonRecord, mediaIds: Set<string>) {
  const attrs = node.attrs;
  if (attrs !== undefined && !isRecord(attrs)) fail("atribut blok tidak valid.");
  const values = isRecord(attrs) ? attrs : {};

  if (node.type === "heading" && values.level !== 2 && values.level !== 3) {
    fail("hanya heading H2 dan H3 yang didukung.");
  }

  if ((node.type === "heading" || node.type === "paragraph") && values.textAlign !== undefined) {
    if (typeof values.textAlign !== "string" || !allowedAlignments.has(values.textAlign)) {
      fail("perataan teks tidak valid.");
    }
  }

  if (node.type === "mediaImage") {
    if (typeof values.mediaId !== "string" || !values.mediaId.trim()) {
      fail("gambar harus berasal dari Media Library.");
    }
    if (
      values.alignment !== undefined &&
      (typeof values.alignment !== "string" || !allowedImageAlignments.has(values.alignment))
    ) {
      fail("perataan gambar tidak valid.");
    }
    if (
      values.width !== undefined &&
      (typeof values.width !== "number" || values.width < 25 || values.width > 100)
    ) {
      fail("lebar gambar harus antara 25% dan 100%.");
    }
    for (const key of ["alt", "caption", "url"]) {
      if (values[key] !== undefined && typeof values[key] !== "string") {
        fail("metadata gambar tidak valid.");
      }
    }
    mediaIds.add(values.mediaId);
  }
}

function validateChildren(node: JsonRecord, depth: number, state: { count: number; text: number }, mediaIds: Set<string>) {
  const content = node.content;
  if (content === undefined) return;
  if (!Array.isArray(content) || content.length > 2_000) fail("struktur blok terlalu besar.");

  const childTypes = content.map((child) => (isRecord(child) ? child.type : undefined));
  if (node.type === "doc" && childTypes.some((type) => typeof type !== "string" || !blockNodes.has(type))) {
    fail("blok tingkat atas tidak didukung.");
  }
  if ((node.type === "bulletList" || node.type === "orderedList") && childTypes.some((type) => type !== "listItem")) {
    fail("struktur daftar tidak valid.");
  }
  if (node.type === "table" && childTypes.some((type) => type !== "tableRow")) {
    fail("struktur tabel tidak valid.");
  }
  if (node.type === "tableRow" && childTypes.some((type) => type !== "tableCell" && type !== "tableHeader")) {
    fail("struktur baris tabel tidak valid.");
  }

  for (const child of content) validateNode(child, depth + 1, state, mediaIds);
}

function validateNode(value: unknown, depth: number, state: { count: number; text: number }, mediaIds: Set<string>) {
  if (!isRecord(value) || typeof value.type !== "string" || !allNodes.has(value.type)) {
    fail("terdapat jenis blok yang tidak didukung.");
  }
  if (depth > 20 || ++state.count > 10_000) fail("struktur konten terlalu kompleks.");

  if (value.type === "text") {
    if (typeof value.text !== "string") fail("teks tidak valid.");
    state.text += value.text.length;
    if (state.text > 500_000) fail("konten terlalu panjang.");
    validateMarks(value.marks);
  }

  validateAttrs(value, mediaIds);
  validateChildren(value, depth, state, mediaIds);
}

export function validateTipTapDocument(value: unknown) {
  if (JSON.stringify(value).length > 2_000_000) fail("ukuran dokumen melebihi batas.");
  if (!isRecord(value) || value.type !== "doc") fail("dokumen utama harus bertipe doc.");

  const mediaIds = new Set<string>();
  const state = { count: 0, text: 0 };
  validateNode(value, 0, state, mediaIds);
  if (state.text < 20) fail("konten utama minimal 20 karakter.");
  return { mediaIds: [...mediaIds] };
}
