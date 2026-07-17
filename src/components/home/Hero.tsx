import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Hero() {
  const settings = await prisma.setting.findFirst();

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
        {settings?.siteName ?? "StackQuill"}
      </h1>

      <p className="mb-4 text-xl text-muted-foreground">
        {settings?.siteTagline}
      </p>

      <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
        {settings?.aboutMe}
      </p>
      <span className="mb-4 rounded-full border px-4 py-1 text-sm">
        🚀 Welcome to StackQuill
      </span>

      <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
        Learning,
        <br />
        Building,
        <br />
        Sharing
      </h1>

      <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
        A place where I document my development journey, share technical
        knowledge, explore modern technologies, and build projects that solve
        real-world problems.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/blog"
          className="rounded-lg bg-black px-6 py-3 text-white transition hover:opacity-90 dark:bg-white dark:text-black"
        >
          Read Blogs
        </Link>

        <Link
          href="/about"
          className="rounded-lg border px-6 py-3 transition hover:bg-gray-100 dark:hover:bg-slate-800"
        >
          About Me
        </Link>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {[
          "React Native",
          "Next.js",
          "TypeScript",
          "Expo",
          "Mobile Development",
          "Web Development",
        ].map((topic) => (
          <span
            key={topic}
            className="rounded-full border px-4 py-2 text-sm"
          >
            {topic}
          </span>
        ))}
      </div>
    </section>
  );
}
