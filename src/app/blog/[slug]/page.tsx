import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import Image from "next/image";
import RelatedPosts from "@/components/blog/RelatedPosts";
import TableOfContents from "@/components/blog/TableOfContents";
import { extractHeadings } from "@/lib/toc";
import CodeBlock from "@/components/blog/CodeBlock";
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

  const relatedPosts = getRelatedPosts(post.slug, post.category);
  const headings = extractHeadings(post.content);

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8">
        <span className="rounded-full border px-3 py-1  text-sm">
          {post.category}
        </span>

        {post.featured && (
          <span className=" rounded-full border px-3 py-1 text-sm  ml-2">
            ⭐ Featured Article
          </span>
        )}
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
      <TableOfContents headings={headings} />

      <div className="prose dark:prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { children, className } = props;

              const match = /language-(\w+)/.exec(className || "");

              if (!match) {
                return (
                  <code className="rounded bg-muted px-1 py-0.5">
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock language={match[1]}>
                  {String(children).replace(/\n$/, "")}
                </CodeBlock>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
      <RelatedPosts posts={relatedPosts} />
    </article>
  );
}
