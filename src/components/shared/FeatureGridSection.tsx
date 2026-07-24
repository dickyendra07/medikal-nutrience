type FeatureGridItem = {
  title: string;
  description?: string;
  href: string;
  icon?: string;
  color?: string;
  soft?: string;
};

type FeatureGridSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  introButton?: string;
  introHref?: string;
  items: FeatureGridItem[];
};

export function FeatureGridSection({
  eyebrow,
  title,
  description,
  introButton,
  introHref,
  items,
}: FeatureGridSectionProps) {
  return (
    <section className="bg-[#f4fbf8] px-5 py-20 lg:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[380px_1fr]">

        <div className="
          relative
          overflow-hidden
          rounded-[2.5rem]
          bg-gradient-to-br
          from-[#006b3f]
          to-[#10b981]
          p-8
          text-white
          shadow-xl
          md:p-10
        ">

          <div className="
            absolute
            -right-20
            -top-20
            h-64
            w-64
            rounded-full
            bg-white/10
            blur-3xl
          "/>


          <div className="relative">

            <p className="
              text-xs
              font-black
              uppercase
              tracking-[0.35em]
              text-white/70
            ">
              {eyebrow}
            </p>


            <h2 className="
              mt-5
              text-4xl
              font-black
              leading-tight
              md:text-5xl
            ">
              {title}
            </h2>


            <p className="
              mt-5
              text-sm
              leading-8
              text-white/80
            ">
              {description}
            </p>


            {introButton && introHref ? (
              <a
                href={introHref}
                className="
                  mt-8
                  inline-flex
                  rounded-full
                  bg-white
                  px-7
                  py-4
                  text-sm
                  font-black
                  text-[#006b3f]
                  shadow-lg
                "
              >
                {introButton}
              </a>
            ) : null}

          </div>

        </div>



        <div className="
          grid
          gap-5
          sm:grid-cols-2
          lg:grid-cols-3
        ">

          {items.map((item)=>(
            <a
              key={item.title}
              href={item.href}
              className="
                group
                rounded-[2rem]
                border
                border-slate-100
                bg-white
                p-6
                shadow-sm
                transition
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  font-black
                  text-xl
                "
                style={{
                  background:item.soft ?? "#e4f8ed",
                  color:item.color ?? "#006b3f",
                }}
              >
                →
              </div>


              <h3 className="
                mt-6
                text-xl
                font-black
                text-[#111827]
              ">
                {item.title}
              </h3>


              {item.description ? (
                <p className="
                  mt-3
                  text-sm
                  leading-7
                  text-slate-500
                ">
                  {item.description}
                </p>
              ) : null}


              <span className="
                mt-6
                inline-flex
                text-xs
                font-black
                uppercase
                tracking-wider
                text-[#006b3f]
              ">
                Selengkapnya →
              </span>

            </a>
          ))}

        </div>

      </div>
    </section>
  );
}
