"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IPaginationMeta } from "@/interface";
import { useRouter } from "next/navigation";

export default function PaginationPanel({ meta }: { meta: IPaginationMeta }) {
  const router = useRouter();
  console.log(meta);

  const goToPage = (page: number | null) => {
    if (!page) return;
    router.push(`/?page=${page}`, { scroll: true });
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous page button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToPage(meta.previousPage);
            }}
            aria-disabled={!meta?.previousPage}
            tabIndex={!meta?.previousPage ? -1 : undefined}
            className={
              !meta?.previousPage ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>

        <PaginationItem>{meta.currentPage}</PaginationItem>

        {/* Dynamic page buttons */}
        {/* {pages && pages.map((page, index) =>
              page === DOTS ? (
                <PaginationItem key={`dots-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page);
                    }}
                    isActive={page === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )} */}

        {/* Next page button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToPage(meta.nextPage);
            }}
            aria-disabled={!meta?.nextPage}
            tabIndex={!meta?.nextPage ? -1 : undefined}
            className={
              !meta?.nextPage ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
