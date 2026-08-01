import Image from "next/image";

export type ClinicalHighlight = {
  title: string;
  description: string;
  icon: string;
};

export function ProductClinicalHighlights({
  highlights,
  color,
}: {
  highlights: ClinicalHighlight[];
  color: string;
}) {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <section className="bg-white px-5 py-14 lg:px-10">

      <div className="mx-auto w-full max-w-[1440px]">

        <div
          className="
            overflow-hidden
            rounded-[3rem]
            border
            border-black/5
            bg-[#f8fbfa]
            p-8
            shadow-xl
            md:p-12
          "
        >

          <div className="mb-10 max-w-2xl">

            <span
              className="
                inline-flex
                rounded-full
                px-4
                py-2
                text-xs
                font-black
                uppercase
                tracking-wider
              "
              style={{
                backgroundColor: `${color}15`,
                color,
              }}
            >
              Clinical Highlights
            </span>


            <h2
              className="
                mt-5
                text-3xl
                font-black
                tracking-tight
                text-[#111827]
                md:text-4xl
              "
            >
              Keunggulan Nutrisi Utama
            </h2>


            <p className="mt-4 text-base font-medium leading-7 text-[#6b7280]">
              Formulasi nutrisi yang dirancang untuk mendukung kebutuhan
              pasien sesuai kondisi klinis.
            </p>

          </div>


          <div
            className="
              grid
              gap-5
              md:grid-cols-2
              lg:grid-cols-4
            "
          >

            {highlights.map((item) => (

              <article
                key={item.title}
                className="
                  rounded-[2rem]
                  bg-white
                  p-6
                  shadow-lg
                  ring-1
                  ring-black/5
                  transition
                  duration-300
                  hover:-translate-y-1
                "
              >

                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                  "
                  style={{
                    backgroundColor: `${color}12`,
                  }}
                >

                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />

                </div>


                <h3 className="mt-5 text-lg font-black text-[#111827]">
                  {item.title}
                </h3>


                <p className="mt-3 text-sm font-medium leading-6 text-[#6b7280]">
                  {item.description}
                </p>


              </article>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}
