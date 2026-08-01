import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Article } from "@/data/articles";

export function ArticleDetailPage({
  article,
}: {
  article: Article;
}) {
  return (
    <>
      <Navbar />

      <main className="bg-[#f4fbf8]">

        <section className="relative overflow-hidden px-5 py-14 lg:px-10 md:py-24">

          <div className="absolute left-[-160px] top-[-160px] h-[420px] w-[420px] rounded-full bg-[#d9f3e8]" />
          <div className="absolute right-[-120px] top-20 h-[380px] w-[380px] rounded-full bg-[#c6f1df]" />

          <div className="relative mx-auto max-w-[1200px]">

            <div className="reveal-left">

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
                {article.category}
              </p>


              <h1 className="
              mt-8
              max-w-5xl
              text-4xl
              font-black
              leading-[1.05]
              text-[#111827]
              md:text-6xl
              ">
                {article.title}
              </h1>


              <div className="
              mt-6
              flex
              flex-wrap
              gap-4
              text-sm
              font-bold
              text-[#64748b]
              ">
                <span>
                  {article.date}
                </span>

                <span>
                  •
                </span>

                <span>
                  {article.readTime}
                </span>

                <span>
                  •
                </span>

                <span>
                  {article.author}
                </span>
              </div>

            </div>


            <div className="
            mt-12
            overflow-hidden
            rounded-[2.5rem]
            bg-white
            shadow-2xl
            ring-1
            ring-black/5
            reveal
            ">

              <img
                src={article.image}
                alt={article.title}
                className="
                h-[420px]
                w-full
                object-cover
                md:h-[600px]
                "
              />

            </div>


            <div className="
            mt-12
            grid
            gap-10
            lg:grid-cols-[1fr_320px]
            ">

              <article className="
              rounded-[2rem]
              bg-white
              p-7
              shadow-xl
              ring-1
              ring-black/5
              md:p-12
              ">


                <div className="
                rounded-3xl
                bg-[#f4fbf8]
                p-6
                ">

                  <p className="
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.25em]
                  text-[#006b3f]
                  ">
                    Ringkasan
                  </p>


                  <ul className="
                  mt-5
                  space-y-3
                  ">

                    {article.keyPoints.map((item)=>(
                      <li
                        key={item}
                        className="
                        flex
                        gap-3
                        text-sm
                        font-bold
                        leading-7
                        text-[#334155]
                        "
                      >
                        <span className="
                        text-[#006b3f]
                        ">
                          ✓
                        </span>

                        {item}

                      </li>
                    ))}

                  </ul>

                </div>



                <div className="mt-12 space-y-10">

                  {article.content.map((section)=>(
                    <section key={section.heading}>

                      <h2 className="
                      text-2xl
                      font-black
                      text-[#111827]
                      md:text-3xl
                      ">
                        {section.heading}
                      </h2>


                      <div className="
                      mt-5
                      space-y-5
                      text-base
                      leading-8
                      text-[#475569]
                      ">

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



              <aside className="
              h-fit
              rounded-[2rem]
              bg-gradient-to-br
              from-[#006b3f]
              via-[#087a4c]
              to-[#10b981]
              p-7
              text-white
              shadow-xl
              ">

                <p className="
                text-xs
                font-black
                uppercase
                tracking-[0.25em]
                text-white/70
                ">
                  Butuh Bantuan?
                </p>


                <h3 className="
                mt-5
                text-3xl
                font-black
                leading-tight
                ">
                  Konsultasikan kebutuhan nutrisi Anda
                </h3>


                <p className="
                mt-5
                text-sm
                leading-7
                text-white/80
                ">
                  Dapatkan arahan awal untuk menemukan pilihan nutrisi yang sesuai.
                </p>


                <a
                  href="/kontak"
                  className="
                  mt-7
                  inline-flex
                  rounded-full
                  bg-white
                  px-6
                  py-4
                  text-sm
                  font-black
                  text-[#006b3f]
                  "
                >
                  Konsultasi Sekarang →
                </a>

              </aside>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}
