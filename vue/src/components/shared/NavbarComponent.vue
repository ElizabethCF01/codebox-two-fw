<template>
  <header
    class="sticky top-0 z-40 w-full border-b bg-stone-900/40 flex justify-center backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container flex h-16 items-center justify-between">
      <router-link to="/" class="flex items-center gap-2">
        <SparklesIcon class="h-6 w-6 text-primary" />
        <span class="text-xl font-bold">Codebox</span>
      </router-link>

      <div class="hidden md:flex items-center justify-center gap-6 md:mr-16">
        <nav class="flex items-center gap-6">
          <RouterLink to="#" class="text-sm font-medium hover:text-primary">
            Components
          </RouterLink>
          <RouterLink to="#" class="text-sm font-medium hover:text-primary">
            Challenges
          </RouterLink>
          <RouterLink to="#" class="text-sm font-medium hover:text-primary"> Creators </RouterLink>
        </nav>
      </div>

      <div class="flex items-center gap-4">
        <template v-if="!authStore.user">
          <router-link to="/login" class="hidden md:flex btn btn-outline">Sign In</router-link>

          <router-link to="/register" class="hidden btn btn-primary font-bold md:flex">
            Sign Up
          </router-link>
        </template>
        <div v-else class="">
          <div class="dropdown">
            <div tabindex="0" role="button" class="m-1">
              <div class="avatar">
                <div
                  class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2 bg-stone-800"
                >
                  <img :src="'https://robohash.org/' + authStore.user.email + '.png'" />
                </div>
              </div>
            </div>
            <ul
              tabindex="0"
              class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li><a href="#">My profile</a></li>
              <li><button @click="authStore.logout">Logout</button></li>
            </ul>
          </div>
        </div>

        <button size="icon" class="md:hidden btn btn-ghost btn-circle">
          <MenuIcon class="h-5 w-5" />
        </button>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { SparklesIcon, MenuIcon } from 'lucide-vue-next'
const authStore = useAuthStore()
</script>
