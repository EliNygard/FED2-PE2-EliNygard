import { IVenue } from "@/interface";
import Image from "next/image";
import styles from "./styles.module.css";

/**
 * VenueHeader displays info to the user: the profile image and name of the host, and the venue's rate.
 * - The component is part of the VenuePage.
 * @param venue The venue data.
 */

export default function VenueHeader({ venue }: { venue: IVenue }) {
  console.log(typeof venue.location.city);

  const { city, country } = venue.location || {};
  const isCity = city.length > 0;
  const isCountry = country.length > 0;
  let locationString = "";

  if (isCity && isCountry) {
    locationString = `${city}, ${country}`;
  } else if (isCity) {
    locationString = city;
  } else if (isCountry) {
    locationString = country;
  }

  return (
    <header className={styles.header}>
      <section className="capitalize">
        <h1>{venue.name}</h1>
        {locationString ? <p>{locationString}</p> : null}
      </section>
      <div className={styles.headerDetails}>
        <div>
          <div className={styles.hostWrapper}>
            <div className="relative rounded-full h-10 w-10 overflow-hidden">
              <Image
                src={venue.owner.avatar.url || "/default-user.svg"}
                alt={venue.owner.name || "User profile image"}
                fill
                sizes="33vw"
                className="w-full object-cover rounded-full"
              />
            </div>
            <p className="">{`${venue.owner.name} is hosting`}</p>
          </div>
        </div>
        <p>{`${venue.price} NOK per night`}</p>
      </div>
    </header>
  );
}
