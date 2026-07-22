"use client";

export function AssessmentLoading() {
  return (
    <div className="
      flex
      min-h-[520px]
      flex-col
      items-center
      justify-center
      text-center
      px-6
    ">

      <div className="
        relative
        flex
        h-32
        w-32
        items-center
        justify-center
      ">

        <div className="
          absolute
          inset-0
          animate-spin
          rounded-full
          border-[6px]
          border-[#e4f8ed]
          border-t-[#006b3f]
        "/>


        <div className="
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-[#e4f8ed]
        ">

          <div className="
            h-8
            w-8
            animate-pulse
            rounded-full
            bg-[#006b3f]
          "/>

        </div>

      </div>


      <p className="
        mt-10
        text-xs
        font-black
        tracking-[0.3em]
        text-[#006b3f]
      ">
        ANALYZING NUTRITION PROFILE
      </p>


      <h2 className="
        mt-4
        text-3xl
        font-black
        text-slate-900
      ">
        Menganalisa kebutuhan nutrisi Anda
      </h2>


      <p className="
        mt-4
        max-w-md
        text-sm
        leading-7
        text-slate-500
      ">
        Kami sedang mencocokkan kondisi,
        kebutuhan nutrisi, dan rekomendasi
        produk yang paling sesuai untuk Anda.
      </p>


      <div className="
        mt-8
        flex
        gap-2
      ">
        {[1,2,3].map((item)=>(
          <span
            key={item}
            className="
              h-2
              w-2
              animate-bounce
              rounded-full
              bg-[#006b3f]
            "
            style={{
              animationDelay:`${item * 150}ms`
            }}
          />
        ))}
      </div>


    </div>
  );
}
