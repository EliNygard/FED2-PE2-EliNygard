"use client";

import { useUpdateVenue } from "@/hooks/useUpdateVenue";
import { IVenue } from "@/interface";
import { VenueFormValues } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import VenueForm from "../forms/VenueForm";

/**
 * UpdateFormWrapper displays the form where a venue manager can update a venue.
 *
 * - Renders <VenueForm>
 */

export default function UpdateFormWrapper({
  venueId,
  initialValues,
}: {
  venueId: string;
  initialValues: IVenue;
}) {
  const router = useRouter();

  const { updateVenue, isLoading, isError } = useUpdateVenue();

  async function handleUpdate(data: VenueFormValues) {
    try {
      await updateVenue(data, venueId);
      toast.success("Your venue was successfully updated!");
      router.push(`/venue/${venueId}`);
      router.refresh()
    } catch (error) {
      console.error(error);
      toast.error(
        isError || "An error occurred while updating venue. Please try again."
      );
    }
  }

  return (
    <VenueForm
      onSubmit={handleUpdate}
      initialValues={initialValues}
      submitLabel="Update Venue"
      isLoading={isLoading}
    />
  );
}
