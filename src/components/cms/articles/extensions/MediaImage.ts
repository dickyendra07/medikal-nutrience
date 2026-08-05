import { mergeAttributes, Node } from "@tiptap/core";

export const MediaImage = Node.create({
  name: "mediaImage",
  group: "block",
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      mediaId: { default: null },
      url: { default: "" },
      alt: { default: "" },
      caption: { default: "" },
      alignment: { default: "center" },
      width: { default: 100 },
      naturalWidth: { default: 1200 },
      naturalHeight: { default: 675 },
    };
  },

  parseHTML() {
    return [{ tag: "figure[data-media-id]" }];
  },

  renderHTML({ HTMLAttributes }) {
    const { mediaId, url, alt, caption, alignment, width, naturalWidth, naturalHeight } = HTMLAttributes;
    return [
      "figure",
      mergeAttributes({
        "data-media-id": mediaId,
        "data-alignment": alignment,
        "data-width": width,
        class: "mednut-editor-image",
        style: `width: ${alignment === "full" ? 100 : width}%;`,
      }),
      ["img", { src: url, alt, width: naturalWidth, height: naturalHeight }],
      ["figcaption", {}, caption || ""],
    ];
  },
});
