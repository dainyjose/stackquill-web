import BlogCard from "@/components/blog/BlogCard";
import { getFeaturedPosts } from "@/lib/blog";

export default async function FeaturedPosts() {
  const featuredPosts = await getFeaturedPosts();

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 border-b border-border">
      <div className="mb-9 flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Editor's selection
          </p>

          <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            Worth your attention<span className="text-primary">.</span>
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            A selection of practical guides, engineering stories, and deeper dives.
          </p>
        </div>

        <span className="text-sm text-muted-foreground">
          {featuredPosts.length} {featuredPosts.length === 1 ? "article" : "articles"}
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {featuredPosts.map(post => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </section>
  );
}
