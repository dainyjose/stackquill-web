import { getAllCategories } from "@/lib/blog";
import TopicsGrid from "./TopicsGrid";

export default async function Topics() {
  const categories = await getAllCategories();

  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10">
      {/* Section Header */}
      <div className="mb-7 flex items-end justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Browse by subject
          </p>

          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Explore topics<span className="text-primary">.</span>
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Discover articles by technology and subject.
          </p>
        </div>

        <span className="shrink-0 text-xs text-muted-foreground">{categories.length} topics</span>
      </div>

      <TopicsGrid categories={categories} />
    </section>
  );
}
