import Link from "next/link";
import { ArrowUpRight, Hash } from "lucide-react";
import { getAllCategories } from "@/lib/blog";
import { getCategoryColor } from "@/lib/category-colors";

export default async function Topics() {
  const categories = await getAllCategories();

  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mb-9 flex items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Browse by subject
          </p>

          <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            Explore topics<span className="text-primary">.</span>
          </h2>

          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            Follow the ideas and technologies behind the articles.
          </p>
        </div>

        <span className="shrink-0 text-xs text-muted-foreground sm:text-sm">
          {categories.length} topics
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <Link
            key={category.slug}
            href={`/topics/${category.slug}`}
            className="group flex min-w-0 items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-foreground/[0.03] sm:p-5"
          >
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getCategoryColor(index)}`}
            >
              <Hash size={19} />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">{category.name}</span>

              <span className="mt-1 block text-xs text-muted-foreground">
                {category._count.blogs} {category._count.blogs === 1 ? "article" : "articles"}
              </span>
            </span>

            <ArrowUpRight
              size={17}
              className="shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
