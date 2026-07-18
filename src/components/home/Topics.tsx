import Link from "next/link";
import { getAllCategories } from "@/lib/blog";

export default async function Topics() {
  const categories = await getAllCategories();

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Topics</h2>

        <p className="mt-2 text-muted-foreground">
          Browse articles by category.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/topics/${category.slug}`}
            className="rounded-full border px-4 py-2 transition hover:bg-muted"
          >
            {category.name}{" "}
            <span className="text-muted-foreground">
              ({category._count.blogs})
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
