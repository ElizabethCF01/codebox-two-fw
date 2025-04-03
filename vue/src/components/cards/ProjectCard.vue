<template>
  <div
    class="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
  >
    <div
      class="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 ease-linear duration-200"
    >
      <button
        class="h-8 w-8 backdrop-blur-sm btn btn-sm btn-circle btn-soft border-white bg-stone-900/50"
      >
        <Heart class="h-4 w-4" />
      </button>

      <router-link
        :to="`/preview/${project.documentId}`"
        class="h-8 w-8 backdrop-blur-sm btn btn-sm border-white btn-circle btn-soft bg-stone-900/50"
      >
        <Code class="h-4 w-4" />
      </router-link>
    </div>

    <div
      class="aspect-[4/3] overflow-hidden bg-muted/50 dark:bg-muted/80 flex items-center justify-center"
    >
      <iframe
        class="ide w-full h-full bg-stone-900 transition-all ease-in"
        :srcdoc="content"
        sandbox="allow-scripts"
      ></iframe>
    </div>

    <div class="p-4">
      <div class="flex items-start justify-between">
        <div>
          <h3 class="font-medium text-lg">{{ project.name }}</h3>
          <div class="mt-1 flex flex-wrap gap-1">
            <div :class="`mt-1 badge badge-outline  ${'badge-' + project.tag?.variant}`">
              {{ project.tag?.name }}
            </div>
          </div>
        </div>
        <div class="flex items-center text-muted-foreground">
          <Heart class="mr-1 h-3.5 w-3.5 fill-current" />
          <span class="text-xs">{{ 10 }}</span>
        </div>
      </div>

      <div class="mt-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="avatar">
            <div
              class="ring-primary ring-offset-base-100 w-7 ring ring-offset-2 bg-stone-800 rounded-full"
            >
              <img
                :src="`https://robohash.org/${project.author.email}.png`"
                :alt="project.author.username"
              />
            </div>
          </div>
          <span class="text-xs text-muted-foreground">@{{ project.author.username }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Project } from '@/interfaces/project'
import { Heart, Code } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
  project: {
    type: Object as () => Project,
    required: true,
  },
})

const content = computed(() => {
  return `
    ${props.project.htmlCode}
    <style>
    body {
      overflow: hidden;
      background-color: #292524;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
      ${props.project.cssCode}
    <\/style>
   <script>
      ${props.project.jsCode}
    <\/script> `
})
</script>
