import { BmiCalculator } from "@/components/pages/support-system/BmiCalculator";
import { mednutAssets } from "@/data/mednut-assets";
import { fimaRecipes } from "@/data/dapur-sehat-fima";
import {
  communityPrograms,
  patientStories,
  recipes,
} from "@/data/support-system";

type SupportSystemDetailTemplateProps = {
  item: {
    slug: string;
    title: string;
    eyebrow: string;
    description: string;
    heroTitle: string;
    color: string;
    soft: string;
  };
};

const supportVisuals: Record<
  string,
  {
    image: string;
    label: string;
    headline: string;
  }
> = {
  "kalkulator-status-gizi": {
    image: mednutAssets.support.bmiCalculator,
    label: "Nutrition Assessment",
    headline: "Langkah awal memahami kebutuhan tubuh.",
  },
  "dapur-sehat-fima": {
    image: mednutAssets.support.educationHealth,
    label: "Healthy Kitchen",
    headline: "Inspirasi menu sehat untuk keluarga.",
  },
  "kisah-sukses-pasien": {
    image: mednutAssets.support.doctorConsultation,
    label: "Patient Journey",
    headline: "Cerita nyata perjalanan nutrisi pasien.",
  },
  "komunitas-sehat": {
    image: mednutAssets.banners.brandArtboard2,
    label: "Healthy Community",
    headline: "Edukasi dan dukungan untuk hidup lebih sehat.",
  },
};

