import { login } from "@/app/api/auth/login";
import { ILogin, IUser } from "@/interface";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";

/**
 * A React hook that manages user login state and provides a login handler.
 *
 * @returns An object containing:
 *   - `handleLogin`: Function to perform login.
 *   - `isLoading`: `boolean` flag while login is in progress.
 *   - `isError`: `string | null` error message if login failed.
 *   - `isSuccess`: `boolean` flag when login succeeds.
 */

export function useLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const setUser = useAuthStore((state) => state.setUser);

  /**
   * Performs a login request with the given credentials.
   *
   * @param email – The user’s email address.
   * @param password – The user’s password.
   * @returns A promise that resolves to the logged-in `IUser` on success, or `undefined` on failure.
   * @remarks
   *   - On success, updates the auth store and navigates to the user’s profile page.
   *   - On failure, sets `isError` with the error message.
   */

  async function handleLogin({
    email,
    password,
  }: ILogin): Promise<IUser | undefined> {
    setIsLoading(true);
    setIsError(null);
    setIsSuccess(false);

    try {
      const userData = await login({ email, password });
      setUser(userData);
      setIsSuccess(true);
      return userData;
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
  return { handleLogin, isLoading, isError, isSuccess };
}
