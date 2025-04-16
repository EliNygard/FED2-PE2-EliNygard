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
    try {
      const userData = await register({ name, email, password, bio, avatar, venueManager });
      // You could, for example, update the global auth state here.

      if (userData.errors && userData.errors[0]) {
        throw new Error(userData.errors[0].message)
      }
      
      setIsError(null)
      
      setIsSuccess(true)
      return userData
    } catch (error: unknown) {
        if (error instanceof Error) {
          setIsError(error.message);
          setIsSuccess(false)

        } else {
          setIsError('An unknown error occurred'); 
          setIsSuccess(false)
        }
        throw error; 
      } finally {
        setIsLoading(false);
      }
  };

  return { registerUser, isLoading, isError, isVenueManager, setIsVenueManager, isSuccess };
}