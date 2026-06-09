"use client";

import { categories } from "@/data/categories";
import Image from "next/image";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");

  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setTitle(value);

    setSlug(
      value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-"),
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const blogData = {
      title,
      slug,
      description,
      category,
      coverImage,
      content,
      featured,
      published,
    };

    console.log(blogData);

    // TODO:
    // Save blog
    // Create markdown file
    // Call API
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Basic Information */}
      <div className="rounded-xl border p-6">
        <h2 className="mb-6 text-xl font-semibold">Blog Information</h2>

        <div className="grid gap-6">
          <div>
            <label className="mb-2 block font-medium">Title</label>

            <input
              value={title}
              onChange={handleTitleChange}
              placeholder="React Native Performance Tips"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Slug</label>

            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="react-native-performance-tips"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Description</label>

            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short summary of the blog post"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.name}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="rounded-xl border p-6">
        <h2 className="mb-6 text-xl font-semibold">Cover Image</h2>

        <input
          type="text"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="/images/blogs/react-native-performance.jpg"
          className="w-full rounded-lg border p-3"
        />

        {coverImage && (
          <div className="mt-6 overflow-hidden rounded-xl border">
            <div className="relative h-72 w-full">
              <Image
                src={coverImage}
                alt="Cover Preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Markdown Editor */}
      <div className="rounded-xl border p-6">
        <h2 className="mb-6 text-xl font-semibold">Content</h2>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Markdown Editor</label>

            <textarea
              rows={25}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="# My Blog Title"
              className="min-h-[700px] w-full rounded-lg border p-4 font-mono"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Live Preview</label>

            <div className="prose dark:prose-invert min-h-[700px] max-w-none rounded-lg border p-6">
              {content ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              ) : (
                <p className="text-muted-foreground">
                  Preview will appear here...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Publishing */}
      <div className="rounded-xl border p-6">
        <h2 className="mb-6 text-xl font-semibold">Publishing Options</h2>

        <div className="flex flex-wrap gap-8">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />

            <span>Featured Post</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />

            <span>Published</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="rounded-lg border px-6 py-3"
        >
          Save Draft
        </button>

        <button
          type="submit"
          className="rounded-lg border px-6 py-3 font-medium"
        >
          Publish Blog
        </button>
      </div>
    </form>
  );
}
