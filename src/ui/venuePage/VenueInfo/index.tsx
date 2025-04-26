import { IVenue } from "@/interface";

export default function VenueInfo({ venue }: { venue: IVenue }) {
  return (
    <section>
      <h2>About the venue</h2>
      <div className="mt-4 flex flex-col gap-1.5">
        <p>
          {`${venue.maxGuests} guests`}
        </p>
        <p>
          {venue.meta.parking ? 'Parking included' : ''} 
          </p>
        <p>{venue.meta.wifi ? 'Free wifi' : ''}</p>
        <p>{venue.meta.breakfast ? 'Breakfast included' : ''}</p>
        <p>{venue.meta.pets ? 'Pets are welcome' : ''}</p>
      </div>
      <p className="mt-6">{venue.description}</p>
    </section>
  );
}
