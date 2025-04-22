import { login } from "@/app/api/auth/login";
import { ILogin, IUser } from "@/interface";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";

export function useLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const setUser = useAuthStore((store) => store.setUser);

  async function loginUser({
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

      console.log(
        "is user venue manager?",
        useAuthStore.getState().isVenueManager
      );
      console.log("user data saved in store", useAuthStore.getState().user);

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
  return { loginUser, isLoading, isError, isSuccess };
}
