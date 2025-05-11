import { useDeleteVenue } from "@/hooks/useDeleteVenue";
import { IVenue } from "@/interface";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BookingsAccordion from "../BookingsOnVenue";

/**
 * MyVenueCard displays the venue manager's own venues that customers can book.
 * - A link to the venue page
 * - The venue's name
 * - Buttons for the manager to either delete or edit the venue
 *
 * - The component is part of the MyVenues.
 * @param venue The venue data.
 */

export default function MyVenueCard({ venue }: { venue: IVenue }) {
  const router = useRouter();
  const firstImage = venue.media?.[0];
  const bookings = venue.bookings;
  const username = useAuthStore((state) => state.user?.name);
  const venueId = venue.id;
  const { handleDeleteVenue, isLoading, isError } = useDeleteVenue();

  return (
    <li className="mb-16">
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:grid-rows-2">
        <div className="md:row-start-1 md:row-span-full md:col-span-full">
          <Link href={`/venue/${venue.id}`}>
            <div className="flex gap-3">
              <div className="relative h-20 md:h-28 aspect-square overflow-hidden rounded-md">
                {firstImage ? (
                  <Image
                    src={firstImage.url}
                    alt={firstImage.alt || venue.name}
                    fill
                    sizes="30vw"
                    style={{
                      objectFit: "cover",
                      overflow: "hidden",
                      borderRadius: "6px",
                      aspectRatio: "inherit",
                    }}
                  />
                ) : (
                  <Image
                    src="/LogoMountainsV.svg"
                    alt={venue.name}
                    fill
                    style={{
                      objectFit: "cover",
                      overflow: "hidden",
                      borderRadius: "6px",
                    }}
                  />
                )}
              </div>
              <h3 className="text-base md:text-lg">{venue.name}</h3>
            </div>
          </Link>
        </div>

        <div className="md:col-start-2 md:row-start-2 md:content-end md:align-bottom md:justify-items-end">
          <div className="flex gap-6 w-2/3 md:justify-end md:items-end">
            <Button
              $variant="narrow"
              className="bg-accent-green"
              onClick={() => {
                router.push(`/profile/${username}/venues/update/${venue.id}`);
              }}
            >
              Update
            </Button>
            <Button
              $variant="narrow"
              className="bg-brand-blue"
              disabled={isLoading}
              onClick={() => {
                console.log(venueId);
                
                handleDeleteVenue(venueId);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
        {isError && <p>{isError}</p>}
      </div>

      {/* Bookings on venue section */}
      <section className="mt-5">
        {bookings.length > 0 ? (
          <BookingsAccordion venue={venue} />
        ) : (
          <>
            <h3>Bookings on this venue</h3>
            <p className="text-sm md:text-base">
              No one have booked a stay at this venue yet.
            </p>
          </>
        )}
      </section>
    </li>
  );
}
