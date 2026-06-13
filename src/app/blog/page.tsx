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

  const posts = await prisma.blog.findMany({
    where: {
      published: true,
    },
    skip: (currentPage - 1) * POSTS_PER_PAGE,
    take: POSTS_PER_PAGE,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });

  const totalPosts = await prisma.blog.count({
    where: {
      published: true,
    },
  });

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-2 text-4xl font-bold">Blog</h1>

      <p className="mb-10 text-gray-500">
        Articles, tutorials, and development notes.
      </p>

      <BlogSearch posts={posts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}
