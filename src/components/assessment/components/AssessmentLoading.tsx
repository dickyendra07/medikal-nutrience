"use client";

export function AssessmentLoading() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#e4f8ed] border-t-[#006b3f]" />

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e4f8ed]">
          <div className="h-5 w-5 animate-pulse rounded-full bg-[#006b3f]" />
        </div>
      </div>

      <h2 className="mt-8 text-3xl font-black text-slate-900">
        Menganalisa kebutuhan nutrisi Anda
      </h2>

      <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
        Kami sedang mencocokkan kebutuhan Anda dengan solusi nutrisi
        yang sesuai berdasarkan jawaban assessment.
      </p>
    </div>
  );
}
