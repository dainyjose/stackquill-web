"use client";

import { useMemo, useState } from "react";
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

  return (
    <>
      <div className="mb-6 flex flex-col items-center justify-between">
        <input
          type="text"
          placeholder="Search articles..."
          aria-label="Search articles"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="mb-2 w-full rounded-lg border border-border bg-card p-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
        />

        {filteredPosts.length === 0 ? (
          <div className="mt-10 text-center text-muted-foreground">No articles found.</div>
        ) : (
          query.trim().length > 0 && (
            <p className="mb-6 text-sm text-muted-foreground">
              {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"} found
            </p>
          )
        )}
      </div>

      <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map(post => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </>
  );
}
