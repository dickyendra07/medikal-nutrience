import { footerHelp, footerProducts, footerSupport } from "@/data/home";
import { BrandLogo } from "@/components/shared/BrandLogo";

export function Footer() {
  return (
    <footer className="bg-[#004b34] px-5 pt-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-5">
            <BrandLogo variant="light" />
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/70">
            Kami menyediakan produk nutrisi gizi seimbang yang diformulasikan
            untuk berbagai kondisi kesehatan, guna membantu meningkatkan kualitas
            hidup dan mendukung proses pemulihan.
          </p>
        </div>

        <FooterColumn title="Produk" links={footerProducts} />
        <FooterColumn title="Support System" links={footerSupport} />
        <FooterColumn title="Bantuan" links={footerHelp} />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 py-8 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
        <p>© 2026 PT Fima Internasional | A Kalbe Company. All Rights Reserved.</p>

        <div className="flex gap-6">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div>
      <h3 className="mb-5 font-bold">{title}</h3>
      <ul className="space-y-3 text-sm text-white/70">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="transition hover:text-white">
              &gt;&gt; {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
