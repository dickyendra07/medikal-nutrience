import Image from "next/image";
import type { ReactNode } from "react";
import type { TipTapDocument } from "@/lib/cms/article-api";

type Node = { type?: string; text?: string; attrs?: Record<string, unknown>; marks?: Array<{ type?: string; attrs?: Record<string, unknown> }>; content?: Node[] };

function safeHref(value: unknown) {
  return typeof value === "string" && /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(value) ? value : "#";
}

function markedText(node: Node, key: string): ReactNode {
  let result: ReactNode = node.text ?? "";
  for (const [index, mark] of (node.marks ?? []).entries()) {
    const markKey = `${key}-mark-${index}`;
    if (mark.type === "bold") result = <strong key={markKey}>{result}</strong>;
    if (mark.type === "italic") result = <em key={markKey}>{result}</em>;
    if (mark.type === "underline") result = <u key={markKey}>{result}</u>;
    if (mark.type === "strike") result = <s key={markKey}>{result}</s>;
    if (mark.type === "code") result = <code key={markKey} className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.9em] text-[#004b34]">{result}</code>;
    if (mark.type === "link") {
      const href = safeHref(mark.attrs?.href);
      const external = href.startsWith("http");
      result = <a key={markKey} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="font-bold text-[#006b3f] underline decoration-[#006b3f]/30 underline-offset-4">{result}</a>;
    }
  }
  return result;
}

function children(node: Node, key: string) {
  return (node.content ?? []).map((child, index) => renderNode(child, `${key}-${index}`));
}

function renderNode(node: Node, key: string): ReactNode {
  const align = typeof node.attrs?.textAlign === "string" ? node.attrs.textAlign as "left" | "center" | "right" | "justify" : undefined;
  if (node.type === "text") return markedText(node, key);
  if (node.type === "paragraph") return <p key={key} style={{ textAlign: align }}>{children(node, key)}</p>;
  if (node.type === "heading" && node.attrs?.level === 3) return <h3 key={key} style={{ textAlign: align }}>{children(node, key)}</h3>;
  if (node.type === "heading") return <h2 key={key} style={{ textAlign: align }}>{children(node, key)}</h2>;
  if (node.type === "bulletList") return <ul key={key}>{children(node, key)}</ul>;
  if (node.type === "orderedList") return <ol key={key}>{children(node, key)}</ol>;
  if (node.type === "listItem") return <li key={key}>{children(node, key)}</li>;
  if (node.type === "blockquote") return <blockquote key={key}>{children(node, key)}</blockquote>;
  if (node.type === "horizontalRule") return <hr key={key} />;
  if (node.type === "hardBreak") return <br key={key} />;
  if (node.type === "codeBlock") return <pre key={key}><code>{(node.content ?? []).map((item) => item.text ?? "").join("")}</code></pre>;
  if (node.type === "table") return <div key={key} className="article-table-scroll"><table><tbody>{children(node, key)}</tbody></table></div>;
  if (node.type === "tableRow") return <tr key={key}>{children(node, key)}</tr>;
  if (node.type === "tableHeader") return <th key={key} scope="col">{children(node, key)}</th>;
  if (node.type === "tableCell") return <td key={key}>{children(node, key)}</td>;
  if (node.type === "mediaImage") {
    const src = typeof node.attrs?.url === "string" ? node.attrs.url : "";
    if (!src) return <div key={key} role="img" aria-label="Gambar tidak tersedia" className="rounded-2xl bg-slate-100 p-8 text-center text-sm font-bold text-slate-500">Gambar tidak tersedia</div>;
    const width = Math.min(100, Math.max(25, Number(node.attrs?.width) || 100));
    const alignment = String(node.attrs?.alignment || "center");
    const naturalWidth = Math.max(1, Number(node.attrs?.naturalWidth) || 1200);
    const naturalHeight = Math.max(1, Number(node.attrs?.naturalHeight) || 675);
    const margin = alignment === "left" ? "0 auto 0 0" : alignment === "right" ? "0 0 0 auto" : "0 auto";
    return <figure key={key} style={{ width: alignment === "full" ? "100%" : `${width}%`, margin }} className="article-content-image"><Image src={src} alt={String(node.attrs?.alt || "")} width={naturalWidth} height={naturalHeight} sizes="(max-width: 768px) 100vw, 760px" unoptimized={src.endsWith(".svg")} className="h-auto w-full rounded-[1.5rem] object-cover" />{node.attrs?.caption ? <figcaption>{String(node.attrs.caption)}</figcaption> : null}</figure>;
  }
  return null;
}

export function ArticleContentRenderer({ content }: { content: TipTapDocument }) {
  return <div className="mednut-article-content">{(content.content ?? []).map((node, index) => renderNode(node as Node, `node-${index}`))}</div>;
}
