"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useParams } from "next/navigation";

export default function ProfileHeader() {
  const { username } = useParams();
  const isVenueManager = useAuthStore((state) => state.isVenueManager);
  return (
    <section className="bg-secondary-background">
      <h1>Hello, {username}</h1>
      {isVenueManager ? <h2>Venue Manager</h2> : ""}
    </section>
  );
}
