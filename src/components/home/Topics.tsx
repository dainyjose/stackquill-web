import Link from "next/link";
import { ArrowUpRight, Hash } from "lucide-react";
import { getAllCategories } from "@/lib/blog";
import { getCategoryColor } from "@/lib/category-colors";

export default async function Topics() {
  const categories = await getAllCategories();

  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pt-8 pb-12">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Explore Topics</h2>
          <p className="mt-2 text-muted-foreground">Discover articles by your favorite topics.</p>
        </div>

        <span className="shrink-0 text-sm text-muted-foreground">{categories.length} topics</span>
      </div>

      {/* Topic cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Link
            key={category.slug}
            href={`/topics/${category.slug}`}
            className="group relative flex min-w-0 items-center gap-3 overflow-hidden rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${getCategoryColor(index)}`}
            >
              <Hash size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold">{category.name}</h3>

              <p className="mt-1 text-xs text-muted-foreground">
                {category._count.blogs} {category._count.blogs === 1 ? "article" : "articles"}
              </p>
            </div>

            <ArrowUpRight
              size={16}
              className="shrink-0 text-muted-foreground opacity-60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
