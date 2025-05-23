import { login } from "@/app/api/auth/login";
import { register } from "@/app/api/auth/register";
import { IRegisterUser } from "@/interface";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";

/**
 * A React hook that manages user registration state and provides a register handler.
 *
 * @returns An object containing:
 *   - `handleRegister`: Function to perform register.
 *   - `isLoading`: `boolean` flag while register is in progress.
 *   - `isError`: `string | null` error message if register failed.
 *   - `isVenueManager`: `boolean` flag if a user registered as a Venue Manager.
 *   - `setIsVenueManager`: `boolean` flag to decide if a user registers as a Venue Manager (true) or a Customer (false)
 *   - `isSuccess`: `boolean` flag when login succeeds.
 */

export function useRegister() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isVenueManager, setIsVenueManager] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const setUser = useAuthStore((state) => state.setUser);

  /**
   * Performs a register request with the given credentials.
   *
   * @param name – The user’s name.
   * @param email – The user’s email address.
   * @param password – The user’s password.
   * @param bio – The user’s bio.
   * @param avatar – The user’s profile image.
   * @param venueManager – States if a user is venue manager or not.
   * @returns A promise that resolves to the registered `IRegisterUser` on success, or `undefined` on failure.
   * @remarks
   *   - On success, returns the user data.
   *   - On failure, sets `isError` with the error message.
   */

  const handleRegister = async ({
    name,
    email,
    password,
    bio,
    avatar,
    venueManager,
  }: IRegisterUser) => {
    setIsLoading(true);
    setIsError(null);
    setIsSuccess(false);

    try {
      await register({
        name,
        email,
        password,
        bio,
        avatar,
        venueManager,
      });
      const userData = await login({ email, password });
      setUser(userData);
      setIsSuccess(true);
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

  return {
    handleRegister,
    isLoading,
    isError,
    isVenueManager,
    setIsVenueManager,
    isSuccess,
  };
}
