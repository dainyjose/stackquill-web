import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    totalCategories,
    totalViews,
    mostViewedPosts,
  ] = await Promise.all([
    prisma.blog.count(),

    prisma.blog.count({
      where: { published: true },
    }),

    prisma.blog.count({
      where: { published: false },
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

          <p className="mt-2 text-3xl font-bold">
            {totalViews._sum.views ?? 0}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border p-6">
        <h2 className="mb-4 text-xl font-semibold">Most Viewed Posts</h2>

        <div className="space-y-3">
          {mostViewedPosts.map((post) => (
            <div
              key={post.id}
              className="flex justify-between "
            >
              <span>{post.title}</span>
              <span>{post.views} views</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
