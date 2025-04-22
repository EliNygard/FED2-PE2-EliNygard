import { IUser } from "@/interface";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface AuthState {
  user: IUser | null;
  isVenueManager: boolean;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create(
  subscribeWithSelector<AuthState>((set) => ({
    user: null,
    isVenueManager: false,
    setUser: (user) =>
      set({
        user: user,
        isVenueManager: !!user.venueManager,
      }),

    logout: () => {
      set({ user: null, isVenueManager: false });
    },
  }))
);

// Subscribe to state changes and log them
useAuthStore.subscribe((state) => {
  console.log("[auth store] state changed: ", state);
});
