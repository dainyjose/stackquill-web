import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  title: string;
  description: string;
  category: string;
  readTime: string;
  slug: string;
  coverImage?: string;
  featured?: boolean;
}

export default function BlogCard({
  title,
  description,
  category,
  readTime,
  slug,
  coverImage,
  featured,
}: BlogCardProps) {
  return (
    <article className="relative overflow-hidden rounded-xl border">
      {featured && (
        <span className="absolute right-3 top-3 z-10 rounded-full border bg-background px-3 py-1 text-xs font-medium">
          ⭐ Featured
        </span>
      )}
      {coverImage && (
        <div className="relative h-52 w-full">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <span className="rounded-full border px-3 py-1 text-xs">
          {category}
        </span>

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
      </div>
    </article>
  );
}
