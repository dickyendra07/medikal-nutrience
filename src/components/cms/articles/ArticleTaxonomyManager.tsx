"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { trapDialogFocus } from "@/components/cms/dialog-focus";
import {
  createCategory,
  createTag,
  deleteCategory,
  deleteTag,
  listCategories,
  listTags,
  type ArticleCategory,
  type ArticleTag,
} from "@/lib/cms/article-api";

function slugify(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/&/g, " dan ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function ArticleTaxonomyManager() {
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [tags, setTags] = useState<ArticleTag[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [tagName, setTagName] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ error?: boolean; text: string } | null>(null);
  const [confirm, setConfirm] = useState<{ type: "category" | "tag"; id: string; name: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [categoryData, tagData] = await Promise.all([listCategories(), listTags()]);
      setCategories(categoryData);
      setTags(tagData);
    } catch { setMessage({ error: true, text: "Kategori dan tag belum dapat dimuat." }); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => {
    // Data taxonomy dimuat setelah komponen terpasang.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  async function addCategory(event: FormEvent) {
    event.preventDefault();
    if (categoryName.trim().length < 2) { setMessage({ error: true, text: "Nama kategori minimal 2 karakter." }); return; }
    setBusy(true);
    try {
      await createCategory({ name: categoryName.trim(), slug: slugify(categoryName), description: categoryDescription.trim() });
      setCategoryName(""); setCategoryDescription(""); setMessage({ text: "Kategori berhasil ditambahkan." }); await load();
    } catch { setMessage({ error: true, text: "Kategori belum dapat dibuat. Nama atau slug mungkin sudah digunakan." }); }
    finally { setBusy(false); }
  }

  async function addTag(event: FormEvent) {
    event.preventDefault();
    if (!tagName.trim()) return;
    setBusy(true);
    try { await createTag({ name: tagName.trim() }); setTagName(""); setMessage({ text: "Tag berhasil ditambahkan." }); await load(); }
    catch { setMessage({ error: true, text: "Tag belum dapat dibuat atau sudah tersedia." }); }
    finally { setBusy(false); }
  }

  async function remove() {
    if (!confirm) return;
    setBusy(true);
    try {
      if (confirm.type === "category") await deleteCategory(confirm.id); else await deleteTag(confirm.id);
      setMessage({ text: `${confirm.type === "category" ? "Kategori" : "Tag"} berhasil dihapus.` });
      setConfirm(null); await load();
    } catch { setMessage({ error: true, text: confirm.type === "category" ? "Kategori masih digunakan oleh artikel aktif." : "Tag belum dapat dihapus." }); }
    finally { setBusy(false); }
  }

  return <>
    <div className="mb-5 flex justify-between gap-3"><a href="/cms/articles" className="rounded-full bg-white px-5 py-3 text-xs font-black text-[#006b3f] shadow-sm ring-1 ring-black/5">← Kembali ke Artikel</a></div>
    {message ? <div role={message.error ? "alert" : "status"} className={`mb-5 rounded-2xl px-5 py-4 text-sm font-black ring-1 ${message.error ? "bg-red-50 text-red-700 ring-red-100" : "bg-emerald-50 text-emerald-700 ring-emerald-100"}`}>{message.text}</div> : null}
    <div className="grid gap-5 xl:grid-cols-2">
      <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5"><p className="text-xs font-black uppercase tracking-[0.24em] text-[#006b3f]">Article Categories</p><h2 className="mt-3 text-2xl font-black">Kategori Artikel</h2><p className="mt-2 text-sm font-medium leading-7 text-[#64748b]">Gunakan kategori untuk topik utama; satu artikel memiliki satu kategori.</p><form onSubmit={addCategory} className="mt-5 space-y-3"><label className="block text-sm font-black">Nama kategori<input value={categoryName} maxLength={100} onChange={(event) => setCategoryName(event.target.value)} className="mt-2 h-12 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 text-sm font-bold outline-none focus:border-[#006b3f]" /></label><label className="block text-sm font-black">Deskripsi<textarea value={categoryDescription} maxLength={500} rows={3} onChange={(event) => setCategoryDescription(event.target.value)} className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 py-3 text-sm font-medium outline-none focus:border-[#006b3f]" /></label><button disabled={busy} className="rounded-full bg-[#006b3f] px-5 py-3 text-xs font-black text-white disabled:opacity-50">Tambah Kategori</button></form><div className="mt-6 divide-y divide-black/5 rounded-2xl border border-black/5">{loading ? <div className="h-24 animate-pulse bg-slate-50" /> : categories.map((category) => <div key={category.id} className="flex items-center justify-between gap-4 p-4"><div><p className="font-black">{category.name}</p><p className="mt-1 text-xs font-medium text-[#64748b]">/{category.slug}{category.description ? ` · ${category.description}` : ""}</p></div><button type="button" onClick={() => setConfirm({ type: "category", id: category.id, name: category.name })} className="rounded-full bg-red-50 px-3 py-2 text-xs font-black text-red-700">Hapus</button></div>)}</div></section>
      <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5"><p className="text-xs font-black uppercase tracking-[0.24em] text-[#006b3f]">Article Tags</p><h2 className="mt-3 text-2xl font-black">Tags</h2><p className="mt-2 text-sm font-medium leading-7 text-[#64748b]">Gunakan tag untuk topik spesifik dan hubungan antarartikel.</p><form onSubmit={addTag} className="mt-5 flex gap-2"><label className="flex-1"><span className="sr-only">Nama tag</span><input value={tagName} maxLength={100} onChange={(event) => setTagName(event.target.value)} placeholder="Contoh: protein" className="h-12 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 text-sm font-bold outline-none focus:border-[#006b3f]" /></label><button disabled={busy} className="rounded-full bg-[#006b3f] px-5 text-xs font-black text-white disabled:opacity-50">Tambah</button></form><div className="mt-6 flex flex-wrap gap-2">{loading ? <div className="h-24 w-full animate-pulse rounded-2xl bg-slate-50" /> : tags.map((tag) => <button key={tag.id} type="button" onClick={() => setConfirm({ type: "tag", id: tag.id, name: tag.name })} title={`Hapus tag ${tag.name}`} className="rounded-full bg-[#e4f8ed] px-4 py-2 text-xs font-black text-[#006b3f]">{tag.name} ×</button>)}</div></section>
    </div>
    {confirm ? <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#002f22]/65 p-4 backdrop-blur-sm"><section role="alertdialog" aria-modal="true" aria-labelledby="taxonomy-confirm-title" onKeyDown={(event) => { if (event.key === "Escape") setConfirm(null); trapDialogFocus(event); }} className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl"><h2 id="taxonomy-confirm-title" className="text-2xl font-black">Hapus {confirm.type === "category" ? "kategori" : "tag"}?</h2><p className="mt-3 text-sm font-medium text-[#64748b]">“{confirm.name}” akan dihapus dari pilihan editorial.</p><div className="mt-6 grid grid-cols-2 gap-3"><button autoFocus onClick={() => setConfirm(null)} className="rounded-full bg-slate-100 px-4 py-3 text-sm font-black">Batal</button><button disabled={busy} onClick={() => void remove()} className="rounded-full bg-red-700 px-4 py-3 text-sm font-black text-white">Hapus</button></div></section></div> : null}
  </>;
}
