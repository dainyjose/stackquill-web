"use client";

import { useEffect, useState } from "react";
import { ChevronDown, List } from "lucide-react";
import type { Heading } from "@/lib/toc";

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState(headings[0]?.slug ?? "");
  const [isOpen, setIsOpen] = useState(false);

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

  if (!headings.length) return null;

  return (
    <nav aria-label="Table of contents">
      {/* Mobile Accordion */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(previous => !previous)}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-3"
        >
          <span className="flex items-center gap-2">
            <List size={17} className="text-primary" />
            <span className="text-sm font-semibold text-foreground">On this page</span>
            <span className="text-xs text-muted-foreground">({headings.length})</span>
          </span>

          <ChevronDown
            size={18}
            className={`text-muted-foreground transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <ul className="mt-4 space-y-1 border-t border-border pt-3">
            {headings.map(heading => {
              const isActive = activeHeading === heading.slug;

              return (
                <li key={heading.slug}>
                  <a
                    href={`#${heading.slug}`}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-md py-2 pr-2 text-sm leading-6 transition-colors ${
                      heading.level === 3 ? "pl-7" : "pl-3"
                    } ${
                      isActive
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="mb-4 flex items-center gap-2">
          <List size={15} className="text-primary" />
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            On this page
          </p>
        </div>

        <ul className="space-y-1">
          {headings.map(heading => {
            const isActive = activeHeading === heading.slug;

            return (
              <li key={heading.slug}>
                <a
                  href={`#${heading.slug}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`group relative flex items-start rounded-md py-2 pr-2 text-sm leading-6 transition-colors ${
                    heading.level === 3 ? "pl-6" : "pl-3"
                  } ${
                    isActive
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span
                    className={`absolute bottom-2 left-0 top-2 w-0.5 rounded-full ${
                      isActive ? "bg-primary" : "bg-transparent group-hover:bg-border"
                    }`}
                  />
                  <span className="break-words">{heading.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
