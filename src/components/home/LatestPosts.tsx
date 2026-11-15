import BlogCard from "@/components/blog/BlogCard";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLatestPosts } from "@/lib/blog";

export default async function LatestPosts() {
  const latestPosts = await getLatestPosts();

  return (
    <section className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
        {/* Section Header */}
        <div className="mb-9 flex flex-col gap-5 border-b border-border pb-7 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Fresh from the notebook
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
              The latest writing
              <span className="text-primary">.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Recent articles, experiments, and lessons learned along the way.
            </p>
          </div>

          <Link
            href="/blog"
            className="group inline-flex w-fit shrink-0 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            Browse all articles
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        {/* Articles */}
        {latestPosts.length > 0 ? (
          <>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Latest articles
              </p>

              <span className="text-xs tabular-nums text-muted-foreground">
                {latestPosts.length.toString().padStart(2, "0")} articles
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {latestPosts.map(post => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
            <p className="text-lg font-semibold tracking-tight text-foreground">
              The next story is being written.
            </p>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
              New tutorials, engineering notes, and practical guides will appear here.
            </p>

            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              Learn about StackQuill
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
