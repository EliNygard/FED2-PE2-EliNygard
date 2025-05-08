import { AuthState } from "@/interface";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

/**
 * @file authStore.ts
 * @description A persisted Zustand store for authentication state (user, token, roles).
 */

/**
 * Initial (unauthenticated) state for the auth store.
 */
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isVenueManager: false,
};

/**
 * A Zustand-powered auth store, persisted under "auth-storage".
 * @property {IUser|null} user - {@link IUser} Currently authenticated user, or null if not logged in.
 * @property {string|null} token - JWT or similar token for authenticated requests.
 * @property {boolean} isAuthenticated - `true` if a user is logged in.
 * @property {boolean} isVenueManager - `true` if the logged-in user has venue manager privileges.
 * @property {(user: IUser) => void} setUser - {@link IUser} Update the user and authentication state.
 * @property {(avatar: IMedia) => void} updateAvatar - {@link IMedia} Change the current user’s avatar.
 * @property {() => void} logout - Log out the current user.
 * @returns {AuthState} - {@link AuthState}The auth state slice and its actions.
 *
 * @example
 * const isVenueManager = useAuthStore((state) => state.isVenueManager)
 */

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

/**
 * Grab the current auth token from the store.
 * @returns {string|null} The persisted JWT (or null if logged out).
 */

export function getToken(): string | null {
  return useAuthStore.getState().token;
}
