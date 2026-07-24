import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArticleProductRecommendation } from "@/components/pages/articles/ArticleProductRecommendation";
import { articles, type Article } from "@/data/articles";

export function ArticleDetailPage({
  article,
}: {
  article: Article;
}) {

  const relatedArticles = articles
    .filter((item) => item.slug !== article.slug)
    .map((item) => {

      const sameCategory =
        item.category === article.category ? 5 : 0;

      const sharedTags =
        item.tags.filter((tag) =>
          article.tags.includes(tag)
        ).length * 3;

      const sharedProducts =
        item.relatedProducts?.filter((product) =>
          article.relatedProducts?.includes(product)
        ).length
        ? 4
        : 0;


      const popularityBonus =
        item.popular ? 1 : 0;


      return {
        article: item,
        score:
          sameCategory +
          sharedTags +
          sharedProducts +
          popularityBonus,
      };

    })
    .sort((a, b) =>
      b.score - a.score
    )
    .map((item) =>
      item.article
    )
    .slice(0, 3);


  return (
    <>
      <Navbar />

      <main className="bg-[#f4fbf8]">

        <section className="relative overflow-hidden px-5 py-14 lg:px-10 md:py-24">

          <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#d9f3e8]" />
          <div className="absolute right-[-150px] top-20 h-[420px] w-[420px] rounded-full bg-[#c6f1df]" />


          <div className="relative mx-auto max-w-[1280px]">


            <div className="max-w-5xl reveal-left">

              <nav className="
              mb-8
              flex
              flex-wrap
              items-center
              gap-2
              text-sm
              font-bold
              text-[#64748b]
              ">
                <span>
                  Beranda
                </span>

                <span>
                  →
                </span>

                <span>
                  Artikel
                </span>

                <span>
                  →
                </span>

                <span className="text-[#006b3f]">
                  {article.category}
                </span>

              </nav>


              <p className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.3em] text-[#006b3f] shadow-lg ring-1 ring-black/5">
                {article.category}
              </p>


              <h1 className="mt-8 text-4xl font-black leading-[1.05] text-[#111827] md:text-6xl">
                {article.title}
              </h1>


              <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-[#64748b]">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
                <span>•</span>
                <span>{article.author}</span>
              </div>

            </div>


            <div className="mt-12 overflow-hidden rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-black/5 reveal">

              <img
                src={article.image}
                alt={article.title}
                className="h-[420px] w-full object-cover md:h-[620px]"
              />

            </div>



            <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_340px]">


              <article className="rounded-[2rem] bg-white p-7 shadow-xl ring-1 ring-black/5 md:p-12">


                <div className="rounded-[2rem] bg-[#f4fbf8] p-7">

                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#006b3f]">
                    Ringkasan Artikel
                  </p>


                  <ul className="mt-5 space-y-4">

                    {article.keyPoints.map((item)=>(
                      <li
                        key={item}
                        className="flex gap-3 text-sm font-bold leading-7 text-[#334155]"
                      >

                        <span className="text-[#006b3f]">
                          ✓
                        </span>

                        {item}

                      </li>
                    ))}

                  </ul>

                </div>


                {article.relatedProducts?.length ? (
                  <ArticleProductRecommendation
                    products={article.relatedProducts}
                  />
                ) : null}



                <div className="mt-12 space-y-12">


                  {article.content.map((section)=>(

                    <section key={section.heading}>

                      <h2 className="text-2xl font-black leading-tight text-[#111827] md:text-3xl">
                        {section.heading}
                      </h2>


                      <div className="mt-5 space-y-5 text-base leading-8 text-[#475569]">

                        {section.paragraphs.map((paragraph)=>(

                          <p key={paragraph}>
                            {paragraph}
                          </p>

                        ))}

                      </div>

                    </section>

                  ))}


                </div>


              </article>



              <aside className="sticky top-28 h-fit rounded-[2rem] bg-gradient-to-br from-[#006b3f] via-[#087a4c] to-[#10b981] p-7 text-white shadow-xl">

                <p className="text-xs font-black uppercase tracking-[0.25em] text-white/70">
                  Butuh Bantuan?
                </p>


                <h3 className="mt-5 text-3xl font-black leading-tight">
                  Konsultasikan kebutuhan nutrisi Anda
                </h3>


                <p className="mt-5 text-sm leading-7 text-white/80">
                  Dapatkan arahan awal untuk menemukan pilihan nutrisi yang sesuai.
                </p>


                <a
                  href="/kontak"
                  className="mt-7 inline-flex rounded-full bg-white px-6 py-4 text-sm font-black text-[#006b3f]"
                >
                  Konsultasi Sekarang →
                </a>

              </aside>


            </div>


          </div>


        </section>



        {relatedArticles.length ? (

          <section className="px-5 pb-24 lg:px-10">

            <div className="mx-auto max-w-[1280px]">

              <h2 className="text-4xl font-black text-[#111827]">
                Artikel Terkait
              </h2>


              <div className="mt-10 grid gap-8 md:grid-cols-3">

                {relatedArticles.map((item)=>(

                  <a
                    key={item.slug}
                    href={`/artikel/${item.slug}`}
                    className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-black/5"
                  >

                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-56 w-full object-cover"
                    />


                    <div className="p-6">

                      <p className="text-xs font-black uppercase tracking-widest text-[#006b3f]">
                        {item.category}
                      </p>


                      <h3 className="mt-4 text-xl font-black leading-tight text-[#111827]">
                        {item.title}
                      </h3>

                    </div>

                  </a>

                ))}

              </div>

            </div>

          </section>

        ) : null}



      </main>


      <Footer />

    </>
  );
}
