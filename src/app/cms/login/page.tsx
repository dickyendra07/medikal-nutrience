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

  return (
    <main className="min-h-screen bg-[#eef8f3] px-5 py-10 text-[#0f172a]">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] w-full max-w-[1200px] items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="hidden lg:block">
          <div className="rounded-[3rem] bg-[#004b34] p-10 text-white shadow-2xl shadow-green-900/20">
            <BrandLogo variant="light" />

            <p className="mt-12 text-xs font-black uppercase tracking-[0.35em] text-white/50">
              Medikal Nutrience CMS
            </p>

            <h1 className="mt-5 max-w-2xl text-5xl font-black leading-tight">
              Kelola konten website dengan dashboard yang aman dan terstruktur.
            </h1>

            <p className="mt-6 max-w-xl text-base font-medium leading-8 text-white/70">
              CMS ini disiapkan untuk mengelola produk, solusi, event, apotek,
              FAQ, dan data registrasi website Medikal Nutrience.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {["Products", "Events", "Pharmacies", "Leads"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/10"
                >
                  <p className="text-sm font-black text-white">{item}</p>
                  <p className="mt-2 text-xs font-medium leading-6 text-white/55">
                    Module ready for content management.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[520px] rounded-[2.5rem] bg-white p-7 shadow-2xl shadow-slate-900/10 ring-1 ring-black/5 md:p-9">
          <div className="lg:hidden">
            <BrandLogo />
          </div>

          <p className="mt-8 text-xs font-black uppercase tracking-[0.32em] text-[#006b3f] lg:mt-0">
            Admin Login
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight text-[#111827]">
            Masuk ke CMS
          </h2>

          <p className="mt-3 text-sm font-medium leading-7 text-[#64748b]">
            Gunakan akses admin untuk masuk ke dashboard pengelolaan konten
            Medikal Nutrience.
          </p>

          {hasError ? (
            <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm font-bold text-red-600 ring-1 ring-red-100">
              Username atau password tidak sesuai.
            </div>
          ) : null}

          <form action="/api/cms/login" method="post" className="mt-7 space-y-5">
            <div>
              <label className="text-sm font-black text-[#111827]">
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                placeholder="admin"
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:bg-white"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-5 py-4 text-sm font-bold outline-none transition focus:border-[#006b3f] focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#006b3f] px-6 py-4 text-sm font-black text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-[#005635]"
            >
              Masuk Dashboard
            </button>
          </form>

          <div className="mt-6 rounded-2xl bg-[#f4fbf8] p-5 text-sm font-medium leading-7 text-[#64748b]">
            <span className="font-black text-[#006b3f]">Demo access:</span>
            <br />
            Username: admin
            <br />
            Password: mednut2026
          </div>
        </section>
      </div>
    </main>
  );
}
