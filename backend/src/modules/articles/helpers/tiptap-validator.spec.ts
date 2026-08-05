import { BadRequestException } from "@nestjs/common";
import { validateTipTapDocument } from "./tiptap-validator";

describe("validateTipTapDocument", () => {
  it("accepts supported editorial content and returns referenced media IDs", () => {
    const result = validateTipTapDocument({
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 2, textAlign: "left" }, content: [{ type: "text", text: "Judul" }] },
        { type: "paragraph", content: [{ type: "text", text: "Baca selengkapnya", marks: [{ type: "link", attrs: { href: "/artikel" } }] }] },
        { type: "mediaImage", attrs: { mediaId: "media-1", alt: "Nutrisi", caption: "Caption", alignment: "center", width: 75 } },
        { type: "table", content: [{ type: "tableRow", content: [{ type: "tableHeader", content: [{ type: "paragraph", content: [{ type: "text", text: "Nutrisi" }] }] }] }] },
      ],
    });

    expect(result.mediaIds).toEqual(["media-1"]);
  });

  it("rejects unsupported arbitrary HTML nodes", () => {
    expect(() => validateTipTapDocument({ type: "doc", content: [{ type: "html", attrs: { html: "<script />" } }] })).toThrow(
      BadRequestException,
    );
  });

  it("rejects unsafe link protocols", () => {
    expect(() => validateTipTapDocument({
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text: "Klik", marks: [{ type: "link", attrs: { href: "javascript:alert(1)" } }] }] }],
    })).toThrow("protokol tautan tidak diizinkan");
  });

  it("only accepts H2 and H3 inside article content", () => {
    expect(() => validateTipTapDocument({ type: "doc", content: [{ type: "heading", attrs: { level: 1 }, content: [] }] })).toThrow(
      "hanya heading H2 dan H3",
    );
  });
});
