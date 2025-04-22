"use client";

import { IVenue } from "@/interface";
import Image from "next/image";
import { roboto } from "../fonts";

export default function VenueCard({ venue }: { venue: IVenue }) {
  const firstImage = venue.media?.[0];

  return (
    <li className="flex flex-col gap-1">
      <div className="relative w-full aspect-[3/2] overflow-hidden rounded-t-sm">

      {firstImage ? (
        <Image
        src={firstImage.url}
        alt={firstImage.alt || venue.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{objectFit: 'cover'}}
        loading="lazy"
        />
      ) : (
        <Image
        src="/LogoMountainsV.svg"
        alt={venue.name}
        fill
        style={{objectFit: 'cover'}}
        loading="lazy"
        />
      )}
      </div>
      <h1>{`${venue.location.city}, ${venue.location.country}`}</h1>
      <div className="mt-4 flex flex-col gap-1">
        <p>{`${venue.maxGuests} guests`}</p>
        <p>
          <span className={roboto.className} style={{ fontWeight: 500 }}>{`${venue.price} NOK `}</span>
          per night
        </p>
      </div>
    </li>
  );
}
