"use client";

import { useMemo, useState } from "react";
import { Search, X, FileSearch } from "lucide-react";
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
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <Search
            size={19}
            aria-hidden="true"
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            type="search"
            placeholder="Search articles, topics, and ideas..."
            aria-label="Search articles"
            value={query}
            onChange={event => setQuery(event.target.value)}
            className="h-14 w-full rounded-2xl border border-border bg-card pl-13 pr-12 text-sm text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary/60 focus:ring-4 focus:ring-primary/10"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X size={17} />
            </button>
          )}
        </div>

        {/* Search Results Information */}
        <div className="mt-5 flex min-h-6 flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {hasQuery ? (
              <>
                <span className="font-semibold text-foreground">{filteredPosts.length}</span>{" "}
                {filteredPosts.length === 1 ? "result" : "results"} for{" "}
                <span className="font-medium text-foreground">&ldquo;{query.trim()}&rdquo;</span>
              </>
            ) : (
              <>
                Showing <span className="font-semibold text-foreground">{posts.length}</span>{" "}
                {posts.length === 1 ? "article" : "articles"}
              </>
            )}
          </p>

          {hasQuery && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-xs font-semibold text-primary transition-colors hover:opacity-75"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      {/* Article Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map(post => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-12 text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <FileSearch size={25} strokeWidth={1.6} />
          </div>

          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            No articles found
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            We couldn&apos;t find any articles matching your search. Try another keyword or explore
            all published articles.
          </p>

          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            View all articles
          </button>
        </div>
      )}
    </section>
  );
}
