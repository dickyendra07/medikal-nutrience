import type { ProductHighlight } from "@/data/product-nutrition";

export function NutritionHighlights({
  color,
  items,
  title,
  subtitle,
}: {
  color: string;
  items?: ProductHighlight[];
  title?: string;
  subtitle?: string;
}) {

  if (!items || items.length === 0) {
    return null;
  }


  return (
    <section className="mt-10 overflow-hidden rounded-[3rem] bg-white p-8 shadow-2xl shadow-slate-900/10 ring-1 ring-black/5 md:p-12">

      <div className="mx-auto max-w-3xl text-center">

        <p
          className="text-xs font-black uppercase tracking-[0.35em]"
          style={{ color }}
        >
          Kandungan Utama
        </p>


        <h3 className="mt-4 text-3xl font-black leading-tight text-[#111827] md:text-5xl">

          {title || "Keunggulan Utama"}

        </h3>


        <p className="mt-5 text-sm font-medium leading-7 text-[#6b7280] md:text-base">

          {subtitle}

        </p>


      </div>



      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">


        {items.map((item) => (

          <article
            key={item.title}
            className="
              group
              rounded-[2rem]
              bg-[#f8fcfa]
              p-6
              text-center
              ring-1
              ring-black/5
              transition
              duration-300
              hover:-translate-y-2
              hover:shadow-xl
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
                rounded-[1.7rem]
                bg-white
                p-4
                shadow-lg
                ring-1
                ring-black/5
                transition
                duration-300
                group-hover:scale-105
              "
            >

              <img
                src={item.icon}
                alt={item.title}
                className="h-full w-full object-contain"
              />

            </div>


            <h4 className="mt-6 text-base font-black leading-tight text-[#111827]">

              {item.title}

            </h4>


            <p className="mt-3 text-sm font-medium leading-6 text-[#6b7280]">

              {item.description}

            </p>


            <div
              className="mx-auto mt-5 h-1 w-12 rounded-full"
              style={{
                backgroundColor: color,
              }}
            />

          </article>

        ))}


      </div>


    </section>
  );
}
