"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  deleteMedia,
  listMedia,
  MediaApiError,
  type MediaAsset,
  updateMedia,
  uploadMedia,
} from "@/lib/cms/media-api";
import { MediaThumbnail } from "./MediaThumbnail";

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getErrorMessage(error: unknown) {
  if (error instanceof MediaApiError && error.status === 401) {
    return "Sesi admin API tidak valid atau sudah berakhir. Silakan autentikasi kembali.";
  }
  return error instanceof Error ? error.message : "Terjadi kesalahan pada Media Library.";
}

export function MediaLibraryClient() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<MediaAsset[]>([]);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [selected, setSelected] = useState<MediaAsset | null>(null);
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await listMedia({ search, mimeType, limit: 60 });
      setItems(result.items);
      setTotal(result.total);
    } catch (loadError) {
      setError(getErrorMessage(loadError));
    } finally {
      setLoading(false);
    }
  }, [mimeType, search]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    return () => {
      if (uploadPreview) URL.revokeObjectURL(uploadPreview);
    };
  }, [uploadPreview]);

  function openDetails(media: MediaAsset) {
    setSelected(media);
    setAltText(media.altText ?? "");
    setCaption(media.caption ?? "");
    setConfirmDelete(false);
  }

  function chooseUpload(file?: File) {
    if (uploadPreview) URL.revokeObjectURL(uploadPreview);
    setError(null);

    if (!file) {
      setUploadFile(null);
      setUploadPreview(null);
      if (fileInput.current) fileInput.current.value = "";
      return;
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      setUploadFile(null);
      setUploadPreview(null);
      setError("Ukuran file melebihi batas 10 MB.");
      return;
    }

    setUploadFile(file);
    setUploadPreview(URL.createObjectURL(file));
  }

  async function handleUpload() {
    if (!uploadFile) return;
    setSaving(true);
    setError(null);
    try {
      const media = await uploadMedia(uploadFile);
      setUploadOpen(false);
      chooseUpload();
      openDetails(media);
      await load();
    } catch (uploadError) {
      setError(getErrorMessage(uploadError));
    } finally {
      setSaving(false);
    }
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    if (!selected) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await updateMedia(selected.id, { altText, caption });
      setSelected(updated);
      setItems((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    } catch (saveError) {
      setError(getErrorMessage(saveError));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!selected) return;
    setSaving(true);
    setError(null);
    try {
      await deleteMedia(selected.id);
      setSelected(null);
      setConfirmDelete(false);
      await load();
    } catch (deleteError) {
      setError(getErrorMessage(deleteError));
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {error ? (
        <div role="alert" className="mb-5 flex items-start justify-between gap-4 rounded-2xl bg-red-50 px-5 py-4 text-sm font-bold text-red-700 ring-1 ring-red-100">
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)} aria-label="Tutup pesan">×</button>
        </div>
      ) : null}

      <section className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-900/5 ring-1 ring-black/5 md:p-6">
        <div className="flex flex-col gap-5 border-b border-black/5 pb-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">Asset Management</p>
            <h2 className="mt-3 text-3xl font-black">{total} media asset</h2>
            <p className="mt-2 text-sm font-medium text-[#64748b]">JPEG, PNG, WebP, dan SVG · maksimal 10 MB</p>
          </div>
          <button type="button" onClick={() => setUploadOpen(true)} className="rounded-full bg-[#006b3f] px-6 py-4 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-[#005635]">
            + Upload Image
          </button>
        </div>

        <form
          onSubmit={(event) => { event.preventDefault(); setSearch(searchInput.trim()); }}
          className="mt-6 grid gap-3 md:grid-cols-[1fr_220px_auto]"
        >
          <input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Cari filename, alt text, atau caption..." className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:ring-4 focus:ring-[#006b3f]/10" />
          <select value={mimeType} onChange={(event) => setMimeType(event.target.value)} className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none focus:border-[#006b3f]">
            <option value="">Semua tipe</option>
            <option value="image/jpeg">JPEG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WebP</option>
            <option value="image/svg+xml">SVG</option>
          </select>
          <button className="rounded-full bg-[#e4f8ed] px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f]">Search</button>
        </form>

        {loading ? <div className="py-24 text-center text-sm font-bold text-[#64748b]">Memuat Media Library...</div> : null}
        {!loading && items.length === 0 ? (
          <div className="mt-6 rounded-[1.5rem] border border-dashed border-[#006b3f]/25 bg-[#f8fcfa] px-6 py-20 text-center">
            <p className="text-xl font-black text-[#004b34]">Belum ada media yang sesuai</p>
            <p className="mt-2 text-sm font-medium text-[#64748b]">Upload gambar pertama atau ubah filter pencarian.</p>
          </div>
        ) : null}
        {!loading && items.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {items.map((media) => (
              <button key={media.id} type="button" onClick={() => openDetails(media)} className="group overflow-hidden rounded-[1.4rem] bg-white text-left ring-1 ring-black/10 transition hover:-translate-y-1 hover:shadow-xl">
                <span className="relative block aspect-square overflow-hidden bg-[#f4fbf8]"><MediaThumbnail media={media} /></span>
                <span className="block p-4">
                  <span className="block truncate text-sm font-black text-[#111827]">{media.originalName}</span>
                  <span className="mt-1 block text-xs font-bold text-[#94a3b8]">{media.width} × {media.height} · {formatBytes(media.size)}</span>
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </section>

      {uploadOpen ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#002f22]/70 p-4 backdrop-blur-sm">
          <section role="dialog" aria-modal="true" aria-label="Upload image" className="w-full max-w-xl rounded-[2rem] bg-white p-6 shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-black uppercase tracking-[0.28em] text-[#006b3f]">New Asset</p><h2 className="mt-2 text-3xl font-black">Upload image</h2></div>
              <button type="button" onClick={() => { setUploadOpen(false); chooseUpload(); }} className="rounded-full bg-[#f1f5f9] px-4 py-2 text-sm font-black">Tutup</button>
            </div>
            {error ? <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700 ring-1 ring-red-100">{error}</p> : null}
            <button type="button" onClick={() => fileInput.current?.click()} className="relative mt-6 flex aspect-video w-full items-center justify-center overflow-hidden rounded-[1.5rem] border border-dashed border-[#006b3f]/30 bg-[#f4fbf8]">
              {uploadPreview && uploadFile ? (
                <Image src={uploadPreview} alt={`Preview ${uploadFile.name}`} fill unoptimized className="object-contain p-4" />
              ) : (
                <span className="px-5 text-center"><span className="block text-3xl">↑</span><span className="mt-2 block text-sm font-black text-[#006b3f]">Pilih JPEG, PNG, WebP, atau SVG</span><span className="mt-1 block text-xs font-medium text-[#64748b]">Ukuran maksimum 10 MB</span></span>
              )}
            </button>
            <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" className="hidden" onChange={(event) => chooseUpload(event.target.files?.[0])} />
            {uploadFile ? <div className="mt-4 rounded-2xl bg-[#f8fcfa] p-4"><p className="truncate text-sm font-black">{uploadFile.name}</p><p className="mt-1 text-xs font-bold text-[#64748b]">{formatBytes(uploadFile.size)}</p></div> : null}
            <button type="button" disabled={!uploadFile || saving} onClick={() => void handleUpload()} className="mt-5 w-full rounded-full bg-[#006b3f] px-6 py-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-40">{saving ? "Uploading..." : "Upload to Library"}</button>
          </section>
        </div>
      ) : null}

      {selected ? (
        <div className="fixed inset-0 z-[80] flex justify-end bg-[#002f22]/55 backdrop-blur-sm" onMouseDown={(event) => { if (event.currentTarget === event.target) setSelected(null); }}>
          <aside role="dialog" aria-modal="true" aria-label="Detail media" className="h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-black uppercase tracking-[0.28em] text-[#006b3f]">Asset Detail</p><h2 className="mt-2 max-w-sm break-words text-2xl font-black">{selected.originalName}</h2></div>
              <button type="button" onClick={() => setSelected(null)} className="rounded-full bg-[#f1f5f9] px-4 py-2 text-sm font-black">Tutup</button>
            </div>
            <div className="relative mt-6 aspect-video overflow-hidden rounded-[1.5rem] bg-[#f4fbf8] ring-1 ring-black/5"><MediaThumbnail media={selected} sizes="560px" /></div>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-[#f8fcfa] p-4"><dt className="text-xs font-black uppercase text-[#94a3b8]">Type</dt><dd className="mt-1 font-bold">{selected.mimeType}</dd></div>
              <div className="rounded-2xl bg-[#f8fcfa] p-4"><dt className="text-xs font-black uppercase text-[#94a3b8]">Size</dt><dd className="mt-1 font-bold">{formatBytes(selected.size)}</dd></div>
              <div className="rounded-2xl bg-[#f8fcfa] p-4"><dt className="text-xs font-black uppercase text-[#94a3b8]">Dimensions</dt><dd className="mt-1 font-bold">{selected.width} × {selected.height}</dd></div>
              <div className="rounded-2xl bg-[#f8fcfa] p-4"><dt className="text-xs font-black uppercase text-[#94a3b8]">Uploaded</dt><dd className="mt-1 font-bold">{formatDate(selected.createdAt)}</dd></div>
            </dl>
            <form onSubmit={handleSave} className="mt-6 space-y-5 border-t border-black/5 pt-6">
              <div><label htmlFor="media-alt" className="text-sm font-black">Alt text</label><p className="mt-1 text-xs font-medium text-[#64748b]">Deskripsi singkat gambar untuk aksesibilitas dan SEO.</p><input id="media-alt" value={altText} onChange={(event) => setAltText(event.target.value)} maxLength={500} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none focus:border-[#006b3f]" /></div>
              <div><label htmlFor="media-caption" className="text-sm font-black">Caption</label><textarea id="media-caption" value={caption} onChange={(event) => setCaption(event.target.value)} maxLength={2000} rows={4} className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none focus:border-[#006b3f]" /></div>
              <button disabled={saving} className="w-full rounded-full bg-[#006b3f] px-6 py-4 text-sm font-black text-white disabled:opacity-50">{saving ? "Menyimpan..." : "Save Metadata"}</button>
            </form>
            <div className="mt-6 border-t border-black/5 pt-6">
              {!confirmDelete ? <button type="button" onClick={() => setConfirmDelete(true)} className="w-full rounded-full bg-red-50 px-6 py-4 text-sm font-black text-red-700 ring-1 ring-red-100">Delete Asset</button> : (
                <div className="rounded-2xl bg-red-50 p-5 ring-1 ring-red-100"><p className="font-black text-red-800">Hapus asset secara permanen?</p><p className="mt-2 text-sm font-medium leading-6 text-red-700">Data akan diarsipkan dan file di storage dihapus. Tindakan ini tidak dapat dibatalkan dari CMS.</p><div className="mt-4 grid grid-cols-2 gap-3"><button type="button" onClick={() => setConfirmDelete(false)} className="rounded-full bg-white px-4 py-3 text-sm font-black text-[#475569]">Batal</button><button type="button" disabled={saving} onClick={() => void handleDelete()} className="rounded-full bg-red-700 px-4 py-3 text-sm font-black text-white disabled:opacity-50">Ya, Hapus</button></div></div>
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
