"use client";

import { Pencil, Trash2 } from "lucide-react";

const categories = ["React Native", "Next.js", "TypeScript", "Expo"];

export default function CategoryList() {
  return (
    <div className="rounded-xl border">
      <div className="border-b p-4">
        <h2 className="font-semibold">Categories</h2>
      </div>

      <div>
        {categories.map((category) => (
          <div
            key={category}
            className="flex items-center justify-between border-b p-4 last:border-b-0"
          >
            <span>{category}</span>

            <div className="flex gap-2">
              <button className="rounded-lg border p-2">
                <Pencil size={16} />
              </button>

              <button className="rounded-lg border p-2">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
