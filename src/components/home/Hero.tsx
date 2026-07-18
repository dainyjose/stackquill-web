import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Hero() {
  const settings = await prisma.setting.findFirst();
  const topics = settings?.heroTopics?.split(",").map((t) => t.trim()) ?? [];
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-6 text-center py-16">
      {/* Badge */}
      <span className="mb-6 rounded-full border bg-muted px-4 py-1 text-sm font-medium">
        {settings?.heroBadge ?? "Software Engineering Blog"}
      </span>

      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        {settings?.siteName}
      </p>
      {/* Hero Title */}
      <h1 className="mt-4 max-w-5xl text-4xl font-extrabold tracking-tight md:text-7xl">
        {settings?.heroTitle}
      </h1>

      {/* Description */}
      <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
        {settings?.heroDescription}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
        <span>Production-ready tutorials</span>
        <span>•</span>
        <span>Real-world projects</span>
        <span>•</span>
        <span>Modern technologies</span>
      </div>
    </section>
  );
}
