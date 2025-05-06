import { IVenue } from "@/interface";
import { getVenues } from "@/lib/api";
import VenueCard from "@/ui/VenueCard";


export default async function HomePage() {
  const data = await getVenues()

  return (
    <section className="flex flex-col gap-[32px] page-padding">
          <ul className="grid gap-6 grid-cols-1 min-[440px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {data.map((venue: IVenue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </ul>
    </section>
  );
}
