import { IBooking } from "@/interface";
import BookingCard from "../BookingCard";

export default function MyBookings({ bookings }: { bookings: IBooking[] }) {
  if (!bookings || bookings.length === 0) {
    return <p>You have no bookings</p>;
  }

  return (
    <section>
      <h2 className="mb-8">My Bookings</h2>
      <ul className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </ul>
    </section>
  );
}
