"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateBlogPayload {
  title: string;
  slug: string;
  description: string;

  metaTitle?: string;
  metaDescription?: string;

  content: string;
  categoryId: string;
  coverImage?: string;

  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export async function createBlog(data: CreateBlogPayload) {
  const blog = await prisma.blog.create({
    data: {
      ...data,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath("/");

  return blog;
}

export async function updateBlog(slug: string, data: CreateBlogPayload) {
  const existingBlog = await prisma.blog.findUnique({
    where: {
      slug,
    },
  });

  if (!existingBlog) {
    throw new Error("Blog not found");
  }

  const blog = await prisma.blog.update({
    where: {
      slug,
    },
    data: {
      ...data,
      publishedAt: data.status === "PUBLISHED" ? (existingBlog.publishedAt ?? new Date()) : null,
    },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");

  return blog;
}

export async function deleteBlog(slug: string) {
  await prisma.blog.delete({
    where: {
      slug,
    },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath("/");
}

export async function togglePublished(slug: string) {
  const blog = await prisma.blog.findUnique({
    where: {
      slug,
    },
  });

  if (!blog) {
    throw new Error("Blog not found");
  }

  const isPublished = blog.status === "PUBLISHED";

  await prisma.blog.update({
    where: {
      slug,
    },
    data: {
      status: isPublished ? "DRAFT" : "PUBLISHED",
      publishedAt: isPublished ? null : new Date(),
    },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");

  return {
    status: isPublished ? "DRAFT" : "PUBLISHED",
  };
}

export async function incrementBlogViews(slug: string) {
  await prisma.blog.update({
    where: {
      slug,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}
