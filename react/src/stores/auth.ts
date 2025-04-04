import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { StrapiUserResponse } from "../interfaces/user";
interface AuthState {
  user: StrapiUserResponse | undefined;
  jwt: string | undefined;
  setUser: (user: StrapiUserResponse) => void;
  setJwt: (jwt: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        jwt: undefined,
        setUser: (user) => set({ user }),
        setJwt: (jwt) => set({ jwt }),
        logout: () => set({ user: undefined, jwt: undefined }),
      }),
      { name: "auth" },
    ),
  ),
);
