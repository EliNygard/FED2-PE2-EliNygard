import { IVenue } from "@/interface"

const API_BASE = 'https://v2.api.noroff.dev/holidaze'
// process.env.NEXT_PUBLIC_API_URL

const paramOwner = '_owner=true'
const paramBookings = '_bookings=true'
// const sortNameAsc = 'sort=name&sortOrder=asc'
const sortDate = 'sort=created&sortOrder=desc'

// pagination: limit and page

async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`)
  if (!response.ok) throw new Error(`API error: ${response.status}`)
  const { data } = await response.json();
  // console.log(data);
  return data as T;
}

export function getVenues() {
  return fetcher<IVenue[]>(`/venues?${paramOwner}&${paramBookings}&${sortDate}`)
}

export function getVenueById(id: string) {
  return fetcher<IVenue>(`/venues/${id}?${paramOwner}&${paramBookings}`)
}


