import { notFound } from "next/navigation";

import BlogForm from "@/components/admin/BlogForm";
import { prisma } from "@/lib/prisma";

interface EditBlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { slug } = await params;

  const post = await prisma.blog.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
    },
  });

  if (!post) {
    notFound();
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">Edit Blog</h1>

      <BlogForm
        categories={categories}
        initialData={{
          title: post.title,
          slug: post.slug,
          description: post.description,
          metaTitle: post.seoTitle ?? "",
          metaDescription: post.seoDescription ?? "",
          categoryId: post.categoryId,
          coverImage: post.coverImage ?? "",
          content: post.content,
          featured: post.featured,
          status: post.status,
          originalPublishedAt: post.originalPublishedAt
            ? post.originalPublishedAt.toISOString().split("T")[0]
            : "",
        }}
      />
    </div>
  );
}
