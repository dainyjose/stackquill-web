import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(
    process.cwd(),
    "content/blogs"
);

export function getAllPosts() {
    const files = fs.readdirSync(postsDirectory);

    const posts = files.map((fileName) => {
        const slug = fileName.replace(".md", "");

        const fullPath = path.join(
            postsDirectory,
            fileName
        );

        const fileContents =
            fs.readFileSync(fullPath, "utf8");

        const { data, content } =
            matter(fileContents);

        return {
            slug,
            title: data.title,
            description: data.description,
            category: data.category,
            featured: data.featured,
            published: data.published,
            date: data.date,
            coverImage: data.coverImage,
            readTime: readingTime(content).text,
        };
    });

    return posts;
}