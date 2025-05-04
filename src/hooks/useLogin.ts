import { login } from "@/app/api/auth/login";
import { ILogin, IUser } from "@/interface";
import { useAuthStore } from "@/stores/useAuthStore";
// import { useRouter } from "next/navigation";

import { useState } from "react";
// import { toast } from "sonner";

export function useLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  const setUser = useAuthStore((store) => store.setUser);
  // const userName = useAuthStore((state) => state.user?.name)
  // const router = useRouter()
  
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
      setIsError(null)
      // toast.success('Login success')
      // router.push(`/profile/${userName}`)
    }
  }
  return { handleLogin, isLoading, isError, isSuccess };
}
