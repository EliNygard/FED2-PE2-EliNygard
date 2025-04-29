import { getVenueById, getVenues } from "@/lib/api";
import VenueBooking from "@/ui/venuePage/VenueBooking";
import VenueHeader from "@/ui/venuePage/VenueHeader";
import VenueInfo from "@/ui/venuePage/VenueInfo";
import VenueLocation from "@/ui/venuePage/VenueLocation";

// TODO
// fix image urls (update venue, check venueCard)
// add image slider

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
    <main className="m-auto grid grid-cols-1 gap-8 md:gap-x-16 lg:gap-x-28 md:grid-cols-[1fr_auto] max-w-[1120px]">
      <div className="md:col-span-full">01 Images</div>
      <div className="md:col-span-full md:mb-7">
        <VenueHeader venue={venue} />
      </div>
      <div className="md:col-start-1">
        <VenueInfo venue={venue} />
      </div>
      <div className="md:col-start-2 md:row-start-3 md:row-end-5">
        <VenueBooking venue={venue} />
      </div>
      <div className="md:col-start-1">
        <VenueLocation venue={venue} />
      </div>
    </main>
  );
}
