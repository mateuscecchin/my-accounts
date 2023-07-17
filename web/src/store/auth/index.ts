import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  google_id: string;
  username: string;
  avatar_url: string;
  email: string;
  created_at: string;
}

interface Actions {
  setUser: (user: User) => void;
}

interface State {
  user: User;
}

type AuthData = Actions & State;

export const useAuthStore = create<any>(
  persist(
    (set) => ({
      user: {} as User,
      setUser: (user: User) => set(() => ({ user })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
