import { IVenue } from "@/interface";
import Image from "next/image";
import Link from "next/link";

export default function MyVenueCard({ venue }: { venue: IVenue }) {
  const firstImage = venue.media?.[0];
  return (
    <li>
      <Link href={`/venue/${venue.id}`}>
        <div className="relative h-20 md:h-28 aspect-square overflow-hidden rounded-md">
          {firstImage ? (
            <Image
              src={firstImage.url}
              alt={firstImage.alt || venue.name}
              fill
              sizes="30vw"
              style={{
                objectFit: "cover",
                overflow: "hidden",
                borderRadius: "6px",
                aspectRatio: "inherit",
              }}
            />
          ) : (
            <Image
              src="/LogoMountainsV.svg"
              alt={venue.name}
              fill
              style={{
                objectFit: "cover",
                overflow: "hidden",
                borderRadius: "6px",
              }}
            />
          )}
        </div>
        <h3>{venue.name}</h3>
      </Link>

      <button>Update</button>
      <button>Delete</button>
    </li>
  );
}
