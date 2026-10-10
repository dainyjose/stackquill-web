"use client";

import { Hash } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryListProps {
  categories: Category[];
}

const colors = [
  "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
];

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="font-semibold">Categories</h2>
        <span className="text-xs text-muted-foreground">{categories.length} total</span>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="flex min-w-0 items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/40"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  colors[index % colors.length]
                }`}
              >
                <Hash size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{category.name}</p>
                <p className="truncate text-xs text-muted-foreground">{category.slug}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="px-4 py-8 text-center text-sm text-muted-foreground">
          No categories yet. Create your first category above.
        </p>
      )}
    </div>
  );
}
