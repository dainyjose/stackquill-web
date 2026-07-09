import Link from "next/link";
import { getAllCategories } from "@/lib/blog";

export default async function Topics() {
  const categories = await getAllCategories();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="mb-8 text-3xl font-bold">Topics</h2>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/topics/${category.slug}`}
            className="rounded-full border px-4 py-2 transition hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            {category.name} ({category._count.blogs})
          </Link>
        ))}
      </div>
    </section>
  );
}
