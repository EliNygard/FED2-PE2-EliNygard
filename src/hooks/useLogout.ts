import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
// import { toast } from 'sonner'

export function useLogout() {
  const logout = useAuthStore((store) => store.logout)
  const router = useRouter()

  return useCallback(() => {
    logout()
    // toast.success('You are now logged out. See you next time!')
    router.push('/')
  }, [logout, router])
}
