import { IBooking } from "@/interface";
import BookingCard from "../BookingCard";
import React from "react";

/**
 * MyBookingsSection displays a list with the users venue bookings. 
 * 
 * - Renders <BookingCard> with details about the booking.
 */

interface MyBookingsSectionProps {
  bookings: IBooking[];
  emptyState?: React.ReactNode
}

export default function MyBookingsSection({ bookings, emptyState = <p>You have no bookings yet.</p>,}: MyBookingsSectionProps) {
    if (bookings.length === 0) {
    return <>{emptyState}</>
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
