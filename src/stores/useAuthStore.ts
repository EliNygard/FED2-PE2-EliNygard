import { IUser } from "@/interface";
import { create } from "zustand";

interface AuthState {
  user: IUser | null;
  isVenueManager: boolean;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isVenueManager: false,
  setUser: (user) =>
    set({
      user: user,
      isVenueManager: !!user.venueManager,
    }),

  logout: () =>
    set({
      user: null,
      isVenueManager: false,
    }),
}));
