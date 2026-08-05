import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArticleContentRenderer } from "@/components/articles/ArticleContentRenderer";
import { ArticleProductRecommendation } from "@/components/pages/articles/ArticleProductRecommendation";
import type { PublicArticle } from "@/lib/api/articles";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(value));
}

export function ArticleDetailPage({ article, relatedArticles = [], preview = false }: { article: PublicArticle; relatedArticles?: PublicArticle[]; preview?: boolean }) {
  return <>
    {preview ? <div className="sticky top-0 z-[70] flex flex-wrap items-center justify-between gap-3 bg-amber-400 px-5 py-3 text-sm font-black text-amber-950 shadow-lg"><span>Mode Preview · Artikel ini belum tentu tersedia untuk publik.</span><Link href={`/cms/articles/${article.id}/edit`} className="rounded-full bg-amber-950 px-4 py-2 text-xs text-white">Kembali ke Editor</Link></div> : null}
    <Navbar />
    <main className="bg-[#f4fbf8]">
      <section className="relative overflow-hidden px-5 py-14 md:py-24 lg:px-10">
        <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#d9f3e8]" />
        <div className="absolute right-[-150px] top-20 h-[420px] w-[420px] rounded-full bg-[#c6f1df]" />
        <div className="relative mx-auto max-w-[1280px]">
          <div className="max-w-5xl reveal-left">
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm font-bold text-[#64748b]"><Link href="/">Beranda</Link><span aria-hidden="true">→</span><Link href="/artikel">Artikel</Link><span aria-hidden="true">→</span><span className="text-[#006b3f]">{article.category.name}</span></nav>
            <p className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.3em] text-[#006b3f] shadow-lg ring-1 ring-black/5">{article.category.name}</p>
            <h1 className="mt-8 text-4xl font-black leading-[1.05] text-[#111827] md:text-6xl">{article.title}</h1>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-[#64748b]"><span>{formatDate(article.publishedAt)}</span><span aria-hidden="true">•</span><span>{article.readTime}</span><span aria-hidden="true">•</span><span>{article.author.name}</span></div>
          </div>

          <div className="relative mt-12 aspect-[16/8] overflow-hidden rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-black/5 reveal">
            {article.coverMedia ? <Image src={article.coverMedia.url} alt={article.coverMedia.altText || article.title} fill sizes="(max-width: 1280px) 100vw, 1280px" unoptimized={article.coverMedia.mimeType === "image/svg+xml"} className="object-cover" /> : <div className="flex h-full items-center justify-center text-sm font-black text-[#006b3f]/40">Gambar cover tidak tersedia</div>}
          </div>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_340px]">
            <article className="rounded-[2rem] bg-white p-7 shadow-xl ring-1 ring-black/5 md:p-12">
              <div className="rounded-[2rem] bg-[#f4fbf8] p-7"><p className="text-xs font-black uppercase tracking-[0.25em] text-[#006b3f]">Ringkasan Artikel</p><p className="mt-4 text-base font-medium leading-8 text-[#475569]">{article.excerpt}</p>{article.keyPoints?.length ? <ul className="mt-5 space-y-4">{article.keyPoints.map((item) => <li key={item} className="flex gap-3 text-sm font-bold leading-7 text-[#334155]"><span aria-hidden="true" className="text-[#006b3f]">✓</span>{item}</li>)}</ul> : null}</div>
              {article.relatedProducts?.length ? <ArticleProductRecommendation products={article.relatedProducts} /> : null}
              <div className="mt-12"><ArticleContentRenderer content={article.contentJson} /></div>
              {article.tags.length ? <div className="mt-12 flex flex-wrap gap-2 border-t border-black/5 pt-7">{article.tags.map((tag) => <span key={tag.id} className="rounded-full bg-[#e4f8ed] px-4 py-2 text-xs font-black text-[#006b3f]">#{tag.name}</span>)}</div> : null}
            </article>
            <aside className="sticky top-28 h-fit rounded-[2rem] bg-gradient-to-br from-[#006b3f] via-[#087a4c] to-[#10b981] p-7 text-white shadow-xl"><p className="text-xs font-black uppercase tracking-[0.25em] text-white/70">Butuh Bantuan?</p><h2 className="mt-5 text-3xl font-black leading-tight">Konsultasikan kebutuhan nutrisi Anda</h2><p className="mt-5 text-sm leading-7 text-white/80">Dapatkan arahan awal untuk menemukan pilihan nutrisi yang sesuai.</p><Link href="/kontak" className="mt-7 inline-flex rounded-full bg-white px-6 py-4 text-sm font-black text-[#006b3f]">Konsultasi Sekarang →</Link></aside>
          </div>
        </div>
      </section>

      {relatedArticles.length ? <section className="px-5 pb-24 lg:px-10"><div className="mx-auto max-w-[1280px]"><h2 className="text-4xl font-black text-[#111827]">Artikel Terkait</h2><div className="mt-10 grid gap-8 md:grid-cols-3">{relatedArticles.map((item) => <Link key={item.slug} href={`/artikel/${item.slug}`} className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-black/5"><div className="relative h-56 bg-[#eef8f3]">{item.coverMedia ? <Image src={item.coverMedia.url} alt={item.coverMedia.altText || item.title} fill sizes="(max-width: 768px) 100vw, 33vw" unoptimized={item.coverMedia.mimeType === "image/svg+xml"} className="object-cover" /> : null}</div><div className="p-6"><p className="text-xs font-black uppercase tracking-widest text-[#006b3f]">{item.category.name}</p><h3 className="mt-4 text-xl font-black leading-tight text-[#111827]">{item.title}</h3></div></Link>)}</div></div></section> : null}
    </main>
    <Footer />
  </>;
}
