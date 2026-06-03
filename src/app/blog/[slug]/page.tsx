import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "@/lib/blog";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <p className="text-gray-500 mb-8">{post.date}</p>

      <article className="prose max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}
