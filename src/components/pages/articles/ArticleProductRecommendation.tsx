import { productList } from "@/data/products";

export function ArticleProductRecommendation({
  products,
}: {
  products: string[];
}) {
  const recommendedProducts = productList.filter((product) =>
    products.some(
      (item) =>
        item.toLowerCase() === product.name.toLowerCase()
    )
  );

  if (!recommendedProducts.length) {
    return null;
  }

  return (
    <section
      className="
      mt-12
      rounded-[2rem]
      bg-[#f4fbf8]
      p-7
      ring-1
      ring-black/5
      "
    >

      <p
        className="
        text-xs
        font-black
        uppercase
        tracking-[0.25em]
        text-[#006b3f]
        "
      >
        Rekomendasi Nutrisi
      </p>


      <h3
        className="
        mt-4
        text-3xl
        font-black
        text-[#111827]
        "
      >
        Produk yang mungkin sesuai
      </h3>


      <div
        className="
        mt-8
        grid
        gap-6
        md:grid-cols-2
        "
      >

        {recommendedProducts.map((product)=>(
          <a
            key={product.name}
            href={`/produk/${product.name.toLowerCase()}`}
            className="
            rounded-[1.8rem]
            bg-white
            p-6
            shadow-lg
            ring-1
            ring-black/5
            transition
            hover:-translate-y-1
            "
          >

            <h4
              className="
              text-2xl
              font-black
              text-[#111827]
              "
            >
              {product.name}
            </h4>


            <p
              className="
              mt-3
              font-bold
              text-[#006b3f]
              "
            >
              {product.tagline}
            </p>


            <p
              className="
              mt-3
              text-sm
              leading-7
              text-[#64748b]
              "
            >
              {product.description}
            </p>


            <div
              className="
              mt-5
              flex
              flex-wrap
              gap-2
              "
            >

              {product.benefits.map((benefit)=>(
                <span
                  key={benefit}
                  className="
                  rounded-full
                  bg-[#f4fbf8]
                  px-3
                  py-1
                  text-xs
                  font-bold
                  text-[#006b3f]
                  "
                >
                  {benefit}
                </span>
              ))}

            </div>


            <span
              className="
              mt-6
              inline-flex
              font-black
              text-[#006b3f]
              "
            >
              Pelajari Produk →
            </span>


          </a>
        ))}

      </div>

    </section>
  );
}
