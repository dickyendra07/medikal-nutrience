import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  fimaRecipes,
  getFimaRecipeBySlug,
} from "@/data/dapur-sehat-fima";

export function generateStaticParams() {
  return fimaRecipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default async function DapurSehatFimaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getFimaRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="bg-[#f4fbf8]">
        <section className="relative overflow-hidden px-5 py-12 md:py-20 lg:px-10">
          <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#d9f3e8]" />
          <div className="absolute bottom-[-220px] right-[-140px] h-[480px] w-[480px] rounded-full bg-[#c6f1df]" />

          <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="reveal-left">
              <p className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-[#006b3f] shadow-lg shadow-green-900/8 ring-1 ring-black/5">
                {recipe.category}
              </p>

              <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-[#111827] md:text-6xl">
                {recipe.title}
              </h1>

              <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[#5f6b76] md:text-lg md:leading-9">
                {recipe.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-md shadow-green-900/5 ring-1 ring-black/5">
                  Dapur Sehat FIMA
                </span>
                <span className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-md shadow-green-900/5 ring-1 ring-black/5">
                  {recipe.readTime}
                </span>
              </div>
            </div>

            <div className="reveal-scale reveal-delay-2">
              <div className="overflow-hidden rounded-[2.5rem] bg-white p-5 shadow-2xl shadow-green-900/10 ring-1 ring-black/5">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-[420px] w-full rounded-[2rem] object-cover md:h-[520px]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 lg:px-10">
          <div className="mx-auto grid w-full max-w-[1180px] gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/8 ring-1 ring-black/5">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
                  Catatan Nutrisi
                </p>

                <div className="mt-5 space-y-4">
                  {recipe.nutritionNotes.map((note) => (
                    <div
                      key={note}
                      className="rounded-2xl bg-[#f8fcfa] p-4 text-sm font-bold leading-7 text-[#64748b] ring-1 ring-black/5"
                    >
                      {note}
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-xs font-medium leading-6 text-[#94a3b8]">
                  Konten ini bersifat edukatif dan bukan pengganti konsultasi
                  dengan dokter atau ahli gizi.
                </p>
              </div>
            </aside>

            <article className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/8 ring-1 ring-black/5 md:p-8">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
                  Bahan
                </p>

                <ul className="mt-5 grid gap-3">
                  {recipe.ingredients.map((ingredient) => (
                    <li
                      key={ingredient}
                      className="rounded-2xl bg-[#f8fcfa] px-5 py-4 text-sm font-bold leading-7 text-[#334155] ring-1 ring-black/5"
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
                  Cara Membuat
                </p>

                <div className="mt-5 grid gap-4">
                  {recipe.steps.map((step, index) => (
                    <div
                      key={step}
                      className="grid gap-4 rounded-[1.5rem] bg-[#f8fcfa] p-5 ring-1 ring-black/5 md:grid-cols-[56px_1fr]"
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#006b3f] text-lg font-black text-white">
                        {index + 1}
                      </span>

                      <p className="text-sm font-bold leading-7 text-[#334155]">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 rounded-[2rem] bg-[#006b3f] p-6 text-white">
                <h2 className="text-2xl font-black leading-tight">
                  Butuh rekomendasi nutrisi yang lebih sesuai?
                </h2>

                <p className="mt-3 text-sm font-medium leading-7 text-white/80">
                  Konsultasikan kebutuhan Anda untuk mendapatkan arahan awal
                  produk Medikal Nutrience.
                </p>

                <a
                  href="/kontak"
                  className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-black text-[#006b3f]"
                >
                  Konsultasi Sekarang
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
