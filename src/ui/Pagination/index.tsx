"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IPaginationMeta } from "@/interface";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function PaginationPanel({ meta }: { meta: IPaginationMeta }) {
  const router = useRouter();
  const { pageCount, currentPage, previousPage, nextPage } = meta;

  const goToPage = (page: number | null) => {
    if (!page) return;
    router.push(`/?page=${page}`, { scroll: true });
  };

  const getRange = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const paginationItems = useMemo<
    (number | "left-ellipsis" | "right-ellipsis")[]
  >(() => {
    const maxVisible = 7;
    const boundaryCount = 1;
    const siblingCount = Math.max(
      0,
      Math.floor((maxVisible - (boundaryCount * 2 + 3)) / 2)
    );
    const total = pageCount;
    const totalPageNumbers = boundaryCount * 2 + siblingCount * 2 + 3;
    if (total <= totalPageNumbers) {
      return getRange(1, total);
    }

    const leftSiblingIndex = Math.max(
      currentPage - siblingCount,
      boundaryCount + 2
    );
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      total - boundaryCount - 1
    );
    const showLeftEllipsis = leftSiblingIndex > boundaryCount + 2;
    const showRightEllipsis = rightSiblingIndex < total - boundaryCount - 1;
    const firstPages = getRange(1, boundaryCount);
    const lastPages = getRange(total - boundaryCount + 1, total);
    const middlePages = getRange(leftSiblingIndex, rightSiblingIndex);

    const items: (number | "left-ellipsis" | "right-ellipsis")[] = [];

    items.push(...firstPages);

    if (showLeftEllipsis) {
      items.push("left-ellipsis");
    } else {
      items.push(...getRange(boundaryCount + 1, leftSiblingIndex - 1));
    }

    items.push(...middlePages);

    if (showRightEllipsis) {
      items.push("right-ellipsis");
    } else {
      items.push(...getRange(rightSiblingIndex + 1, total - boundaryCount));
    }

    items.push(...lastPages);

    return items;
  }, [pageCount, currentPage]);

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous page button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToPage(previousPage);
            }}
            aria-disabled={!previousPage}
            tabIndex={!previousPage ? -1 : undefined}
            className={
              !previousPage ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>

        {/* Page buttons */}
        {paginationItems.map((item, index) =>
          typeof item === "number" ? (
            <PaginationItem key={item}>
              <PaginationLink
                href="#"
                isActive={item === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(item);
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem className="hidden md:flex" key={`${item}-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          )
        )}

        {/* Next page button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToPage(nextPage);
            }}
            aria-disabled={!nextPage}
            tabIndex={!nextPage ? -1 : undefined}
            className={!nextPage ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
