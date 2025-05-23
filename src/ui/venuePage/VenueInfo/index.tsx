import { IVenue } from "@/interface";

/**
 * VenueInfo displays info about the venue to the user.
 * - The component is part of the VenuePage.
 * @param venue The venue data.
 */

export default function VenueInfo({ venue }: { venue: IVenue }) {
  let guestsString = "";

  if (venue.maxGuests === 1) {
    guestsString = "guest";
  } else {
    guestsString = "guests";
  }

  return (
    <section>
      <h2>About the venue</h2>
      <div className="mt-4 flex flex-col gap-5">
        <ul className="flex flex-col gap-1.5">
          <li>
            <p>{`${venue.maxGuests} ${guestsString}`}</p>
          </li>
          {venue.meta.parking && (
            <li>
              <p>Parking included</p>
            </li>
          )}
          {venue.meta.wifi && (
            <li>
              <p>Free wifi</p>
            </li>
          )}
          {venue.meta.breakfast && (
            <li>
              <p>Breakfast included</p>
            </li>
          )}
          {venue.meta.pets && (
            <li>
              <p>Pets are welcome</p>
            </li>
          )}
        </ul>
        <p className="mt-3">{venue.description}</p>
      </div>
    </section>
  );
}
