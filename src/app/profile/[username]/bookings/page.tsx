"use client";

import { IBooking } from "@/interface";
import { getBookingsByProfile } from "@/lib/api";
import { useAuthStore } from "@/stores/useAuthStore";
import MyBookings from "@/ui/bookings/MyBookings";
import Link from "next/link";
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
        <MyBookings bookings={bookings} />
      ) : (
        <div>

        <p className="mb-6">
          You have no bookings yet.
        </p>
          <Link className="border-b-1 border-primary-font" href="/">Find your first stay</Link>
        </div>
      )}
    </section>
  );
}
