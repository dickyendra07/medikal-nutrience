import Image from "next/image";
import Link from "next/link";

import type { FimaRecipe } from "@/data/dapur-sehat-fima";

const nutritionLabels = [
  ["energy", "Energi"],
  ["protein", "Protein"],
  ["fat", "Lemak"],
  ["carbohydrate", "Karbohidrat"],
  ["fiber", "Serat"],
] as const;

function RecipeCard({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/6 ring-1 ring-black/5 md:p-8 ${className}`}
    >
      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#006b3f]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-black leading-tight text-[#111827] md:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function RecipeDetail({ recipe }: { recipe: FimaRecipe }) {
  const ingredientGroups =
    recipe.ingredientGroups ?? [
      {
        title: "Bahan",
        items: recipe.ingredients.map((ingredient) => ingredient.name),
      },
    ];

  return (
    <main className="overflow-hidden bg-[#f4fbf8]">
      <section className="relative px-5 pb-10 pt-12 md:pb-14 md:pt-18 lg:px-10">
        <div className="absolute left-[-12rem] top-[-13rem] h-[28rem] w-[28rem] rounded-full bg-[#d9f3e8]" />
        <div className="absolute right-[-12rem] top-20 h-[30rem] w-[30rem] rounded-full bg-[#e6f7ef]" />

        <div className="relative mx-auto w-full max-w-[1320px]">
          <header className="max-w-5xl">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#006b3f] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white">
                {recipe.category}
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#006b3f] ring-1 ring-black/5">
                {recipe.readTime}
              </span>
            </div>

            <h1 className="mt-6 text-[2.5rem] font-black leading-[1.02] tracking-tight text-[#111827] md:text-6xl lg:text-7xl">
              {recipe.title}
            </h1>
            {recipe.subtitle ? (
              <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-[#5f6b76] md:text-lg">
                {recipe.subtitle}
              </p>
            ) : null}
          </header>

          <div className="mt-9 grid gap-6 lg:grid-cols-[1.45fr_0.55fr] lg:items-stretch">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-green-900/10 ring-1 ring-black/5 md:rounded-[2.5rem]">
              <Image
                src={recipe.image}
                alt={`Sajian ${recipe.title}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 68vw"
                className="object-cover"
              />
            </div>

            {recipe.product ? (
              <Link
                href={`/produk/${recipe.product.slug}`}
                className="group flex min-h-64 flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#006b3f] via-[#087a4c] to-[#10b981] p-6 text-white shadow-2xl shadow-green-900/15 md:p-8"
              >
                <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/70">
                  Produk Terkait
                </p>
                <div className="relative mt-4 min-h-48 flex-1 rounded-[1.5rem] bg-white/95">
                  <Image
                    src={recipe.product.image}
                    alt={recipe.product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 28vw"
                    className="object-contain p-4 transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-white/70">Pilihan nutrisi</p>
                    <h2 className="mt-1 text-3xl font-black">{recipe.product.name}</h2>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#006b3f] transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 lg:px-10 lg:pb-24">
        <div className="mx-auto grid w-full max-w-[1320px] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <RecipeCard eyebrow="Persiapan" title="Bahan">
            <div className="mt-6 grid gap-5">
              {ingredientGroups.map((group) => (
                <div key={group.title} className="rounded-[1.5rem] bg-[#f4fbf8] p-5 ring-1 ring-black/5">
                  <h3 className="text-lg font-black text-[#006b3f]">{group.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {group.items.map((ingredient) => (
                      <li key={ingredient} className="flex gap-3 text-sm font-semibold leading-6 text-[#475569]">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#8bd450]" />
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </RecipeCard>

          <RecipeCard eyebrow="Langkah Memasak" title="Proses Pembuatan">
            <ol className="mt-6 grid gap-4">
              {recipe.steps.map((step, index) => (
                <li
                  key={step}
                  className="grid grid-cols-[3rem_1fr] gap-4 rounded-[1.5rem] bg-[#f4fbf8] p-4 ring-1 ring-black/5 md:grid-cols-[3.5rem_1fr] md:p-5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#006b3f] text-base font-black text-white md:h-14 md:w-14">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="self-center text-sm font-semibold leading-7 text-[#475569]">{step}</p>
                </li>
              ))}
            </ol>
          </RecipeCard>

          <RecipeCard eyebrow="Informasi Menu" title="Kandungan Gizi" className="lg:col-span-2">
            {recipe.nutrition ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {nutritionLabels.map(([key, label]) => (
                  <div key={key} className="rounded-[1.4rem] bg-[#f4fbf8] p-5 ring-1 ring-black/5">
                    <h3 className="text-sm font-black text-[#006b3f]">{label}</h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-[#64748b]">
                      {recipe.nutrition?.[key] ?? "Menyesuaikan bahan dan porsi."}
                    </p>
                  </div>
                ))}

                <div className="rounded-[1.4rem] bg-[#f4fbf8] p-5 ring-1 ring-black/5">
                  <h3 className="text-sm font-black text-[#006b3f]">Vitamin</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-[#64748b]">
                    {recipe.nutrition.vitamins?.join(", ") || "Menyesuaikan bahan dan porsi."}
                  </p>
                </div>
                <div className="rounded-[1.4rem] bg-[#f4fbf8] p-5 ring-1 ring-black/5">
                  <h3 className="text-sm font-black text-[#006b3f]">Mineral</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-[#64748b]">
                    {recipe.nutrition.minerals?.join(", ") || "Menyesuaikan bahan dan porsi."}
                  </p>
                </div>
              </div>
            ) : null}

            <div className="mt-6 rounded-[1.5rem] border border-[#006b3f]/10 bg-[#eaf8f1] p-5 text-xs font-medium leading-6 text-[#4b6358]">
              {recipe.nutritionNotes.join(" ")} Informasi ini bersifat edukatif dan bukan pengganti konsultasi dengan dokter atau ahli gizi.
            </div>
          </RecipeCard>
        </div>
      </section>
    </main>
  );
}
