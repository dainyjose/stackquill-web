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
    <section className="relative isolate overflow-hidden border-b border-border">
      {/* Background Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-44 -z-10 h-[34rem] w-[34rem] rounded-full bg-primary/[0.07] blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:px-10 lg:py-28">
        {/* Hero Content */}
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-8 bg-primary" />
            {settings?.heroBadge || "A developer's notebook"}
          </div>

          <p className="mb-5 text-sm font-medium tracking-wide text-muted-foreground">
            {siteName}
            <span className="px-2 text-border">/</span>
            Learning · Building · Sharing
          </p>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.05em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {heroTitle}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
            {heroDescription}
          </p>

          {/* Topics */}
          {topics.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {topics.map(topic => (
                <span
                  key={topic}
                  className="rounded-full border border-border/80 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary sm:text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Link
              href="/blog"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:shadow-lg animate-pulse"
            >
              Explore articles
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              About StackQuill
              <MoveUpRight
                size={15}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Editorial Visual */}
        <div className="relative mx-auto hidden w-full max-w-md lg:block">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[2rem] border border-dashed border-border/80"
          />

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/[0.04]">
            {/* Panel Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  StackQuill / 001
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">Field notes</p>
              </div>

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              </span>
            </div>

            {/* Panel Content */}
            <div className="px-5 py-8 sm:px-9 sm:py-6">
              <span className="font-mono text-xs text-primary">{"<build />"}</span>

              <p className="mt-6 text-4xl font-semibold leading-[1.2] tracking-[-0.05em] text-foreground">
                Think clearly.
                <br />
                Build thoughtfully.
                <br />
                <span className="text-muted-foreground">Share openly.</span>
              </p>

              <div className="mt-8 h-px w-full bg-primary" />

              <p className="mt-5 max-w-[250px] text-sm leading-7 text-muted-foreground">
                Ideas, experiments, and lessons from the process of building software.
              </p>
            </div>

            {/* Panel Footer */}
            <div className="flex items-center justify-between border-t border-border px-6 py-5">
              <span className="text-xs text-muted-foreground">Notes from the process</span>

              <ArrowDownRight size={18} className="text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
