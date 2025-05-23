import { getSingleProfile } from "@/lib/api";
import { useState } from "react";

export function useGetSingleProfile() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  const getProfileData = async (username: string) => {
    setIsLoading(true);
    setIsError(null);

    try {
      if (!username) {
        console.error("Username is undefined");
        return;
      }
      const userData = await getSingleProfile(username);
      return userData;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error(message);

      setIsError(message);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return { getProfileData, isLoading, isError };
}
