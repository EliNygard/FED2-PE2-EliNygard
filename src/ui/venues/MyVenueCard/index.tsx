import { IVenue } from "@/interface";
import Button from "@/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function MyVenueCard({ venue }: { venue: IVenue }) {
  const firstImage = venue.media?.[0];
  return (
    <li className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:grid-rows-2">
      <div className="md: row-start-1 md:row-span-full md:col-span-full">
        <Link href={`/venue/${venue.id}`}>
          <div className="flex gap-3">
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
            <h3 className="text-base md:text-lg">{venue.name}</h3>
          </div>
        </Link>
      </div>

      <div className="md:col-start-2 md:row-start-2 md:content-end md:align-bottom">
        <div className="flex gap-6 md:justify-end md:items-end">
          <Button $variant="narrow" className="bg-accent-green">
            Update
          </Button>
          <Button $variant="narrow" className="bg-brand-blue">
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}
