"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const [featured, setFeatured] = useState(false);

  const [published, setPublished] = useState(false);

  return (
    <form className="space-y-6">
      <div>
        <label className="mb-2 block font-medium">Title</label>

        <input
          value={title}
          onChange={(e) => {
            const value = e.target.value;

            setTitle(value);

            setSlug(
              value
                .toLowerCase()
                .replace(/[^\w\s]/g, "")
                .replace(/\s+/g, "-"),
            );
          }}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Slug</label>

        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Description</label>

        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Category</label>

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Markdown Content</label>

        <textarea
          rows={20}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-lg border p-3 font-mono"
        />
      </div>

      <div className="prose dark:prose-invert max-w-none rounded-lg border p-6">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Featured
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          Published
        </label>
      </div>

      <button
        type="submit"
        className="rounded-lg border px-6 py-3"
      >
        Save Blog
      </button>
    </form>
  );
}
