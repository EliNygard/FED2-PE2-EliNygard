"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import Customer from "./Customer";
import VenueManager from "./VenueManager";

export default function ProfileLandingPageWrapper({
  username,
}: {
  username: string;
}) {
  const isVenueManager = useAuthStore((state) => state.isVenueManager)
  const isLoading = useAuthStore((state) => state.isLoading)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isVenueManager ? (
        <VenueManager username={username} />
      ) : (
        <Customer username={username} />
      )}
    </>
  );
}
