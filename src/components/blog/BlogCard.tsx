import Link from "next/link";

interface BlogCardProps {
  title: string;
  description: string;
  category: string;
  readTime: string;
  slug: string;
}

export default function BlogCard({
  title,
  description,
  category,
  readTime,
  slug,
}: BlogCardProps) {
  return (
    <article className="rounded-xl border p-6 transition hover:shadow-md">
      <span className="rounded-full border px-3 py-1 text-xs">{category}</span>

      <h2 className="mt-4 text-xl font-semibold">{title}</h2>

      <p className="mt-3 text-sm text-gray-500">{description}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">{readTime}</span>

        <Link
          href={`/blog/${slug}`}
          className="font-medium"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
