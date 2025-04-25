"use client";

import { IVenue } from "@/interface";
import searchVenues from "@/lib/venues/searchVenues";
import VenueCard from "@/ui/VenueCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");

  const [venues, setVenues] = useState<IVenue[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const searchResult = await searchVenues({ searchTerm: searchTerm || "" });
      setVenues(searchResult);
      setIsLoading(false);
    }
    if (searchTerm) load();
    else setVenues([]);
  }, [searchTerm]);

  return (
    <>
      <div className="mb-7" style={{ fontWeight: 500 }}>
        <p>{`We have ${venues.length} venues matching the search for ${searchTerm?.toLocaleUpperCase()}`}</p>
      </div>
      {isLoading && <p>Loading venues...</p>}
      <ul className="grid gap-6 grid-cols-1 min-[440px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {venues.map((venue: IVenue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </ul>
    </>
  );
}