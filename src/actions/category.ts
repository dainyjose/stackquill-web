"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/requireAdmin";

interface CreateCategoryPayload {
  name: string;
  slug: string;
}

export async function createCategory(data: CreateCategoryPayload) {
  await requireAdmin();

  await prisma.category.create({
    data,
  });

  revalidatePath("/admin/categories");
}
