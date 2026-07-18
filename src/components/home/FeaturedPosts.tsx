import BlogCard from "@/components/blog/BlogCard";
import { getFeaturedPosts } from "@/lib/blog";

export default async function FeaturedPosts() {
  const featuredPosts = await getFeaturedPosts();

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium dark:bg-yellow-900/30">
            ⭐ Featured
          </span>

          <h2 className="text-3xl font-bold">Featured Posts</h2>
        </div>

        <p className="mt-2 text-gray-500">
          Recommended articles and deep dives.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {featuredPosts.map((post) => (
          <BlogCard
            key={post.slug}
            {...post}
          />
        ))}
      </div>
    </section>
  );
}
