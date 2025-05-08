'use client'

import { useAuthStore } from "@/stores/useAuthStore";

/**
 * Page component for displaying the base profile page.
 *
 * - Renders different content for Venue Manager or Customer
 */

export default function ProfilePage() {
    const isVenueManager = useAuthStore((state) => state.isVenueManager)

  return (
    <section className="">
{isVenueManager ? 'display my venues' : 'display my bookings'}
    </section>
  );
}
