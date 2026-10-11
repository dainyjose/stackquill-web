import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock3, Star } from "lucide-react";
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
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md">
      {/* Cover */}
      <Link
        href={`/blog/${slug}`}
        aria-label={`Read ${title}`}
        className="relative block h-48 shrink-0 overflow-hidden bg-muted sm:h-52"
      >
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="relative flex h-full items-center justify-center border-b border-border bg-gradient-to-br from-muted via-background to-muted">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/10" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card/80 shadow-sm backdrop-blur-sm">
              <Logo width={40} height={40} />
            </div>
          </div>
        )}

        {featured && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
            <Star size={13} className="fill-amber-400 text-amber-500" />
            Featured
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Category */}
        <div className="mb-3">
          <Link
            href={`/topics/${category.slug}`}
            className="inline-flex max-w-full items-center rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <span className="truncate">{category.name}</span>
          </Link>
        </div>

        {/* Fixed title area keeps descriptions aligned */}
        <h2 className="line-clamp-2 min-h-12 text-base font-semibold leading-6 tracking-tight text-foreground transition-colors group-hover:text-foreground sm:text-lg">
          <Link href={`/blog/${slug}`} className="outline-none focus-visible:underline">
            {title}
          </Link>
        </h2>

        {/* Consistent description height */}
        <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        {/* Footer stays at the bottom */}
        <div className="mt-auto flex min-h-12 items-end justify-between gap-3 border-t border-border pt-4">
          <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
            {readTime && (
              <>
                <Clock3 size={14} className="shrink-0" />
                <span className="truncate">{readTime}</span>
              </>
            )}
          </div>

          <Link
            href={`/blog/${slug}`}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            Read article
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
