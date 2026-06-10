import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogsPage() {
  const posts = getAllPosts();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Blogs</h1>

        <Link
          href="/admin/blogs/new"
          className="rounded-lg border px-4 py-2"
        >
          New Blog
        </Link>
      </div>
      <div className="rounded-xl border">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="flex items-center justify-between border-b p-4 last:border-b-0"
          >
            <div>
              <h3 className="font-semibold">{post.title}</h3>

              <p className="text-sm text-muted-foreground">{post.category}</p>
            </div>

            <Link
              href={`/admin/blogs/${post.slug}`}
              className="rounded-lg border px-4 py-2"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>{" "}
    </div>
  );
}
