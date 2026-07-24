import { ArticleCard } from "@/components/pages/articles/ArticleCard";
import { articles } from "@/data/articles";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function ArticlesPage() {
  const featured = articles[0];
  const latest = articles.slice(1);

  return (
    <>
      <Navbar />

      <main className="bg-[#f4fbf8]">

        <section className="
        relative
        overflow-hidden
        px-5
        py-16
        lg:px-10
        md:py-24
        ">

          <div className="
          absolute
          left-[-180px]
          top-[-180px]
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#d9f3e8]
          " />

          <div className="
          absolute
          right-[-150px]
          bottom-[-150px]
          h-[400px]
          w-[400px]
          rounded-full
          bg-[#c6f1df]
          " />


          <div className="
          relative
          mx-auto
          max-w-[1440px]
          ">

            <div className="max-w-4xl reveal-left">

              <p className="
              inline-flex
              rounded-full
              bg-white
              px-5
              py-3
              text-xs
              font-black
              uppercase
              tracking-[0.3em]
              text-[#006b3f]
              shadow-lg
              ring-1
              ring-black/5
              ">
                Artikel & Edukasi
              </p>


              <h1 className="
              mt-7
              text-4xl
              font-black
              leading-tight
              text-[#111827]
              md:text-6xl
              ">
                Informasi Nutrisi untuk Membantu Perjalanan Kesehatan Anda
              </h1>


              <p className="
              mt-6
              max-w-3xl
              text-base
              leading-8
              text-[#64748b]
              md:text-lg
              ">
                Temukan artikel edukasi, tips kesehatan, dan informasi nutrisi
                terpercaya dari Medikal Nutrience.
              </p>

            </div>



            <div className="
            mt-14
            overflow-hidden
            rounded-[2.5rem]
            bg-white
            shadow-2xl
            ring-1
            ring-black/5
            reveal
            ">

              <div className="
              grid
              lg:grid-cols-[1.1fr_0.9fr]
              ">

                <img
                  src={featured.image}
                  alt={featured.title}
                  className="
                  h-[360px]
                  w-full
                  object-cover
                  lg:h-full
                  "
                />


                <div className="
                flex
                flex-col
                justify-center
                p-8
                md:p-12
                ">

                  <p className="
                  text-xs
                  font-black
                  uppercase
                  tracking-widest
                  text-[#006b3f]
                  ">
                    {featured.category}
                  </p>


                  <h2 className="
                  mt-5
                  text-3xl
                  font-black
                  leading-tight
                  text-[#111827]
                  md:text-5xl
                  ">
                    {featured.title}
                  </h2>


                  <p className="
                  mt-5
                  leading-8
                  text-[#64748b]
                  ">
                    {featured.excerpt}
                  </p>


                  <a
                    href={`/artikel/${featured.slug}`}
                    className="
                    mt-8
                    inline-flex
                    w-fit
                    rounded-full
                    bg-[#006b3f]
                    px-7
                    py-4
                    text-sm
                    font-black
                    text-white
                    "
                  >
                    Baca Artikel →
                  </a>

                </div>

              </div>

            </div>

          </div>

        </section>



        <section className="px-5 pb-20 lg:px-10">

          <div className="
          mx-auto
          max-w-[1440px]
          ">

            <h2 className="
            text-4xl
            font-black
            text-[#111827]
            ">
              Artikel Terbaru
            </h2>


            <div className="
            mt-10
            grid
            gap-8
            md:grid-cols-2
            xl:grid-cols-3
            ">

              {latest.map((article)=>(
                <ArticleCard
                  key={article.slug}
                  article={article}
                />
              ))}

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}
