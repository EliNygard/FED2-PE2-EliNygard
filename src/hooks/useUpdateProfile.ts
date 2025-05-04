import { IMedia } from "@/interface";
import { setUpdateProfile } from "@/lib/api";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";

export function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<string | null>(null)

  const setUser = useAuthStore((store) => store.setUser)

  const userName = useAuthStore((store) => store.user?.name)
  console.log(userName);
  

  const updateProfile = async ({ avatar }: {avatar: IMedia}) => {
    setIsLoading(true)
    setIsError(null)
    console.log(avatar);
    

    try {
      if (!userName) return

        const userData = await setUpdateProfile(userName, avatar)
        console.log(userData);
        setUser(userData)
        
        return userData

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      console.error(error);
      setIsError(message)
return
    } finally {
      setIsLoading(false)
    }
  }

  return { updateProfile, isLoading, isError}
}