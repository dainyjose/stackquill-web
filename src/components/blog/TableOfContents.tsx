"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import type { Heading } from "@/lib/toc";

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState(headings[0]?.slug ?? "");

  useEffect(() => {
    if (!headings.length) return;

    const elements = headings
      .map(heading => document.getElementById(heading.slug))
      .filter((element): element is HTMLElement => element !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      entries => {
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length) {
          setActiveHeading(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      }
    );

    elements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) {
    return null;
  }

  return (
    <nav aria-label="Table of contents">
      <ul className="space-y-1">
        {headings.map(heading => {
          const isActive = activeHeading === heading.slug;

          return (
            <li key={heading.slug}>
              <a
                href={`#${heading.slug}`}
                onClick={() => setActiveHeading(heading.slug)}
                aria-current={isActive ? "location" : undefined}
                className={`
                  group relative flex items-start gap-3 rounded-md
                  py-2 pr-2 text-sm leading-6 transition-colors
                  ${heading.level === 3 ? "pl-6" : "pl-3"}
                  ${
                    isActive
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }
                `}
              >
                <span
                  className={`
                    absolute bottom-2 left-0 top-2 w-0.5 rounded-full
                    transition-colors
                    ${isActive ? "bg-primary" : "bg-transparent group-hover:bg-border"}
                  `}
                />

                <span className="min-w-0 break-words">{heading.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
