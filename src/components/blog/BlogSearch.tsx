"use client";

import { useMemo, useState } from "react";
import BlogCard from "./BlogCard";

interface Blog {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
}

interface BlogSearchProps {
  posts: Blog[];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const search = query.toLowerCase();

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search) ||
        post.description.toLowerCase().includes(search) ||
        post.category.toLowerCase().includes(search),
    );
  }, [posts, query]);

  return (
    <>
    <div className="mb-6 flex flex-col items-center justify-between">
      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-2 w-full rounded-lg border p-3"
      />

      {filteredPosts.length === 0 ? (
        <div className="mt-10 text-center">No articles found.</div>
      ) : (
        query?.length > 0 && (
          <p className="mb-6 text-sm text-gray-500">
            {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "article" : "articles"} found
          </p>
        )
      )}</div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogCard
            key={post.slug}
            {...post}
          />
        ))}
      </div>
    </>
  );
}
