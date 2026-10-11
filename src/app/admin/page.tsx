import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const [totalPosts, publishedPosts, draftPosts, totalCategories, totalViews, mostViewedPosts] =
    await Promise.all([
      prisma.blog.count(),

      prisma.blog.count({
        where: { status: "PUBLISHED" },
      }),

      prisma.blog.count({
        where: { status: "DRAFT" },
      }),
      prisma.category.count(),

      prisma.blog.aggregate({
        _sum: {
          views: true,
        },
      }),

      prisma.blog.findMany({
        orderBy: {
          views: "desc",
        },
        take: 5,
      }),
    ]);

  return (
    <>
      <h1 className="mb-6 text-4xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-5">
        <div className="rounded-xl border p-6">
          <h2>Total Posts</h2>
          <p className="mt-2 text-3xl font-bold">{totalPosts}</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2>Published</h2>
          <p className="mt-2 text-3xl font-bold">{publishedPosts}</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2>Drafts</h2>
          <p className="mt-2 text-3xl font-bold">{draftPosts}</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2>Categories</h2>
          <p className="mt-2 text-3xl font-bold">{totalCategories}</p>
        </div>

        <div className="rounded-xl border p-6">
          <h2>Total Views</h2>

          <p className="mt-2 text-3xl font-bold">{totalViews._sum.views ?? 0}</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-col gap-1 border-b border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Most Viewed Posts</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your top-performing articles by total views.
            </p>
          </div>

          <span className="w-fit rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            Top 5
          </span>
        </div>

        {mostViewedPosts.length > 0 ? (
          <div className="divide-y divide-border">
            {mostViewedPosts.map((post, index) => (
              <div
                key={post.id}
                className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/50"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{post.title}</p>

                  <p
                    className={`mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${
                      post.status === "PUBLISHED"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : post.status === "ARCHIVED"
                          ? "border-slate-500/30 bg-slate-500/10 text-slate-600 dark:text-slate-400"
                          : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {post.status === "PUBLISHED"
                      ? "Published"
                      : post.status === "ARCHIVED"
                        ? "Archived"
                        : "Draft"}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-lg font-semibold tabular-nums text-foreground">
                    {post.views.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-muted-foreground">views</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <p className="text-sm font-medium">No posts to display yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              View counts will appear here as readers visit your articles.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
