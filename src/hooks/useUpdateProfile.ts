import { IMedia } from "@/interface";
import { setUpdateProfile } from "@/lib/api";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";

/**
 * A React hook that manages update user state and provides a update profile handler.
 *
 * @returns An object containing:
 *   - `updateProfile`: Function to perform update profile.
 *   - `isLoading`: `boolean` flag while update is in progress.
 *   - `isError`: `string | null` error message if update failed.
 */

export function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  const updateAvatar = useAuthStore((state) => state.updateAvatar);
  const userName = useAuthStore((state) => state.user?.name);

  /**
   * Performs a update request with the given credentials.
   *
   * @param avatar – The user’s profile image.
   * @returns The new user data.
   * @remarks
   *   - On success, updates the auth store.
   *   - On failure, sets `isError` with the error message.
   */

  const updateProfile = async ({ avatar }: { avatar: IMedia }) => {
    if (!userName) {
      return;
    }
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await setUpdateProfile(userName, avatar);
      const userData = response.data;
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
