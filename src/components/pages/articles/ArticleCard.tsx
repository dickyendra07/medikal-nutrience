import Image from "next/image";
import Link from "next/link";
import type { PublicArticle } from "@/lib/api/articles";

export function ArticleCard({
  article,
}: {
  article: PublicArticle;
}) {
  return (
    <Link
      href={`/artikel/${article.slug}`}
      className="group overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-900/8 ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="relative h-60 overflow-hidden bg-[#eef8f3]">
        <Image
          src={article.coverMedia?.url ?? "/images/brand/medikal-nutrience-logo.png"}
          alt={article.coverMedia?.altText || article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized={article.coverMedia?.mimeType === "image/svg+xml"}
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-5 top-5">
          <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow">
            {article.category.name}
          </span>
        </div>
      </div>

      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
          {new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(article.publishedAt))} · {article.readTime}
        </p>

        <h3 className="mt-4 text-2xl font-black leading-tight text-[#111827]">
          {article.title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-[#64748b]">
          {article.excerpt}
        </p>

        <span className="mt-6 inline-flex font-black text-[#006b3f]">
          Baca Artikel →
        </span>
      </div>
    </Link>
  );
}
