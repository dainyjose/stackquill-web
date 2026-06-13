import { notFound } from "next/navigation";

import BlogCard from "@/components/blog/BlogCard";

import { getAllCategories, getPostsByCategory } from "@/lib/blog";

interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;

  const categories = await getAllCategories();

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(slug);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-2 text-4xl font-bold">{category.name}</h1>

      <p className="mb-10 text-gray-500">{category.count} article(s)</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            {...post}
          />
        ))}
      </div>
    </main>
  );
}
