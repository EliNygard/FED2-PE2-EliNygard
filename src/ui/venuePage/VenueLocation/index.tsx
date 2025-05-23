import { IVenue } from "@/interface";

/**
 * VenueLocation displays the venue's address to the user.
 * - The user can see a map frame and click on it to be taken to google maps.
 * - The component is part of the VenuePage.
 * @param venue The venue data.
 */

export default function VenueLocation({ venue }: { venue: IVenue }) {
  const city = venue.location.city;
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(city)}&z=15&output=embed`;
  return (
    <section>
      <h2>Location</h2>
      <div className="mt-4 flex flex-col gap-5">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${venue.location.city}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-full aspect-video mb-4">
            <iframe
              src={embedSrc}
              className="w-full h-full border-0 pointer-events-none"
              loading="lazy"
            ></iframe>
          </div>

          <p>{`${venue.location.address}, ${venue.location.city}`}</p>
          <p>{venue.location.country}</p>
        </a>
      </div>
    </section>
  );
}
