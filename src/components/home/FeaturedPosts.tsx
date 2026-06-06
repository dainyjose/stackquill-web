import BlogCard from "@/components/blog/BlogCard";

const featuredPosts = [
  {
    title: "React Native Performance Tips",
    description:
      "Practical techniques to improve performance in React Native applications.",
    category: "React Native",
    readTime: "5 min read",
    slug: "react-native-performance-tips",
  },
  {
    title: "Getting Started with Next.js",
    description:
      "A beginner-friendly guide to building modern web applications.",
    category: "Next.js",
    readTime: "7 min read",
    slug: "getting-started-with-nextjs",
  },
  {
    title: "TypeScript Best Practices",
    description:
      "Patterns and practices that improve maintainability and type safety.",
    category: "TypeScript",
    readTime: "6 min read",
    slug: "typescript-best-practices",
  },
];

export default function FeaturedPosts() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Featured Posts</h2>

        <p className="mt-2 text-gray-500">
          Recommended articles and deep dives.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {featuredPosts.map((post) => (
          <BlogCard
            key={post.slug}
            {...post}
          />
        ))}
      </div>
    </section>
  );
}
