"use client";

import { IVenue } from "@/interface";
// import Image from "next/image";

export default function VenueCard({ venue }: { venue: IVenue }) {
  const firstImage = venue.media?.[0];
  console.log(venue);

  return (
    <li className="flex flex-col gap-1">
      {firstImage && (
        <img
          className="object-fill aspect-3/2 rounded-t-sm"
          src={firstImage.url}
          alt={firstImage.alt || venue.name}
        />
      )}
      <h1>{`${venue.location.city}, ${venue.location.country}`}</h1>
      <div className="mt-4 flex flex-col gap-1">
        <p>{`${venue.maxGuests} guests`}</p>
        <p>
          <span>{`${venue.price} NOK `}</span>
          per night
        </p>
      </div>
    </li>
  );
}
