import type { MediaAsset } from "@prisma/client";
import type { MediaFileValidator } from "./media-file.validator";
import type { MediaRepository } from "./media.repository";
import { MediaService } from "./media.service";
import type { StorageProvider } from "./storage/storage-provider";

const baseMedia: MediaAsset = {
  id: "media-1",
  filename: "generated.png",
  originalName: "Patient Photo.png",
  storageKey: "2026/08/generated.png",
  url: "http://localhost:4000/uploads/media/2026/08/generated.png",
  mimeType: "image/png",
  size: 128,
  width: 24,
  height: 16,
  altText: null,
  caption: null,
  createdAt: new Date("2026-08-05T00:00:00.000Z"),
  updatedAt: new Date("2026-08-05T00:00:00.000Z"),
  deletedAt: null,
};

function uploadFile(): Express.Multer.File {
  const buffer = Buffer.from("image-content");
  return {
    fieldname: "file",
    originalname: "../Patient Photo.png",
    encoding: "7bit",
    mimetype: "image/png",
    size: buffer.length,
    destination: "",
    filename: "",
    path: "",
    buffer,
    stream: undefined as never,
  };
}

function setup() {
  const repository = {
    create: jest.fn().mockImplementation((data) => ({ id: "media-1", ...data })),
    findById: jest.fn().mockResolvedValue(baseMedia),
    list: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn().mockResolvedValue({ ...baseMedia, deletedAt: new Date() }),
  };
  const validator = {
    validate: jest.fn().mockResolvedValue({ mimeType: "image/png", width: 24, height: 16 }),
  };
  const storage = {
    put: jest.fn().mockImplementation(({ storageKey }) => ({
      storageKey,
      url: `http://localhost:4000/uploads/media/${storageKey}`,
    })),
    delete: jest.fn().mockResolvedValue(undefined),
  };
  const service = new MediaService(
    repository as unknown as MediaRepository,
    validator as unknown as MediaFileValidator,
    storage as StorageProvider,
  );

  return { service, repository, validator, storage };
}

describe("MediaService", () => {
  it("uses a generated storage name instead of trusting the uploaded filename", async () => {
    const { service, repository, storage } = setup();

    await service.upload(uploadFile());

    expect(storage.put).toHaveBeenCalledWith(
      expect.objectContaining({
        storageKey: expect.stringMatching(/^\d{4}\/\d{2}\/[0-9a-f-]{36}\.png$/),
        mimeType: "image/png",
      }),
    );
    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        originalName: "Patient Photo.png",
        filename: expect.not.stringContaining("Patient Photo"),
      }),
    );
  });

  it("archives the database row before deleting its storage object", async () => {
    const { service, repository, storage } = setup();

    await expect(service.delete(baseMedia.id)).resolves.toEqual({ success: true });
    expect(repository.softDelete).toHaveBeenCalledWith(baseMedia.id);
    expect(storage.delete).toHaveBeenCalledWith(baseMedia.storageKey);
    expect(repository.softDelete.mock.invocationCallOrder[0]).toBeLessThan(
      storage.delete.mock.invocationCallOrder[0],
    );
  });

  it("removes an uploaded object if database persistence fails", async () => {
    const { service, repository, storage } = setup();
    repository.create.mockRejectedValueOnce(new Error("database unavailable"));

    await expect(service.upload(uploadFile())).rejects.toThrow("database unavailable");
    expect(storage.delete).toHaveBeenCalledWith(storage.put.mock.results[0].value.storageKey);
  });
});
