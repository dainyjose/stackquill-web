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
    <section className="border-t border-border pt-12 sm:pt-16">
      <div className="mb-8 sm:mb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Keep exploring
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Related Articles
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              More ideas, insights, and practical guides you might enjoy.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {posts.map(post => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </section>
  );
}
