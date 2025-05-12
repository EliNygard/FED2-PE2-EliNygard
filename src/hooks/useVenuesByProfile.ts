import { IVenue } from "@/interface";
import { getVenuesByProfile } from "@/lib/api";
// import { delay } from "@/utils/delay";
import { useEffect, useState } from "react";

/**
 * A React hook to load a users's venues by their profile name.
 *
 * @param username - The user's profile name.
 * @returns An object containing:
 *   - `venues`: The array of `IVenue` when loaded, or `null` if none.
 *   - `loading`: `boolean` flag while fetch is in progress.
 *   - `error`: `string | null` error message if the fetch failed.
 *
 * @example
 * const { venues, loading, error } = useVenuesBYProfile("laura")
 */

export function useVenuesByProfile(username: string) {
  const [venues, setVenues] = useState<IVenue[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // const [error, setError] = useState<Error | null>(null); IError?

  useEffect(() => {
    if (!username) {
      setVenues(null);
      setError(null);
      setLoading(false);
      return;
    }

    async function fetchVenues() {
      setLoading(true);
      setError(null);
      try {
        // await delay(3000)
        const response = await getVenuesByProfile(username);
        const data = response.data;
        console.log(data);

        setVenues(data);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Unknown error. Please try again";
        console.error(message);
        console.error(error);

        setError(message);
        return;
      } finally {
        setLoading(false);
      }
    }
    fetchVenues();
  }, [username]);

  return { venues, loading, error };
}
