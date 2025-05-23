import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

/**
 * Custom React hook for handling user logout.
 *
 * This hook retrieves the `logout` action from the authentication store
 * and the Next.js router instance. It returns a memoized callback that,
 * when invoked, will perform the logout operation and redirect the user
 * to the homepage.
 *
 * @example
 * ```tsx
 * import { useLogout } from '@/hooks/useLogout';
 *
 * function LogoutButton() {
 *   const handleLogout = useLogout();
 *   return <button onClick={handleLogout}>Logout</button>;
 * }
 * ```
 *
 * @returns A function that logs the user out and navigates to the root path.
 */

export function useLogout() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  return useCallback(() => {
    logout();
    toast.success("You are now logged out. See you next time!");
    router.push("/");
  }, [logout, router]);
}
