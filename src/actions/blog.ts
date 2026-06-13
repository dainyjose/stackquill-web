"use server";

import { prisma } from "@/lib/prisma";

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