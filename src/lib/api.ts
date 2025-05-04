import { IBooking, ICreateBooking, IMedia, IProfile, IUser, IVenue } from "@/interface";
import { getToken } from "@/stores/useAuthStore";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.API_KEY;

const paramOwner = "_owner=true";
const paramCustomer = '_customer=true'
const paramVenue = '_venue=true'
// const paramVenues = '_venues=true'
const paramBookings = "_bookings=true";
const sortDate = "sort=created&sortOrder=desc";

// pagination: limit and page

interface FetcherOptions extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string>;
  auth?: boolean;
}

async function fetcher<T>(
  url: string,
  options: FetcherOptions = {}
): Promise<T> {
  const { auth = false, headers: customHeaders, ...init } = options;
  const token = getToken();

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(auth
      ? {
          "X-Noroff-API-Key": API_KEY,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        }
      : {}),
  };

  const response = await fetch(`${API_BASE}${url}`, {
    ...init,
    headers: { ...defaultHeaders, ...customHeaders },
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error: ${response.status}: ${text}`);
  }
  const { data } = await response.json();
  console.log(data);
  return data as T;
}

export function getVenues() {
  return fetcher<IVenue[]>(
    `/venues?${paramOwner}&${paramBookings}&${sortDate}`
  );
}

export function getVenueById(id: string) {
  return fetcher<IVenue>(`/venues/${id}?${paramOwner}&${paramBookings}`);
}

export function setBooking(booking: ICreateBooking) {
  return fetcher<IBooking>(`/bookings`, {
    method: "POST",
    body: JSON.stringify(booking),
    auth: true,
  });
}

export function getSingleProfile(username: string) {
  return fetcher<IProfile>(`/profiles/${username}?${paramBookings}&${paramVenue}`, {
    
  })
}

export function getBookingsByProfile(username: string) {
  return fetcher<IBooking[]>(`/profiles/${username}/bookings?${paramCustomer}&${paramVenue}`, {
    method: 'GET',
    auth: true,
  })
}

export function setUpdateProfile(userName: string, avatar: IMedia) {
  return fetcher<IUser>(`/profiles/${userName}`, {
    method: 'PUT',
    body: JSON.stringify(avatar),
    auth: true,
  })
}


