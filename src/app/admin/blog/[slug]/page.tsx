import { notFound } from "next/navigation";

import BlogForm from "@/components/admin/BlogForm";
import { getPostBySlug } from "@/lib/blog";

interface EditBlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">Edit Blog</h1>

      <BlogForm
        initialData={{
          title: post.title,
          slug: post.slug,
          description: post.description,
          category: post.category,
          coverImage: post.coverImage ?? "",
          content: post.content,
          featured: post.featured,
          published: post.published,
        }}
      />
    </div>
  );
}
