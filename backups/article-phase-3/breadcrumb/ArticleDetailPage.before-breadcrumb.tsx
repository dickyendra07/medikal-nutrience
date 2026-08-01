import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { articles, type Article } from "@/data/articles";

export function ArticleDetailPage({
  article,
}: {
  article: Article;
}) {
  const relatedArticles = articles
    .filter((item) => item.slug !== article.slug)
    .sort((a, b) => {
      const aScore =
        (a.category === article.category ? 2 : 0) +
        a.tags.filter((tag) => article.tags.includes(tag)).length;

      const bScore =
        (b.category === article.category ? 2 : 0) +
        b.tags.filter((tag) => article.tags.includes(tag)).length;

      return bScore - aScore;
    })
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



                <div className="mt-12 rounded-[2rem] bg-[#eefaf4] p-7">

                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#006b3f]">
                    Catatan Medikal Nutrience
                  </p>

                  <p className="mt-4 text-sm leading-7 text-[#475569]">
                    Informasi dalam artikel ini bersifat edukasi dan tidak
                    menggantikan konsultasi langsung dengan tenaga kesehatan.
                  </p>

                </div>


              </article>



              <aside className="space-y-5 lg:sticky lg:top-28 lg:h-fit">


                <div className="rounded-[2rem] bg-white p-7 shadow-xl ring-1 ring-black/5">

                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#006b3f]">
                    Topik Artikel
                  </p>


                  <div className="mt-5 flex flex-wrap gap-2">

                    {article.tags.map((tag)=>(
                      <span
                        key={tag}
                        className="rounded-full bg-[#e7f7ef] px-4 py-2 text-xs font-black text-[#006b3f]"
                      >
                        #{tag}
                      </span>
                    ))}

                  </div>

                </div>



                {article.relatedProducts?.length ? (

                  <div className="rounded-[2rem] bg-white p-7 shadow-xl ring-1 ring-black/5">

                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#006b3f]">
                      Rekomendasi Produk
                    </p>


                    <div className="mt-5 space-y-3">

                      {article.relatedProducts.map((product)=>(
                        <a
                          key={product}
                          href="/produk"
                          className="block rounded-2xl bg-[#f4fbf8] p-4 text-sm font-black text-[#111827] transition hover:bg-[#e7f7ef]"
                        >
                          {product}
                          <span className="ml-2 text-[#006b3f]">
                            →
                          </span>
                        </a>
                      ))}

                    </div>

                  </div>

                ) : null}



                <div className="rounded-[2rem] bg-gradient-to-br from-[#006b3f] via-[#087a4c] to-[#10b981] p-7 text-white shadow-xl">

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


                </div>


              </aside>


            </div>


          </div>

        </section>



        {relatedArticles.length ? (

          <section className="px-5 pb-20 lg:px-10">

            <div className="mx-auto max-w-[1280px]">

              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
                Related Reading
              </p>


              <h2 className="mt-4 text-4xl font-black text-[#111827]">
                Artikel Terkait
              </h2>


              <div className="mt-10 grid gap-6 md:grid-cols-3">

                {relatedArticles.map((item)=>(
                  <a
                    key={item.slug}
                    href={`/artikel/${item.slug}`}
                    className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-black/5 transition hover:-translate-y-2"
                  >

                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-52 w-full object-cover"
                    />

                    <div className="p-6">

                      <p className="text-xs font-black uppercase tracking-widest text-[#006b3f]">
                        {item.category}
                      </p>


                      <h3 className="mt-3 text-xl font-black leading-tight text-[#111827]">
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
