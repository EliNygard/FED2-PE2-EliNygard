import { getVenueById } from "@/lib/api";
import UpdateFormWrapper from "@/ui/UpdateFormWrapper";
import { notFound } from "next/navigation";

/**
 * UpdateVenuePage holds the form wrapper, which displays the form where a venue manager can update a venue.
 *
 * - Renders <UpdateFormWrapper>
 */

export default async function UpdateVenuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await getVenueById(id);
  console.log(id, data);

  if (!data) {
    return notFound();
  }

  return (
    <section>
      <h1>Update venue</h1>
      <UpdateFormWrapper initialValues={data} venueId={id} />
    </section>
  );
}
