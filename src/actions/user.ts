"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
}

export async function changePassword(
    data: ChangePasswordPayload,
) {
    const user = await prisma.user.findUnique({
        where: {
            username: "admin",
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(
        data.currentPassword,
        user.passwordHash,
    );

    if (!isValid) {
        throw new Error("Current password is incorrect");
    }

    const passwordHash = await bcrypt.hash(
        data.newPassword,
        10,
    );

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            passwordHash,
        },
    });

    return {
        success: true,
    };
}