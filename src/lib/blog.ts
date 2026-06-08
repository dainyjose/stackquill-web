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

    return files.map((fileName) => {
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
}

export function getPostBySlug(slug: string) {
    const fullPath = path.join(
        postsDirectory,
        `${slug}.md`
    );

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(
        fullPath,
        "utf8"
    );

    const { data, content } =
        matter(fileContents);

    return {
        slug,
        content,
        title: data.title,
        description: data.description,
        category: data.category,
        keywords: data.keywords ?? [],
        featured: data.featured,
        published: data.published,
        date: data.date,
        coverImage: data.coverImage,
        readTime: readingTime(content).text,
    };
}

export function getAllCategories() {
    const posts = getAllPosts();

    const categoriesMap = new Map<
        string,
        number
    >();

    posts.forEach((post) => {
        const count =
            categoriesMap.get(post.category) ?? 0;

        categoriesMap.set(
            post.category,
            count + 1
        );
    });

    return Array.from(
        categoriesMap.entries()
    ).map(([name, count]) => ({
        name,
        slug: name
            .toLowerCase()
            .replace(/\s+/g, "-"),
        count,
    }));
}

export function getPostsByCategory(
    categorySlug: string
) {
    return getAllPosts().filter(
        (post) =>
            post.category
                .toLowerCase()
                .replace(/\s+/g, "-") ===
            categorySlug
    );
}

export function getRelatedPosts(
    currentSlug: string,
    category: string,
    limit = 3
) {
    return getAllPosts()
        .filter(
            (post) =>
                post.slug !== currentSlug &&
                post.category === category &&
                post.published
        )
        .slice(0, limit);
}