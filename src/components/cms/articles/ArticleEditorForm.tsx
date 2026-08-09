"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MediaPicker } from "@/components/cms/media/MediaPicker";
import { trapDialogFocus } from "@/components/cms/dialog-focus";
import {
  checkArticleSlug,
  createArticle,
  getArticle,
  getArticleMeta,
  getCurrentAdmin,
  updateArticle,
  type ArticleMeta,
  type ArticlePayload,
  type ArticleStatus,
  type TipTapDocument,
} from "@/lib/cms/article-api";
import type { MediaAsset } from "@/lib/cms/media-api";
import { ArticleRichTextEditor } from "./ArticleRichTextEditor";

const emptyDocument: TipTapDocument = { type: "doc", content: [{ type: "paragraph" }] };
const emptyForm: ArticlePayload = {
  title: "",
  slug: "",
  excerpt: "",
  contentJson: emptyDocument,
  coverMediaId: "",
  categoryId: "",
  authorId: "",
  seoTitle: "",
  seoDescription: "",
  status: "DRAFT",
  isFeatured: false,
  publishedAt: "",
  scheduledAt: "",
  tags: [],
};

function slugify(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/&/g, " dan ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 180);
}

function localDate(value?: string | null) {
  if (!value) return "";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "" : new Date(parsed.getTime() - parsed.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
}

function isoDate(value?: string) {
  return value ? new Date(value).toISOString() : undefined;
}

function contentTextLength(node: unknown): number {
  if (!node || typeof node !== "object") return 0;
  const record = node as { text?: unknown; content?: unknown[] };
  return (typeof record.text === "string" ? record.text.trim().length : 0) + (record.content ?? []).reduce<number>((sum, child) => sum + contentTextLength(child), 0);
}

type FormErrors = Partial<Record<"title" | "slug" | "excerpt" | "content" | "categoryId" | "authorId" | "scheduledAt", string>>;

export function ArticleEditorForm({ articleId }: { articleId?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<ArticlePayload>(emptyForm);
  const [meta, setMeta] = useState<ArticleMeta>({ categories: [], tags: [], authors: [] });
  const [cover, setCover] = useState<MediaAsset | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [manualSlug, setManualSlug] = useState(Boolean(articleId));
  const [slugState, setSlugState] = useState<"idle" | "checking" | "available" | "used">("idle");
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [savedSnapshot, setSavedSnapshot] = useState(JSON.stringify(emptyForm));
  const [currentId, setCurrentId] = useState(articleId);

  const dirty = useMemo(() => JSON.stringify(form) !== savedSnapshot, [form, savedSnapshot]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [options, currentAdmin, existing] = await Promise.all([
        getArticleMeta(),
        getCurrentAdmin(),
        articleId ? getArticle(articleId) : Promise.resolve(null),
      ]);
      setMeta(options);
      const next: ArticlePayload = existing ? {
        title: existing.title,
        slug: existing.slug,
        excerpt: existing.excerpt,
        contentJson: existing.contentJson,
        coverMediaId: existing.coverMediaId ?? "",
        categoryId: existing.categoryId,
        authorId: existing.authorId,
        seoTitle: existing.seoTitle ?? "",
        seoDescription: existing.seoDescription ?? "",
        status: existing.status,
        isFeatured: existing.isFeatured,
        publishedAt: localDate(existing.publishedAt),
        scheduledAt: localDate(existing.scheduledAt),
        tags: existing.tags.map((tag) => tag.name),
      } : {
        ...emptyForm,
        contentJson: { ...emptyDocument, content: [{ type: "paragraph" }] },
        categoryId: options.categories[0]?.id ?? "",
        authorId: options.authors.find((author) => author.id === currentAdmin.id)?.id ?? options.authors[0]?.id ?? "",
      };
      setForm(next);
      setCover(existing?.coverMedia ?? null);
      setSavedSnapshot(JSON.stringify(next));
    } catch {
      setMessage({ tone: "error", text: "Editor belum dapat dibuka. Periksa koneksi CMS lalu muat ulang halaman." });
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    // Data editorial dimuat setelah mount agar state awal server dan client tetap konsisten.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);
  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault(); };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);
  useEffect(() => {
    const timer = window.setTimeout(async () => {
      if (!form.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug)) {
        setSlugState("idle");
        return;
      }
      setSlugState("checking");
      try {
        const result = await checkArticleSlug(form.slug, currentId);
        setSlugState(result.available ? "available" : "used");
      } catch { setSlugState("idle"); }
    }, 450);
    return () => window.clearTimeout(timer);
  }, [form.slug, currentId]);

  function field<K extends keyof ArticlePayload>(key: K, value: ArticlePayload[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate(status: ArticleStatus) {
    const next: FormErrors = {};
    if (form.title.trim().length < 3) next.title = "Judul minimal 3 karakter.";
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug)) next.slug = "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung.";
    else if (slugState === "used") next.slug = "Slug sudah digunakan artikel lain.";
    if (form.excerpt.trim().length < 10) next.excerpt = "Ringkasan minimal 10 karakter.";
    if (form.excerpt.length > 500) next.excerpt = "Ringkasan maksimal 500 karakter.";
    if (contentTextLength(form.contentJson) < 20) next.content = "Tulis konten artikel minimal 20 karakter.";
    if (!form.categoryId) next.categoryId = "Pilih kategori artikel.";
    if (!form.authorId) next.authorId = "Pilih penulis artikel.";
    if (status === "SCHEDULED" && (!form.scheduledAt || new Date(form.scheduledAt).getTime() <= Date.now())) next.scheduledAt = "Pilih waktu terbit di masa depan.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function save(status: ArticleStatus = form.status ?? "DRAFT") {
    if (!validate(status)) {
      setMessage({ tone: "error", text: "Periksa kembali field yang ditandai sebelum menyimpan." });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return null;
    }
    setSaving(true);
    setMessage(null);
    const payload: ArticlePayload = {
      ...form,
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim(),
      seoTitle: form.seoTitle?.trim(),
      seoDescription: form.seoDescription?.trim(),
      status,
      publishedAt: status === "PUBLISHED" ? isoDate(form.publishedAt) : undefined,
      scheduledAt: status === "SCHEDULED" ? isoDate(form.scheduledAt) : undefined,
      tags: form.tags ?? [],
    };
    try {
      const saved = currentId ? await updateArticle(currentId, payload) : await createArticle(payload);
      setCurrentId(saved.id);
      const next = { ...payload, status: saved.status, publishedAt: localDate(saved.publishedAt), scheduledAt: localDate(saved.scheduledAt) };
      setForm(next);
      setCover(saved.coverMedia);
      setSavedSnapshot(JSON.stringify(next));
      setMessage({ tone: "success", text: status === "PUBLISHED" ? "Artikel berhasil diterbitkan." : status === "SCHEDULED" ? "Artikel berhasil dijadwalkan." : status === "ARCHIVED" ? "Artikel berhasil diarsipkan." : "Draft artikel berhasil disimpan." });
      if (!articleId) router.replace(`/cms/articles/${saved.id}/edit`);
      return saved;
    } catch {
      setMessage({ tone: "error", text: "Artikel belum berhasil disimpan. Periksa slug, relasi media, dan field wajib." });
      return null;
    } finally {
      setSaving(false);
    }
  }

  function addTag(value: string) {
    const name = value.trim().replace(/\s+/g, " ");
    if (!name) return;
    if (!(form.tags ?? []).some((tag) => tag.toLowerCase() === name.toLowerCase())) field("tags", [...(form.tags ?? []), name]);
    setTagInput("");
  }

  async function preview() {
    const saved = dirty || !currentId ? await save(form.status ?? "DRAFT") : { id: currentId };
    if (saved?.id) window.open(`/cms/articles/${saved.id}/preview`, "_blank", "noopener,noreferrer");
  }

  if (loading) return <div className="space-y-5"><div className="h-28 animate-pulse rounded-[2rem] bg-white" /><div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]"><div className="h-[900px] animate-pulse rounded-[2rem] bg-white" /><div className="h-[640px] animate-pulse rounded-[2rem] bg-white" /></div></div>;

  return (
    <>
      {message ? <div role={message.tone === "error" ? "alert" : "status"} className={`mb-5 flex items-center justify-between rounded-2xl px-5 py-4 text-sm font-black ring-1 ${message.tone === "success" ? "bg-emerald-50 text-emerald-700 ring-emerald-100" : "bg-red-50 text-red-700 ring-red-100"}`}><span>{message.tone === "success" ? "✓ " : ""}{message.text}</span><button type="button" onClick={() => setMessage(null)} aria-label="Tutup pesan">×</button></div> : null}
      {dirty ? <div role="status" className="mb-5 flex items-center gap-3 rounded-2xl bg-amber-50 px-5 py-3 text-xs font-black text-amber-700 ring-1 ring-amber-100"><span aria-hidden="true">●</span> Perubahan belum disimpan</div> : null}

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <main className="min-w-0 space-y-5">
          <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5 md:p-8">
            <div><label htmlFor="article-title" className="text-sm font-black text-[#111827]">Judul Artikel <span className="text-red-600">*</span></label><input id="article-title" value={form.title} maxLength={200} aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "article-title-error" : undefined} onChange={(event) => { field("title", event.target.value); if (!manualSlug) field("slug", slugify(event.target.value)); }} placeholder="Contoh: Memahami Kebutuhan Protein Saat Pemulihan" className={`mt-2 w-full border-0 border-b-2 bg-transparent px-0 py-3 text-3xl font-black leading-tight outline-none md:text-4xl ${errors.title ? "border-red-400" : "border-black/10 focus:border-[#006b3f]"}`} />{errors.title ? <p id="article-title-error" className="mt-2 text-xs font-bold text-red-600">{errors.title}</p> : <p className="mt-2 text-xs font-medium text-[#94a3b8]">{form.title.length}/200 karakter</p>}</div>
            <div className="mt-7"><label htmlFor="article-slug" className="text-sm font-black text-[#111827]">Slug URL <span className="text-red-600">*</span></label><div className="mt-2 flex items-center rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 focus-within:border-[#006b3f] focus-within:ring-4 focus-within:ring-[#006b3f]/10"><span className="text-sm font-bold text-[#94a3b8]">/artikel/</span><input id="article-slug" value={form.slug} maxLength={180} onChange={(event) => { setManualSlug(true); field("slug", slugify(event.target.value)); }} className="h-12 min-w-0 flex-1 bg-transparent text-sm font-bold outline-none" /></div><div className="mt-2 flex items-center justify-between gap-3"><p className={`text-xs font-bold ${errors.slug || slugState === "used" ? "text-red-600" : slugState === "available" ? "text-emerald-600" : "text-[#94a3b8]"}`}>{errors.slug || (slugState === "checking" ? "Memeriksa ketersediaan…" : slugState === "available" ? "✓ Slug tersedia" : slugState === "used" ? "Slug sudah digunakan" : "Slug dibuat otomatis dan dapat diedit.")}</p>{manualSlug ? <button type="button" onClick={() => { setManualSlug(false); field("slug", slugify(form.title)); }} className="text-xs font-black text-[#006b3f]">Gunakan otomatis</button> : null}</div></div>
            <div className="mt-7"><label htmlFor="article-excerpt" className="text-sm font-black text-[#111827]">Ringkasan <span className="text-red-600">*</span></label><textarea id="article-excerpt" value={form.excerpt} maxLength={500} rows={4} aria-invalid={Boolean(errors.excerpt)} onChange={(event) => field("excerpt", event.target.value)} placeholder="Ringkas manfaat utama artikel dalam 1–3 kalimat." className={`mt-2 w-full resize-none rounded-2xl border bg-[#f8fcfa] px-5 py-4 text-sm font-medium leading-7 outline-none focus:ring-4 ${errors.excerpt ? "border-red-400 focus:ring-red-100" : "border-black/10 focus:border-[#006b3f] focus:ring-[#006b3f]/10"}`} /><div className="mt-2 flex justify-between text-xs"><span className="font-bold text-red-600">{errors.excerpt}</span><span className="font-medium text-[#94a3b8]">{form.excerpt.length}/500</span></div></div>
          </section>
          <ArticleRichTextEditor value={form.contentJson} onChange={(contentJson) => field("contentJson", contentJson)} error={errors.content} />
        </main>

        <aside className="space-y-4 xl:sticky xl:top-24">
          <section className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
            <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-[#006b3f]">Publikasi</p><h2 className="mt-2 text-xl font-black">Status Artikel</h2></div><span className={`rounded-full px-3 py-1.5 text-[10px] font-black ${form.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-700" : form.status === "SCHEDULED" ? "bg-blue-50 text-blue-700" : form.status === "ARCHIVED" ? "bg-slate-100 text-slate-600" : "bg-amber-50 text-amber-700"}`}>{form.status}</span></div>
            <label className="mt-5 block text-sm font-black">Workflow<select value={form.status} onChange={(event) => field("status", event.target.value as ArticleStatus)} className="mt-2 h-12 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 text-sm font-bold outline-none focus:border-[#006b3f]"><option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option><option value="SCHEDULED">Scheduled</option><option value="ARCHIVED">Archived</option></select></label>
            {form.status === "PUBLISHED" ? <label className="mt-4 block text-sm font-black">Tanggal terbit<input type="datetime-local" value={form.publishedAt} onChange={(event) => field("publishedAt", event.target.value)} className="mt-2 h-12 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 text-sm font-bold outline-none focus:border-[#006b3f]" /><span className="mt-1 block text-xs font-medium text-[#94a3b8]">Kosongkan untuk menggunakan waktu saat artikel diterbitkan.</span></label> : null}
            {form.status === "SCHEDULED" ? <label className="mt-4 block text-sm font-black">Jadwal terbit <span className="text-red-600">*</span><input type="datetime-local" value={form.scheduledAt} onChange={(event) => field("scheduledAt", event.target.value)} className={`mt-2 h-12 w-full rounded-2xl border bg-[#f8fcfa] px-4 text-sm font-bold outline-none ${errors.scheduledAt ? "border-red-400" : "border-black/10 focus:border-[#006b3f]"}`} />{errors.scheduledAt ? <span className="mt-1 block text-xs font-bold text-red-600">{errors.scheduledAt}</span> : null}</label> : null}
            <label className="mt-5 flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-[#f4fbf8] p-4"><span><span className="block text-sm font-black">Artikel Featured</span><span className="mt-1 block text-xs font-medium text-[#64748b]">Tampilkan sebagai artikel utama.</span></span><input type="checkbox" checked={form.isFeatured} onChange={(event) => field("isFeatured", event.target.checked)} className="h-5 w-5 accent-[#006b3f]" /></label>
          </section>

          <section className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-900/5 ring-1 ring-black/5"><p className="text-xs font-black uppercase tracking-[0.22em] text-[#006b3f]">Klasifikasi</p><label className="mt-4 block text-sm font-black">Kategori <span className="text-red-600">*</span><select value={form.categoryId} onChange={(event) => field("categoryId", event.target.value)} className={`mt-2 h-12 w-full rounded-2xl border bg-[#f8fcfa] px-4 text-sm font-bold outline-none ${errors.categoryId ? "border-red-400" : "border-black/10 focus:border-[#006b3f]"}`}><option value="">Pilih kategori</option>{meta.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>{errors.categoryId ? <span className="mt-1 block text-xs font-bold text-red-600">{errors.categoryId}</span> : null}</label><label className="mt-4 block text-sm font-black">Penulis <span className="text-red-600">*</span><select value={form.authorId} onChange={(event) => field("authorId", event.target.value)} className={`mt-2 h-12 w-full rounded-2xl border bg-[#f8fcfa] px-4 text-sm font-bold outline-none ${errors.authorId ? "border-red-400" : "border-black/10 focus:border-[#006b3f]"}`}><option value="">Pilih penulis</option>{meta.authors.map((author) => <option key={author.id} value={author.id}>{author.name}</option>)}</select></label><label className="mt-4 block text-sm font-black">Tags<div className="mt-2 flex rounded-2xl border border-black/10 bg-[#f8fcfa] p-1 focus-within:border-[#006b3f]"><input value={tagInput} onChange={(event) => setTagInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === ",") { event.preventDefault(); addTag(tagInput); } }} placeholder="Ketik lalu Enter" className="h-10 min-w-0 flex-1 bg-transparent px-3 text-sm font-bold outline-none" /><button type="button" onClick={() => addTag(tagInput)} className="rounded-xl bg-[#e4f8ed] px-3 text-xs font-black text-[#006b3f]">Tambah</button></div></label><div className="mt-3 flex flex-wrap gap-2">{(form.tags ?? []).map((tag) => <button key={tag} type="button" onClick={() => field("tags", (form.tags ?? []).filter((item) => item !== tag))} title={`Hapus tag ${tag}`} className="rounded-full bg-[#e4f8ed] px-3 py-1.5 text-xs font-black text-[#006b3f]">{tag} ×</button>)}</div></section>

          <section className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-900/5 ring-1 ring-black/5"><div className="flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[0.22em] text-[#006b3f]">Cover Image</p><button type="button" onClick={() => setMediaOpen(true)} className="text-xs font-black text-[#006b3f]">{cover ? "Ganti" : "Pilih Media"}</button></div><button type="button" onClick={() => setMediaOpen(true)} className="relative mt-4 flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-[#f4fbf8] ring-1 ring-black/5 focus:outline-none focus:ring-4 focus:ring-[#006b3f]/20">{cover ? <Image src={cover.url} alt={cover.altText || cover.originalName} fill sizes="320px" unoptimized={cover.mimeType === "image/svg+xml"} className="object-cover" /> : <span className="text-center text-sm font-black text-[#006b3f]">▧<span className="mt-2 block">Pilih cover dari Media Library</span></span>}</button>{cover ? <div className="mt-3 flex items-center justify-between gap-3"><p className="truncate text-xs font-bold text-[#64748b]">{cover.originalName}</p><button type="button" onClick={() => { setCover(null); field("coverMediaId", ""); }} className="text-xs font-black text-red-600">Hapus</button></div> : <p className="mt-3 text-xs font-medium leading-5 text-[#64748b]">Gunakan gambar landscape dengan alt text yang informatif.</p>}</section>

          <details className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-900/5 ring-1 ring-black/5"><summary className="cursor-pointer text-sm font-black text-[#006b3f] focus:outline-none">SEO & Tampilan Pencarian</summary><div className="mt-5 space-y-4"><label className="block text-sm font-black">SEO Title<input value={form.seoTitle} maxLength={70} onChange={(event) => field("seoTitle", event.target.value)} className="mt-2 h-12 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 text-sm font-bold outline-none focus:border-[#006b3f]" /><span className={`mt-1 block text-xs font-medium ${(form.seoTitle?.length ?? 0) > 60 ? "text-amber-600" : "text-[#94a3b8]"}`}>{form.seoTitle?.length ?? 0}/70 · Disarankan 50–60 karakter</span></label><label className="block text-sm font-black">SEO Description<textarea value={form.seoDescription} maxLength={180} rows={4} onChange={(event) => field("seoDescription", event.target.value)} className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 py-3 text-sm font-bold outline-none focus:border-[#006b3f]" /><span className={`mt-1 block text-xs font-medium ${(form.seoDescription?.length ?? 0) > 160 ? "text-amber-600" : "text-[#94a3b8]"}`}>{form.seoDescription?.length ?? 0}/180 · Disarankan 140–160 karakter</span></label><div className="rounded-2xl border border-black/5 p-4"><p className="truncate text-base text-blue-700">{form.seoTitle || form.title || "Judul artikel"}</p><p className="mt-1 truncate text-xs text-emerald-700">medikal-nutrience.com/artikel/{form.slug || "slug-artikel"}</p><p className="mt-2 line-clamp-2 text-xs leading-5 text-[#64748b]">{form.seoDescription || form.excerpt || "Deskripsi artikel akan tampil di sini."}</p></div></div></details>
        </aside>
      </div>

      <div className="sticky bottom-3 z-30 mt-5 rounded-xl border border-slate-200 bg-white/95 px-3 py-2.5 shadow-[0_12px_35px_rgba(15,23,42,0.12)] backdrop-blur-xl"><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => dirty ? setLeaveOpen(true) : router.push("/cms/articles")} className="h-9 rounded-lg px-3 text-[11px] font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700">← Kembali</button><div className="flex flex-wrap gap-2"><button type="button" disabled={saving} onClick={() => void preview()} className="h-9 rounded-lg border border-slate-200 bg-white px-3.5 text-[11px] font-semibold text-slate-600 disabled:opacity-50">Preview</button>{currentId ? <button type="button" disabled={saving} onClick={() => void save("ARCHIVED")} className="h-9 rounded-lg border border-slate-200 bg-white px-3.5 text-[11px] font-semibold text-slate-600 disabled:opacity-50">Arsipkan</button> : null}<button type="button" disabled={saving} onClick={() => void save("DRAFT")} className="h-9 rounded-lg border border-emerald-200 bg-emerald-50 px-4 text-[11px] font-semibold text-[#08704c] disabled:opacity-50">{saving ? "Menyimpan…" : "Simpan draft"}</button><button type="button" disabled={saving} onClick={() => void save(form.status === "SCHEDULED" ? "SCHEDULED" : "PUBLISHED")} className="h-9 rounded-lg bg-[#08704c] px-4 text-[11px] font-semibold text-white disabled:opacity-50">{form.status === "SCHEDULED" ? "Jadwalkan" : "Terbitkan"}</button></div></div></div>

      <MediaPicker open={mediaOpen} onClose={() => setMediaOpen(false)} selectedId={cover?.id} onSelect={(media) => { setCover(media); field("coverMediaId", media.id); setMediaOpen(false); }} />
      {leaveOpen ? <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#002f22]/65 p-4 backdrop-blur-sm"><section role="alertdialog" aria-modal="true" aria-labelledby="leave-title" onKeyDown={(event) => { if (event.key === "Escape") setLeaveOpen(false); trapDialogFocus(event); }} className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl"><p className="text-xs font-black uppercase tracking-[0.25em] text-amber-600">Perubahan belum disimpan</p><h2 id="leave-title" className="mt-3 text-2xl font-black">Tinggalkan editor?</h2><p className="mt-3 text-sm font-medium leading-7 text-[#64748b]">Perubahan terakhir akan hilang jika Anda kembali ke daftar sekarang.</p><div className="mt-6 grid grid-cols-2 gap-3"><button autoFocus type="button" onClick={() => setLeaveOpen(false)} className="rounded-full bg-slate-100 px-5 py-3 text-sm font-black">Tetap di Editor</button><button type="button" onClick={() => router.push("/cms/articles")} className="rounded-full bg-amber-600 px-5 py-3 text-sm font-black text-white">Tinggalkan</button></div></section></div> : null}
    </>
  );
}