export function SupportSystemDetailTemplate({
  item,
}: SupportSystemDetailTemplateProps) {
  const isBmi = item.slug === "kalkulator-status-gizi";
  const isStory = item.slug === "kisah-sukses-pasien";
  const isRecipe = item.slug === "dapur-sehat-fima";
  const isCommunity = item.slug === "komunitas-sehat";
  const visual = supportVisuals[item.slug] ?? supportVisuals["dapur-sehat-fima"];

  return (
    <>
      <section className="relative overflow-hidden bg-[#f4fbf8] px-5 py-12 md:py-20 lg:px-10">
        <div
          className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full opacity-20"
          style={{ backgroundColor: item.color }}
        />
        <div
          className="absolute bottom-[-220px] right-[-140px] h-[480px] w-[480px] rounded-full opacity-15"
          style={{ backgroundColor: item.color }}
        />

        <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="reveal-left">
            <p
              className="inline-flex rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.25em] shadow-lg shadow-green-900/8 ring-1 ring-black/5"
              style={{ color: item.color }}
            >
              {item.eyebrow}
            </p>

            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-[#111827] md:text-6xl">
              {item.heroTitle}
            </h1>

            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-[#5f6b76] md:text-lg md:leading-9">
              {item.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#content"
                className="inline-flex items-center justify-center rounded-full px-6 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-0.5"
                style={{ backgroundColor: item.color }}
              >
                Lihat Konten
              </a>

              <a
                href="/kontak"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black shadow-xl shadow-green-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
                style={{ color: item.color }}
              >
                Konsultasi Produk
              </a>
            </div>
          </div>

          <div className="reveal-scale reveal-delay-2">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-5 shadow-2xl shadow-green-900/10 ring-1 ring-black/5 md:p-7">
              <div
                className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full opacity-20"
                style={{ backgroundColor: item.color }}
              />
              <div
                className="absolute bottom-[-120px] left-[-80px] h-72 w-72 rounded-full opacity-10"
                style={{ backgroundColor: item.color }}
              />

              <div className="relative z-10 overflow-hidden rounded-[2rem]">
                <img
                  src={visual.image}
                  alt={item.title}
                  className="h-[360px] w-full object-cover md:h-[480px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003d28]/85 via-[#003d28]/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-white/70">
                    {visual.label}
                  </p>
                  <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight text-white md:text-5xl">
                    {visual.headline}
                  </h2>
                </div>
              </div>

              <div className="relative z-10 mt-5 rounded-[1.8rem] bg-[#f8fcfa] p-5 ring-1 ring-black/5">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#006b3f]">
                  Support System
                </p>
                <p className="mt-3 text-2xl font-black leading-tight text-[#111827]">
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isBmi ? (
        <section id="content" className="bg-[#f4fbf8] px-5 py-12 md:py-16 lg:px-10">
          <BmiCalculator />
        </section>
      ) : null}

      {isStory ? (
        <ListingSection
          color={item.color}
          eyebrow="Patient Stories"
          title="Kisah Sukses Pasien"
          description="Kumpulan cerita dan insight pasien untuk membantu pengunjung memahami pentingnya dukungan nutrisi yang tepat."
          items={patientStories}
        />
      ) : null}

      {isRecipe ? (
        <RecipeSection color={item.color} />
      ) : null}

      {isCommunity ? (
        <ListingSection
          color={item.color}
          eyebrow="Community Program"
          title="Program Komunitas Sehat"
          description="Program edukasi dan dukungan komunitas untuk membangun kebiasaan hidup sehat bersama Medikal Nutrience."
          items={communityPrograms}
        />
      ) : null}

      <section className="px-5 py-14 md:py-20 lg:px-10">
        <div
          className="mx-auto w-full max-w-[1440px] overflow-hidden rounded-[2.5rem] p-8 text-white shadow-2xl md:p-12 reveal-scale"
          style={{ backgroundColor: item.color }}
        >
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-white/70">
                Dukungan Nutrisi
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
                Butuh bantuan memilih produk atau solusi nutrisi?
              </h2>

              <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-white/80 md:text-base md:leading-8">
                Tim Medikal Nutrience dapat membantu memberikan arahan awal
                sesuai kebutuhan tubuh dan kondisi Anda.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <a
                href="/kontak"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-black shadow-xl shadow-black/10 transition hover:-translate-y-0.5"
                style={{ color: item.color }}
              >
                Hubungi Kami
              </a>

              <a
                href="/apotek-resmi"
                className="inline-flex items-center justify-center rounded-full bg-white/15 px-7 py-4 text-sm font-black text-white ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                Apotek Resmi
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


function RecipeSection({ color }: { color: string }) {
  return (
    <section id="content" className="bg-white px-5 py-12 md:py-16 lg:px-10">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end reveal">
          <div>
            <p
              className="text-xs font-black uppercase tracking-[0.35em]"
              style={{ color }}
            >
              Dapur Sehat FIMA
            </p>

            <h2 className="mt-5 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
              Inspirasi menu sehat untuk keluarga Indonesia.
            </h2>
          </div>

          <p className="text-sm font-medium leading-7 text-[#6b7280] md:text-base md:leading-8">
            Contoh konten ini disiapkan sebagai struktur awal agar nantinya mudah
            dikembangkan menjadi artikel, resep, dan edukasi nutrisi melalui CMS.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {fimaRecipes.map((recipe) => (
            <a
              key={recipe.slug}
              href={`/support-system/dapur-sehat-fima/${recipe.slug}`}
              className="group reveal overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-900/8 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-900/10"
            >
              <div className="h-56 overflow-hidden bg-[#f4fbf8]">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  <span
                    className="rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white"
                    style={{ backgroundColor: color }}
                  >
                    {recipe.category}
                  </span>

                  <span className="rounded-full bg-[#f1f5f9] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-[#64748b]">
                    {recipe.readTime}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-black leading-tight text-[#111827]">
                  {recipe.title}
                </h3>

                <p className="mt-4 text-sm font-medium leading-7 text-[#64748b]">
                  {recipe.excerpt}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-black" style={{ color }}>
                  <span>Baca Detail Resep</span>
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ListingSection({
  color,
  eyebrow,
  title,
  description,
  items,
}: {
  color: string;
  eyebrow: string;
  title: string;
  description: string;
  items: {
    title: string;
    description: string;
    tag?: string;
  }[];
}) {
  return (
    <section id="content" className="bg-white px-5 py-12 md:py-16 lg:px-10">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end reveal">
          <div>
            <p
              className="text-xs font-black uppercase tracking-[0.35em]"
              style={{ color }}
            >
              {eyebrow}
            </p>

            <h2 className="mt-5 text-3xl font-black leading-tight text-[#111827] md:text-5xl">
              {title}
            </h2>
          </div>

          <p className="text-sm font-medium leading-7 text-[#6b7280] md:text-base md:leading-8">
            {description}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.title}
              className="group reveal overflow-hidden rounded-[2rem] bg-[#f8fcfa] p-6 shadow-xl shadow-slate-900/8 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl hover:shadow-green-900/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white shadow-lg"
                  style={{ backgroundColor: color }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {item.tag ? (
                  <p
                    className="inline-flex rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white"
                    style={{ backgroundColor: color }}
                  >
                    {item.tag}
                  </p>
                ) : null}
              </div>

              <h3 className="mt-6 text-2xl font-black leading-tight text-[#111827]">
                {item.title}
              </h3>

              <p className="mt-4 text-sm font-medium leading-7 text-[#6b7280]">
                {item.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-black" style={{ color }}>
                <span>Pelajari Detail</span>
                <span className="transition group-hover:translate-x-1">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
