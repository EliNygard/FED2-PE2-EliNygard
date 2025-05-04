import { IMedia, IUser } from "@/interface";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isVenueManager: boolean;
  setUser: (user: IUser) => void;
  updateAvatar: (avatar: IMedia) => void;
  logout: () => void;
}

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isVenueManager: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    subscribeWithSelector((set, get) => ({
      ...initialState,

      setUser: (user) =>
        set({
          user,
          token: user.accessToken,
          isAuthenticated: true,
          isVenueManager: !!user.venueManager,
        }),

      updateAvatar: (avatar) => {
        const user = get().user;
        if (!user) return;
        set({
          user: {
            ...user,
            avatar,
          },
        });
      },

      changeToManager: () => {
        // set up later. do something here if user edits profile and change to venue manager?
      },

      logout: () => {
        if (!get().token) return;
        set({
          user: null,
          token: null,
          isVenueManager: false,
          isAuthenticated: false,
        });
      },
    })),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isVenueManager: state.isVenueManager,
      }),
    }
  )
);

// Subscribe to state changes and log them
// DO I NEED THIS. DELETE IF NOT, IT IS LOGGING THE TOKEN ❗❗❗❗
useAuthStore.subscribe((state) => {
  console.log("[auth store] state changed: ", state.user);
});

export function getToken() {
  return useAuthStore.getState().token;
}
