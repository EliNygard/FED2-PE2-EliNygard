"use client";

import { setCreateNewVenue } from "@/lib/api";
import { VenueFormValues } from "@/lib/schemas";
import { useAuthStore } from "@/stores/useAuthStore";
import VenueForm from "@/ui/forms/VenueForm";
import { useRouter } from "next/navigation";

/**
 * CreateVenuePage displays the form where a venue manager can create a new venue.
 *
 * - Renders <VenueForm>
 */

export default function CreateVenuePage() {
  const username = useAuthStore((state) => state.user?.name);
  const router = useRouter();

  async function handleCreate(data: VenueFormValues) {
    console.log("handleCreate ", data);
    await setCreateNewVenue(data);
    router.push(`/profile/${username}/venues`);
  }
  return (
    <section>
      <h1>Create new venue</h1>
      <VenueForm onSubmit={handleCreate} submitLabel="Create Venue" />
    </section>
  );
}
