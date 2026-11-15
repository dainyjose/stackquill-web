import BlogSearch from "@/components/blog/BlogSearch";
import Pagination from "@/components/blog/Pagination";
import { POSTS_PER_PAGE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams;

  const parsedPage = Number.parseInt(page ?? "1", 10);
  const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const posts = await prisma.$queryRaw<
    Array<{
      id: string;
      title: string;
      slug: string;
      description: string;
      content: string;
      categoryId: string | null;
      originalPublishedAt: Date | null;
      createdAt: Date;
      [key: string]: unknown;
    }>
  >`
    SELECT b.*
    FROM "Blog" b
    WHERE b.status = 'PUBLISHED'
    ORDER BY COALESCE(
      b."originalPublishedAt",
      b."createdAt"
    ) DESC
    OFFSET ${(currentPage - 1) * POSTS_PER_PAGE}
    LIMIT ${POSTS_PER_PAGE}
  `;

  const categoryIds = [...new Set(posts.map(post => post.categoryId).filter(Boolean))];

  const categories = await prisma.category.findMany({
    where: {
      id: { in: categoryIds as string[] },
    },
  });

  const postsWithCategories = posts.map(post => ({
    ...post,
    category: categories.find(category => category.id === post.categoryId) ?? null,
  }));

  const totalPosts = await prisma.blog.count({
    where: {
      status: "PUBLISHED",
    },
  });

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:px-10">
        {/* Page Heading */}
        <section className="border-b border-border pb-10 sm:pb-14">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                The StackQuill Journal
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Ideas worth
                <br />
                <span className="text-primary">building on.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                Practical tutorials, development notes, lessons from real-world projects, and
                thoughts on building better software.
              </p>
            </div>

            <div className="flex items-center gap-4 border-t border-border pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <span className="text-4xl font-semibold tracking-tight text-foreground tabular-nums">
                {totalPosts}
              </span>

              <div className="text-sm leading-6 text-muted-foreground">
                Published
                <br />
                {totalPosts === 1 ? "article" : "articles"}
              </div>
            </div>
          </div>
        </section>

        {/* Article Discovery */}
        <section className="pt-10 sm:pt-12">
          <div className="mb-7 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Explore the articles
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Find something useful for your next build.
              </p>
            </div>

            <p className="text-xs font-medium text-muted-foreground">
              Page {currentPage} of {Math.max(totalPages, 1)}
            </p>
          </div>

          <BlogSearch posts={postsWithCategories} />

          {totalPages > 1 && (
            <div className="mt-14 border-t border-border pt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
