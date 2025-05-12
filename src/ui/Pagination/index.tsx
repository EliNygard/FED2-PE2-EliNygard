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

export default function PaginationPanel({ meta }: { meta: IPaginationMeta }) {
  const router = useRouter();
  const { pageCount, currentPage, previousPage, nextPage } = meta
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

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

        {/* Page buttons */}
        {pages.map((page, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goToPage(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {/* <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}

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
