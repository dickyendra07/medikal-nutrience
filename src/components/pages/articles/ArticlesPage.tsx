import { ArticleCard } from "@/components/pages/articles/ArticleCard";
import { articles, articleCategories } from "@/data/articles";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const topics = [
  {
    title: "Ginjal",
    description: "Informasi nutrisi untuk mendukung kebutuhan pasien ginjal.",
    category: "Ginjal",
  },
  {
    title: "Pemulihan",
    description: "Panduan nutrisi setelah sakit atau tindakan medis.",
    category: "Pemulihan",
  },
  {
    title: "Hati / Liver",
    description: "Memahami pentingnya dukungan nutrisi untuk kesehatan hati.",
    category: "Hati / Liver",
  },
  {
    title: "Anak",
    description: "Tips nutrisi dan tumbuh kembang anak.",
    category: "Anak",
  },
];

const products = [
  {
    name: "Peptisol",
    description: "Nutrisi tinggi protein untuk mendukung masa pemulihan.",
  },
  {
    name: "Nephrisol",
    description: "Pilihan nutrisi untuk kebutuhan pasien ginjal.",
  },
  {
    name: "Entrakid",
    description: "Dukungan nutrisi untuk tumbuh kembang anak.",
  },
];

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

        <section className="relative overflow-hidden px-5 py-16 md:py-24 lg:px-10">

          <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#d9f3e8]" />
          <div className="absolute right-[-160px] bottom-[-160px] h-[420px] w-[420px] rounded-full bg-[#c6f1df]" />

          <div className="relative mx-auto max-w-[1440px]">

            <div className="max-w-5xl reveal-left">

              <p className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.3em] text-[#006b3f] shadow-lg ring-1 ring-black/5">
                Medikal Nutrience Journal
              </p>

              <h1 className="mt-7 text-4xl font-black leading-[1.05] text-[#111827] md:text-7xl">
                Informasi Nutrisi dan Edukasi Kesehatan untuk Kehidupan Lebih Baik
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-[#64748b] md:text-lg">
                Temukan artikel terpercaya seputar nutrisi klinis,
                gaya hidup sehat, kondisi kesehatan, dan informasi produk
                Medikal Nutrience.
              </p>

            </div>


            <div className="mt-10 flex flex-wrap gap-3">

              {articleCategories.map((category)=>(
                <span
                  key={category}
                  className="rounded-full bg-white px-5 py-3 text-sm font-black text-[#006b3f] shadow-sm ring-1 ring-black/5"
                >
                  {category}
                </span>
              ))}

            </div>


            <div className="mt-12 grid gap-5 md:grid-cols-3">

              {[
                "Artikel Edukasi Nutrisi",
                "Informasi Berbasis Kesehatan",
                "Panduan Memilih Nutrisi",
              ].map((item)=>(
                <div
                  key={item}
                  className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-black/5"
                >
                  <p className="text-lg font-black text-[#111827]">
                    {item}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </section>



        <section className="px-5 pb-16 lg:px-10">

          <div className="mx-auto max-w-[1440px]">

            <div className="overflow-hidden rounded-[3rem] bg-white shadow-2xl ring-1 ring-black/5">

              <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-[420px] w-full object-cover"
                />

                <div className="flex flex-col justify-center p-8 md:p-12">

                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
                    Featured Article
                  </p>

                  <h2 className="mt-5 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
                    {featured.title}
                  </h2>

                  <p className="mt-5 leading-8 text-[#647slate]">
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



        <section className="px-5 py-16 lg:px-10">

          <div className="mx-auto max-w-[1440px]">

            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              Explore Topics
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#111827]">
              Jelajahi Topik Nutrisi
            </h2>


            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              {topics.map((topic)=>(
                <div
                  key={topic.title}
                  className="rounded-[2rem] bg-white p-7 shadow-xl ring-1 ring-black/5 transition hover:-translate-y-2"
                >

                  <p className="text-xs font-black uppercase tracking-wider text-[#006b3f]">
                    {topic.category}
                  </p>

                  <h3 className="mt-4 text-2xl font-black text-[#111827]">
                    {topic.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#64748b]">
                    {topic.description}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </section>



        <section className="px-5 py-16 lg:px-10">

          <div className="mx-auto max-w-[1440px]">

            <h2 className="text-4xl font-black text-[#111827]">
              Artikel Terbaru
            </h2>


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



        <section className="bg-white px-5 py-16 lg:px-10">

          <div className="mx-auto max-w-[1440px]">

            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              Popular Reading
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#111827]">
              Artikel Pilihan
            </h2>


            <div className="mt-8 space-y-4">

              {popular.map((article,index)=>(
                <a
                  key={article.slug}
                  href={`/artikel/${article.slug}`}
                  className="flex items-center gap-6 rounded-3xl bg-[#f4fbf8] p-6"
                >

                  <span className="text-4xl font-black text-[#006b3f]/30">
                    0{index+1}
                  </span>

                  <div>
                    <h3 className="text-xl font-black text-[#111827]">
                      {article.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#64748b]">
                      {article.readTime}
                    </p>
                  </div>

                </a>
              ))}

            </div>

          </div>

        </section>



        <section className="px-5 py-16 lg:px-10">

          <div className="mx-auto max-w-[1440px]">

            <div className="rounded-[3rem] bg-white p-10 shadow-xl ring-1 ring-black/5">

              <h2 className="text-4xl font-black text-[#111827]">
                Rekomendasi Nutrisi
              </h2>


              <div className="mt-8 grid gap-5 md:grid-cols-3">

                {products.map((product)=>(
                  <div
                    key={product.name}
                    className="rounded-3xl bg-[#f4fbf8] p-6"
                  >
                    <h3 className="text-2xl font-black text-[#111827]">
                      {product.name}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#64748b]">
                      {product.description}
                    </p>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </section>


        <section className="px-5 pb-20 lg:px-10">

          <div className="mx-auto max-w-[1440px] rounded-[3rem] bg-[#006b3f] p-10 text-white md:p-14">

            <h2 className="text-3xl font-black md:text-5xl">
              Temukan pendekatan nutrisi yang sesuai dengan kebutuhan Anda.
            </h2>

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
