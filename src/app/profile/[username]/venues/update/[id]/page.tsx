"use client";

import { useUpdateVenue } from "@/hooks/useUpdateVenue";
import { IVenue } from "@/interface";
import { getVenueById } from "@/lib/api";
import { VenueFormValues } from "@/lib/schemas";
import VenueForm from "@/ui/forms/VenueForm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UpdateVenuePage() {
  const { id } = useParams();
  const router = useRouter()
  
  const { updateVenue, isLoading, isError } = useUpdateVenue();
  const [venue, setVenue] = useState<IVenue | null>(null);

  useEffect(() => {
    if (!id) {
      console.error("Invalid venue id");
      return;
    }
    async function fetchVenue() {
      try {
        const response = await getVenueById(id as string);
        const venue = response.data;
        setVenue(venue);
      } catch (error) {
        console.error(error);
      }
    }
    fetchVenue();
  }, [id]);

  async function handleUpdate(data: VenueFormValues) {
    if (!id) {
      console.error("Invalid venue ID");
      return;
    }
    try {
      await updateVenue(data, id as string);
      toast("Your venue was successfully added!");
      router.push(`/venue/${id}`)
      console.log("Updated: ", data);
    } catch (error) {
      console.error(error);
      toast.error(
        isError || "An error occurred while updating venue. Please try again"
      );
    }
  }

  if (!id) {
    return <p>Invalid venue ID. Please go back and try again.</p>;
  }

  if (!venue) {
    return <p>Loading venue details...</p>;
  }

  return (
    <section>
      <h1>Update venue</h1>
      <VenueForm
        onSubmit={handleUpdate}
        initialValues={venue}
        submitLabel="Update Venue"
        isLoading={isLoading}
      />
    </section>
  );
}
