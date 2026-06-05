type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-20">
      <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-[#d8f6e8]" />
      <div className="absolute bottom-[-160px] right-[-120px] h-96 w-96 rounded-full bg-[#c7f5d4]" />

      <div className="relative mx-auto max-w-7xl">
        <p className="mb-5 inline-flex rounded-full bg-[#e4f8ed] px-4 py-2 text-sm font-bold text-[#006b3f]">
          {eyebrow}
        </p>

        <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-[#111827] md:text-6xl">
          {title}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-[#4b5563]">
          {description}
        </p>
      </div>
    </section>
  );
}
