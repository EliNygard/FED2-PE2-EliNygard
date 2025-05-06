// hooks/usePagination.ts
import { useMemo } from "react";

export const DOTS = "__DOTS__" as const;
type PageOrDots = number | typeof DOTS;

/** inclusive range [start…end] */
function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Returns an array like [1, DOTS, 4, 5, 6, DOTS, total]
 */
export function usePagination({
  currentPage,
  totalPages,
  siblingCount = 1,
  boundaryCount = 1,
}: {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
  boundaryCount?: number;
}): PageOrDots[] {
  return useMemo(() => {
    const totalPageNumbers = boundaryCount * 2 + siblingCount * 2 + 1 + 2;
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSibling  = Math.max(currentPage - siblingCount, boundaryCount + 2);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages - boundaryCount - 1);

    const showLeftDots  = leftSibling  > boundaryCount + 2;
    const showRightDots = rightSibling < totalPages - boundaryCount - 1;

    const pages: PageOrDots[] = [];

    // left boundary
    pages.push(...range(1, boundaryCount));

    // left ellipsis or extra block
    if (showLeftDots) {
      pages.push(DOTS);
    } else {
      pages.push(...range(boundaryCount + 1, leftSibling - 1));
    }

    // main window
    pages.push(...range(leftSibling, rightSibling));

    // right ellipsis or extra block
    if (showRightDots) {
      pages.push(DOTS);
    } else {
      pages.push(...range(rightSibling + 1, totalPages - boundaryCount));
    }

    // right boundary
    pages.push(...range(totalPages - boundaryCount + 1, totalPages));

    return pages;
  }, [currentPage, totalPages, siblingCount, boundaryCount]);
}
