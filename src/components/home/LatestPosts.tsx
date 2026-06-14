import BlogCard from "@/components/blog/BlogCard";
import { getLatestPosts } from "@/lib/blog";

export default async function LatestPosts() {
  const latestPosts = await getLatestPosts();
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Latest Posts</h2>

        <p className="mt-2 text-gray-500">
          Recent articles and learning notes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {latestPosts.map((post) => (
          <BlogCard
            key={post.slug}
            {...post}
          />
        ))}
      </div>
    </section>
  );
}
