import BlogCard from "./BlogCard";
import { BlogPost } from "@/types/blog";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) {
    return null;
  }

  return (
    <section className="mt-20 border-t pt-12">
      <h2 className="mb-8 text-3xl font-bold">Related Articles</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            {...post}
          />
        ))}
      </div>
    </section>
  );
}
