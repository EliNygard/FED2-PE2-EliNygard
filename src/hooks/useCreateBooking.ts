import { ICreateBooking } from "@/interface";
import { setBooking } from "@/lib/api";
import { useCallback, useState } from "react";

/**
 * A React hook that manages the booking of a venue.
 * Sends a booking creation request to the API and updates loading/error states.
 *
 * @returns An object containing:
 *   - `createBooking`: Function to perform booking.
 *   - `isLoading`: `boolean` flag while booking is in progress.
 *   - `isError`: `string | null` error message if booking failed.
 *
 * @example
 * const { createBooking, isLoading, isError } = useCreateBooking();
 */

export function useCreateBooking() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  const createBooking = useCallback(
    /**
     * @param payload {@link ICreateBooking} - The booking payload containing venue and user details.
     * @returns Promise<Booking> - The booking object returned from the API.
     * @throws {Error} When the API request fails, with a message from the server or a fallback message.
     */

    async (payload: ICreateBooking) => {
      setIsError(null);
      setIsLoading(true);

      try {
        const booking = await setBooking(payload);
        return booking;
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong booking this venue. Please try again.";
        setIsError(message);
        throw new Error(message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { createBooking, isLoading, isError };
}
