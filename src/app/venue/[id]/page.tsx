import { IMedia } from "@/interface";
import { getVenueById } from "@/lib/api";
import VenueBooking from "@/ui/venuePage/VenueBooking";
import VenueGallery from "@/ui/venuePage/VenueGallery";
import VenueHeader from "@/ui/venuePage/VenueHeader";
import VenueInfo from "@/ui/venuePage/VenueInfo";
import VenueLocation from "@/ui/venuePage/VenueLocation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const venue = (await getVenueById(id)).data;

  return {
    title: venue.name,
    description: `Read about the venue and book a stay`,
  };
}

/**
 * Page component for displaying details about a specific venue.
 *
 * @param props.params A promise that resolves to an object containing:
 *  - `id`: The unique identifier for the venue to fetch.
 * @returns A React element rendering the venue’s gallery, header, info, booking form, and location.
 */

export default async function VenuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: venue } = await getVenueById(id);

  const venueImages = Array.isArray(venue.media)
    ? venue.media
    : venue.media
      ? [venue.media as IMedia]
      : [];

  return (
    <div className="page-padding md:p-0 m-auto grid grid-cols-1 gap-8 md:gap-x-16 lg:gap-x-28 md:grid-cols-[1fr_auto] max-w-[1120px]">
      <div className="md:col-span-full">
        <VenueGallery venueImages={venueImages} />
      </div>
      <div className="md:col-span-full md:mb-7">
        <VenueHeader venue={venue} />
      </div>
      <div className="md:col-start-1">
        <VenueInfo venue={venue} />
      </div>
      <div className="md:col-start-2 md:row-start-3 md:row-end-5">
        <VenueBooking venue={venue} />
      </div>
      {venue.location.city && (
        <div className="md:col-start-1">
          <VenueLocation venue={venue} />
        </div>
      )}
    </div>
  );
}
