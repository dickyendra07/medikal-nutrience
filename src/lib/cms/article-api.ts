export type ArticleStatus = "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";
export type TipTapDocument = { type: "doc"; content?: Record<string, unknown>[] };

export type ArticleCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type ArticleTag = { id: string; name: string; slug: string };
export type ArticleAuthor = { id: string; name: string; email: string; role?: string };

export type AdminArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentJson: TipTapDocument;
  contentVersion: number;
  coverMediaId: string | null;
  coverMedia: import("./media-api").MediaAsset | null;
  categoryId: string;
  category: ArticleCategory;
  authorId: string;
  author: ArticleAuthor;
  seoTitle: string | null;
  seoDescription: string | null;
  status: ArticleStatus;
  isFeatured: boolean;
  publishedAt: string | null;
  scheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  tags: ArticleTag[];
  auditLogs?: Array<{
    id: string;
    action: string;
    changes: Record<string, unknown> | null;
    createdAt: string;
    actor: { id: string; name: string } | null;
  }>;
};

export type ArticlePayload = {
  title: string;
  slug: string;
  excerpt: string;
  contentJson: TipTapDocument;
  coverMediaId?: string;
  categoryId: string;
  authorId: string;
  seoTitle?: string;
  seoDescription?: string;
  status?: ArticleStatus;
  isFeatured?: boolean;
  publishedAt?: string;
  scheduledAt?: string;
  tags?: string[];
};

export type ArticleListResponse = {
  items: AdminArticle[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
  summary: { total: number; published: number; draft: number; scheduled: number; archived: number; trash: number };
  recentActivity: Array<{
    id: string;
    action: string;
    createdAt: string;
    article: { id: string; title: string };
    actor: { id: string; name: string } | null;
  }>;
};

export type ArticleMeta = {
  categories: ArticleCategory[];
  tags: ArticleTag[];
  authors: ArticleAuthor[];
};

export class ArticleApiError extends Error {
  constructor(message: string, readonly status: number, readonly details: string[] = []) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api/admin${path}`, {
    ...init,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { message?: string | string[] } | null;
    const details = Array.isArray(body?.message) ? body.message : body?.message ? [body.message] : [];
    throw new ArticleApiError(details[0] || "Permintaan CMS gagal diproses.", response.status, details);
  }
  return response.json() as Promise<T>;
}

export function listArticles(filters: Record<string, string | number | boolean | undefined>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== "") query.set(key, String(value));
  }
  return request<ArticleListResponse>(`/articles?${query}`);
}

export function getArticle(id: string) { return request<AdminArticle>(`/articles/${id}`); }
export function getArticleMeta() { return request<ArticleMeta>("/articles/meta"); }
export function getCurrentAdmin() { return request<ArticleAuthor>("/auth/me"); }
export function checkArticleSlug(slug: string, excludeId?: string) {
  const query = new URLSearchParams({ slug });
  if (excludeId) query.set("excludeId", excludeId);
  return request<{ slug: string; available: boolean }>(`/articles/slug-availability?${query}`);
}
export function createArticle(payload: ArticlePayload) {
  return request<AdminArticle>("/articles", { method: "POST", body: JSON.stringify(payload) });
}
export function updateArticle(id: string, payload: Partial<ArticlePayload>) {
  return request<AdminArticle>(`/articles/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
}
export function articleAction(id: string, action: "restore" | "publish" | "unpublish" | "archive" | "duplicate") {
  return request<AdminArticle>(`/articles/${id}/${action}`, { method: "POST" });
}
export function trashArticle(id: string) {
  return request<{ success: true }>(`/articles/${id}`, { method: "DELETE" });
}
export function listCategories() { return request<ArticleCategory[]>("/article-categories"); }
export function createCategory(payload: { name: string; slug: string; description?: string }) {
  return request<ArticleCategory>("/article-categories", { method: "POST", body: JSON.stringify(payload) });
}
export function updateCategory(id: string, payload: { name?: string; slug?: string; description?: string }) {
  return request<ArticleCategory>(`/article-categories/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
}
export function deleteCategory(id: string) {
  return request<{ success: true }>(`/article-categories/${id}`, { method: "DELETE" });
}
export function listTags() { return request<ArticleTag[]>("/tags"); }
export function createTag(payload: { name: string; slug?: string }) {
  return request<ArticleTag>("/tags", { method: "POST", body: JSON.stringify(payload) });
}
export function updateTag(id: string, payload: { name?: string; slug?: string }) {
  return request<ArticleTag>(`/tags/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
}
export function deleteTag(id: string) { return request<{ success: true }>(`/tags/${id}`, { method: "DELETE" }); }
