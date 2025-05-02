'use client'

import { useAuthStore } from "@/stores/useAuthStore";
import Button from "../Button";
import { useLogout } from "@/hooks/useLogout";

export default function ProfileNav() {
const isVenueManager = useAuthStore((state) => state.isVenueManager);
const handleLogout = useLogout()
  return (
    <div className="md:flex md:flex-col md:gap-8">
      {isVenueManager ? (
        <>
        <Button variant="narrow">Create New Venue</Button>
        <Button variant="narrow">My Venues</Button>
        </>

      ) : ''}
      <Button variant="narrow">My Bookings</Button>
      <Button variant="narrow">Edit Profile</Button>
      <Button variant="narrow" onClick={handleLogout}>Log out</Button>
    </div>
  );
}
