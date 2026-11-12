import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.blog.findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      slug: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
    },
    {
      url: `${siteConfig.url}/blog`,
    },
    {
      url: `${siteConfig.url}/about`,
    },
    {
      url: `${siteConfig.url}/contact`,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.updatedAt,
  }));

  return [...staticRoutes, ...blogRoutes];
}
