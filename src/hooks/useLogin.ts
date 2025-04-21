import { useState } from "react";
import { ILogin, IUser } from "@/interface";
import { login } from "@/app/api/auth/login";
import { useAuthStore } from "@/stores/useAuthStore";

export function useLogin() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<string | null>(null)
    // const [isVenueManager, setIsVenueManager] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    // const [user, setUser] = useState<IUser | null>(null)

    const setUser = useAuthStore((store) => store.setUser)

    async function loginUser({email, password}: ILogin): Promise<IUser | undefined> {
        setIsLoading(true)
        setIsError(null)
        setIsSuccess(false)

        try {
            const userData = await login({email, password})

            setUser(userData)
            setIsSuccess(true)

            return userData
        } catch (error: unknown) {
                        const message = error instanceof Error ? error.message : 'Unknown error. Please try again'
                        console.error(message);
                        setIsError(message)
        } finally {
            setIsLoading(false)
        }
    }
    return { loginUser, isLoading, isError, isSuccess };
}
//     const loginUser = async ({ email, password }: ILogin) => {
//         setIsLoading(true)
//         setIsError(null)
//         setIsSuccess(false)

//         try {
//             const userData = await login({ email, password })

//             setIsVenueManager(!!userData.venueManager)
//             console.log(userData.venueManager);
            
//             setUser(userData)
//             setIsSuccess(true)
//             return userData
//         } catch (error: unknown) {
//             const message = error instanceof Error ? error.message : 'Unknown error. Please try again'
//             console.error(message);
//             setIsError(message)
//             return
//         } finally {
//             setIsLoading(false)
//         }
//     }
// return { loginUser, isLoading, isError, isSuccess, isVenueManager, user, setUser }

// }