"use client";

import { useMemo, useState } from "react";
import { Search, X, FileSearch, ArrowRight } from "lucide-react";
import BlogCard from "./BlogCard";

interface Blog {
  id: string;
  slug: string;
  title: string;
  description: string;
  createdAt: Date;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

interface BlogSearchProps {
  posts: Blog[];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return posts;

    return posts.filter(
      post =>
        post.title.toLowerCase().includes(search) ||
        post.description.toLowerCase().includes(search) ||
        post.category?.name.toLowerCase().includes(search)
    );
  }, [posts, query]);

  const hasQuery = query.trim().length > 0;

  return (
    <section aria-label="Search articles">
      {/* Search and Results */}
      <div className="mb-9">
        <div className="relative max-w-2xl">
          <Search
            size={19}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            type="search"
            placeholder="Search articles, topics, and ideas..."
            aria-label="Search articles"
            aria-controls="article-results"
            value={query}
            onChange={event => setQuery(event.target.value)}
            className="h-13 w-full rounded-xl border border-border bg-card pl-12 pr-12 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary/60 focus:ring-4 focus:ring-primary/10"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X size={17} />
            </button>
          )}
        </div>

        {/* Result Information */}
        <div className="mt-5 flex min-h-7 flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {hasQuery ? (
              <>
                Found{" "}
                <span className="font-semibold text-foreground tabular-nums">
                  {filteredPosts.length}
                </span>{" "}
                {filteredPosts.length === 1 ? "result" : "results"} for{" "}
                <span className="font-medium text-foreground">&ldquo;{query.trim()}&rdquo;</span>
              </>
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-foreground tabular-nums">{posts.length}</span>{" "}
                {posts.length === 1 ? "article" : "articles"}
              </>
            )}
          </p>

          {hasQuery && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-opacity hover:opacity-75"
            >
              Clear search
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Article Results */}
      {filteredPosts.length > 0 ? (
        <div
          id="article-results"
          className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredPosts.map(post => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          id="article-results"
          className="flex min-h-[300px] flex-col items-center justify-center border-y border-dashed border-border px-6 py-14 text-center"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <FileSearch size={25} strokeWidth={1.5} />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Search the journal
          </p>

          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            No articles found.
          </h3>

          <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">
            We couldn't find any articles matching your search. Try a different keyword or browse
            all published articles.
          </p>

          <button
            type="button"
            onClick={() => setQuery("")}
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:-translate-y-0.5"
          >
            View all articles
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </section>
  );
}
