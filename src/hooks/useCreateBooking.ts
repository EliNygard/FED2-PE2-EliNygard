import { ICreateBooking } from "@/interface";
import { setBooking } from "@/lib/api";
import { useState } from "react";

export function useCreateBooking() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  async function createBooking({
    dateFrom,
    dateTo,
    guests,
    venueId,
  }: ICreateBooking) {
    setIsLoading(true);
    setIsError(null);
    setIsSuccess(false);

    try {
      const booking = await setBooking({ dateFrom, dateTo, guests, venueId });

      console.log(booking);

      if (!booking) return;
      setIsSuccess(true);
      return booking;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Error trying to add booking. Please try again";
      console.error(message);
      setIsError(message);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
      setIsSuccess(true);
    }
  }
  return { createBooking, isLoading, isError, isSuccess };
}
