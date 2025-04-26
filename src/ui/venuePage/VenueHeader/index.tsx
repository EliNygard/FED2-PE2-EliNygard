import { IVenue } from "@/interface";

export default function VenueHeader({venue} :{venue: IVenue}) {
  return (
    <h1>${venue.name}</h1>
  )
}