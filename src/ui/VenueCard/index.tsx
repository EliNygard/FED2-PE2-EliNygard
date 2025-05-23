"use client";

import { IVenue } from "@/interface";
import Image from "next/image";
import Link from "next/link";
import { roboto } from "../fonts";

/**
 * VenueCard displays a single venue with only the basic information.
 * Including: venue image, city and rate.
 * @param venue The venue data.
 */

export default function VenueCard({ venue }: { venue: IVenue }) {
  // lift out of component
  const firstImage = venue.media?.[0];
  const { city, country } = venue.location || {};
  let locationString = null;
  if (city && country) {
    locationString = `${city}, ${country}`;
  } else if (city) {
    locationString = city;
  } else if (country) {
    locationString = country;
  } else if (!city && !country) {
    locationString = venue.name;
  }

  return (
    <li className="flex flex-col gap-1">
      <Link href={`/venue/${venue.id}`}>
        <div className="relative w-full aspect-[3/2] overflow-hidden rounded-t-sm">
          {firstImage ? (
            <Image
              src={firstImage.url}
              alt={firstImage.alt || venue.name}
              fill
              sizes="30vw"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          ) : (
            <Image
              src="/LogoMountainsV.png"
              alt={venue.name}
              fill
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          )}
        </div>
        {locationString && (
          <h1 className="text-base mt-1.5 capitalize">{locationString}</h1>
        )}
        <div className="mt-4 flex flex-col gap-1">
          <p>{`${venue.maxGuests} guests`}</p>
          <p>
            <span
              className={roboto.className}
              style={{ fontWeight: 500 }}
            >{`${venue.price} NOK `}</span>
            per night
          </p>
        </div>
      </Link>
    </li>
  );
}
