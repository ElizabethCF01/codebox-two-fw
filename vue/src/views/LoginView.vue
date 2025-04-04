<script setup lang="ts">
import IconGithub from "@/components/icons/IconGithub.vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";
import IconRobot from "@/components/icons/IconRobot.vue";
import { useLogin } from "@/composables/useLogin";
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const { login, register } = useLogin();

const email = ref("");
const password = ref("");
const username = ref("");
const handleSubmit = async () => {
  console.log("email.value", email.value);
  if (route.name === "login") await login(email.value, password.value);
  else register(username.value, email.value, password.value);
};
</script>

<template>
  <main>
    <div
      class="min-h-screen flex items-center flex-col bg-gradient-to-br from-background to-background"
    >
      <div class="container flex flex-col items-center justify-center min-h-screen py-12">
        <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div class="flex flex-col space-y-2 text-center">
            <h1 class="text-2xl font-semibold tracking-tight">
              {{ route.name == 'login' ? 'Wellcome back' : 'Create account' }}
            </h1>
          </div>
          <div v-if="route.name == 'register'" class="flex flex-col items-center space-y-2">
            <div class="avatar">
              <div
                class="ring-primary bg-stone-800 ring-offset-base-100 w-24 rounded-full ring ring-offset-2"
              >
                <div v-show="!email" class="flex h-full flex-1 justify-center items-center">
                  <IconRobot class="h-12 w-12" />
                </div>
                <img v-show="email" :src="`https://robohash.org/${email}.png`" alt="robot" />
              </div>
            </div>
            <span class="text-sm text-muted-foreground">Unique avatar based on your email</span>
          </div>
          <div class="grid gap-6">
            <form @submit.prevent="handleSubmit">
              <div class="grid gap-4">
                <div class="grid gap-2">
                  <label
                    htmlFor="email"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    placeholder="nombre@ejemplo.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    class="input w-full"
                    v-model="email"
                  />
                </div>
                <div v-if="route.name == 'register'" class="grid gap-2">
                  <label
                    htmlFor="username"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    placeholder="jhon"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="username"
                    autoCorrect="off"
                    class="input w-full"
                    v-model="username"
                  />
                </div>
                <div class="grid gap-2">
                  <div class="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Password
                    </label>
                    <RouterLink
                      v-if="route.name == 'login'"
                      to="/forgot-password"
                      class="text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      Forgot password?
                    </RouterLink>
                  </div>
                  <input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    v-model="password"
                    class="input w-full"
                  />
                </div>
                <div class="flex items-center gap-2 space-x-2">
                  <input id="remember" type="checkbox" checked="true" class="checkbox" />
                  <label
                    htmlFor="remember"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Rememberme
                  </label>
                </div>
                <button
                  :disabled="!email || !password"
                  type="submit"
                  class="w-full btn btn-primary"
                >
                  {{ route.name == 'login' ? 'Sign in' : 'Sign up' }}
                </button>
              </div>
            </form>

            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full divider" />
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <button type="button" class="w-full btn btn-outline">
                <IconGithub class="h-4 w-4" />
                Github
              </button>
              <button type="button" class="w-full btn btn-outline">
                <IconGoogle class="h-4 w-4" />
                Google
              </button>
            </div>
          </div>

          <div
            v-if="route.name == 'login'"
            class="px-8 pt-8 text-center text-sm text-muted-foreground"
          >
            Don't have an account?
            <RouterLink to="/register" class="hover:text-primary underline underline-offset-4">
              Register
            </RouterLink>
          </div>
          <div v-else class="px-8 pt-8 text-center text-sm text-muted-foreground">
            Already registerd?
            <RouterLink to="/login" class="hover:text-primary underline underline-offset-4">
              Login
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
