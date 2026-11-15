import ContactForm from "@/components/home/ContactForm";
import { ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="relative isolate min-h-[calc(100vh-76px)] overflow-hidden border-b border-border">
      {/* Background Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-primary/[0.06] blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-10 lg:py-24">
        {/* Contact Introduction */}
        <div className="max-w-xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-8 bg-primary" />
            Get in touch
          </p>

          <h1 className="text-4xl font-semibold leading-[1.1] tracking-[-0.05em] text-foreground sm:text-5xl md:text-6xl">
            Let's start a
            <br />
            conversation<span className="text-primary">.</span>
          </h1>

          <p className="mt-7 max-w-md text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
            Have a question, an idea, or something interesting to discuss? I'd love to hear from
            you. Send a message and let's connect.
          </p>

          <div className="mt-10 border-t border-border pt-7">
            <p className="text-sm font-medium text-foreground">What can we talk about?</p>

            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              {[
                "Technical questions and discussions",
                "Ideas, feedback, and collaborations",
                "Software development and engineering",
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="/about"
            className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            More about StackQuill
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        {/* Contact Form */}
        <div className="h-fit rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8 lg:p-9">
          <div className="mb-8 border-b border-border pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Your message
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              Send me a message
            </h2>

            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Fill in the details below and I'll get back to you.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </main>
  );
}
