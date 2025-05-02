import { IBooking } from "@/interface";
import Image from "next/image";
import Link from "next/link";

export default function BookingCard({ booking }: {booking: IBooking}) {
  const dateFrom = new Date(booking.dateFrom)
  console.log(dateFrom);
  
  
  
  return (
    <li>
      <Link href={`/venue/id`}>
        <div className="flex flex-row gap-3.5">
          <div className="h-[80px] w-[80px] overflow-hidden rounded-md">
            <Image
              src="/LogoMountainsH.svg"
              alt="Image"
              width={80}
              height={80}
              style={{
                objectFit: "cover",
                overflow: "hidden",
                borderRadius: "6px",
              }}
            />
          </div>
          <div className="text-sm">
            <p>{booking.venue?.location?.city}</p>
            <p>
              {`${booking.dateFrom} - ${booking.dateTo}`}
            </p>
            <p>
              {`${booking.guests} guests`}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
