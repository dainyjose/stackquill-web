import { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): MetadataRoute.Sitemap {
    const posts = await getAllPosts();

    const blogRoutes = posts.map((post) => ({
        url: `${siteConfig.url}/blog/${post.slug}`,
        lastModified: new Date(post.date),
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

        ...blogRoutes,
    ];
}