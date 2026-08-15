export type StoreFileInput = {
  storageKey: string;
  buffer: Buffer;
  mimeType: string;
};

export type StoredFile = {
  storageKey: string;
  url: string;
};

export interface StorageProvider {
  put(input: StoreFileInput): Promise<StoredFile>;
  delete(storageKey: string): Promise<void>;
}
