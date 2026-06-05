import { BmiCalculator } from "@/components/pages/support-system/BmiCalculator";
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

export function SupportSystemDetailTemplate({
  item,
}: SupportSystemDetailTemplateProps) {
  const isBmi = item.slug === "kalkulator-status-gizi";
  const isStory = item.slug === "kisah-sukses-pasien";
  const isRecipe = item.slug === "dapur-sehat-fima";
  const isCommunity = item.slug === "komunitas-sehat";

  return (
    <>
      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div
            className="rounded-[2.5rem] p-8 md:p-12"
            style={{ backgroundColor: item.soft }}
          >
            <p
              className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black shadow-sm"
              style={{ color: item.color }}
            >
              {item.eyebrow}
            </p>

            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-[#0f172a] md:text-6xl">
              {item.heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-[#475569] md:text-base">
              {item.description}
            </p>
          </div>

          <div
            className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[2.5rem] p-8 text-white shadow-2xl"
            style={{ backgroundColor: item.color }}
          >
            <div className="absolute left-[-70px] top-[-70px] h-44 w-44 rounded-full bg-white/10" />
            <div className="absolute bottom-[-90px] right-[-90px] h-60 w-60 rounded-full bg-white/10" />

            <div className="relative rounded-[2rem] bg-white/10 p-8 text-center backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-white/70">
                Support System
              </p>
              <p className="mt-4 text-4xl font-black">{item.title}</p>
            </div>
          </div>
        </div>
      </section>

      {isBmi ? (
        <section className="px-5 py-20">
          <div className="mx-auto max-w-5xl">
            <BmiCalculator />
          </div>
        </section>
      ) : null}

      {isStory ? (
        <ListingSection
          color={item.color}
          eyebrow="Patient Stories"
          title="Kisah Sukses Pasien"
          items={patientStories}
        />
      ) : null}

      {isRecipe ? (
        <ListingSection
          color={item.color}
          eyebrow="Healthy Recipes"
          title="Inspirasi Dapur Sehat Fima"
          items={recipes}
        />
      ) : null}

      {isCommunity ? (
        <ListingSection
          color={item.color}
          eyebrow="Community Program"
          title="Program Komunitas Sehat"
          items={communityPrograms}
        />
      ) : null}

      <section className="px-5 py-20">
        <div
          className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] p-8 text-white shadow-2xl md:p-14"
          style={{ backgroundColor: item.color }}
        >
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/70">
                Dukungan Nutrisi
              </p>

              <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight md:text-5xl">
                Butuh bantuan memilih produk atau solusi nutrisi?
              </h2>

              <p className="mt-5 max-w-2xl leading-8 text-white/80">
                Tim Medikal Nutrience dapat membantu memberikan arahan awal
                sesuai kebutuhan tubuh dan kondisi Anda.
              </p>
            </div>

            <div className="md:text-right">
              <a
                href="/kontak"
                className="inline-flex rounded-full bg-white px-7 py-4 text-sm font-black shadow-xl shadow-black/10"
                style={{ color: item.color }}
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ListingSection({
  color,
  eyebrow,
  title,
  items,
}: {
  color: string;
  eyebrow: string;
  title: string;
  items: {
    title: string;
    description: string;
    tag?: string;
  }[];
}) {
  return (
    <section className="bg-white px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div>
          <p
            className="text-sm font-bold uppercase tracking-[0.25em]"
            style={{ color }}
          >
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-[#0f172a] md:text-5xl">
            {title}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] bg-[#f8fafc] p-7 ring-1 ring-black/5"
            >
              {item.tag ? (
                <p
                  className="mb-4 inline-flex rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white"
                  style={{ backgroundColor: color }}
                >
                  {item.tag}
                </p>
              ) : null}

              <h3 className="text-xl font-black leading-tight text-[#0f172a]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#64748b]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
