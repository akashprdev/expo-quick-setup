import { localstorage } from '@/utility/storage';
import { create } from 'zustand';

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
  isloggedIn: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoggedIn: (loggedIn: boolean) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isloggedIn: false,
  setUser: (user) => {
    localstorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  clearUser: () => {
    localstorage.removeItem('user');
    set({ user: null });
  },
  setLoggedIn: (loggedIn) => {
    localstorage.setItem('isloggedIn', JSON.stringify(loggedIn));
    set({ isloggedIn: loggedIn });
  },

  logout: () => {
    localstorage.removeItem('user');
    localstorage.removeItem('isloggedIn');
    set({ user: null, isloggedIn: false });
  },
}));
