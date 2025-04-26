import { getVenueById, getVenues } from "@/lib/api";
import VenueHeader from "@/ui/venuePage/VenueHeader";
import VenueInfo from "@/ui/venuePage/VenueInfo";

export async function generateStaticParams() {
  const venues = await getVenues();
  return venues.map((venue) => ({
    id: venue.id,
  }));
}

export default async function VenuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);

  const venue = await getVenueById(id);

  console.log(venue);

  return (
    <main className="m-auto grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="md:col-span-full">01 Images</div>
      <div className="md:col-span-full">
        <VenueHeader venue={venue} />
      </div>
      <div className="md:col-start-1">
        <VenueInfo venue={venue} />
      </div>
      <div className="md:col-start-2 md:row-start-3 md:row-end-5">
        04 Calendar
      </div>
      <div className="md:col-start-1">05 Location</div>
    </main>
  );
}
