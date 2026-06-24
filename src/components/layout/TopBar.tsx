export function TopBar() {
  return (
    <div className="bg-[#006b3f] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-[11px] md:text-xs">
        <p>
          Jaminan 100% Asli & Konsultasi Ahli Gizi Gratis. Kesehatan Anda
          Prioritas Kami.
        </p>

        <div className="hidden items-center gap-6 md:flex">
          <a href="/mitra-enterprise" className="transition hover:text-[#d8f6e8]">
            Mitra Enterprise
          </a>
          <a href="/apotek-resmi" className="transition hover:text-[#d8f6e8]">
            Apotek Resmi
          </a>
          <a href="#" className="transition hover:text-[#d8f6e8]">
            
          </a>
        </div>
      </div>
    </div>
  );
}
