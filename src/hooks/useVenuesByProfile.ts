import { IVenue } from "@/interface";
import { getVenuesByProfile } from "@/lib/api";
import { useEffect, useState } from "react";

export function useVenuesByProfile(username: string) {
  const [venues, setVenues] = useState<IVenue[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // const [error, setError] = useState<Error | null>(null); IError?

  useEffect(() => {
    if (!username) {
      setVenues(null);
      setError(null)
      setLoading(false)
      return;
    }
    async function fetchVenues() {
      setLoading(true);
      setError(null);
      try {
        const response = await getVenuesByProfile(username);
        const data = response.data
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

  return { venues, loading, error }
}
