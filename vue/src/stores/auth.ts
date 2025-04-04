import type { StrapiUserResponse } from "@/interfaces/user";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: undefined as StrapiUserResponse | undefined,
    jwt: undefined as string | undefined,
  }),
  actions: {
    logout() {
      this.user = undefined;
      this.jwt = undefined;
    },
  },
  persist: true,
});
