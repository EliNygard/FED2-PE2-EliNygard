import create from 'zustand'
import { IUser } from '@/interface'

interface AuthState {
    user: IUser | null
    isVenueManager: boolean,
    setUser: (user: IUser) => void
    logout: () => void
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
            isVenueManager: false
        }) 
}))