import { deleteVenueFetch } from "@/app/api/deleteVenueFetch";
import { useState } from "react";

export function useDeleteVenue() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  async function deleteVenue(id: string) {
    setIsLoading(true);
    setIsError(null);

    try {
      await deleteVenueFetch(id);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error. Please try again";
      console.error(message);
      setIsError(message);
    } finally {
      setIsLoading(false);
    }
  }
  return { deleteVenue, isLoading, isError };
}
