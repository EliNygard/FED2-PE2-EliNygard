import { useAuthStore } from "@/stores/useAuthStore";

// use this or not? 

export function AuthGuard() {
  const accessToken = useAuthStore((state) => state.user?.accessToken)

  if (!accessToken) {
    return false
  }
  return true
}