import { registerUser } from "@/app/api/auth/register";
import { IRegisterUser } from "@/interface";
import { useState } from "react";


export function useRegister() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const register = async (userData: IRegisterUser) => {
    setLoading(true);
    setError(null);
    try {
      const data = await registerUser(userData);
      // You could, for example, update the global auth state here.
      return data;
    } catch (err: unknown) {
        // Narrow the type of err
        if (err instanceof Error) {
          setError(err.message); // Safely access the error message
        } else {
          setError('An unknown error occurred'); // Handle non-Error types
        }
        throw err; // Re-throw the error after handling it
      } finally {
        setLoading(false);
      }
  };

  return { register, loading, error };
}
