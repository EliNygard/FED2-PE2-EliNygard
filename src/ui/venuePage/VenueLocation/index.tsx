import { IVenue } from "@/interface";

export default function VenueLocation({ venue }: { venue: IVenue }) {
  const city = venue.location.city;
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(city)}&z=15&output=embed`;
  return (
    <section>
      <h2>Location</h2>
      <div className="flex flex-col gap-1.5">
        <div className="max-w-96 mt-4">
          <iframe
            src={embedSrc}
            width="100%"
            height="186px"
            style={{ border: 0, pointerEvents: "none" }}
            loading="lazy"
          ></iframe>
        </div>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${venue.location.city}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>{`${venue.location.address}, ${venue.location.city}`}</p>
          <p>{venue.location.country}</p>
        </a>
      </div>
    </section>
  );
}
