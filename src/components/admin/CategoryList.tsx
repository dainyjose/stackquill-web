"use client";

import { Pencil, Trash2 } from "lucide-react";

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
    <div className="rounded-xl border">
      <div className="border-b p-4">
        <h2 className="font-semibold">Categories</h2>
      </div>

      <div>
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between border-b p-4"
          >
            <div>
              <p>{category.name}</p>

              <p className="text-sm text-muted-foreground">{category.slug}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
