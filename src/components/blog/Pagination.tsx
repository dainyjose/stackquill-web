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
    "inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row"
    >
      <p className="text-sm text-muted-foreground">
        Page <span className="font-medium text-foreground">{currentPage}</span> of{" "}
        <span className="font-medium text-foreground">{totalPages}</span>
      </p>

      <div className="flex items-center gap-1.5">
        {currentPage > 1 ? (
          <Link
            href={`/blog?page=${currentPage - 1}`}
            aria-label="Go to previous page"
            className={baseButton}
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </Link>
        ) : (
          <span aria-disabled="true" className={`${baseButton} cursor-not-allowed opacity-40`}>
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </span>
        )}

        {getPages().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className="flex h-10 w-7 items-center justify-center text-muted-foreground"
            >
              <MoreHorizontal size={18} />
            </span>
          ) : (
            <Link
              key={page}
              href={`/blog?page=${page}`}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              className={
                currentPage === page
                  ? "inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-foreground bg-foreground px-3 text-sm font-semibold text-background shadow-sm"
                  : baseButton
              }
            >
              {page}
            </Link>
          )
        )}

        {currentPage < totalPages ? (
          <Link
            href={`/blog?page=${currentPage + 1}`}
            aria-label="Go to next page"
            className={baseButton}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </Link>
        ) : (
          <span aria-disabled="true" className={`${baseButton} cursor-not-allowed opacity-40`}>
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </span>
        )}
      </div>
    </nav>
  );
}
