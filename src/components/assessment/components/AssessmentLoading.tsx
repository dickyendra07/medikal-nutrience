"use client";

export function AssessmentLoading() {

  return (
    <div className="
      flex
      min-h-[420px]
      flex-col
      items-center
      justify-center
      text-center
    ">


      <div className="
        relative
        flex
        h-28
        w-28
        items-center
        justify-center
      ">

        <div className="
          absolute
          inset-0
          animate-spin
          rounded-full
          border-4
          border-[#e4f8ed]
          border-t-[#006b3f]
        "/>


        <div className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-[#e4f8ed]
        ">

          <div className="
            h-5
            w-5
            animate-pulse
            rounded-full
            bg-[#006b3f]
          "/>

        </div>

      </div>



      <h2 className="
        mt-8
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
        Kami sedang mencocokkan kondisi Anda dengan rekomendasi nutrisi yang sesuai.
      </p>



      <div className="
        mt-8
        flex
        gap-3
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
