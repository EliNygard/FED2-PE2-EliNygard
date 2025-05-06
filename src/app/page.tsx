"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
// import { usePagination } from "@/hooks/usePagination";

import { IPaginationMeta, IVenue } from "@/interface";
import { getVenues } from "@/lib/api";
import VenueCard from "@/ui/VenueCard";
import { useEffect, useState } from "react";

export default function HomePage() {
  // create a VenueList component and add to home page

  const [page, setPage] = useState(1);
  const [venues, setVenues] = useState<IVenue[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);

  useEffect(() => {
    getVenues(page, 10).then(({ data, meta }) => {
      setVenues(data);
      setMeta(meta);
    });
  }, [page]);

  // const pages = meta;
  // usePagination({
  //   currentPage: page,
  //   totalPages: meta?.pageCount ?? 1,
  //   siblingCount: 1,
  //   boundaryCount: 1,
  // });

  return (
    <section className="flex flex-col gap-[32px] page-padding">
      <ul className="grid gap-6 grid-cols-1 min-[440px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {venues.map((venue: IVenue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </ul>

      {meta && (
        <Pagination>
          <PaginationContent>
            {/* Previous page button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (meta?.previousPage) {
                    setPage(meta.previousPage);
                  }
                  window.scrollTo({ top: 0, left: 100, behavior: "smooth" });
                }}
                aria-disabled={!meta?.previousPage}
                tabIndex={!meta?.previousPage ? -1 : undefined}
                className={
                  !meta?.previousPage
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>

            <PaginationItem>
              {meta.currentPage}
            </PaginationItem>

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
                  if (meta?.nextPage) {
                    setPage(meta.nextPage);
                  }
                  window.scrollTo({ top: 0, left: 100, behavior: "smooth" });
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
      )}
    </section>
  );
}
