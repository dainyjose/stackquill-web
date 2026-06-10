"use server";

import { prisma } from "@/lib/prisma";

interface CreateCategoryPayload {
    name: string;
    slug: string;
}

export async function createCategory(
    data: CreateCategoryPayload,
) {
    return prisma.category.create({
        data,
    });
}