import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import Image from "next/image";
import RelatedPosts from "@/components/blog/RelatedPosts";
import TableOfContents from "@/components/blog/TableOfContents";
import { extractHeadings } from "@/lib/toc";
import CodeBlock from "@/components/blog/CodeBlock";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import { incrementBlogViews } from "@/actions/blog";
import Logo from "@/components/common/Logo";
interface BlogDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,

    description: post.description,

    keywords: post.keywords,

    authors: [
      {
        name: siteConfig.author,
      },
    ],

    openGraph: {
      title: post.title,
      description: post.description,

      url: `${siteConfig.url}/blog/${slug}`,

      type: "article",

      images: post.coverImage ? [post.coverImage] : [siteConfig.ogImage],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [siteConfig.ogImage],
    },
  };
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }
  const views = await incrementBlogViews(slug);

  const relatedPosts = await getRelatedPosts(post.slug, post.categoryId);
  const headings = extractHeadings(post.content);

  return (
    <>
      <ReadingProgressBar />
      <article className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <span className="rounded-full border px-3 py-1  text-sm">{post.category?.name}</span>

          {post.featured && (
            <span className=" rounded-full border px-3 py-1 text-sm  ml-2">
              ⭐ Featured Article
            </span>
          )}
          <h1 className="mt-4 text-5xl font-bold">{post.title}</h1>

          <div className="mt-4 flex gap-4 text-sm text-gray-500">
            <span>
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(post.originalPublishedAt ?? post.publishedAt ?? post.createdAt)}
            </span>
            <span>•</span>
            <span>{post.readTime}</span>
            <span>•</span>
            <span>{views} views</span>
          </div>
        </div>
        {post.coverImage ? (
          <div className="relative mt-8 mb-10 h-[400px] w-full overflow-hidden rounded-2xl">
            <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" />
          </div>
        ) : (
          <div
            className="
      relative mt-8 mb-10
      flex h-[400px] flex-col justify-between
      overflow-hidden rounded-2xl
      border
      bg-gradient-to-br
      from-slate-50
      via-slate-100
      to-slate-200
      dark:from-slate-900
      dark:via-slate-800
      dark:to-slate-950
      p-10
    "
          >
            {/* Soft glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5" />

            <div className="relative z-10">
              <span className="inline-flex rounded-full border bg-background/60 px-4 py-1 text-sm backdrop-blur">
                {post.category?.name}
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center">
              <Logo width={72} height={72} />

              <p className="mt-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                StackQuill
              </p>
            </div>

            <div className="relative z-10">
              <h3 className="max-w-xl text-xl font-bold leading-tight ">{post.title}</h3>
            </div>
          </div>
        )}
        <TableOfContents headings={headings} />

        <div className="prose dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2({ children }) {
                const text = String(children);

                const slug = text
                  .toLowerCase()
                  .replace(/[^\w\s]/g, "")
                  .replace(/\s+/g, "-");

                return (
                  <h2 id={slug} className="scroll-mt-24">
                    {children}
                  </h2>
                );
              },
              code(props) {
                const { children, className } = props;

                const match = /language-(\w+)/.exec(className || "");

                if (!match) {
                  return <code className="rounded bg-muted px-1 py-0.5">{children}</code>;
                }

                return (
                  <CodeBlock language={match[1]}>{String(children).replace(/\n$/, "")}</CodeBlock>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
        <RelatedPosts posts={relatedPosts} />
      </article>
    </>
  );
}
