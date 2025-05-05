import { IVenue } from "@/interface";
import MyVenueCard from "../MyVenueCard";

export default function MyVenues({ venues }: {venues: IVenue[]}) {
  if (!venues || venues.length === 0) {
    return <p>You have no venues</p>
  }

  return (
    <section className="max-w-xl">
      <h2 className="mb-8">My Venues</h2>
      <ul>
    {venues.map((venue) => (
      <MyVenueCard key={venue.id} venue={venue} />
    ))}
      </ul>
    </section>
  )
}