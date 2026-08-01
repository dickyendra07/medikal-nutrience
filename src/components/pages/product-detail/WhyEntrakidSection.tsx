export function WhyEntrakidSection({
  color,
}: {
  color: string;
}) {

  const items = [
    {
      title: "Perkembangan Otak",
      description:
        "Diperkaya DHA dan Omega 3 untuk mendukung perkembangan fungsi otak anak.",
      icon:
        "/images/mednut/products/icons/entrakid/dha-omega-3.svg",
    },
    {
      title: "Pertumbuhan Optimal",
      description:
        "Mengandung protein berkualitas untuk membantu mendukung pertumbuhan anak.",
      icon:
        "/images/mednut/products/icons/entrakid/dual-protein-source.svg",
    },
    {
      title: "Daya Tahan Tubuh",
      description:
        "Kombinasi vitamin dan mineral penting untuk membantu menjaga kesehatan anak.",
      icon:
        "/images/mednut/products/icons/entrakid/vitamin-mineral.svg",
    },
    {
      title: "Pencernaan Sehat",
      description:
        "Serat pangan Inulin membantu mendukung kesehatan sistem pencernaan.",
      icon:
        "/images/mednut/products/icons/entrakid/serat-pangan-inulin.svg",
    },
  ];


  return (

    <section className="bg-white px-5 py-14 lg:px-10">

      <div className="mx-auto w-full max-w-[1440px]">


        <div className="rounded-[3rem] bg-[#f8fcfa] p-8 shadow-xl shadow-slate-900/8 ring-1 ring-black/5 md:p-12">


          <div className="mx-auto max-w-3xl text-center">


            <p
              className="text-xs font-black uppercase tracking-[0.35em]"
              style={{
                color,
              }}
            >
              Mengapa Entrakid?
            </p>


            <h2 className="mt-5 text-3xl font-black leading-tight text-[#111827] md:text-5xl">

              Nutrisi Lengkap untuk
              
              <br />

              <span style={{ color }}>
                Tumbuh Kembang Anak
              </span>

            </h2>


            <p className="mt-5 text-sm font-medium leading-7 text-[#6b7280] md:text-base">

              Entrakid diformulasikan dengan kombinasi nutrisi
              penting untuk membantu mendukung kebutuhan anak
              pada masa pertumbuhan.

            </p>


          </div>



          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">


            {items.map((item) => (

              <article
                key={item.title}
                className="
                  group
                  rounded-[2rem]
                  bg-white
                  p-6
                  text-center
                  shadow-lg
                  shadow-slate-900/5
                  ring-1
                  ring-black/5
                  transition
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-2xl
                "
              >


                <div
                  className="
                    mx-auto
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-[1.8rem]
                    bg-[#f4fbf8]
                    p-4
                    transition
                    duration-300
                    group-hover:scale-110
                  "
                >

                  <img
                    src={item.icon}
                    alt={item.title}
                    className="h-full w-full object-contain"
                  />

                </div>



                <h3 className="mt-6 text-base font-black text-[#111827]">

                  {item.title}

                </h3>



                <p className="mt-3 text-sm font-medium leading-6 text-[#6b7280]">

                  {item.description}

                </p>



                <div
                  className="mx-auto mt-6 h-1 w-12 rounded-full"
                  style={{
                    backgroundColor: color,
                  }}
                />


              </article>

            ))}


          </div>


        </div>


      </div>

    </section>

  );

}
