import { IVenue } from "@/interface";

export default function VenueInfo({ venue }: { venue: IVenue }) {
  return (
    <section>
      <h2>About the venue</h2>
      <div className="mt-4 flex flex-col gap-5">
        <ul className="flex flex-col gap-1.5">
          <li>
            <p>{`${venue.maxGuests} guests`}</p>
          </li>
          <li>
            <p>{venue.meta.parking ? "Parking included" : ""}</p>
          </li>
          <li>
            <p>{venue.meta.wifi ? "Free wifi" : ""}</p>
          </li>
          <li>
            <p>{venue.meta.breakfast ? "Breakfast included" : ""}</p>
          </li>
          <li>
            <p>{venue.meta.pets ? "Pets are welcome" : ""}</p>
          </li>
        </ul>
        <p className="mt-3">{venue.description}</p>
      </div>
    </section>
  );
}
