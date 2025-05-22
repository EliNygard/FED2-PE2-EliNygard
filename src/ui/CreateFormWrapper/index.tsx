"use client";

import { useCreateVenue } from "@/hooks/useCreateVenue";
import { VenueFormValues } from "@/lib/schemas";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import VenueForm from "../forms/VenueForm";

/**
 * CreateFormWrapper displays the form where a venue manager can create a new venue.
 *
 * - Renders <VenueForm>
 */

export default function CreateFormWrapper() {
  const router = useRouter();
  const username = useAuthStore((state) => state.user?.name);
  const { createVenue, isLoading, isError } = useCreateVenue();

  async function handleCreate(data: VenueFormValues) {
    try {
      await createVenue(data);
      toast.success("Your new venue was successfully added!");
      router.push(`/profile/${username}/venues`);
    } catch (error) {
      console.error(error);
      toast.error(
        isError || "An error occurred while creating a venue. Please try again."
      );
    }
  }

  return (
    <VenueForm
      onSubmit={handleCreate}
      submitLabel="Create Venue"
      isLoading={isLoading}
    />
  );
}
