"use client";

import { useCreateVenue } from "@/hooks/useCreateVenue";
import { VenueFormValues } from "@/lib/schemas";
import { useAuthStore } from "@/stores/useAuthStore";
import VenueForm from "@/ui/forms/VenueForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/**
 * CreateVenuePage displays the form where a venue manager can create a new venue.
 *
 * - Renders <VenueForm>
 */

export default function CreateVenuePage() {
  const { createVenue, isLoading, isError } = useCreateVenue();
  const username = useAuthStore((state) => state.user?.name);
  const router = useRouter();

  async function handleCreate(data: VenueFormValues) {
    try {
      await createVenue(data);
      toast.success("Your new venue was successfully added!");
      router.push(`/profile/${username}/venues`);
      console.log("handleCreate ", data);
    } catch (error) {
      console.error(error);
      toast.error(
        isError || "An error occurred while creating a venue. Please try again."
      );
    }
  }

  return (
    <section>
      <h1>Create new venue</h1>
      <VenueForm
        onSubmit={handleCreate}
        submitLabel="Create Venue"
        isLoading={isLoading}
      />
    </section>
  );
}
