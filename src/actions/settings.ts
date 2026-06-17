"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateSettingsPayload {
    siteName: string;
    siteTagline?: string;
    aboutMe?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
}

export async function saveSettings(
    data: UpdateSettingsPayload,
) {
    const existing = await prisma.setting.findFirst();

    if (existing) {
        await prisma.setting.update({
            where: {
                id: existing.id,
            },
            data,
        });
    } else {
        await prisma.setting.create({
            data,
        });
    }

    revalidatePath("/");
    revalidatePath("/admin/settings");
}