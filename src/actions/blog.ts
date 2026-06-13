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
    return prisma.blog.create({
        data,
    });
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