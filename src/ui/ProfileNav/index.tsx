'use client'

import { useAuthStore } from "@/stores/useAuthStore";
import Button from "../Button";

export default function ProfileNav() {
const isVenueManager = useAuthStore((state) => state.isVenueManager);
  return (
    <div className="mt-4 flex flex-wrap gap-2.5">
      {isVenueManager ? (
        <>
        <Button variant="narrow">Create New Venue</Button>
        <Button variant="narrow">My Venues</Button>
        </>

      ) : ''}
      <Button variant="narrow">My Bookings</Button>
      <Button variant="narrow">Edit Profile</Button>
      <Button variant="narrow">Log out</Button>
    </div>
  );
}
