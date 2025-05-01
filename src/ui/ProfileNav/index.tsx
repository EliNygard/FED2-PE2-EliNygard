'use client'

import { useAuthStore } from "@/stores/useAuthStore";

export default function ProfileNav() {
const isVenueManager = useAuthStore((state) => state.isVenueManager);
  return (
    <div className="flex gap-3.5 flex-wrap">
      {isVenueManager ? (
        <>
        <div>Create New Venue</div>
        <div>My Venues</div>
        </>

      ) : ''}
      <div>My Bookings</div>
      <div>Edit Profile</div>
      <div>Log out</div>
    </div>
  );
}
