import Link from "next/link";

export default function BlogsPage() {
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

      <div className="rounded-xl border">Blog list coming soon...</div>
    </div>
  );
}
