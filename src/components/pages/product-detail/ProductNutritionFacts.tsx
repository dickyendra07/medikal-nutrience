import { NutritionTable } from "@/components/pages/product-detail/NutritionTable";
import type { ProductNutrition } from "@/data/product-nutrition";
import { NutritionHighlights } from "@/components/pages/product-detail/NutritionHighlights";
import { ProductVariantSwitcher } from "@/components/pages/product-detail/ProductVariantSwitcher";


export function ProductNutritionFacts({
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


          {/* HEADER */}

          <div
            className="relative overflow-hidden px-8 py-10 md:px-12 md:py-14"
            style={{
              background:
                `linear-gradient(135deg, ${color}15, #ffffff)`
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



                <h2 className="mt-6 max-w-3xl break-words text-3xl font-black leading-tight text-[#111827] sm:text-4xl md:text-6xl">

                  Nutrition Facts

                  <br />

                  <span
                    style={{
                      color,
                    }}
                  >
                    {data.displayName}
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



              {/* PACKSHOT */}

              <ProductVariantSwitcher color={color} variants={data.variants} />


            </div>


          </div>





          {/* TABLE */}


          <div className="grid gap-8 p-3 sm:p-8 md:p-12 lg:grid-cols-2">


            <NutritionTable
              title="Makronutrisi"
              items={data.nutrition}
              color={color}
            />



            <NutritionTable
              title="Vitamin & Mineral"
              items={data.vitamins}
              color={color}
            />


            {data.components && data.components.length > 0 ? (
              <div className="min-w-0 lg:col-span-2">
                <NutritionTable title="Zat Gizi Lainnya" items={data.components} color={color} />
              </div>
            ) : null}

          </div>







        </div>




        <NutritionHighlights color={color} />


      </div>

    </section>

  );

}
