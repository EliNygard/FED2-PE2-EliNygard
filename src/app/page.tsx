import { IVenue } from "@/interface";
import VenueCard from "@/ui/VenueCard";
import { getVenues } from "../lib/venues/getVenues";

export default async function Home() {
  const data = await getVenues();
  console.log(data);

  return (
    <main className="flex flex-col gap-[32px]">
      
      <div>

      <ul>
        <ul className="grid gap-6 grid-cols-1 min-[440px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {data.map((venue: IVenue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </ul>
      </ul>
          </div>
    </main>
  );
}
