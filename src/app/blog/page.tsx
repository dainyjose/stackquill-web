import { getAllPosts } from "@/lib/blog";
import BlogSearch from "@/components/blog/BlogSearch";

export default function BlogPage() {
  const posts = getAllPosts()
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-2 text-4xl font-bold">Blog</h1>

      <p className="mb-10 text-gray-500">
        Articles, tutorials, and development notes.
      </p>

      <BlogSearch posts={posts} />
    </main>
  );
}
