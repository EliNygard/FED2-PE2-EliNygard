import { ICreateBooking } from "@/interface";
import { setBooking } from "@/lib/api";
import { useCallback, useState } from "react";

export function useCreateBooking() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  const createBooking = useCallback(async (payload: ICreateBooking) => {
    setIsError(null)
    setIsLoading(true)

    try {
      const booking = await setBooking(payload)
      return booking
    } catch (error: unknown) {
      const message = error instanceof Error
      ? error.message
      : 'Something went wrong booking this venue. Please try again.'
      setIsError(message)
      throw new Error(message)

    } finally {
      setIsLoading(false)
    }
  },
  []

)

return { createBooking, isLoading, isError }

}
