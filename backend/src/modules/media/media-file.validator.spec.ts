import { BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import sharp from "sharp";
import { MediaFileValidator } from "./media-file.validator";

function asUpload(buffer: Buffer, mimetype: string): Express.Multer.File {
  return {
    fieldname: "file",
    originalname: "test-image",
    encoding: "7bit",
    mimetype,
    size: buffer.length,
    destination: "",
    filename: "",
    path: "",
    buffer,
    stream: undefined as never,
  };
}

describe("MediaFileValidator", () => {
  const validator = new MediaFileValidator(
    new ConfigService({
      MEDIA_MAX_FILE_SIZE_BYTES: 10_485_760,
      MEDIA_MAX_IMAGE_PIXELS: 40_000_000,
    }),
  );

  it("reads the actual image format and dimensions", async () => {
    const buffer = await sharp({
      create: { width: 24, height: 16, channels: 3, background: "#006b3f" },
    })
      .png()
      .toBuffer();

    await expect(validator.validate(asUpload(buffer, "image/png"))).resolves.toEqual({
      mimeType: "image/png",
      width: 24,
      height: 16,
    });
  });

  it("rejects a claimed MIME type that does not match the content", async () => {
    const buffer = await sharp({
      create: { width: 8, height: 8, channels: 3, background: "#ffffff" },
    })
      .jpeg()
      .toBuffer();

    await expect(validator.validate(asUpload(buffer, "image/png"))).rejects.toEqual(
      new BadRequestException("The file content does not match its declared MIME type."),
    );
  });

  it("rejects active content in SVG files", async () => {
    const unsafeSvg = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><script>alert(1)</script></svg>',
    );

    await expect(validator.validate(asUpload(unsafeSvg, "image/svg+xml"))).rejects.toEqual(
      new BadRequestException("The SVG contains unsupported or unsafe markup."),
    );
  });

  it("rejects an upload above the configured size before image parsing", async () => {
    const constrainedValidator = new MediaFileValidator(
      new ConfigService({ MEDIA_MAX_FILE_SIZE_BYTES: 4, MEDIA_MAX_IMAGE_PIXELS: 100 }),
    );

    await expect(
      constrainedValidator.validate(asUpload(Buffer.from("oversized"), "image/png")),
    ).rejects.toEqual(
      new BadRequestException("The image is empty or exceeds the configured file size limit."),
    );
  });
});
