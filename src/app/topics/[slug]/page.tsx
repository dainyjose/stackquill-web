import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";

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
  const category = categories.find(item => item.slug === slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(slug);
  const articleCount = posts.length;

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:px-10">
        {/* Back Navigation */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to all articles
        </Link>

        {/* Topic Header */}
        <section className="relative mt-10 overflow-hidden rounded-3xl border border-border bg-card px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
          {/* Decorative Background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="relative max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
              <BookOpen size={14} />
              StackQuill Topic
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {category.name}
              <span className="text-primary">.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              Explore articles, practical guides, and development insights around {category.name}.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="rounded-xl border border-border bg-background/70 px-4 py-3">
                <p className="text-2xl font-semibold tabular-nums text-foreground">
                  {articleCount}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {articleCount === 1 ? "Article" : "Articles"}
                </p>
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:opacity-75"
              >
                Explore all articles
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="mt-14 sm:mt-16">
          <div className="mb-8 flex items-end justify-between border-b border-border pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Browse collection
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                Articles in {category.name}
              </h2>
            </div>

            <span className="hidden text-sm text-muted-foreground sm:block">
              {articleCount} {articleCount === 1 ? "article" : "articles"}
            </span>
          </div>

          {posts.length > 0 ? (
            <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map(post => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <BookOpen size={24} strokeWidth={1.6} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-foreground">No articles yet</h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                There are no published articles in this topic yet. Check back soon for new content.
              </p>

              <Link
                href="/blog"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Browse all articles
                <ArrowUpRight size={15} />
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
