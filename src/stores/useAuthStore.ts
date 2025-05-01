import { IUser } from "@/interface";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { login as apiLogin } from "@/app/api/auth/login";

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isVenueManager: boolean;
  setUser: (user: IUser) => void;
  login: (email: string, password: string) => Promise<void>;
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

        login: async (email, password) => {
          try {
            const { user, accessToken } = await apiLogin({email, password})
            set({
              user, token: accessToken, isAuthenticated: true, isVenueManager: !!user.venueManager,
            })
          } catch (error) {
            console.error('Login failed', error);
            
          }
        },

        changeToManager: () => {
          // do something here if user edits profile and change to venue manager?
        },

        logout:  () => {
          if (!get().token) return
          set({ user: null, token: null, isVenueManager: false, isAuthenticated: false, });
        }
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

// export const useAuthStore = create<AuthState>()(
//   persist(
//   subscribeWithSelector((set) => ({
//     user: null,
//     isVenueManager: false,
//     setUser: (user) =>
//       set({
//         user,
//         isVenueManager: !!user.venueManager,
//       }),

//     logout: () => {
//       set({ user: null, isVenueManager: false });
//     },
//   })),
//   {
//     name: 'auth-storage',

//   }),
// );

// Subscribe to state changes and log them
useAuthStore.subscribe((state) => {
  console.log("[auth store] state changed: ", state);
});

// export function getToken() {
//   return useAuthStore.getState().user?.accessToken
// }
