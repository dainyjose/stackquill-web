import readingTime from "reading-time";
import { prisma } from "@/lib/prisma";

export async function getAllPosts() {
  const blogs = await prisma.blog.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return blogs.map(blog => ({
    ...blog,
    readTime: readingTime(blog.content).text,
  }));
}

export async function getPublishedPosts() {
  return prisma.blog.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPostBySlug(slug: string) {
  const blog = await prisma.blog.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    include: {
      category: true,
    },
  });

  if (!blog) {
    return null;
  }

  return {
    ...blog,
    readTime: readingTime(blog.content).text,
  };
}
export async function getAllCategories() {
  return prisma.category.findMany({
    include: {
      _count: {
        select: {
          blogs: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function getPostsByCategory(categorySlug: string) {
  return prisma.blog.findMany({
    where: {
      category: {
        slug: categorySlug,
      },
      status: "PUBLISHED",
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getRelatedPosts(currentSlug: string, categoryId: string, limit = 3) {
  return prisma.blog.findMany({
    where: {
      slug: {
        not: currentSlug,
      },
      categoryId,
      status: "PUBLISHED",
    },
    take: limit,
    include: {
      category: true,
    },
  });
}

export async function getFeaturedPosts() {
  return prisma.blog.findMany({
    where: {
      featured: true,
      status: "PUBLISHED",
    },
    include: {
      category: true,
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getLatestPosts() {
  return prisma.blog.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      category: true,
    },
    take: 3,
    orderBy: [
      {
        originalPublishedAt: {
          sort: "desc",
          nulls: "last",
        },
      },
      {
        createdAt: "desc",
      },
    ],
  });
}
