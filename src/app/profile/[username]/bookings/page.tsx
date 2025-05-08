"use client";

import { IBooking } from "@/interface";
import { getBookingsByProfile } from "@/lib/api";
import { useAuthStore } from "@/stores/useAuthStore";
import MyBookingsSection from "@/ui/bookings/MyBookings";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Page component for displaying the bookings section.
 *
 * - Shows a loading state while fetching.
 * - Renders <MyBookingsSection> or a `no bookings` element if no bookings.
 */

export default function MyBookingsPage() {
  const username = useAuthStore((state) => state.user?.name) ?? "";

  const [bookings, setBookings] = useState<IBooking[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!username || "") return;

    async function fetchBookings() {
      try {
        const { data } = await getBookingsByProfile(username);
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [username]);

  if (!username) {
    return <p>Please log in to view your bookings</p>;
  }

  if (isLoading) {
    return <p>Loading bookings...</p>;
  }
  

  return (
    <MyBookingsSection
      bookings={bookings ?? []}
      emptyState={
        <div>
          <p className="mb-6">You have no bookings yet.</p>
          <Link className="border-b-1 border-primary-font" href="/">
            Find your first stay
          </Link>
        </div>
      }
    />
    
  );
}
