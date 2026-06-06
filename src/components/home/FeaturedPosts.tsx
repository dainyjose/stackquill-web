import BlogCard from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog";

export default function FeaturedPosts() {
  const featuredPosts = getAllPosts()
    .filter((post) => post.featured)
    .slice(0, 3);
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Featured Posts</h2>

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
