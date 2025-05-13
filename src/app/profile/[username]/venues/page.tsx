"use client";

import { useVenuesByProfile } from "@/hooks/useVenuesByProfile";
import { useAuthStore } from "@/stores/useAuthStore";
import MyVenues from "@/ui/venues/MyVenues";
import Link from "next/link";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Page component for displaying a list of the current Manager's venues.
 *
 * - Shows a loading state while fetching.
 * - Renders <My Venues> or a 'no venues' call-to-action
 */

export default function MyVenuesPage() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrating = useAuthStore((state) => state.isHydrating)
  const username = useAuthStore((state) => state.user?.name) ?? "";
  const { venues, loading, error } = useVenuesByProfile(username);

  useEffect(() => {
      if (!isHydrating && !isAuthenticated) {
        router.replace(`/login?from=${encodeURIComponent(window.location.pathname)}`)
      }
    }, [isHydrating, isAuthenticated, router])
  
    if (isHydrating || loading) {
    return <Loading />;
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
          <p className="mb-6">You have not added any venues yet.</p>
          <Link
            className="border-b-1 border-primary-font"
            href={`/profile/${username}/venues/new`}
          >
            Create your first venue
          </Link>
        </div>
      )}
    </section>
  );
}
