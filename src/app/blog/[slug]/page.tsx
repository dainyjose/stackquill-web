import { getPostBySlug } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import Image from "next/image";

interface BlogDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }
  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8">
        <span className="rounded-full border px-3 py-1 text-sm">
          {post.category}
        </span>

        <h1 className="mt-4 text-5xl font-bold">{post.title}</h1>

        <div className="mt-4 flex gap-4 text-sm text-gray-500">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>
      {post.coverImage && (
        <div className="relative mt-8 mb-10 h-[400px] w-full overflow-hidden rounded-2xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}
      <div className="prose dark:prose-invert">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
