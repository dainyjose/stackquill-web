import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";

export default async function AboutPage() {
  const settings = await prisma.setting.findFirst();

  const aboutTitle = settings?.aboutTitle?.trim() || "About Me";
  const aboutContent = settings?.aboutContent?.trim() || "";

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-6 sm:py-14">
      {/* Header */}
      <header className="mb-8 sm:mb-10 justify-items-center">
        <span className="inline-flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          About StackQuill
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {aboutTitle}
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          Thoughts, experiences, and practical lessons from building software and exploring
          technology.
        </p>
      </header>

      {/* About content */}
      {aboutContent && (
        <section className="overflow-hidden rounded-xl border border-border bg-card">
          <article
            className="
              prose prose-slate max-w-none p-5 sm:p-8
              prose-headings:scroll-mt-24
              prose-headings:font-semibold
              prose-headings:tracking-tight
              prose-h1:text-2xl sm:prose-h1:text-3xl
              prose-h2:mt-9 prose-h2:border-b prose-h2:border-border
              prose-h2:pb-3 prose-h2:text-xl sm:prose-h2:text-2xl
              prose-h3:mt-7 prose-h3:text-lg sm:prose-h3:text-xl
              prose-p:leading-7 prose-p:text-muted-foreground
              prose-a:font-medium prose-a:text-blue-600
              prose-a:underline-offset-4 hover:prose-a:underline
              prose-strong:text-foreground
              prose-li:leading-7 prose-li:text-muted-foreground
              prose-ul:my-4 prose-ol:my-4
              prose-blockquote:rounded-r-lg
              prose-blockquote:border-l-4
              prose-blockquote:border-blue-500/60
              prose-blockquote:bg-muted/40
              prose-blockquote:px-4 prose-blockquote:py-1
              prose-blockquote:not-italic
              prose-blockquote:text-muted-foreground
              prose-hr:border-border
              prose-img:rounded-xl prose-img:border
              prose-img:border-border
              prose-pre:overflow-x-auto prose-pre:rounded-lg
              prose-pre:border prose-pre:border-border
              prose-pre:bg-slate-950
              prose-code:rounded
              prose-code:bg-muted
              prose-code:px-1.5 prose-code:py-0.5
              prose-code:font-medium
              prose-code:before:content-none
              prose-code:after:content-none
              prose-table:block prose-table:overflow-x-auto
              prose-th:border prose-th:border-border
              prose-td:border prose-td:border-border
              dark:prose-invert
              dark:prose-a:text-blue-400
              [&_pre_code]:bg-transparent
              [&_pre_code]:p-0
            "
          >
            <ReactMarkdown>{aboutContent}</ReactMarkdown>
          </article>
        </section>
      )}

      {aboutContent && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-border" />
          <p className="text-xs font-medium tracking-wide text-muted-foreground">
            Built on curiosity. Driven by learning.
          </p>
          <span className="h-px w-10 bg-border" />
        </div>
      )}
    </main>
  );
}
