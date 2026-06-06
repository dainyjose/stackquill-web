import BlogCard from "@/components/blog/BlogCard";

const latestPosts = [
  {
    title: "Understanding React Hooks",
    description: "A practical guide to useState, useEffect, and custom hooks.",
    category: "React",
    readTime: "4 min read",
    slug: "understanding-react-hooks",
  },
  {
    title: "Expo Development Workflow",
    description: "Tips for building and maintaining Expo applications.",
    category: "Expo",
    readTime: "6 min read",
    slug: "expo-development-workflow",
  },
  {
    title: "Mobile App Security Basics",
    description:
      "Common security practices every mobile developer should know.",
    category: "Security",
    readTime: "8 min read",
    slug: "mobile-app-security-basics",
  },
];

export default function LatestPosts() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Latest Posts</h2>

        <p className="mt-2 text-gray-500">
          Recent articles and learning notes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {latestPosts.map((post) => (
          <BlogCard
            key={post.slug}
            {...post}
          />
        ))}
      </div>
    </section>
  );
}
