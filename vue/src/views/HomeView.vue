<script setup lang="ts">
import ProjectCard from "@/components/cards/ProjectCard.vue";
import ProjectCardSkeleton from "@/components/cards/ProjectCardSkeleton.vue";
import { useProjects } from "@/composables/useProject";
import { useTag } from "@/composables/useTag";
import type { Project } from "@/interfaces/project";
import type { Tag } from "@/interfaces/tag";
import { useAuthStore } from "@/stores/auth";
import { Filter, PlusCircle } from "lucide-vue-next";
import { type Ref, onMounted, ref, watch } from "vue";

const { getProjectList } = useProjects();
const { getTagList } = useTag();
const authStore = useAuthStore();
const projects: Ref<Project[]> = ref([]);
const isLoading = ref(false);
const hasMore = ref(false);
const page = ref(0);
const tags = ref<Tag[]>([]);
const tagSelected = ref("all");

onMounted(async () => {
  handleLoadMore();
  tags.value = await getTagList();
});
const handleLoadMore = async () => {
  isLoading.value = true;
  let query = "";
  if (tagSelected.value !== "all") {
    query = `&filters[tag][documentId][$eq]=${tagSelected.value}`;
  }
  const response = await getProjectList(page.value + 1, query);
  projects.value = [...projects.value, ...response.list];
  hasMore.value = response.hasMore;
  page.value++;
  isLoading.value = false;
};
watch(
  () => tagSelected.value,
  () => {
    page.value = 0;
    projects.value = [];
    handleLoadMore();
  },
);
</script>

<template>
  <main class="flex-1 p-4 lg:p-10 flex flex-col items-center">
    <section
      class="py-12 w-full md:py-24 lg:py-32 bg-gradient-to-b from-background via-background/80 to-background flex justify-center"
    >
      <div class="container px-4 md:px-6">
        <div class="flex flex-col items-center text-center space-y-4 pb-8">
          <div class="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            Open Source UI Components
          </div>
          <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Beautiful UI Components for Your Next Project
          </h1>
          <p class="max-w-[700px] text-muted-foreground md:text-xl text-center text-pretty">
            Discover, copy and customize beautiful UI components. Save hours of development time.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
            <RouterLink
              :to="authStore.user ? '/editor' : '/login'"
              class="gap-2 btn btn-wide btn-outline"
            >
              <PlusCircle class="h-4 w-4" />
              Submit Component
            </RouterLink>
            <button type="button" class="gap-2 btn btn-wide btn-primary">Browse Components</button>
          </div>
        </div>
      </div>
    </section>

    <section class="py-8 w-full justify-center flex">
      <div class="container px-4 md:px-6 w-full">
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 w-full"
        >
          <div role="tablist" class="tabs tabs-box">
            <button
              role="tab"
              class="tab"
              :class="{ 'tab-active': tagSelected === 'all' }"
              @click="tagSelected = 'all'"
              type="button"
            >
              All
            </button>
            <button
              v-for="tag in tags"
              :key="tag.id"
              role="tab"
              class="tab"
              :class="{ 'tab-active': tagSelected === tag.documentId }"
              @click="tagSelected = tag.documentId"
              type="button"
            >
              {{ tag.name }}
            </button>
          </div>

          <div class="flex items-center gap-4">
            <button type="button" class="gap-2 btn btn-outline">
              <Filter class="h-4 w-4" />
              Filter
            </button>
            <select
              class="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
            >
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
          <ProjectCardSkeleton v-if="isLoading" />
        </div>

        <div v-show="hasMore && !isLoading" class="flex justify-center mt-12">
          <button type="button" @click="handleLoadMore" class="gap-2 btn btn-outline btn-wide">
            Load More Components
          </button>
        </div>
      </div>
    </section>
  </main>
</template>
