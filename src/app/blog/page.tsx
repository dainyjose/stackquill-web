import BlogSearch from "@/components/blog/BlogSearch";
import { getAllPosts } from "@/lib/blog";
import { POSTS_PER_PAGE } from "@/lib/constants";
import Pagination from "@/components/blog/Pagination";

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;

  const posts = getAllPosts()
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-2 text-4xl font-bold">Blog</h1>

      <p className="mb-10 text-gray-500">
        Articles, tutorials, and development notes.
      </p>

      <BlogSearch posts={paginatedPosts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}
