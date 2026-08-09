import { redirect } from "next/navigation";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { BrandLogo } from "@/components/shared/BrandLogo";

export default async function CmsLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const authenticated = await isCmsAuthenticated();

  if (authenticated) {
    redirect("/cms");
  }

  const params = await searchParams;
  const hasError = params.error === "invalid";
  const unavailable = params.error === "unavailable";

  return (
    <main className="min-h-screen bg-[#f4f7f5] px-5 py-8 text-slate-900">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] w-full max-w-[1040px] items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <section className="hidden lg:block">
          <div className="rounded-3xl bg-[#064c38] p-8 text-white shadow-[0_24px_60px_rgba(6,76,56,0.14)]">
            <BrandLogo variant="light" />

            <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Content workspace
            </p>

            <h1 className="mt-3 max-w-lg text-[27px] font-semibold leading-[1.25] tracking-[-0.025em]">
              Pengelolaan konten yang aman, tenang, dan terstruktur.
            </h1>

            <p className="mt-4 max-w-md text-[13px] leading-6 text-white/68">
              Satu ruang kerja untuk menjaga informasi Medikal Nutrience tetap
              akurat, konsisten, dan siap dipublikasikan.
            </p>

            <div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.06] px-5">
              {["Konten terpusat", "Akses berbasis peran", "Media terkelola"].map((item) => (
                <div key={item} className="flex items-center gap-3 py-3.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-[10px] text-emerald-100" aria-hidden="true">✓</span>
                  <p className="text-xs font-medium text-white/85">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[440px] rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] md:p-8">
          <div className="lg:hidden">
            <BrandLogo />
          </div>

          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#08704c] lg:mt-0">
            Akses Administrator
          </p>

          <h2 className="mt-2 text-[26px] font-semibold leading-tight tracking-[-0.025em] text-slate-900">
            Masuk ke CMS
          </h2>

          <p className="mt-2 text-[13px] leading-5 text-slate-500">
            Gunakan akun yang telah diberikan untuk mengakses ruang kerja konten.
          </p>

          {hasError ? (
            <div role="alert" className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[12px] font-medium text-red-700">
              Email atau password tidak sesuai.
            </div>
          ) : null}

          {unavailable ? (
            <div role="alert" className="mt-5 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-[12px] font-medium text-amber-700">
              Layanan CMS sedang tidak tersedia. Silakan coba kembali beberapa saat lagi.
            </div>
          ) : null}

          <form action="/api/cms/login" method="post" className="mt-6 space-y-4">
            <div>
              <label htmlFor="cms-email" className="text-xs font-semibold text-slate-700">
                Email admin
              </label>
              <input
                id="cms-email"
                name="email"
                type="email"
                required
                autoComplete="username"
                placeholder="editor@medikal-nutrience.co.id"
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[13px] outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#16805b] focus:ring-4 focus:ring-[#16805b]/10"
              />
            </div>

            <div>
              <label htmlFor="cms-password" className="text-xs font-semibold text-slate-700">
                Password
              </label>
              <input
                id="cms-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[13px] outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#16805b] focus:ring-4 focus:ring-[#16805b]/10"
              />
            </div>

            <button
              type="submit"
              className="mt-1 h-10 w-full rounded-lg bg-[#08704c] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#065e40] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#16805b]/20"
            >
              Masuk ke dashboard
            </button>
          </form>

          <div className="mt-5 border-t border-slate-100 pt-4 text-[11px] leading-5 text-slate-400">
            Akses dikelola oleh administrator. Hubungi tim teknis jika akun belum tersedia.
          </div>
        </section>
      </div>
    </main>
  );
}
