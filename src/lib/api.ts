import {
  IBooking,
  ICreateBooking,
  IMedia,
  IPaginationMeta,
  IProfile,
  IUser,
  IVenue,
  IVenueRequest,
} from "@/interface";
import { getToken } from "@/stores/useAuthStore";
import { delay } from "@/utils/delay";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.API_KEY;

const paramOwner = "_owner=true";
const paramCustomer = "_customer=true";
const paramVenue = "_venue=true";
// const paramVenues = '_venues=true'
const paramBookings = "_bookings=true";
// const sortDate = "sort=created&sortOrder=desc";

// pagination: limit and page

interface FetcherOptions extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string>;
  auth?: boolean;
}

export interface PaginatedResponse<T> {
  data: T;
  meta: IPaginationMeta;
}

/**
 * A wrapper around `fetch` that:
 *  - prefixes the API base URL
 *  - applies default headers (JSON & API-key)
 *  - injects a Bearer token when `auth: true`
 *  - checks for HTTP errors and throws
 *
 * @template T  The shape of the `data` payload returned by the API
 * @param url           The endpoint path (e.g. "/venues/${id}?${paramOwner}&${paramBookings}")
 * @param options.auth  If `true`, sends API-key + Authorization header
 * @throws {Error}      When `response.ok === false`
 * @returns             An object with `.data` of type `T` and pagination metadata `.meta`
 */

async function fetcher<T>(
  url: string,
  options: FetcherOptions = {}
): Promise<PaginatedResponse<T>> {
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

  await delay(1000);
  const response = await fetch(`${API_BASE}${url}`, {
    ...init,
    headers: { ...defaultHeaders, ...customHeaders },
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error: ${response.status}: ${text}`);
  }
  const body = await response.json();
  console.log("fetcher:", body);

  return {
    data: body.data as T,
    meta: body.meta as IPaginationMeta,
  };
}

export function getVenues(
  page = 1,
  limit = 10
): Promise<PaginatedResponse<IVenue[]>> {
  const qs = new URLSearchParams({
    _owner: "true",
    _bookings: "true",
    sort: "created",
    order: "desc",
    limit: limit.toString(),
    page: page.toString(),
  });
  return fetcher<IVenue[]>(`/venues?${qs.toString()}`);
}

export function getVenueById(id: string): Promise<PaginatedResponse<IVenue>> {
  return fetcher<IVenue>(`/venues/${id}?${paramOwner}&${paramBookings}`);
}

export function getVenuesByProfile(username: string) {
  return fetcher<IVenue[]>(
    `/profiles/${username}/venues?${paramOwner}&${paramBookings}`,
    {
      method: "GET",
      auth: true,
    }
  );
}

export function getSingleProfile(username: string) {
  return fetcher<IProfile>(`/profiles/${username}`, {
    method: "GET",
    auth: true,
  });
}

export function getBookingsByProfile(username: string) {
  return fetcher<IBooking[]>(
    `/profiles/${username}/bookings?${paramCustomer}&${paramVenue}`,
    {
      method: "GET",
      auth: true,
    }
  );
}

export function setBooking(booking: ICreateBooking) {
  return fetcher<IBooking>(`/bookings`, {
    method: "POST",
    body: JSON.stringify(booking),
    auth: true,
  });
}

export function setUpdateProfile(userName: string, avatar: IMedia) {
  return fetcher<IUser>(`/profiles/${userName}`, {
    method: "PUT",
    body: JSON.stringify({ avatar }),
    auth: true,
  });
}

export function setCreateVenue(venue: IVenueRequest) {
  return fetcher<IVenue>(`/venues`, {
    method: "POST",
    body: JSON.stringify(venue),
    auth: true,
  });
}

export function setUpdateVenue(venue: IVenueRequest, id: string) {
  return fetcher<IVenue>(`/venues/${id}`, {
    method: "PUT",
    body: JSON.stringify(venue),
    auth: true,
  });
}
