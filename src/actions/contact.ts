"use server";

import { prisma } from "@/lib/prisma";

interface ContactPayload {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

export async function createContact(
    data: ContactPayload,
) {
    return prisma.contact.create({
        data,
    });
}