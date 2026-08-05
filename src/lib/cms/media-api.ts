export type MediaAsset = {
  id: string;
  filename: string;
  originalName: string;
  storageKey: string;
  url: string;
  mimeType: "image/jpeg" | "image/png" | "image/webp" | "image/svg+xml";
  size: number;
  width: number;
  height: number;
  altText: string | null;
  caption: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type MediaListResponse = {
  items: MediaAsset[];
  total: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export class MediaApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

const apiBaseUrl = (process.env.NEXT_PUBLIC_CMS_API_URL ?? "/api")
  .replace(/\/$/, "");

async function mediaRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}/admin/media${path}`, {
    ...init,
    credentials: "include",
    headers: {
      ...(!(init?.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { message?: string | string[] }
      | null;
    const message = Array.isArray(payload?.message)
      ? payload.message.join(" ")
      : payload?.message;

    throw new MediaApiError(message || "Media request failed.", response.status);
  }

  return response.json() as Promise<T>;
}

export function listMedia(params: {
  search?: string;
  mimeType?: string;
  page?: number;
  limit?: number;
}) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.mimeType) query.set("mimeType", params.mimeType);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  return mediaRequest<MediaListResponse>(`?${query.toString()}`);
}

export function uploadMedia(file: File) {
  const formData = new FormData();
  formData.set("file", file);
  return mediaRequest<MediaAsset>("/upload", { method: "POST", body: formData });
}

export function updateMedia(id: string, input: { altText: string; caption: string }) {
  return mediaRequest<MediaAsset>(`/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteMedia(id: string) {
  return mediaRequest<{ success: true }>(`/${id}`, { method: "DELETE" });
}
