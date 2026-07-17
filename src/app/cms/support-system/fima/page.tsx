import { redirect } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { getFimaRecipes } from "@/lib/cms/fima-storage";

function formatLastUpdate(value: string | null) {
  if (!value) {
    return "Belum ada";
  }

  return new Date(value).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function CmsFimaPage() {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const recipes = await getFimaRecipes();

  const publishedCount = recipes.filter(
    (recipe) => recipe.status === "Published"
  ).length;

  const draftCount = recipes.filter(
    (recipe) => recipe.status === "Draft"
  ).length;

  const lastUpdate =
    recipes
      .map((recipe) => recipe.updatedAt)
      .filter(Boolean)
      .sort()
      .at(-1) ?? null;

  return (
    <CmsAdminShell
      active="support-system"
      title="Dapur Sehat FIMA Management"
      eyebrow="CMS Support System"
      description="Kelola resep, bahan, langkah pembuatan, dan informasi nutrisi pada Dapur Sehat FIMA."
      actions={
        <a
          href="/support-system/dapur-sehat-fima"
          target="_blank"
          className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/8 ring-1 ring-black/5 transition hover:-translate-y-0.5"
        >
          View Public Page
        </a>
      }
    >
      <section className="grid gap-4 md:grid-cols-4">
        {[
          {
            label: "Total Recipe",
            value: recipes.length,
          },
          {
            label: "Published",
            value: publishedCount,
          },
          {
            label: "Draft",
            value: draftCount,
          },
          {
            label: "Last Update",
            value: formatLastUpdate(lastUpdate),
          },
        ].map((item) => (
          <article
            key={item.label}
            className="rounded-[1.7rem] bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-black/5"
          >
            <p className="text-3xl font-black text-[#006b3f]">
              {item.value}
            </p>
            <p className="mt-2 text-sm font-black text-[#64748b]">
              {item.label}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
        <div className="flex flex-col gap-4 border-b border-black/5 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
              Recipe Library
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#111827]">
              Daftar Resep Dapur Sehat FIMA
            </h2>
          </div>

          <p className="max-w-xl text-sm font-medium leading-7 text-[#64748b]">
            Kelola konten resep yang tampil pada halaman edukasi nutrisi
            Medikal Nutrience.
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          {recipes.map((recipe) => (
            <article
              key={recipe.slug}
              className="grid gap-5 rounded-[1.7rem] bg-[#f8fcfa] p-5 ring-1 ring-black/5 transition hover:bg-white hover:shadow-xl hover:shadow-green-900/8 lg:grid-cols-[1.2fr_0.5fr_0.35fr]"
            >
              <div>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full bg-[#e4f8ed] px-3 py-1 text-xs font-black text-[#006b3f]">
                    {recipe.category}
                  </span>

                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#64748b] ring-1 ring-black/5">
                    {recipe.readTime}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-black text-[#111827]">
                  {recipe.title}
                </h3>

                <p className="mt-3 text-sm font-medium leading-7 text-[#64748b]">
                  {recipe.description}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
                <p className="text-xs font-black uppercase tracking-wide text-[#94a3b8]">
                  Status
                </p>

                <p className="mt-3 text-lg font-black text-[#006b3f]">
                  {recipe.status}
                </p>
              </div>

              <div className="flex items-center gap-2 lg:justify-end">
                <a
                  href={`/support-system/dapur-sehat-fima/${recipe.slug}`}
                  target="_blank"
                  className="rounded-full bg-[#f1f5f9] px-4 py-2 text-xs font-black text-[#475569]"
                >
                  View
                </a>

                <a
                  href={`/cms/support-system/fima/${recipe.slug}/edit`}
                  className="rounded-full bg-[#006b3f] px-4 py-2 text-xs font-black text-white"
                >
                  Edit
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </CmsAdminShell>
  );
}
