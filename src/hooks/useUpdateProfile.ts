import { IMedia } from "@/interface";
import { setUpdateProfile } from "@/lib/api";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";

export function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  const updateAvatar = useAuthStore((store) => store.updateAvatar);
  const userName = useAuthStore((store) => store.user?.name);

  const updateProfile = async ({ avatar }: { avatar: IMedia }) => {
    if (!userName) {
      return;
    }
    setIsLoading(true);
    setIsError(null);

    try {
      const userData = await setUpdateProfile(userName, avatar);
      console.log(userData.avatar);
      updateAvatar(userData.avatar);

      return userData;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error(error);
      setIsError(message);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfile, isLoading, isError };
}
