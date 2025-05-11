import { deleteVenue } from "@/app/api/deleteVenue";
import { useState } from "react";
import { toast } from "sonner";

export function useDeleteVenue() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  async function handleDeleteVenue(id: string) {
    setIsLoading(true);
    setIsError(null);

    try {
      await deleteVenue(id);
      console.log("venue deleted ", id);
      toast.success('The venue was deleted')
      // refresh page
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
  return { handleDeleteVenue, isLoading, isError };
}
