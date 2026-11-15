import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";

export default async function AboutPage() {
  const settings = await prisma.setting.findFirst();

  const aboutTitle = settings?.aboutTitle?.trim() || "About Me";
  const aboutContent = settings?.aboutContent?.trim() || "";

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
      {/* Page Header */}
      <header className="mx-auto mb-12 max-w-3xl border-b border-border pb-9 sm:mb-14">
        <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <span className="h-px w-8 bg-primary" />
          About StackQuill
        </p>

        <h1 className="text-4xl font-semibold leading-tight tracking-[-0.045em] text-foreground sm:text-5xl md:text-6xl">
          {aboutTitle}
          <span className="text-primary">.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
          Thoughts, experiences, and practical lessons from building software and exploring
          technology.
        </p>

        <div className="mt-7 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Learning · Building · Sharing
        </div>
      </header>

      {/* About Content */}
      {aboutContent ? (
        <div className="mx-auto max-w-3xl">
          <article
            className="
              prose prose-slate max-w-none
              prose-headings:scroll-mt-28
              prose-headings:font-semibold
              prose-headings:tracking-tight
              prose-headings:text-foreground
              prose-h1:mb-6 prose-h1:text-3xl
              prose-h2:mb-4 prose-h2:mt-12
              prose-h2:border-b prose-h2:border-border
              prose-h2:pb-3 prose-h2:text-2xl
              prose-h3:mb-3 prose-h3:mt-9 prose-h3:text-xl
              prose-p:my-5 prose-p:text-[15px]
              prose-p:leading-[1.9] prose-p:text-muted-foreground
              prose-a:font-medium prose-a:text-primary
              prose-a:underline-offset-4 hover:prose-a:underline
              prose-strong:font-semibold prose-strong:text-foreground
              prose-li:my-2 prose-li:leading-8
              prose-li:text-muted-foreground
              prose-ul:my-5 prose-ol:my-5
              prose-blockquote:my-8
              prose-blockquote:rounded-r-lg
              prose-blockquote:border-l-2
              prose-blockquote:border-primary
              prose-blockquote:bg-muted/40
              prose-blockquote:px-5 prose-blockquote:py-2
              prose-blockquote:font-normal
              prose-blockquote:not-italic
              prose-blockquote:text-muted-foreground
              prose-hr:my-10 prose-hr:border-border
              prose-img:my-8 prose-img:rounded-xl
              prose-img:border prose-img:border-border
              prose-pre:my-7 prose-pre:overflow-x-auto
              prose-pre:rounded-xl prose-pre:border
              prose-pre:border-border prose-pre:bg-slate-950
              prose-code:rounded-md
              prose-code:bg-muted prose-code:px-1.5
              prose-code:py-0.5 prose-code:font-medium
              prose-code:text-foreground
              prose-code:before:content-none
              prose-code:after:content-none
              prose-table:my-8 prose-table:block
              prose-table:overflow-x-auto
              prose-th:border prose-th:border-border
              prose-th:bg-muted/50
              prose-th:px-4 prose-th:py-3
              prose-td:border prose-td:border-border
              prose-td:px-4 prose-td:py-3
              dark:prose-invert
              [&_pre_code]:bg-transparent
              [&_pre_code]:p-0
            "
          >
            <ReactMarkdown>{aboutContent}</ReactMarkdown>
          </article>

          {/* Closing Note */}
          <div className="mt-14 flex items-center gap-4 border-t border-border pt-7">
            <span className="h-px w-8 bg-primary" />

            <p className="text-xs font-medium tracking-wide text-muted-foreground">
              Built on curiosity. Driven by learning.
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl border-y border-dashed border-border py-16 text-center">
          <p className="text-lg font-semibold text-foreground">This page is still taking shape.</p>

          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            More about StackQuill will be shared here soon.
          </p>
        </div>
      )}
    </main>
  );
}
