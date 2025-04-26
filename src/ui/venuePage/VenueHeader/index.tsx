import { IVenue } from "@/interface";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

export default function VenueHeader({ venue }: { venue: IVenue }) {
  return (
    <header className={styles.header}>
      <section>
        <h1>{venue.name}</h1>
        <p>{`${venue.location.city}, ${venue.location.country}`}</p>
      </section>
      <div className={styles.headerDetails}>
        <div>
          <Link href="/profile" className={styles.hostWrapper}>
            <div className="relative rounded-full h-10 w-10 overflow-hidden">
              <Image
                src={venue.owner.avatar.url || "/default-user.svg"}
                alt={venue.owner.name || "User profile image"}
                fill
                sizes="33vw"
                className="w-full object-cover rounded-full"
              />
            </div>
            <p>{`${venue.owner.name} is hosting`}</p>
          </Link>
        </div>
        <p>{`${venue.price} NOK per night`}</p>
      </div>
    </header>
  );
}
