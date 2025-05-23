import { deleteVenueFetch } from "@/app/api/deleteVenueFetch";
// import { useRouter } from "next/navigation";
import { useState } from "react";

export function useDeleteVenue() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  // const router = useRouter()

  async function deleteVenue(id: string) {
    setIsLoading(true);
    setIsError(null);

    try {
      await deleteVenueFetch(id);
      console.log("venue deleted ", id);
      // router.refresh()
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
