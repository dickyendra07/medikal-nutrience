import type { ProductNutrition } from "@/data/product-nutrition";

function InformationIcon({ type }: { type: string }) {
  const common =
    "h-8 w-8 stroke-current fill-none stroke-[1.8]";

  if (type === "serving") {
    return (
      <svg viewBox="0 0 24 24" className={common}>
        <path d="M7 3h10l-1 17H8L7 3Z" />
        <path d="M8 7h8" />
      </svg>
    );
  }

  if (type === "water") {
    return (
      <svg viewBox="0 0 24 24" className={common}>
        <path d="M12 3s6 6.4 6 11a6 6 0 1 1-12 0c0-4.6 6-11 6-11Z" />
      </svg>
    );
  }

  if (type === "science") {
    return (
      <svg viewBox="0 0 24 24" className={common}>
        <path d="M9 3h6" />
        <path d="M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
        <path d="M8 15h8" />
      </svg>
    );
  }

  if (type === "box") {
    return (
      <svg viewBox="0 0 24 24" className={common}>
        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
        <path d="M4 7.5 12 12l8-4.5" />
        <path d="M12 12v9" />
      </svg>
    );
  }

  if (type === "package") {
    return (
      <svg viewBox="0 0 24 24" className={common}>
        <path d="M5 7h14v14H5z" />
        <path d="M8 7V4h8v3" />
        <path d="M9 12h6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common}>
      <path d="M4 21h16" />
      <path d="M6 21V8l6-5 6 5v13" />
      <path d="M10 21v-5h4v5" />
    </svg>
  );
}


export function ProductInformationSection({
  data,
  color,
}: {
  data: ProductNutrition;
  color: string;
}) {

  const info = data.productInformation;

  if (!info) return null;


  const specifications = [
    {
      title: "Cara Penyajian",
      value: info.servingInstruction,
      icon: "serving",
    },
    {
      title: "Takaran Sajian",
      value: info.servingPer100ml,
      icon: "water",
    },
    {
      title: "Osmolalitas",
      value: info.osmolality,
      icon: "science",
    },
    {
      title: "Sediaan",
      value: info.availability,
      icon: "box",
    },
    {
      title: "Kemasan",
      value: info.packaging,
      icon: "package",
    },
    {
      title: "Penyimpanan",
      value: info.storage,
      icon: "storage",
    },
  ].filter((item) => item.value);



  return (
    <section className="bg-white px-5 py-20 lg:px-10">

      <div className="mx-auto w-full max-w-[1440px]">


        <div className="reveal rounded-[3.5rem] bg-[#f4fbf8] p-8 md:p-16 lg:p-20">


          <div className="mx-auto max-w-4xl text-center">

            <span
              className="inline-flex rounded-full px-6 py-3 text-xs font-black uppercase tracking-[0.35em] text-white"
              style={{
                backgroundColor: color,
              }}
            >
              Informasi Produk
            </span>


            <h2 className="mt-7 text-4xl font-black tracking-tight text-[#111827] md:text-6xl">
              Mengenal Produk
            </h2>


            <p className="mt-7 text-base font-medium leading-8 text-[#5f6b76] md:text-lg">
              {info.background}
            </p>

          </div>



          {specifications.length > 0 ? (

            <div className="mt-16">

              <h3 className="text-center text-2xl font-black text-[#111827] md:text-3xl">
                Detail Produk
              </h3>


              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {specifications.map((item, index) => (

                  <div
                    key={item.title}
                    className={`reveal-delay-${Math.min(index + 1, 3)} rounded-[2rem] bg-white p-7 shadow-lg ring-1 ring-black/5 transition duration-300 hover:-translate-y-1`}
                  >

                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{
                        backgroundColor: `${color}15`,
                        color,
                      }}
                    >
                      <InformationIcon type={item.icon} />
                    </div>


                    <h4
                      className="mt-6 text-xs font-black uppercase tracking-[0.25em]"
                      style={{
                        color,
                      }}
                    >
                      {item.title}
                    </h4>


                    <p className="mt-4 text-sm font-medium leading-7 text-[#4b5563]">
                      {item.value}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          ) : null}




          {data.variants && data.variants.length > 0 ? (

            <div className="mt-20">

              <h3 className="text-center text-2xl font-black text-[#111827] md:text-3xl">
                Varian Produk
              </h3>


              <div className="mt-10 grid gap-8 md:grid-cols-2">

                {data.variants.map((variant, index) => (

                  <div
                    key={`${variant.name}-${index}`}
                    className="reveal-scale rounded-[2.5rem] bg-white p-8 text-center shadow-xl ring-1 ring-black/5"
                  >

                    <div className="flex h-[320px] items-center justify-center">

                      <img
                        src={variant.image}
                        alt={variant.name}
                        className="h-full w-auto object-contain drop-shadow-2xl transition duration-500 hover:scale-105"
                      />

                    </div>


                    <h4
                      className="mt-6 text-lg font-black"
                      style={{
                        color,
                      }}
                    >
                      {variant.name}
                    </h4>

                  </div>

                ))}

              </div>

            </div>

          ) : null}




          {info.composition ? (

            <div className="mt-20 rounded-[2.5rem] bg-white p-8 shadow-xl ring-1 ring-black/5 md:p-12">


              <h3
                className="text-2xl font-black"
                style={{
                  color,
                }}
              >
                Komposisi
              </h3>


              <p className="mt-6 text-base font-medium leading-8 text-[#4b5563]">
                {info.composition}
              </p>



              {info.specificComposition &&
              info.specificComposition.length > 0 ? (

                <div className="mt-10">

                  <h4 className="text-xs font-black uppercase tracking-[0.25em] text-[#111827]">
                    Kandungan Utama
                  </h4>


                  <div className="mt-5 flex flex-wrap gap-3">

                    {info.specificComposition.map((item) => (

                      <span
                        key={item}
                        className="rounded-full bg-[#f4fbf8] px-5 py-3 text-sm font-black text-[#374151]"
                      >
                        {item}
                      </span>

                    ))}

                  </div>

                </div>

              ) : null}


            </div>

          ) : null}



        </div>


      </div>

    </section>
  );
}
