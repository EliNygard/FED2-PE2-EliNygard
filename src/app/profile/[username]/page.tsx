'use client'

import { useAuthStore } from "@/stores/useAuthStore";

export default function ProfilePage() {
    const isVenueManager = useAuthStore((store) => store.isVenueManager)

  return (
    <section className="">
{isVenueManager ? 'display my venues' : 'display my bookings'}
    </section>
  );
}
