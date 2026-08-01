import type { ArticleItem } from "@/data/articles";

export function ArticleCard({
  article,
}: {
  article: ArticleItem;
}) {
  return (
    <a
      href={`/artikel/${article.slug}`}
      className="
      group
      overflow-hidden
      rounded-[2rem]
      bg-white
      shadow-xl
      shadow-slate-900/8
      ring-1
      ring-black/5
      transition
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      "
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="
          h-full
          w-full
          object-cover
          transition
          duration-500
          group-hover:scale-105
          "
        />

        <div className="
        absolute
        left-5
        top-5
        rounded-full
        bg-[#006b3f]
        px-4
        py-2
        text-xs
        font-black
        uppercase
        tracking-wider
        text-white
        ">
          {article.category}
        </div>
      </div>

      <div className="p-7">
        <p className="text-xs font-bold text-[#006b3f]">
          {article.date} · {article.readTime}
        </p>

        <h3 className="
        mt-4
        text-2xl
        font-black
        leading-tight
        text-[#111827]
        ">
          {article.title}
        </h3>

        <p className="
        mt-4
        text-sm
        leading-7
        text-[#64748b]
        ">
          {article.excerpt}
        </p>

        <span className="
        mt-6
        inline-flex
        font-black
        text-[#006b3f]
        ">
          Baca Selengkapnya →
        </span>
      </div>
    </a>
  );
}
