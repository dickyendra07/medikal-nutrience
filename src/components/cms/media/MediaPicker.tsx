"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { listMedia, type MediaAsset, uploadMedia } from "@/lib/cms/media-api";
import { trapDialogFocus } from "@/components/cms/dialog-focus";
import { MediaThumbnail } from "./MediaThumbnail";

type MediaPickerProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (media: MediaAsset) => void;
  selectedId?: string;
};

export function MediaPicker({ open, onClose, onSelect, selectedId }: MediaPickerProps) {
  const [items, setItems] = useState<MediaAsset[]>([]);
  const [search, setSearch] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    if (!open) return;
    setLoading(true);
    setError(null);
    try {
      const result = await listMedia({ search, mimeType, limit: 48 });
      setItems(result.items);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Media gagal dimuat.");
    } finally {
      setLoading(false);
    }
  }, [mimeType, open, search]);

  useEffect(() => {
    // Media dimuat saat picker dibuka atau filter berubah.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.querySelector<HTMLElement>("button, input, select")?.focus();
  }, [open]);

  async function handleUpload(file?: File) {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const media = await uploadMedia(file);
      setItems((current) => [media, ...current]);
      onSelect(media);
    } catch {
      setError("Gambar belum berhasil diunggah. Periksa format dan ukuran file.");
    } finally {
      setUploading(false);
      if (uploadRef.current) uploadRef.current.value = "";
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#002f22]/70 p-4 backdrop-blur-sm">
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Pilih media"
        onKeyDown={(event) => {
          if (event.key === "Escape") onClose();
          trapDialogFocus(event);
        }}
        className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between gap-4 border-b border-black/5 p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#006b3f]">Media Picker</p>
            <h2 className="mt-2 text-2xl font-black">Pilih asset gambar</h2>
          </div>
          <div className="flex gap-2"><button type="button" disabled={uploading} onClick={() => uploadRef.current?.click()} className="rounded-full bg-[#006b3f] px-4 py-2 text-sm font-black text-white disabled:opacity-50">{uploading ? "Mengunggah..." : "+ Upload Baru"}</button><button type="button" onClick={onClose} className="rounded-full bg-[#f1f5f9] px-4 py-2 text-sm font-black">Tutup</button><input ref={uploadRef} type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" className="hidden" onChange={(event) => void handleUpload(event.target.files?.[0])} /></div>
        </header>

        <div className="grid gap-3 border-b border-black/5 p-5 md:grid-cols-[1fr_220px]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari nama atau alt text..."
            className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-3 text-sm font-bold outline-none focus:border-[#006b3f]"
          />
          <select value={mimeType} onChange={(event) => setMimeType(event.target.value)} className="rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-3 text-sm font-bold outline-none">
            <option value="">Semua tipe</option>
            <option value="image/jpeg">JPEG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WebP</option>
            <option value="image/svg+xml">SVG</option>
          </select>
        </div>

        <div className="min-h-64 flex-1 overflow-y-auto p-5">
          {error ? <p className="rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">{error}</p> : null}
          {loading ? <p className="py-16 text-center text-sm font-bold text-[#64748b]">Memuat media...</p> : null}
          {!loading && !error ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {items.map((media) => (
                <button
                  key={media.id}
                  type="button"
                  onClick={() => onSelect(media)}
                  className={`overflow-hidden rounded-2xl text-left ring-2 transition hover:-translate-y-0.5 ${selectedId === media.id ? "ring-[#006b3f]" : "ring-black/5"}`}
                >
                  <span className="relative block aspect-square bg-[#f4fbf8]"><MediaThumbnail media={media} sizes="180px" /></span>
                  <span className="block truncate px-3 py-2 text-xs font-black">{media.originalName}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
