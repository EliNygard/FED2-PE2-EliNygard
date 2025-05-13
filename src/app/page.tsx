import { IVenue } from "@/interface";
import { getVenues } from "@/lib/api";
import PaginationPanel from "@/ui/Pagination";
import VenueCard from "@/ui/VenueCard";

/**
 * Page component for displaying the home page with a list of all venues available on Holidaze.
 *
 * - Shows a loading state while fetching data.
 * - Renders <VenueCard>
 */

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const pageNumber = parseInt(page, 10);
  console.log(pageNumber);

  const { data: venues, meta: meta } = await getVenues(pageNumber, 10);
  console.log("Venues: ", venues);
  console.log("Meta: ", meta);
  console.log(meta.currentPage);

  return (
    <section className="flex flex-col gap-[32px] page-padding">
      <ul className="grid gap-6 grid-cols-1 min-[440px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {venues.map((venue: IVenue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </ul>
      <div>
      <PaginationPanel meta={meta} />

      </div>

    </section>
  );
}
