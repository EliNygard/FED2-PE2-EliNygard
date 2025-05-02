import { IBooking } from "@/interface";
import BookingCard from "../BookingCard";

export default function MyBookings({ bookings }: { bookings: IBooking[] }) {
  if (!bookings || bookings.length === 0) {
    return <p>You have no bookings</p>;
  }

  return (
    <section>
      <h2>My Bookings</h2>
      <ul className="flex flex-col gap-3.5">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </ul>
    </section>
  );
}
