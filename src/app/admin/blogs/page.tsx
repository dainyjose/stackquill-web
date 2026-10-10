import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import DeleteBlogButton from "@/components/admin/DeleteBlogButton";
import PublishToggleButton from "@/components/admin/PublishToggleButton";

export default async function BlogsPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto w-full">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your articles, publishing status, and categories.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          + New Blog
        </Link>
      </div>

      {/* Blog list */}
      <div className="overflow-hidden rounded-xl border bg-card">
        {/* Table header */}
        <div className="hidden grid-cols-[minmax(0,1fr)_140px_140px_220px] items-center gap-4 border-b bg-muted/40 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:grid">
          <span>Article</span>
          <span>Category</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {posts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <h3 className="font-semibold">No blogs yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Create your first article to get started.
            </p>
            <Link
              href="/admin/blogs/new"
              className="mt-4 inline-flex rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Create your first blog
            </Link>
          </div>
        ) : (
          posts.map(post => {
            const isPublished = post.status === "PUBLISHED";
            const isArchived = post.status === "ARCHIVED";

            return (
              <div
                key={post.slug}
                className="grid grid-cols-1 gap-4 border-b p-4 transition-colors last:border-b-0 hover:bg-muted/20 sm:p-5 lg:grid-cols-[minmax(0,1fr)_140px_140px_220px] lg:items-center lg:gap-4 lg:px-6"
              >
                {/* Article */}
                <div className="min-w-0">
                  <Link
                    href={`/admin/blogs/${post.slug}`}
                    className="break-words font-semibold leading-6 hover:underline"
                  >
                    {post.title}
                  </Link>

                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {post.description}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground lg:hidden">
                    Category: {post.category?.name ?? "Uncategorized"}
                  </p>
                </div>

                {/* Category */}
                <div className="hidden lg:block">
                  <span className="inline-flex max-w-full truncate rounded-md border bg-muted/40 px-2.5 py-1 text-xs font-medium">
                    {post.category?.name ?? "Uncategorized"}
                  </span>
                </div>

                {/* Status */}
                <div>
                  <span className="mb-1 block text-xs text-muted-foreground lg:hidden">Status</span>

                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                      isPublished
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : isArchived
                          ? "border-slate-500/30 bg-slate-500/10 text-slate-600 dark:text-slate-400"
                          : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isPublished
                          ? "bg-emerald-500"
                          : isArchived
                            ? "bg-slate-500"
                            : "bg-amber-500"
                      }`}
                    />
                    {isPublished ? "Published" : isArchived ? "Archived" : "Draft"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 border-t pt-3 sm:flex-nowrap lg:justify-end lg:border-0 lg:pt-0">
                  <Link
                    href={`/admin/blogs/${post.slug}`}
                    className="inline-flex h-9 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Edit
                  </Link>

                  <PublishToggleButton slug={post.slug} status={post.status} />

                  <DeleteBlogButton slug={post.slug} />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {posts.length > 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          {posts.length} {posts.length === 1 ? "article" : "articles"} total
        </p>
      )}
    </div>
  );
}
