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

  const currentPage = Number(page) || 1;

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
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-2 text-4xl font-bold">Blog</h1>

      <p className="mb-10 text-gray-500">Articles, tutorials, and development notes.</p>

      <BlogSearch posts={postsWithCategories} />

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
