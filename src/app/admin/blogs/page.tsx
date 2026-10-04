import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import DeleteBlogButton from "@/components/admin/DeleteBlogButton";
import PublishToggleButton from "@/components/admin/PublishToggleButton";

export default async function BlogsPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Blogs</h1>

        <Link href="/admin/blogs/new" className="rounded-lg border px-4 py-2">
          New Blog
        </Link>
      </div>

      <div className="rounded-xl border">
        {posts?.map(post => (
          <div
            key={post?.slug}
            className="flex items-center justify-between border-b p-4 last:border-b-0"
          >
            <div>
              <h3 className="font-semibold">{post?.title}</h3>

              <p className="text-sm text-muted-foreground">{post?.category?.name}</p>

              <span>{post?.status === "PUBLISHED" ? "Published" : "Draft"}</span>
            </div>

            <PublishToggleButton slug={post?.slug} status={post.status} />

            <div className="flex gap-2">
              <Link href={`/admin/blogs/${post?.slug}`} className="rounded-lg border px-4 py-2">
                Edit
              </Link>

              <DeleteBlogButton slug={post?.slug} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
