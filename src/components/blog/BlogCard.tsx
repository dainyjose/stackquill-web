import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  description: string;
  slug: string;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  readTime?: number;
  coverImage?: string | null;
  featured?: boolean;
}

export default function BlogCard({
  title,
  description,
  slug,
  category,
  readTime,
  coverImage,
  featured = false,
}: BlogCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-foreground/[0.04]">
      {/* Cover Image */}
      <Link
        href={`/blog/${slug}`}
        aria-label={`Read ${title}`}
        className="relative block aspect-[16/9] w-full shrink-0 overflow-hidden bg-muted"
      >
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted via-muted/70 to-primary/5">
            <span className="text-3xl font-bold tracking-tight text-muted-foreground/30">
              StackQuill.
            </span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Metadata */}
        <div className="mb-4 flex min-h-7 flex-wrap items-center gap-x-3 gap-y-2 text-xs">
          {category && (
            <Link
              href={`/topics/${category.slug}`}
              className="rounded-full bg-primary/8 px-3 py-1.5 font-semibold text-primary transition-colors hover:bg-primary/15"
            >
              {category.name}
            </Link>
          )}

          {readTime != null && <span className="text-muted-foreground">{readTime} min read</span>}

          {featured && (
            <span className="font-semibold uppercase tracking-[0.14em] text-primary">Featured</span>
          )}
        </div>

        {/* Title */}
        <h2 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-7 tracking-tight text-card-foreground transition-colors duration-200 group-hover:text-primary sm:text-xl">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h2>

        {/* Description */}
        <p className="mt-3 line-clamp-3 min-h-[4.875rem] break-words text-sm leading-[1.7] text-muted-foreground">
          {description}
        </p>

        {/* Read Action */}
        <div className="mt-auto flex justify-end pt-6">
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-200 group-hover:gap-3"
          >
            Read article
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
