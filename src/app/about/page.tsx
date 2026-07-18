import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";

export default async function AboutPage() {
  const settings = await prisma.setting.findFirst();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Hero */}
      <section className="mb-16 text-center">
        <span className="inline-flex items-center rounded-full border px-4 py-1 text-sm font-medium">
          👋 About StackQuill
        </span>

        <h1 className="mt-6 text-5xl font-bold tracking-tight">
          {settings?.aboutTitle ?? "About Me"}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
          Learn more about the developer behind StackQuill, the journey, and the
          purpose of this blog.
        </p>
      </section>

      {/* Content */}
      <section className="rounded-2xl border bg-background p-8 shadow-sm md:p-12">
        <article
          className="prose prose-slate dark:prose-invert prose-lg max-w-none
          prose-headings:scroll-mt-24
          prose-headings:font-bold
          prose-h2:mt-10
          prose-h2:border-b
          prose-h2:pb-2
          prose-p:leading-8
          prose-a:text-primary
          prose-a:no-underline
          hover:prose-a:underline
          prose-code:rounded
          prose-code:bg-muted
          prose-code:px-1.5
          prose-code:py-1
          prose-code:before:content-none
          prose-code:after:content-none
          prose-pre:rounded-xl
          prose-pre:border
          prose-pre:bg-slate-950
          prose-img:rounded-xl
          prose-img:border
          prose-blockquote:border-l-4
          prose-blockquote:italic"
        >
          <ReactMarkdown>{settings?.aboutContent ?? ""}</ReactMarkdown>
        </article>
      </section>
    </main>
  );
}
