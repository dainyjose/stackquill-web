import Link from "next/link";
import Image from "next/image";
import Logo from "../common/Logo";

interface BlogCardProps {
  title: string;
  description: string;
  slug: string;

  category: {
    id: string;
    name: string;
    slug: string;
  };

  readTime?: string;

  coverImage?: string | null;

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
      {coverImage ? (
        <div className="relative h-52 w-full">
          <Image src={coverImage} alt={title} fill className="object-cover" />
        </div>
      ) : (
        <div
          className="
         relative
  flex h-52 flex-col justify-between
  overflow-hidden
  rounded-xl
  border border-white/20 dark:border-white/10
  bg-white/30 dark:bg-slate-900/30
  backdrop-blur-xl
  shadow-lg shadow-black/5
  p-6
        "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent dark:from-white/5 pointer-events-none" />

          <div className="flex flex-1 items-center justify-center">
            <Logo width={48} height={48} />
          </div>
        </div>
      )}
      <div className="p-6">
        <span className="rounded-full border px-3 py-1 text-xs">{category?.name}</span>

        <h2 className="mt-4 text-xl font-semibold">{title}</h2>

        <p className="mt-3 text-sm text-gray-500">{description}</p>

        <div className="mt-4 flex items-center justify-between">
          {readTime && <span className="text-sm text-gray-500">{readTime}</span>}

          <Link href={`/blog/${slug}`} className="font-medium">
            Continue Reading →
          </Link>
        </div>
      </div>
    </article>
  );
}
