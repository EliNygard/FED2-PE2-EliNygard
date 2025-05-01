"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useParams } from "next/navigation";

export default function ProfileHeader() {
  const { username } = useParams();
  const isVenueManager = useAuthStore((state) => state.isVenueManager);
  return (
    <section className="bg-secondary-background flex flex-wrap gap-2.5 justify-between items-center py-6 px-6 md:px-10 lg:px-10 2xl:px-20">
      <h1 className="text-sm md:text-lg">Hello, {username}</h1>
      {isVenueManager ? <h2 className="text-xs md:text-sm uppercase">Venue Manager</h2> : ""}
    </section>
  );
}
