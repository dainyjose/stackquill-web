import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowDown, ArrowRight, Code2 } from "lucide-react";

export default async function Hero() {
  const settings = await prisma.setting.findFirst();

  const topics =
    settings?.heroTopics
      ?.split(",")
      .map(topic => topic.trim())
      .filter(Boolean) ?? [];

  const siteName = settings?.siteName || "StackQuill";
  const heroTitle = settings?.heroTitle || "Build better software, one insight at a time.";
  const heroDescription =
    settings?.heroDescription ||
    "Practical tutorials, real-world projects, and engineering lessons for developers who love building.";

  return (
    <section className="relative isolate flex min-h-[65vh] items-center justify-center overflow-hidden px-5 py-12 sm:px-6 sm:py-16">
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute bottom-0 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        {/* Badge */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur sm:text-sm">
          <Code2 size={15} className="text-blue-500" />
          <span>{settings?.heroBadge || "Software Engineering Blog"}</span>
        </div>
        {/* Site name */}
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">
          {siteName}
        </p>
        {/* Headline */}
        <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          {heroTitle}
        </h1>
        {/* Description */}
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {heroDescription}
        </p>

        {/* Topics */}
        {topics.length > 0 && (
          <div className="mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-2">
            {topics.map(topic => (
              <span
                key={topic}
                className="rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Call to action */}
        <div className="mt-9 flex w-full justify-center sm:w-auto">
          <Link
            href="/blog"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            Explore Articles
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Supporting highlights */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm">
          <span>Practical tutorials</span>
          <span aria-hidden="true" className="text-border">
            •
          </span>
          <span>Real-world projects</span>
          <span aria-hidden="true" className="text-border">
            •
          </span>
          <span>Modern technologies</span>
        </div>
        {/* Scroll cue */}
        <Link
          href="/blog"
          aria-label="Explore articles"
          className="mt-6 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowDown size={16} />
        </Link>
      </div>
    </section>
  );
}
