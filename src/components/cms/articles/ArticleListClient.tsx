"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  articleAction,
  getCurrentAdmin,
  getArticleMeta,
  listArticles,
  trashArticle,
  type AdminArticle,
  type ArticleListResponse,
  type ArticleMeta,
  type ArticleStatus,
} from "@/lib/cms/article-api";
import { trapDialogFocus } from "@/components/cms/dialog-focus";

const emptySummary = { total: 0, published: 0, draft: 0, scheduled: 0, archived: 0, trash: 0 };
const statusLabels: Record<ArticleStatus, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Terbit",
  SCHEDULED: "Terjadwal",
  ARCHIVED: "Diarsipkan",
};
const statusStyles: Record<ArticleStatus, string> = {
  DRAFT: "bg-amber-50 text-amber-700 ring-amber-200",
  PUBLISHED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  SCHEDULED: "bg-blue-50 text-blue-700 ring-blue-200",
  ARCHIVED: "bg-slate-100 text-slate-600 ring-slate-200",
};

function date(value: string | null) {
  return value
    ? new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value))
    : "Belum ditentukan";
}

export function ArticleListClient() {
  const [data, setData] = useState<ArticleListResponse>({ items: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 }, summary: emptySummary, recentActivity: [] });
  const [meta, setMeta] = useState<ArticleMeta>({ categories: [], tags: [], authors: [] });
  const [filters, setFilters] = useState({ search: "", status: "", category: "", author: "", featured: "", dateFrom: "", dateTo: "", sort: "updated-desc", trash: "false", page: "1" });
  const [role, setRole] = useState<string>("VIEWER");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{ article: AdminArticle; action: "trash" | "archive" } | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [articles, options, admin] = await Promise.all([listArticles(filters), getArticleMeta(), getCurrentAdmin()]);
      setData(articles);
      setMeta(options);
      setRole(admin.role ?? "VIEWER");
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => value && value !== "false" && params.set(key, value));
      window.history.replaceState(null, "", `/cms/articles${params.size ? `?${params}` : ""}`);
    } catch {
      setError("Data artikel belum dapat dimuat. Periksa koneksi CMS lalu coba kembali.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = { ...filters };
    for (const key of Object.keys(initial) as Array<keyof typeof initial>) {
      if (params.has(key)) initial[key] = params.get(key) ?? initial[key];
    }
    // URL menjadi sumber filter setelah komponen terpasang di browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilters(initial);
    setSearchInput(initial.search);
    // Initial URL state is read once; subsequent loads are driven by filters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Permintaan data berjalan setelah mount dan setiap filter berubah.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function updateFilter(key: keyof typeof filters, value: string) {
    setFilters((current) => ({ ...current, [key]: value, page: key === "page" ? value : "1" }));
  }

  async function runAction(article: AdminArticle, action: "publish" | "unpublish" | "archive" | "restore" | "duplicate" | "trash") {
    setBusyId(article.id);
    setError(null);
    try {
      if (action === "trash") await trashArticle(article.id);
      else await articleAction(article.id, action);
      setToast(
        action === "publish" ? "Artikel berhasil diterbitkan." :
        action === "unpublish" ? "Artikel dikembalikan menjadi draft." :
        action === "restore" ? "Artikel berhasil dipulihkan sebagai draft." :
        action === "duplicate" ? "Salinan artikel berhasil dibuat." :
        action === "archive" ? "Artikel berhasil diarsipkan." : "Artikel dipindahkan ke sampah.",
      );
      setConfirm(null);
      await load();
    } catch {
      setError("Aksi belum berhasil diproses. Hak akses atau status artikel mungkin sudah berubah.");
    } finally {
      setBusyId(null);
    }
  }

  const noFilters = !filters.search && !filters.status && !filters.category && !filters.author && !filters.featured && !filters.dateFrom && !filters.dateTo;
  const canEdit = role !== "VIEWER";
  const canManageTrash = role === "SUPER_ADMIN" || role === "ADMIN";

  return (
    <>
      {toast ? <div role="status" className="fixed right-5 top-5 z-[100] rounded-2xl bg-[#004b34] px-5 py-4 text-sm font-black text-white shadow-2xl">✓ {toast}</div> : null}
      {error ? <div role="alert" className="mb-5 flex items-center justify-between gap-4 rounded-2xl bg-red-50 px-5 py-4 text-sm font-bold text-red-700 ring-1 ring-red-100"><span>{error}</span><button type="button" onClick={() => setError(null)} aria-label="Tutup pesan">×</button></div> : null}

      <section className="flex flex-col gap-4 rounded-[2rem] bg-[#004b34] p-6 text-white shadow-2xl shadow-green-900/15 md:flex-row md:items-center md:justify-between md:p-8">
        <div><p className="text-xs font-black uppercase tracking-[0.28em] text-white/55">Editorial Workspace</p><h2 className="mt-3 text-3xl font-black">Bangun pusat edukasi yang terpercaya</h2><p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-white/65">Tulis, tinjau, jadwalkan, dan terbitkan artikel dalam satu alur kerja.</p></div>
        <div className="flex flex-wrap gap-3">{canManageTrash ? <a href="/cms/articles/categories" className="rounded-full bg-white/10 px-5 py-3 text-xs font-black text-white ring-1 ring-white/15">Kelola Kategori</a> : null}{canEdit ? <a href="/cms/articles/new" className="rounded-full bg-white px-6 py-3 text-xs font-black text-[#006b3f] shadow-lg">+ Buat Artikel</a> : <span className="rounded-full bg-white/10 px-5 py-3 text-xs font-black text-white ring-1 ring-white/15">Mode baca saja</span>}</div>
      </section>

      <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {[
          ["Total Artikel", data.summary.total, ""], ["Published", data.summary.published, "PUBLISHED"], ["Draft", data.summary.draft, "DRAFT"], ["Scheduled", data.summary.scheduled, "SCHEDULED"], ["Archived", data.summary.archived, "ARCHIVED"], ["Sampah", data.summary.trash, "trash"],
        ].map(([label, value, target]) => (
          <button key={String(label)} type="button" onClick={() => target === "trash" ? setFilters((current) => ({ ...current, trash: "true", status: "", page: "1" })) : setFilters((current) => ({ ...current, trash: "false", status: String(target), page: "1" }))} className="rounded-[1.5rem] bg-white p-5 text-left shadow-lg shadow-slate-900/5 ring-1 ring-black/5 transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#006b3f]/20"><span className="text-3xl font-black text-[#006b3f]">{value}</span><span className="mt-2 block text-xs font-black text-[#64748b]">{label}</span></button>
        ))}
      </section>

      <section className="mt-5 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
        <form onSubmit={(event: FormEvent) => { event.preventDefault(); updateFilter("search", searchInput.trim()); }} className="grid gap-3 border-b border-black/5 p-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-[minmax(240px,1fr)_180px_210px_170px_190px_auto]">
          <label><span className="sr-only">Cari artikel</span><input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Cari judul, slug, atau ringkasan..." className="h-12 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 text-sm font-bold outline-none focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10" /></label>
          <label><span className="sr-only">Status</span><select value={filters.status} onChange={(event) => updateFilter("status", event.target.value)} className="h-12 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 text-sm font-bold outline-none focus:border-[#006b3f]"><option value="">Semua status</option>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          <label><span className="sr-only">Kategori</span><select value={filters.category} onChange={(event) => updateFilter("category", event.target.value)} className="h-12 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 text-sm font-bold outline-none focus:border-[#006b3f]"><option value="">Semua kategori</option>{meta.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
          <label><span className="sr-only">Featured</span><select value={filters.featured} onChange={(event) => updateFilter("featured", event.target.value)} className="h-12 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 text-sm font-bold outline-none focus:border-[#006b3f]"><option value="">Semua artikel</option><option value="true">Featured</option><option value="false">Non-featured</option></select></label>
          <label><span className="sr-only">Urutkan</span><select value={filters.sort} onChange={(event) => updateFilter("sort", event.target.value)} className="h-12 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 text-sm font-bold outline-none focus:border-[#006b3f]"><option value="updated-desc">Terakhir diperbarui</option><option value="published-desc">Terbaru diterbitkan</option><option value="created-desc">Terbaru dibuat</option><option value="title-asc">Judul A–Z</option></select></label>
          <button className="h-12 rounded-full bg-[#006b3f] px-6 text-xs font-black uppercase tracking-wide text-white md:col-span-2 xl:col-span-3 2xl:col-span-1">Cari</button>
        </form>
        <details className="border-b border-black/5 bg-[#fbfefc] px-5 py-4">
          <summary className="cursor-pointer text-xs font-black text-[#006b3f] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#006b3f]/15">Filter lanjutan</summary>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <label className="text-xs font-black text-[#475569]">Penulis<select value={filters.author} onChange={(event) => updateFilter("author", event.target.value)} className="mt-2 h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm font-bold outline-none focus:border-[#006b3f]"><option value="">Semua penulis</option>{meta.authors.map((author) => <option key={author.id} value={author.id}>{author.name}</option>)}</select></label>
            <label className="text-xs font-black text-[#475569]">Terbit mulai<input type="date" value={filters.dateFrom ? filters.dateFrom.slice(0, 10) : ""} onChange={(event) => updateFilter("dateFrom", event.target.value ? new Date(`${event.target.value}T00:00:00`).toISOString() : "")} className="mt-2 h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm font-bold outline-none focus:border-[#006b3f]" /></label>
            <label className="text-xs font-black text-[#475569]">Terbit sampai<input type="date" value={filters.dateTo ? filters.dateTo.slice(0, 10) : ""} onChange={(event) => updateFilter("dateTo", event.target.value ? new Date(`${event.target.value}T23:59:59`).toISOString() : "")} className="mt-2 h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm font-bold outline-none focus:border-[#006b3f]" /></label>
          </div>
        </details>

        {loading ? <div className="space-y-3 p-5" aria-label="Memuat artikel">{[1, 2, 3, 4].map((item) => <div key={item} className="h-24 animate-pulse rounded-2xl bg-slate-100" />)}</div> : null}
        {!loading && !data.items.length ? <div className="px-6 py-24 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#e4f8ed] text-2xl text-[#006b3f]">✎</div><h3 className="mt-5 text-2xl font-black text-[#111827]">{noFilters && filters.trash !== "true" ? "Belum ada artikel" : "Tidak ada artikel yang cocok"}</h3><p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-7 text-[#64748b]">{noFilters && filters.trash !== "true" ? "Belum ada artikel. Buat artikel pertama untuk mulai membangun pusat edukasi Medikal Nutrience." : "Tidak ada artikel yang cocok dengan pencarian atau filter ini."}</p>{noFilters && filters.trash !== "true" ? <a href="/cms/articles/new" className="mt-6 inline-flex rounded-full bg-[#006b3f] px-6 py-3 text-sm font-black text-white">Buat Artikel Pertama</a> : null}</div> : null}

        {!loading && data.items.length ? <div className="divide-y divide-black/5">
          <div className="hidden grid-cols-[72px_1fr_150px_140px_150px_190px] gap-4 bg-[#f8fcfa] px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#64748b] xl:grid"><span>Cover</span><span>Artikel</span><span>Status</span><span>Publikasi</span><span>Diperbarui</span><span className="text-right">Aksi</span></div>
          {data.items.map((article) => <article key={article.id} className="grid gap-4 p-5 transition hover:bg-[#fbfefc] xl:grid-cols-[72px_1fr_150px_140px_150px_190px] xl:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#eef8f3]">{article.coverMedia ? <Image src={article.coverMedia.url} alt={article.coverMedia.altText || article.title} fill sizes="72px" unoptimized={article.coverMedia.mimeType === "image/svg+xml"} className="object-cover" /> : <span className="flex h-full items-center justify-center text-xl text-[#006b3f]/35">▧</span>}</div>
            <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#006b3f]">{article.category.name}</span>{article.isFeatured ? <span className="rounded-full bg-amber-50 px-2 py-1 text-[9px] font-black text-amber-700">★ Featured</span> : null}</div><h3 className="mt-2 truncate text-lg font-black text-[#111827]">{article.title}</h3><p className="mt-1 truncate text-xs font-medium text-[#64748b]">/{article.slug} · {article.author.name}</p></div>
            <div><span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[10px] font-black uppercase tracking-wide ring-1 ${statusStyles[article.status]}`}><span aria-hidden="true">●</span>{statusLabels[article.status]}</span></div>
            <p className="text-xs font-bold leading-5 text-[#64748b]">{date(article.publishedAt || article.scheduledAt)}</p>
            <p className="text-xs font-bold leading-5 text-[#64748b]">{date(article.updatedAt)}</p>
            <div className="flex flex-wrap gap-2 xl:justify-end">
              {canEdit ? <a href={`/cms/articles/${article.id}/edit`} title={`Edit ${article.title}`} className="rounded-full bg-[#e4f8ed] px-3 py-2 text-xs font-black text-[#006b3f] focus:outline-none focus:ring-4 focus:ring-[#006b3f]/20">Edit</a> : null}
              <a href={`/cms/articles/${article.id}/preview`} title={`Preview ${article.title}`} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-600">Preview</a>
              {filters.trash === "true" ? (canManageTrash ? <button disabled={busyId === article.id} onClick={() => void runAction(article, "restore")} className="rounded-full bg-blue-50 px-3 py-2 text-xs font-black text-blue-700">Pulihkan</button> : null) : canEdit ? <>
                <button disabled={busyId === article.id} onClick={() => void runAction(article, "duplicate")} title="Buat salinan draft" className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-600">Salin</button>
                {article.status === "PUBLISHED" ? <button disabled={busyId === article.id} onClick={() => void runAction(article, "unpublish")} className="rounded-full bg-amber-50 px-3 py-2 text-xs font-black text-amber-700">Batalkan</button> : <button disabled={busyId === article.id} onClick={() => void runAction(article, "publish")} className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">Terbitkan</button>}
                <button disabled={busyId === article.id} onClick={() => setConfirm({ article, action: "archive" })} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-600">Arsip</button>
                {canManageTrash ? <button onClick={() => setConfirm({ article, action: "trash" })} className="rounded-full bg-red-50 px-3 py-2 text-xs font-black text-red-700">Sampah</button> : null}
              </> : null}
            </div>
          </article>)}
        </div> : null}

        {data.pagination.totalPages > 1 ? <footer className="flex items-center justify-between border-t border-black/5 p-5"><p className="text-xs font-bold text-[#64748b]">Halaman {data.pagination.page} dari {data.pagination.totalPages}</p><div className="flex gap-2"><button disabled={data.pagination.page <= 1} onClick={() => updateFilter("page", String(data.pagination.page - 1))} className="rounded-full bg-slate-100 px-4 py-2 text-xs font-black disabled:opacity-40">Sebelumnya</button><button disabled={data.pagination.page >= data.pagination.totalPages} onClick={() => updateFilter("page", String(data.pagination.page + 1))} className="rounded-full bg-[#006b3f] px-4 py-2 text-xs font-black text-white disabled:opacity-40">Berikutnya</button></div></footer> : null}
      </section>

      {confirm ? <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#002f22]/65 p-4 backdrop-blur-sm"><section role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" onKeyDown={(event) => { if (event.key === "Escape") setConfirm(null); trapDialogFocus(event); }} className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl"><p className={`text-xs font-black uppercase tracking-[0.25em] ${confirm.action === "trash" ? "text-red-600" : "text-slate-500"}`}>Konfirmasi</p><h2 id="confirm-title" className="mt-3 text-2xl font-black">{confirm.action === "trash" ? "Pindahkan ke sampah?" : "Arsipkan artikel?"}</h2><p className="mt-3 text-sm font-medium leading-7 text-[#64748b]">“{confirm.article.title}” tidak akan tampil di halaman publik. {confirm.action === "trash" ? "Hanya Admin yang dapat memulihkannya." : "Artikel tetap tersimpan dan dapat diedit kembali."}</p><div className="mt-6 grid grid-cols-2 gap-3"><button autoFocus type="button" onClick={() => setConfirm(null)} className="rounded-full bg-slate-100 px-5 py-3 text-sm font-black">Batal</button><button type="button" disabled={busyId === confirm.article.id} onClick={() => void runAction(confirm.article, confirm.action)} className={`rounded-full px-5 py-3 text-sm font-black text-white ${confirm.action === "trash" ? "bg-red-700" : "bg-[#475569]"}`}>{confirm.action === "trash" ? "Pindahkan" : "Arsipkan"}</button></div></section></div> : null}
    </>
  );
}
