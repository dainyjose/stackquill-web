import BlogCard from "@/components/blog/BlogCard";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLatestPosts } from "@/lib/blog";

export default async function LatestPosts() {
  const latestPosts = await getLatestPosts();

  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Fresh from the notebook
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              The latest writing<span className="text-primary">.</span>
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              Recent articles, experiments, and lessons learned along the way.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            Browse all articles
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {latestPosts.map(post => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
            <p className="text-lg font-semibold">The next story is being written.</p>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
              New tutorials, engineering notes, and practical guides will appear here.
            </p>

            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
            >
              Learn about StackQuill
              <ArrowUpRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
