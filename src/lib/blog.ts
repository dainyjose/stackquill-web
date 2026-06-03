import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content/blogs");

export function getAllPosts() {
    const files = fs.readdirSync(blogDirectory);

    return files.map((file) => {
        const filePath = path.join(blogDirectory, file);
        const fileContent = fs.readFileSync(filePath, "utf8");

        const { data } = matter(fileContent);

        return {
            ...data,
            fileName: file,
        };
    });
}

export function getPostBySlug(slug: string) {
    const files = fs.readdirSync(blogDirectory);

    const matchedFile = files.find((file) => {
        const filePath = path.join(blogDirectory, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);

        return data.slug === slug;
    });

    if (!matchedFile) {
        return null;
    }

    const filePath = path.join(blogDirectory, matchedFile);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContent);

    return {
        ...data,
        content,
    };
}