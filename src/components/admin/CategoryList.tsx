"use client";

import { Hash } from "lucide-react";
import { getCategoryColor } from "@/lib/category-colors";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryListProps {
  categories: Category[];
}

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
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${getCategoryColor(index)}`}
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
