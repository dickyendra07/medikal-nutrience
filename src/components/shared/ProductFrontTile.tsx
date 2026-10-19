type ProductFrontTileProps = {
  name: string;
  tagline: string;
  image: string;
  tint: string;
  accent: string;
  scene?: string;
};

export function ProductFrontTile({
  name,
  tagline,
  image,
  tint,
  accent,
  scene,
}: ProductFrontTileProps) {
  return (
    <div
      className="@container relative aspect-square w-full overflow-hidden"
      style={{ backgroundColor: tint }}
    >
      {scene ? (
        <img
          src={scene}
          alt={name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="absolute left-1/2 top-[6%] h-[70%] w-auto -translate-x-1/2 object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.22)] transition duration-500 group-hover:scale-[1.04]"
        />
      )}

      <div
        className="absolute bottom-0 left-0 max-w-[88%] rounded-tr-[1.4rem] px-[6%] py-[3.5%] text-white"
        style={{ backgroundColor: accent }}
      >
        <p className="text-[7cqw] font-black uppercase leading-tight tracking-wide">
          {name}
        </p>
        <p className="mt-[1%] text-[4.4cqw] font-medium leading-tight">
          {tagline}
        </p>
      </div>
    </div>
  );
}
