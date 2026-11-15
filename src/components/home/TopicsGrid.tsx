"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Hash, ChevronDown, ChevronUp } from "lucide-react";
import { getCategoryColor } from "@/lib/category-colors";

interface TopicsGridProps {
  categories: {
    slug: string;
    name: string;
    _count: {
      blogs: number;
    };
  }[];
}

const INITIAL_VISIBLE_COUNT = 8;

export default function TopicsGrid({ categories }: TopicsGridProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleCategories = showAll ? categories : categories.slice(0, INITIAL_VISIBLE_COUNT);

  const hasMoreTopics = categories.length > INITIAL_VISIBLE_COUNT;

  return (
    <>
      {/* Topic Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {visibleCategories.map((category, index) => (
          <Link
            key={category.slug}
            href={`/topics/${category.slug}`}
            className="group flex min-w-0 items-center gap-2.5 rounded-lg border border-border/70 bg-card px-3 py-3 transition-colors hover:border-primary/40 hover:bg-accent/50 sm:px-3.5"
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${getCategoryColor(index)}`}
            >
              <Hash size={15} />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                {category.name}
              </span>

              <span className="mt-0.5 block text-[11px] text-muted-foreground">
                {category._count.blogs} {category._count.blogs === 1 ? "article" : "articles"}
              </span>
            </span>

            <ArrowUpRight
              size={14}
              className="shrink-0 text-muted-foreground opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100"
            />
          </Link>
        ))}
      </div>

      {/* Show More / Less */}
      {hasMoreTopics && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(previous => !previous)}
            aria-expanded={showAll}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-primary"
          >
            {showAll ? (
              <>
                Show less
                <ChevronUp size={16} />
              </>
            ) : (
              <>
                Show all topics
                <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
}
