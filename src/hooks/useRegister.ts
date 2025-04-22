import { register } from "@/app/api/auth/register";
import { IRegisterUser } from "@/interface";
import { useState } from "react";


export function useRegister() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isVenueManager, setIsVenueManager] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const registerUser = async ({ name, email, password, bio, avatar, venueManager }: IRegisterUser) => {
    setIsLoading(true);
    setIsError(null);
    setIsSuccess(false)

    try {
      const userData = await register({ name, email, password, bio, avatar, venueManager });
      
      setIsSuccess(true)
      return userData
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      console.error(message);
      
      setIsError(message)
      return
      } finally {
        setIsLoading(false);
      }
  };

  return { registerUser, isLoading, isError, isVenueManager, setIsVenueManager, isSuccess };
}