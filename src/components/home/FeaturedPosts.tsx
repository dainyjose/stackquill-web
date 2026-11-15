import BlogCard from "@/components/blog/BlogCard";
import { getFeaturedPosts } from "@/lib/blog";

export default async function FeaturedPosts() {
  const featuredPosts = await getFeaturedPosts();

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
        {/* Section Header */}
        <div className="mb-9 flex flex-col gap-5 border-b border-border pb-7 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-5 bg-primary" />
              Editor&apos;s selection
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
              Worth your attention
              <span className="text-primary">.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              A selection of practical guides, engineering stories, and deeper dives worth
              exploring.
            </p>
          </div>

          <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {featuredPosts.length.toString().padStart(2, "0")}{" "}
            {featuredPosts.length === 1 ? "featured article" : "featured articles"}
          </span>
        </div>

        {/* Featured Articles */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <div key={post.slug} className="relative">
              <span className="pointer-events-none absolute -top-2 -left-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-[10px] font-semibold tabular-nums text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>

              <BlogCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
