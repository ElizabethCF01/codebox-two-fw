<template>
  <footer class="border-t bg-muted/40 px-4 md:px-8">
    <div class="container flex flex-col md:flex-row justify-between items-center py-10 gap-6">
      <div class="flex items-center gap-2">
        <Sparkles class="h-6 w-6 text-primary" />
        <span class="text-xl font-bold">ComponentVerse</span>
      </div>

      <div class="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <nav class="flex flex-wrap justify-center gap-6">
          <router-link to="#" class="text-sm text-muted-foreground hover:text-foreground">
            About
          </router-link>
          <router-link to="#" class="text-sm text-muted-foreground hover:text-foreground">
            Components
          </router-link>
          <router-link to="#" class="text-sm text-muted-foreground hover:text-foreground">
            Challenges
          </router-link>
          <router-link to="#" class="text-sm text-muted-foreground hover:text-foreground">
            Creators
          </router-link>
        </nav>

        <div class="flex items-center gap-4">
          <button type="button" class="btn btn-sm btn-ghost btn-circle">
            <IconGithub class="h-5 w-5" />
          </button>
          <button type="button" class="btn btn-sm btn-ghost btn-circle">
            <IconInstagram class="h-5 w-5" />
          </button>
          <button type="button" class="btn btn-sm btn-ghost btn-circle">
            <IconLinkedin class="h-5 w-5" />
          </button>
        </div>
      </div>

      <div class="text-sm text-muted-foreground">© 2025 Codebox. All rights reserved.</div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import IconGithub from "@/components/icons/IconGithub.vue";
import IconInstagram from "@/components/icons/IconInstagram.vue";
import IconLinkedin from "@/components/icons/IconLinkedin.vue";
import { Sparkles } from "lucide-vue-next";
</script>
