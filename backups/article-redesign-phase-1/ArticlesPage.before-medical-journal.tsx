import { ArticleCard } from "@/components/pages/articles/ArticleCard";
import { articles, articleCategories } from "@/data/articles";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function ArticlesPage() {
  const featured = articles.find((item) => item.featured) ?? articles[0];

  const latest = articles.filter(
    (item) => item.slug !== featured.slug
  );

  const popular = articles.filter(
    (item) => item.popular
  );

  return (
    <>
      <Navbar />

      <main className="bg-[#f4fbf8]">

        {/* HERO */}
        <section className="relative overflow-hidden px-5 py-16 lg:px-10 md:py-24">

          <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#d9f3e8]" />
          <div className="absolute right-[-160px] bottom-[-160px] h-[420px] w-[420px] rounded-full bg-[#c6f1df]" />

          <div className="relative mx-auto max-w-[1440px]">

            <div className="max-w-4xl reveal-left">

              <p className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.3em] text-[#006b3f] shadow-lg ring-1 ring-black/5">
                Medikal Nutrience Journal
              </p>

              <h1 className="mt-7 text-4xl font-black leading-tight text-[#111827] md:text-7xl">
                Informasi Nutrisi dan Edukasi Kesehatan Terpercaya
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-[#64748b] md:text-lg">
                Jelajahi artikel seputar nutrisi, kondisi kesehatan,
                pemulihan, dan tips menjaga kualitas hidup bersama
                Medikal Nutrience.
              </p>

            </div>


            <div className="mt-10 max-w-3xl rounded-full bg-white p-2 shadow-xl ring-1 ring-black/5 reveal">

              <div className="flex items-center gap-4 rounded-full bg-[#f8fcfa] px-6 py-4">

                <span className="text-xl">
                  🔍
                </span>

                <p className="text-sm font-semibold text-[#64748b]">
                  Cari artikel nutrisi, kesehatan, atau kondisi tertentu...
                </p>

              </div>

            </div>


            <div className="mt-8 flex flex-wrap gap-3">

              {articleCategories.slice(1).map((category)=>(
                <span
                  key={category}
                  className="rounded-full bg-white px-5 py-3 text-sm font-black text-[#006b3f] shadow-sm ring-1 ring-black/5"
                >
                  {category}
                </span>
              ))}

            </div>

          </div>

        </section>



        {/* FEATURED */}
        <section className="px-5 pb-16 lg:px-10">

          <div className="mx-auto max-w-[1440px]">

            <div className="overflow-hidden rounded-[3rem] bg-white shadow-2xl ring-1 ring-black/5">

              <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-[420px] w-full object-cover lg:h-full"
                />


                <div className="flex flex-col justify-center p-8 md:p-12">

                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
                    Featured Article
                  </p>


                  <h2 className="mt-5 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
                    {featured.title}
                  </h2>


                  <p className="mt-5 text-base leading-8 text-[#64748b]">
                    {featured.excerpt}
                  </p>


                  <p className="mt-5 text-sm font-bold text-[#64748b]">
                    {featured.date} · {featured.readTime}
                  </p>


                  <a
                    href={`/artikel/${featured.slug}`}
                    className="mt-8 inline-flex w-fit rounded-full bg-[#006b3f] px-8 py-4 text-sm font-black text-white"
                  >
                    Baca Artikel →
                  </a>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* LATEST */}
        <section className="px-5 py-16 lg:px-10">

          <div className="mx-auto max-w-[1440px]">

            <div className="flex items-end justify-between">

              <div>

                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
                  Latest Update
                </p>

                <h2 className="mt-4 text-4xl font-black text-[#111827]">
                  Artikel Terbaru
                </h2>

              </div>

            </div>


            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

              {latest.map((article)=>(
                <ArticleCard
                  key={article.slug}
                  article={article}
                />
              ))}

            </div>

          </div>

        </section>



        {/* POPULAR */}
        <section className="bg-white px-5 py-16 lg:px-10">

          <div className="mx-auto max-w-[1440px]">

            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              Popular Reading
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#111827]">
              Artikel Pilihan
            </h2>


            <div className="mt-8 grid gap-5 md:grid-cols-3">

              {popular.map((article)=>(
                <a
                  key={article.slug}
                  href={`/artikel/${article.slug}`}
                  className="rounded-[2rem] bg-[#f4fbf8] p-6 ring-1 ring-black/5"
                >

                  <p className="text-xs font-black uppercase tracking-wider text-[#006b3f]">
                    {article.category}
                  </p>

                  <h3 className="mt-3 text-xl font-black text-[#111827]">
                    {article.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#64748b]">
                    {article.readTime}
                  </p>

                </a>
              ))}

            </div>

          </div>

        </section>



        {/* CTA */}
        <section className="px-5 py-16 lg:px-10">

          <div className="mx-auto max-w-[1440px] rounded-[3rem] bg-[#006b3f] p-10 text-white md:p-14">

            <h2 className="text-3xl font-black md:text-5xl">
              Masih bingung menentukan kebutuhan nutrisi?
            </h2>

            <p className="mt-5 max-w-2xl text-white/80">
              Konsultasikan kebutuhan Anda dan temukan pilihan nutrisi
              yang sesuai bersama Medikal Nutrience.
            </p>

            <a
              href="/kontak"
              className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-black text-[#006b3f]"
            >
              Konsultasi Sekarang →
            </a>

          </div>

        </section>


      </main>

      <Footer />

    </>
  );
}
