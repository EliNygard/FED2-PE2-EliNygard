"use client";

import { IBooking } from "@/interface";
import { getBookingsByProfile } from "@/lib/api";
import { useAuthStore } from "@/stores/useAuthStore";
import MyBookingsSection from "@/ui/bookings/MyBookings";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";

/**
 * Page component for displaying the bookings section.
 *
 * - Shows a loading state while fetching.
 * - Renders <MyBookingsSection> or a `no bookings` element if no bookings.
 */

export default function MyBookingsPage() {
  const router = useRouter();
  const username = useAuthStore((state) => state.user?.name) ?? "";
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrating = useAuthStore((state) => state.isHydrating);
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    if (!isHydrating && !isAuthenticated) {
      router.replace(
        `/login?from=${encodeURIComponent(window.location.pathname)}`
      );
    }
  }, [isHydrating, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated || !username) return;

    async function fetchBookings() {
      setLoading(true);
      setIsError(null);
      try {
        const { data } = await getBookingsByProfile(username);
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
        setIsError("Could not load your bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [username, isAuthenticated]);

  if (isHydrating || isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div role="alert">{isError}</div>;
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
