import Link from "next/link";
import { ArrowRight, MoveUpRight, ArrowDownRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function Hero() {
  const settings = await prisma.setting.findFirst();

  const topics =
    settings?.heroTopics
      ?.split(",")
      .map(topic => topic.trim())
      .filter(Boolean) ?? [];

  const siteName = settings?.siteName || "StackQuill";

  const heroTitle = settings?.heroTitle || "Learning, building, and sharing what matters.";

  const heroDescription =
    settings?.heroDescription ||
    "Practical tutorials, engineering notes, and lessons from building software for the real world.";

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-44 h-[34rem] w-[34rem] rounded-full bg-primary/[0.07] blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:px-10 lg:py-32">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
            <span className="h-px w-8 bg-primary" />
            {settings?.heroBadge || "A developer's notebook"}
          </div>

          <p className="mb-5 text-sm font-semibold tracking-wide text-muted-foreground">
            {siteName}
            <span className="px-2 text-border">/</span>
            Learning · Building · Sharing
          </p>

          <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-7xl">
            {heroTitle}
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
            {heroDescription}
          </p>

          {topics.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {topics.map(topic => (
                <span
                  key={topic}
                  className="rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href="/blog"
              className="inline-flex min-h-12 items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
            >
              Explore articles
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              About StackQuill
              <MoveUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-md lg:block">
          <div className="absolute -inset-5 rounded-[2rem] border border-dashed border-border/80" />

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-2xl shadow-foreground/[0.04]">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Field notes
              </span>

              <span className="h-2 w-2 rounded-full bg-primary" />
            </div>

            <div className="py-10">
              <div className="font-mono text-xs text-primary">{"<build />"}</div>

              <p className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em]">
                Think clearly.
                <br />
                Build thoughtfully.
                <br />
                <span className="text-muted-foreground">Share openly.</span>
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-5">
              <span className="text-xs text-muted-foreground">Notes from the process</span>

              <ArrowDownRight size={18} className="text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
