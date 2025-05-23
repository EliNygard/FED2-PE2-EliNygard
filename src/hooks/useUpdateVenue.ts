import { IVenueRequest } from "@/interface";
import { setUpdateVenue } from "@/lib/api";
import { useState } from "react";

/**
 * A React hook that manages updating an existing venue.
 * Send a request with the current and/or updated venue data to the API and updates loading/error states.
 *
 * @returns An object containing:
 * - `updateVenue`: Function to perform update venue.
 * - `isLoading`: `boolean` flag while updating is in progress
 * - `isError`: `string | null` error message if updating venue fails.
 *
 * @example
 * const { updateVenue, isLoading, isError } = useUpdateVenue()
 */

export function useUpdateVenue() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  /**
   * Performs a update request with the given credentials.
   *
   * @param data {@link IVenueRequest} - The details of the venue to be updated (i.e. venue name, description, images etc.).
   * @returns - The updated venue data
   */

  const updateVenue = async (data: IVenueRequest, id: string) => {
    if (!data) {
      return;
    }
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await setUpdateVenue(data, id);
      return response;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error trying to update venue. Please try again";
      console.error(message);
      setIsError(message);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateVenue, isLoading, isError };
}
