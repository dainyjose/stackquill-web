import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      {posts.map((post: any) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="block border rounded-lg p-4 mb-4"
        >
          <h2 className="text-2xl font-semibold">{post.title}</h2>

          <p>{post.description}</p>
        </Link>
      ))}
    </div>
  );
}
