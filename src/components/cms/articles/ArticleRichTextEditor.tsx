"use client";

import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Table, TableCell, TableHeader, TableRow } from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { MediaPicker } from "@/components/cms/media/MediaPicker";
import type { TipTapDocument } from "@/lib/cms/article-api";
import type { MediaAsset } from "@/lib/cms/media-api";
import { MediaImage } from "./extensions/MediaImage";

type Props = { value: TipTapDocument; onChange: (value: TipTapDocument) => void; error?: string; canUploadMedia?: boolean };

function ToolButton({ label, title, active, disabled, onClick }: { label: string; title: string; active?: boolean; disabled?: boolean; onClick: () => void }) {
  return <button type="button" aria-label={title} title={title} aria-pressed={active} disabled={disabled} onClick={onClick} className={`h-8 rounded-lg px-2.5 text-[11px] font-semibold transition focus:outline-none focus:ring-4 focus:ring-[#006b3f]/15 disabled:cursor-not-allowed disabled:opacity-35 ${active ? "bg-[#08704c] text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-[#08704c]"}`}>{label}</button>;
}

function Group({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-1 rounded-lg bg-white/70 p-1 ring-1 ring-slate-200/80">{children}</div>;
}

export function ArticleRichTextEditor({ value, onChange, error, canUploadMedia = false }: Props) {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const [linkError, setLinkError] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [, forceSelection] = useState(0);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, link: false, underline: false }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
      Placeholder.configure({ placeholder: "Mulai tulis artikel di sini. Gunakan heading untuk membagi pembahasan agar mudah dibaca." }),
      TextAlign.configure({ types: ["heading", "paragraph"], alignments: ["left", "center", "right", "justify"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      MediaImage,
    ],
    content: value,
    editorProps: { attributes: { class: "mednut-rich-editor min-h-[360px] px-4 py-5 outline-none md:min-h-[520px] md:px-8 md:py-6" } },
    onUpdate({ editor: instance }) {
      onChange(instance.getJSON() as TipTapDocument);
      setWordCount(instance.getText().trim().split(/\s+/).filter(Boolean).length);
    },
    onCreate({ editor: instance }) {
      setWordCount(instance.getText().trim().split(/\s+/).filter(Boolean).length);
    },
    onSelectionUpdate() { forceSelection((current) => current + 1); },
  });

  useEffect(() => {
    if (!editor) return;
    if (JSON.stringify(editor.getJSON()) !== JSON.stringify(value)) editor.commands.setContent(value, { emitUpdate: false });
  }, [editor, value]);

  if (!editor) return <div className="h-[620px] animate-pulse rounded-2xl bg-slate-100" aria-label="Menyiapkan editor" />;

  function openLink() {
    setLinkValue(String(editor?.getAttributes("link").href ?? ""));
    setLinkError("");
    setLinkOpen(true);
  }

  function applyLink() {
    const href = linkValue.trim();
    if (!/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(href)) {
      setLinkError("Gunakan URL lengkap, link internal diawali /, email, atau nomor telepon.");
      return;
    }
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setLinkOpen(false);
  }

  function insertMedia(media: MediaAsset) {
    editor?.chain().focus().insertContent({
      type: "mediaImage",
      attrs: {
        mediaId: media.id,
        url: media.url,
        alt: media.altText || media.originalName,
        caption: media.caption || "",
        alignment: "center",
        width: 100,
        naturalWidth: media.width,
        naturalHeight: media.height,
      },
    }).run();
    setMediaOpen(false);
  }

  const imageActive = editor.isActive("mediaImage");
  const imageAttrs = imageActive ? editor.getAttributes("mediaImage") : null;
  const tableActive = editor.isActive("table");

  return (
    <div className={`overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 transition focus-within:ring-4 ${error ? "ring-red-300 focus-within:ring-red-100" : "ring-black/10 focus-within:ring-[#006b3f]/15"}`}>
      <div className="sticky top-[82px] z-20 border-b border-slate-200 bg-[#f7faf8]/95 p-2.5 backdrop-blur-xl">
        <div className="mb-2 flex items-center justify-between gap-3 px-1"><div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#08704c]">Konten</p><p className="mt-0.5 text-[10px] text-slate-500">Editor artikel</p></div><span className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-500">{wordCount} kata</span></div>
        <div className="flex flex-wrap gap-2">
          <Group><select aria-label="Format paragraf" value={editor.isActive("heading", { level: 2 }) ? "h2" : editor.isActive("heading", { level: 3 }) ? "h3" : "p"} onChange={(event) => event.target.value === "h2" ? editor.chain().focus().setHeading({ level: 2 }).run() : event.target.value === "h3" ? editor.chain().focus().setHeading({ level: 3 }).run() : editor.chain().focus().setParagraph().run()} className="h-9 rounded-xl border-0 bg-white px-2 text-xs font-black text-[#475569] outline-none"><option value="p">Paragraf</option><option value="h2">Heading 2</option><option value="h3">Heading 3</option></select></Group>
          <Group><ToolButton label="B" title="Tebal (Ctrl+B)" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} /><ToolButton label="I" title="Miring (Ctrl+I)" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} /><ToolButton label="U" title="Garis bawah (Ctrl+U)" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} /><ToolButton label="S" title="Coret" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} /></Group>
          <Group><ToolButton label="• List" title="Daftar poin" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} /><ToolButton label="1. List" title="Daftar nomor" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} /><ToolButton label="❝" title="Kutipan" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} /><ToolButton label="—" title="Garis pembatas" onClick={() => editor.chain().focus().setHorizontalRule().run()} /></Group>
          <Group><ToolButton label="Link" title="Tambah atau edit link" active={editor.isActive("link")} onClick={openLink} /><ToolButton label="Putus" title="Hapus link" disabled={!editor.isActive("link")} onClick={() => editor.chain().focus().extendMarkRange("link").unsetLink().run()} /><ToolButton label="Gambar" title="Masukkan gambar dari Media Library" onClick={() => setMediaOpen(true)} /><ToolButton label="Tabel" title="Masukkan tabel 3 × 3" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} /></Group>
          <Group><ToolButton label="←" title="Rata kiri" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()} /><ToolButton label="↔" title="Rata tengah" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()} /><ToolButton label="→" title="Rata kanan" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()} /><ToolButton label="¶" title="Rata kiri-kanan" active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()} /></Group>
          <Group><ToolButton label="Kode" title="Blok kode" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()} /><ToolButton label="Bersihkan" title="Hapus format" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} /><ToolButton label="↶" title="Urungkan (Ctrl+Z)" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()} /><ToolButton label="↷" title="Ulangi" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()} /></Group>
        </div>

        {linkOpen ? <div className="mt-3 flex flex-col gap-2 rounded-2xl bg-white p-3 ring-1 ring-black/10 sm:flex-row sm:items-start"><label className="flex-1"><span className="sr-only">Alamat link</span><input autoFocus value={linkValue} onChange={(event) => setLinkValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); applyLink(); } }} placeholder="https://… atau /artikel/…" className="h-10 w-full rounded-xl border border-black/10 px-3 text-sm font-bold outline-none focus:border-[#006b3f]" />{linkError ? <span className="mt-1 block text-xs font-bold text-red-600">{linkError}</span> : null}</label><button type="button" onClick={applyLink} className="h-10 rounded-full bg-[#006b3f] px-4 text-xs font-black text-white">Terapkan</button><button type="button" onClick={() => setLinkOpen(false)} className="h-10 rounded-full bg-slate-100 px-4 text-xs font-black">Batal</button></div> : null}

        {imageActive && imageAttrs ? <div className="mt-3 grid gap-3 rounded-2xl bg-white p-3 ring-1 ring-black/10 md:grid-cols-[1fr_1fr_180px_220px_auto]"><label className="text-xs font-black text-[#475569]">Alt text<input value={String(imageAttrs.alt || "")} onChange={(event) => editor.commands.updateAttributes("mediaImage", { alt: event.target.value })} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-xs font-bold outline-none focus:border-[#006b3f]" /></label><label className="text-xs font-black text-[#475569]">Caption<input value={String(imageAttrs.caption || "")} onChange={(event) => editor.commands.updateAttributes("mediaImage", { caption: event.target.value })} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-xs font-bold outline-none focus:border-[#006b3f]" /></label><label className="text-xs font-black text-[#475569]">Lebar ({Number(imageAttrs.width || 100)}%)<input type="range" min="25" max="100" step="5" value={Number(imageAttrs.width || 100)} onChange={(event) => editor.commands.updateAttributes("mediaImage", { width: Number(event.target.value) })} className="mt-2 w-full accent-[#006b3f]" /></label><div><p className="text-xs font-black text-[#475569]">Posisi</p><div className="mt-1 flex gap-1">{[["left", "Kiri"], ["center", "Tengah"], ["right", "Kanan"], ["full", "Penuh"]].map(([value, label]) => <button type="button" key={value} onClick={() => editor.commands.updateAttributes("mediaImage", { alignment: value })} className={`h-10 rounded-xl px-2 text-[10px] font-black ${imageAttrs.alignment === value ? "bg-[#006b3f] text-white" : "bg-slate-100 text-slate-600"}`}>{label}</button>)}</div></div><button type="button" onClick={() => editor.chain().focus().deleteSelection().run()} className="mt-5 h-10 rounded-full bg-red-50 px-3 text-xs font-black text-red-700">Hapus</button></div> : null}

        {tableActive ? <div className="mt-3 flex flex-wrap gap-2 rounded-2xl bg-white p-3 ring-1 ring-black/10"><span className="self-center text-xs font-black text-[#006b3f]">Kontrol tabel:</span><ToolButton label="+ Baris" title="Tambah baris" onClick={() => editor.chain().focus().addRowAfter().run()} /><ToolButton label="− Baris" title="Hapus baris" onClick={() => editor.chain().focus().deleteRow().run()} /><ToolButton label="+ Kolom" title="Tambah kolom" onClick={() => editor.chain().focus().addColumnAfter().run()} /><ToolButton label="− Kolom" title="Hapus kolom" onClick={() => editor.chain().focus().deleteColumn().run()} /><ToolButton label="Hapus Tabel" title="Hapus tabel" onClick={() => editor.chain().focus().deleteTable().run()} /></div> : null}
      </div>
      <EditorContent editor={editor} />
      {error ? <p className="border-t border-red-100 bg-red-50 px-5 py-3 text-xs font-bold text-red-700">{error}</p> : <p className="border-t border-black/5 px-5 py-3 text-xs font-medium text-[#64748b]">Tips: blok teks untuk memberi format atau link. Klik gambar dan tabel untuk membuka pengaturan kontekstual.</p>}
      <MediaPicker open={mediaOpen} onClose={() => setMediaOpen(false)} onSelect={insertMedia} canUpload={canUploadMedia} />
    </div>
  );
}
