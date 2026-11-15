import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3, Eye, CalendarDays } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { siteConfig } from "@/lib/site";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { extractHeadings, slugifyHeading } from "@/lib/toc";
import { incrementBlogViews } from "@/actions/blog";

import Logo from "@/components/common/Logo";
import RelatedPosts from "@/components/blog/RelatedPosts";
import TableOfContents from "@/components/blog/TableOfContents";
import CodeBlock from "@/components/blog/CodeBlock";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import BlogViewTracker from "@/components/blog/BlogViewTracker";

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

  const canonicalUrl = `${siteConfig.url}/blog/${slug}`;
  const publishedDate = post.originalPublishedAt ?? post.publishedAt ?? post.createdAt;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,

    authors: [
      {
        name: siteConfig.author,
      },
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      type: "article",
      publishedTime: publishedDate.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [siteConfig.author],
      section: post.category?.name,
      tags: post.keywords,
      images: [
        {
          url: post.coverImage || siteConfig.ogImage,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage || siteConfig.ogImage],
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

  const publishedDate = post.originalPublishedAt ?? post.publishedAt ?? post.createdAt;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(publishedDate);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.coverImage || siteConfig.ogImage,
    datePublished: publishedDate.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: siteConfig.author,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${slug}`,
    },
  };

  let headingIndex = 0;

  const renderMarkdownHeading = (Tag: "h2" | "h3") => {
    return function MarkdownHeading({ children }: { children?: ReactNode }) {
      const heading = headings[headingIndex++];

      return (
        <Tag id={heading?.slug} className="scroll-mt-28">
          {children}
        </Tag>
      );
    };
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />

      <BlogViewTracker slug={slug} />
      <ReadingProgressBar />

      <main className="min-h-screen">
        <article>
          {/* Article Header */}
          <header className="mx-auto max-w-6xl px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:px-10">
            {/* Back Navigation */}
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Back to articles
            </Link>

            {/* Category and Featured Labels */}
            <div className="mt-12 flex flex-wrap items-center gap-3">
              {post.category && (
                <Link
                  href={`/topics/${post.category.slug}`}
                  className="rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
                >
                  {post.category.name}
                </Link>
              )}

              {post.featured && (
                <span className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
                  Featured article
                </span>
              )}
            </div>

            {/* Article Title */}
            <h1 className="mt-7 max-w-5xl text-4xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {/* Article Metadata */}
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4 border-b border-border pt-5 pb-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays size={16} />
                <time dateTime={publishedDate.toISOString()}>{formattedDate}</time>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 size={16} />
                <span>{post.readTime}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye size={16} />
                <span>{views} views</span>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          <section className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
            {post.coverImage ? (
              <div className="relative mx-auto aspect-[2/1] w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-muted sm:rounded-3xl">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative mx-auto flex aspect-[2/1] w-full max-w-4xl flex-col justify-between overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 p-6 dark:from-slate-900 dark:via-slate-800 dark:to-slate-950 sm:rounded-3xl sm:p-12">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent dark:from-white/5" />

                <div className="relative z-10">
                  {post.category && (
                    <span className="inline-flex rounded-full border border-border bg-background/70 px-4 py-1.5 text-xs font-semibold text-foreground backdrop-blur">
                      {post.category.name}
                    </span>
                  )}
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                  <Logo width={48} height={48} />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    StackQuill
                  </p>
                </div>

                <div className="relative z-10">
                  <h2 className="max-w-2xl text-xl font-bold leading-tight text-slate-800 dark:text-slate-100 sm:text-3xl">
                    {post.title}
                  </h2>
                </div>
              </div>
            )}
          </section>

          {/* Article Body */}

          {/* Article Body with Sticky Left Sidebar */}
          <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-20">
              {/* Table of Contents */}
              {headings.length > 0 && (
                <aside className="order-1 min-w-0 lg:sticky lg:top-24 lg:order-1 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
                  <div className="rounded-xl border border-border bg-card p-4 sm:p-5 lg:border-0 lg:bg-transparent lg:p-0">
                    <TableOfContents headings={headings} />
                  </div>
                </aside>
              )}

              {/* Article Content */}
              <div className="order-2 min-w-0 lg:order-2">
                <div className="mx-auto max-w-3xl">
                  <div
                    className="
            prose prose-lg max-w-none break-words text-foreground
            prose-headings:scroll-mt-28
            prose-headings:font-bold
            prose-headings:tracking-tight
            prose-headings:text-foreground
            prose-h2:mb-5 prose-h2:mt-14 prose-h2:text-3xl
            prose-h3:mb-4 prose-h3:mt-10 prose-h3:text-2xl
            prose-p:leading-8 prose-p:text-muted-foreground
            prose-a:font-medium prose-a:text-primary
            prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-blockquote:border-l-primary
            prose-blockquote:text-muted-foreground
            prose-li:text-muted-foreground
            prose-th:text-foreground
            prose-td:text-muted-foreground
            prose-hr:border-border
            prose-img:rounded-xl
            dark:prose-invert
          "
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h2: renderMarkdownHeading("h2"),
                        h3: renderMarkdownHeading("h3"),

                        code(props) {
                          const { children, className } = props;
                          const match = /language-(\w+)/.exec(className || "");

                          if (!match) {
                            return (
                              <code className="rounded-md bg-muted px-1.5 py-1 text-[0.9em] text-foreground before:content-none after:content-none">
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
                </div>
              </div>
            </div>
          </section>
          <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 mb-15">
            <RelatedPosts posts={relatedPosts} />
          </section>
        </article>
      </main>
    </>
  );
}
