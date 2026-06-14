"use client";

import { createBlog, updateBlog } from "@/actions/blog";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Category {
  id: string;
  name: string;
}
interface BlogFormProps {
  categories: Category[];

  initialData?: {
    title: string;
    slug: string;
    description: string;
    categoryId: string;
    coverImage: string;
    content: string;
    featured: boolean;
    published: boolean;
  };
}

export default function BlogForm({ categories, initialData }: BlogFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? "",
  );
  const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [featured, setFeatured] = useState(initialData?.featured ?? false);
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const isEditMode = !!initialData;

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!slug.trim()) {
      newErrors.slug = "Slug is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!categoryId) {
      newErrors.categoryId = "Please select a category";
    }

    if (!content.trim()) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isEditMode) {
        await updateBlog(initialData.slug, {
          title,
          slug,
          description,
          content,
          categoryId,
          coverImage,
          featured,
          published,
        });
      } else {
        await createBlog({
          title,
          slug,
          description,
          content,
          categoryId,
          coverImage,
          featured,
          published,
        });
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      if (error.code === "P2002") {
        setErrors({
          slug: "A blog with this slug already exists",
        });
        return;
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setCoverImage(data.url);

    setUploading(false);
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
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium">Slug</label>

            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="react-native-performance-tips"
              className="w-full rounded-lg border p-3"
            />
            {errors.slug && (
              <p className="mt-1 text-sm text-red-500">{errors.slug}</p>
            )}
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
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium">Category</label>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>
            )}
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="rounded-xl border p-6">
        <h2 className="mb-6 text-xl font-semibold">Cover Image</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {uploading && <p className="mt-2 text-sm">Uploading image...</p>}
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
            {errors.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content}</p>
            )}
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
          {isEditMode ? "Update Blog" : "Publish Blog"}
        </button>
      </div>
    </form>
  );
}
