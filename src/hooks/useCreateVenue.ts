/**
 * A React hook that manages creating a new venue.
 * Sends a request with the venue data to the API and updates loading/error states.
 *
 * @returns An object containing:
 * - `createVenue`: Function to perform create venue.
 * - `isLoading`: `boolean` flag while creating is in progress.
 * - `isError`: `string | null` error message if creating venue fails.
 *
 * @example
 * const { createVenue, isLoading, isError } = useCreateVenue()
 */

import { ICreateVenue } from "@/interface";
import { setCreateVenue } from "@/lib/api";
import { useState } from "react";

export function useCreateVenue() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  /**
   * Performs a create request with the given credentials.
   *
   * @param data {@link ICreateVenue} - The details of the new venue (i.e. venue name, description, images etc.)
   * @returns - The new venue data
   */
  const createVenue = async (data: ICreateVenue) => {
    if (!data) {
      return;
    }
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await setCreateVenue(data);
      console.log(response);

      return response;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error trying to create venue. Please try again.";
      console.error(message);
      setIsError(message);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return { createVenue, isLoading, isError };
}
