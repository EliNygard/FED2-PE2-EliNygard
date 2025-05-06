'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { IPaginationMeta, IVenue } from "@/interface";
import { getVenues } from "@/lib/api";
import VenueCard from "@/ui/VenueCard";
import { useEffect, useState } from "react";

export default function HomePage() {

  // create a VenueList component and add to home page

  const [page, setPage] = useState(1)
  const [venues, setVenues] = useState<IVenue[]>([])
  const [meta, setMeta] = useState<IPaginationMeta | null>(null)
  
  useEffect(() => {
    getVenues(page, 10).then(({ data, meta }) => {
      setVenues(data)
      setMeta(meta)
    })
  }, [page])

  return (
    <section className="flex flex-col gap-[32px] page-padding">
      <ul className="grid gap-6 grid-cols-1 min-[440px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {venues.map((venue: IVenue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </ul>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                {meta?.currentPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
