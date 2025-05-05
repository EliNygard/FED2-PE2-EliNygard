"use client";

import { useVenuesByProfile } from "@/hooks/useVenuesByProfile";
import { useAuthStore } from "@/stores/useAuthStore";
import MyVenues from "@/ui/venues/MyVenues";
import Link from "next/link";

export default function MyVenuesPage() {
  const username = useAuthStore((s) => s.user?.name) ?? "";
  const { venues, loading, error } = useVenuesByProfile(username);

  if (!username) {
    return <p>Please log in to view your venues</p>;
  }

  if (loading) {
    return <p>Loading venues...</p>;
  }

  if (error) {
    return (
      <p role="alert">
        Unfortunately we could not find your venues at the moment. Please try
        again.
      </p>
    );
  }

  return (
    <section>
      {venues && venues.length > 0 ? (
        <MyVenues venues={venues} />
      ) : (
        <div>

        <p className="mb-6">
          You have not added any venues yet.
        </p>
          <Link className="border-b-1 border-primary-font" href={`/profile/${username}/venues/new`}>Create your first venue</Link>
        </div>
      )}
    </section>
  );
}
