import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type User = {
  id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  signupComplete?: boolean;
  categorySelected?: boolean;
};

type UserStore = {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoggedIn: (loggedIn: boolean) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      setUser: (user) => set({ user }),

      clearUser: () => set({ user: null }),

      setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),

      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
