"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateCategoryPayload {
    name: string;
    slug: string;
}

export async function createCategory(
    data: CreateCategoryPayload,
) {
    await prisma.category.create({
        data,
    });
    revalidatePath("/admin/categories");
}