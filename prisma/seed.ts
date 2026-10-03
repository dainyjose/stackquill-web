import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin User
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD environment variable is required");
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: {
      username: "admin",
    },
    update: {},
    create: {
      username: "admin",
      passwordHash,
    },
  });

  const reactNative = await prisma.category.upsert({
    where: {
      slug: "react-native",
    },
    update: {},
    create: {
      name: "React Native",
      slug: "react-native",
    },
  });

  const nextJs = await prisma.category.upsert({
    where: {
      slug: "nextjs",
    },
    update: {},
    create: {
      name: "Next.js",
      slug: "nextjs",
    },
  });

  await prisma.blog.upsert({
    where: {
      slug: "react-native-performance-tips",
    },
    update: {},
    create: {
      title: "React Native Performance Tips",
      slug: "react-native-performance-tips",
      description: "Improve app performance",
      content: "# React Native Performance Tips",
      featured: true,
      status: "PUBLISHED",
      publishedAt: new Date(),
      categoryId: reactNative.id,
    },
  });

  await prisma.blog.upsert({
    where: {
      slug: "nextjs-app-router-guide",
    },
    update: {},
    create: {
      title: "Next.js App Router Guide",
      slug: "nextjs-app-router-guide",
      description: "Learn App Router",
      content: "# Next.js App Router Guide",
      featured: false,
      status: "PUBLISHED",
      publishedAt: new Date(),
      categoryId: nextJs.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
