"use client";

import { IBooking } from "@/interface";
import { getBookingsByProfile } from "@/lib/api";
import { useAuthStore } from "@/stores/useAuthStore";
import MyBookings from "@/ui/bookings/MyBookings";
import { useEffect, useState } from "react";

export default function MyBookingsPage() {
  const username = useAuthStore((store) => store.user?.name) ?? "";

  const [bookings, setBookings] = useState<IBooking[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!username || "") return;

    async function fetchBookings() {
      try {
        const data = await getBookingsByProfile(username);
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [username]);

  if (isLoading) {
    return <p>Loading bookings...</p>;
  }
  if (!username) {
    return <p>Please log in to view your bookings</p>;
  }

  return (
    <section>
      {bookings && bookings.length > 0 ? (
        // <p>Your bookings</p>
        <MyBookings bookings={bookings} />
      ) : (
        <p>You have no bookings</p>
      )}
    </section>
  );
}
