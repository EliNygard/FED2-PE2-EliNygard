import { IBooking } from "@/interface";
import Image from "next/image";
import Link from "next/link";

export default function BookingCard({ booking }: { booking: IBooking }) {
  const dateFormat = new Intl.DateTimeFormat("no-NO", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const firstImage = booking.venue.media?.[0];
  const dateFrom = dateFormat.format(new Date(booking.dateFrom));
  const dateTo = dateFormat.format(new Date(booking.dateTo));
  const venueId = booking.venue.id

  return (
    <li className="">
      <Link href={`/venue/${venueId}`}>
        <div className="flex flex-row gap-3.5 md:gap-5">
          <div className="relative h-20 md:h-28 aspect-square overflow-hidden rounded-md">
            {firstImage ? (
              <Image
                src={firstImage.url}
                alt={firstImage.alt || booking.venue.name}
                fill
                sizes="30vw"
                style={{
                  objectFit: "cover",
                  overflow: "hidden",
                  borderRadius: "6px",
                  aspectRatio: 'inherit'
                }}
              />
            ) : (
              <Image
                src="/LogoMountainsV.svg"
                alt={booking.venue.name}
                fill
                style={{
                  objectFit: "cover",
                  overflow: "hidden",
                  borderRadius: "6px",
                }}
              />
            )}
          </div>
          <div className="flex flex-col justify-between py-1 md:py-2">
            <p className="text-sm md:text-base">{booking.venue?.location?.city}</p>
            <p className="text-sm md:text-base"> {`${dateFrom} - ${dateTo}`}</p>
            <p className="text-sm md:text-base">{`${booking.guests} guests`}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
