import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Hero() {
  const settings = await prisma.setting.findFirst();
  const topics = settings?.heroTopics?.split(",").map((t) => t.trim()) ?? [];
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
      {/* Badge */}
      <span className="mb-6 rounded-full border border-border bg-muted px-4 py-1 text-sm font-medium">
        {settings?.heroBadge ??
          `Welcome to ${settings?.siteName ?? "StackQuill"}`}
      </span>

      {/* Hero Title */}
      <h1 className="max-w-5xl text-5xl font-extrabold tracking-tight md:text-7xl">
        {settings?.heroTitle ??
          "Engineering Notes. Practical Code. Better Software."}
      </h1>

      {/* Tagline */}
      <p className="mt-6 text-xl font-medium text-muted-foreground">
        {settings?.siteTagline}
      </p>

      {/* Description */}
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
        {settings?.heroDescription}
      </p>

      {/* CTA */}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/blog"
          className="rounded-lg bg-primary px-6 py-3 text-primary-foreground transition hover:opacity-90"
        >
          Explore Articles
        </Link>

        <Link
          href="/about"
          className="rounded-lg border px-6 py-3 transition hover:bg-muted"
        >
          About Me
        </Link>
      </div>

      {/* Topics */}
      <div className="mt-14 flex flex-wrap justify-center gap-3">
        {topics.map((topic) => (
          <span
            key={topic}
            className="rounded-full border bg-background px-4 py-2 text-sm transition hover:bg-muted"
          >
            {topic}
          </span>
        ))}
      </div>
    </section>
  );
}
