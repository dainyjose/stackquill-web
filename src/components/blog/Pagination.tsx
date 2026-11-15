import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const baseButton =
    "inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

  const activeButton =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-lg bg-foreground px-3 text-sm font-semibold text-background";

  const disabledButton =
    "inline-flex h-10 min-w-10 cursor-not-allowed items-center justify-center gap-2 rounded-lg px-3 text-sm text-muted-foreground/40";

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-border pt-7 sm:flex-row"
    >
      {/* Page Information */}
      <div className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground tabular-nums">
          {String(currentPage).padStart(2, "0")}
        </span>
        <span className="mx-2 text-border">/</span>
        <span className="tabular-nums">{String(totalPages).padStart(2, "0")}</span>
        <span className="ml-2">pages</span>
      </div>

      {/* Page Navigation */}
      <div className="flex items-center gap-1">
        {currentPage > 1 ? (
          <Link
            href={`/blog?page=${currentPage - 1}`}
            aria-label="Go to previous page"
            className={`${baseButton} mr-1`}
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </Link>
        ) : (
          <span aria-disabled="true" className={`${disabledButton} mr-1`}>
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </span>
        )}

        {getPages().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className="flex h-10 w-7 items-center justify-center text-muted-foreground/60"
            >
              <MoreHorizontal size={17} />
            </span>
          ) : (
            <Link
              key={page}
              href={`/blog?page=${page}`}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              className={currentPage === page ? activeButton : baseButton}
            >
              {page}
            </Link>
          )
        )}

        {currentPage < totalPages ? (
          <Link
            href={`/blog?page=${currentPage + 1}`}
            aria-label="Go to next page"
            className={`${baseButton} ml-1`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </Link>
        ) : (
          <span aria-disabled="true" className={`${disabledButton} ml-1`}>
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </span>
        )}
      </div>
    </nav>
  );
}
