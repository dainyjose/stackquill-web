import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): MetadataRoute.Sitemap {

    const posts = await prisma.blog.findMany({
        where: {
            published: true,
        },
    });

    const blogRoutes = posts.map((post) => ({
        url: `${siteConfig.url}/blog/${post.slug}`,
        lastModified: post.updatedAt,
    }));

    return [
        {
            url: siteConfig.url,
            lastModified: new Date(),
        },
        {
            url: `${siteConfig.url}/blog`,
            lastModified: new Date(),
        },
        {
            url: `${siteConfig.url}/about`,
            lastModified: new Date(),
        },
        {
            url: `${siteConfig.url}/contact`,
            lastModified: new Date(),
        },
        ...blogRoutes,
    ];
}