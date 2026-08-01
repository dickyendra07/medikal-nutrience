import type { ProductNutrition } from "@/data/product-nutrition";
import { ProductVariantSwitcher } from "@/components/pages/product-detail/ProductVariantSwitcher";
import { ProductClinicalHighlights } from "@/components/pages/product-detail/ProductClinicalHighlights";

export function ProductClinicalNutritionFacts({
  data,
  color,
}: {
  data: ProductNutrition;
  color: string;
}) {
  return (
    <section className="bg-[#f4fbf8] px-5 py-14 lg:px-10">
      <div className="mx-auto w-full max-w-[1440px]">

        <div className="overflow-hidden rounded-[3rem] bg-white shadow-2xl shadow-slate-900/10 ring-1 ring-black/5">

          <div
            className="relative overflow-hidden px-8 py-10 md:px-12 md:py-14"
            style={{
              background: `linear-gradient(135deg, ${color}15, #ffffff)`,
            }}
          >

            <div
              className="absolute right-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full opacity-20"
              style={{
                backgroundColor: color,
              }}
            />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center">

              <div>

                <span
                  className="inline-flex rounded-full px-5 py-2 text-xs font-black uppercase tracking-[0.3em] text-white"
                  style={{
                    backgroundColor: color,
                  }}
                >
                  Informasi Nilai Gizi
                </span>


                <h2 className="mt-6 max-w-3xl text-4xl font-black leading-tight text-[#111827] md:text-6xl">

                  Nutrition Facts

                  <br />

                  <span style={{ color }}>
                    {data.category}
                  </span>

                </h2>


                <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-[#6b7280] md:text-base">
                  {data.subtitle}
                </p>


                <div className="mt-8 inline-flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-lg ring-1 ring-black/5">

                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-xl text-white"
                    style={{
                      backgroundColor: color,
                    }}
                  >
                    🥛
                  </div>

                  <div>
                    <p className="text-sm font-black text-[#111827]">
                      {data.serving}
                    </p>

                    <p className="text-xs font-medium text-[#6b7280]">
                      Takaran saji per konsumsi
                    </p>
                  </div>

                </div>

              </div>


              <ProductVariantSwitcher
                color={color}
                variants={data.variants}
              />

            </div>

          </div>


          <div className="grid gap-8 p-8 md:p-12 lg:grid-cols-2 lg:items-start">

            <div className="space-y-8">

              <NutritionTable
                title="Makronutrisi"
                items={data.nutrition}
                color={color}
              />


              {data.components && data.components.length > 0 ? (
                <NutritionTable
                  title="Komponen Klinis"
                  items={data.components}
                  color={color}
                />
              ) : null}

            </div>


            <NutritionTable
              title="Vitamin & Mineral"
              items={data.vitamins}
              color={color}
            />

          </div>


          {data.disclaimer && (
            <div className="px-8 pb-10 text-center text-xs font-medium leading-6 text-[#6b7280] md:px-12">

              {data.disclaimer.map((item) => (
                <div key={item}>
                  {item}
                </div>
              ))}

            </div>
          )}

        </div>


        {data.highlights && data.highlights.length > 0 ? (
          <ProductClinicalHighlights
            color={color}
            highlights={data.highlights}
          />
        ) : null}

      </div>
    </section>
  );
}



function NutritionTable({
  title,
  items,
  color,
}: {
  title: string;
  items: ProductNutrition["nutrition"];
  color: string;
}) {

  return (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-lg ring-1 ring-black/5">

      <div
        className="px-6 py-5 text-base font-black text-white"
        style={{
          backgroundColor: color,
        }}
      >
        {title}
      </div>


      <div className="divide-y divide-[#eef3f0] p-4">

        {items.map((item) => (

          <div
            key={item.name}
            className="
              grid
              grid-cols-[1fr_auto_auto]
              items-center
              gap-4
              rounded-xl
              px-3
              py-3
              transition
              hover:bg-[#f4fbf8]
            "
          >

            <span className="text-sm font-bold text-[#374151]">
              {item.name}
            </span>


            <span className="text-sm font-black text-[#111827]">
              {item.value} {item.unit}
            </span>


            <span
              className="text-sm font-black"
              style={{
                color,
              }}
            >
              {item.percentage ?? "-"}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}
