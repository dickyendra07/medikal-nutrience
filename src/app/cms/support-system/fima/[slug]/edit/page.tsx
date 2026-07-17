import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { CmsAdminShell } from "@/components/cms/CmsAdminShell";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { getFimaRecipeBySlug } from "@/lib/cms/fima-storage";
import { saveFimaRecipe } from "./actions";

export default async function CmsFimaEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const authenticated = await isCmsAuthenticated();

  if (!authenticated) {
    redirect("/cms/login");
  }

  const { slug } = await params;

  const recipe = await getFimaRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <CmsAdminShell
      active="support-system"
      title={`Edit ${recipe.title}`}
      eyebrow="CMS FIMA Recipe"
      description="Edit konten resep Dapur Sehat FIMA yang tampil pada halaman edukasi Medikal Nutrience."
      actions={
        <a
          href="/cms/support-system/fima"
          className="rounded-full bg-white px-6 py-4 text-xs font-black uppercase tracking-wide text-[#006b3f] shadow-lg shadow-slate-900/8 ring-1 ring-black/5"
        >
          Back to Recipes
        </a>
      }
    >
      <form
        action={saveFimaRecipe}
        className="space-y-6"
      >
        <input type="hidden" name="slug" value={recipe.slug} />

        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
            Basic Information
          </p>

          <div className="mt-6 grid gap-5">
            <div>
              <label className="text-sm font-black text-[#334155]">
                Title
              </label>
              <input
                name="title"
                defaultValue={recipe.title}
                className="mt-2 w-full rounded-2xl border border-black/10 px-5 py-4 font-bold"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-black text-[#334155]">
                  Category
                </label>
                <input
                  name="category"
                  defaultValue={recipe.category}
                  className="mt-2 w-full rounded-2xl border border-black/10 px-5 py-4 font-bold"
                />
              </div>

              <div>
                <label className="text-sm font-black text-[#334155]">
                  Read Time
                </label>
                <input
                  name="readTime"
                  defaultValue={recipe.readTime}
                  className="mt-2 w-full rounded-2xl border border-black/10 px-5 py-4 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-black text-[#334155]">
                Image
              </label>
              <input
                name="image"
                defaultValue={recipe.image}
                className="mt-2 w-full rounded-2xl border border-black/10 px-5 py-4 font-bold"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#334155]">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={recipe.description}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-black/10 px-5 py-4 font-bold"
              />
            </div>
          </div>
        </section>


        <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006b3f]">
            Recipe Content
          </p>

          <div className="mt-6 grid gap-5">

            <div>
              <label className="text-sm font-black text-[#334155]">
                Ingredients
              </label>

              <textarea
                name="ingredients"
                defaultValue={recipe.ingredients.join("\n")}
                rows={6}
                className="mt-2 w-full rounded-2xl border border-black/10 px-5 py-4 font-bold"
              />

              <p className="mt-2 text-xs text-[#64748b]">
                Satu bahan per baris.
              </p>
            </div>


            <div>
              <label className="text-sm font-black text-[#334155]">
                Steps
              </label>

              <textarea
                name="steps"
                defaultValue={recipe.steps.join("\n")}
                rows={6}
                className="mt-2 w-full rounded-2xl border border-black/10 px-5 py-4 font-bold"
              />

              <p className="mt-2 text-xs text-[#64748b]">
                Satu langkah per baris.
              </p>
            </div>


            <div>
              <label className="text-sm font-black text-[#334155]">
                Nutrition Notes
              </label>

              <textarea
                name="nutritionNotes"
                defaultValue={recipe.nutritionNotes.join("\n")}
                rows={6}
                className="mt-2 w-full rounded-2xl border border-black/10 px-5 py-4 font-bold"
              />

              <p className="mt-2 text-xs text-[#64748b]">
                Satu catatan per baris.
              </p>
            </div>

          </div>
        </section>


        <section className="rounded-[2rem] bg-[#004b34] p-6 text-white">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-white/60">
            Publishing
          </p>

          <div className="mt-5 grid gap-5 md:grid-cols-2">

            <div>
              <label className="text-sm font-black">
                Status
              </label>

              <select
                name="status"
                defaultValue={recipe.status}
                className="mt-2 w-full rounded-2xl px-5 py-4 font-bold text-[#111827]"
              >
                <option value="Published">
                  Published
                </option>
                <option value="Draft">
                  Draft
                </option>
                <option value="Hidden">
                  Hidden
                </option>
              </select>
            </div>

          </div>


          <button
            type="submit"
            className="mt-6 rounded-full bg-white px-8 py-4 text-sm font-black text-[#006b3f]"
          >
            Save Recipe
          </button>

        </section>

      </form>
    </CmsAdminShell>
  );
}
