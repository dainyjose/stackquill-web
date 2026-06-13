"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


interface CreateBlogPayload {
    title: string;
    slug: string;
    description: string;
    content: string;
    categoryId: string;
    coverImage: string;
    featured: boolean;
    published: boolean;
}

export async function createBlog(
    data: CreateBlogPayload,
) {
    const blog = await prisma.blog.create({
        data,
    });

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    revalidatePath("/");

    return blog;
}

export async function updateBlog(
    slug: string,
    data: CreateBlogPayload,
) {
    const blog = await prisma.blog.update({
        where: {
            slug,
        },
        data,
    });
    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
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
        where: { slug },
    });

    if (!blog) {
        throw new Error("Blog not found");
    }

    await prisma.blog.update({
        where: { slug },
        data: {
            published: !blog.published,
        },
    });

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    revalidatePath("/");
}