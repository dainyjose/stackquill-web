import BlogCard from "@/components/blog/BlogCard";
import Link from "next/link";
import { getLatestPosts } from "@/lib/blog";

export default async function LatestPosts() {
  const latestPosts = await getLatestPosts();

  return (
    <section className="mx-auto max-w-6xl px-6 pt-8 pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Latest Posts</h2>

        <p className="mt-2 text-muted-foreground">Recent articles and learning notes.</p>
      </div>

      {latestPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map(post => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <h3 className="text-xl font-semibold">No articles published yet</h3>

          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            StackQuill is getting ready. New tutorials, engineering notes, and practical guides will
            be published soon.
          </p>

          <Link
            href="/about"
            className="mt-6 inline-flex rounded-lg border px-5 py-2.5 transition hover:bg-muted"
          >
            Learn More About StackQuill
          </Link>
        </div>
      )}
    </section>
  );
}
