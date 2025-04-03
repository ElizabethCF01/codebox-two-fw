import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { StrapiUserResponse } from '@/interfaces/user'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user: Ref<StrapiUserResponse | undefined> = ref(undefined)
    const jwt: Ref<string | undefined> = ref(undefined)

    const logout = () => {
      user.value = undefined
      jwt.value = undefined
    }
    return { user, jwt, logout }
  },
  { persist: true },
)
