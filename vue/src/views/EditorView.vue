<template>
  <div class="editor w-full h-[calc(100vh-70px)]">
    <div v-if="isLoading" class="flex w-full items-center justify-center flex-1">
      <span class="loading loading-spinner loading-sm"></span>
    </div>
    <div v-else class="flex-1 flex overflow-hidden aspect-16/9 bg-stone-900">
      <!-- Editor Panel -->
      <div class="h-[calc(100vh-70px)] w-full flex flex-col bg-stone-800 border-r border-white/40">
        <div class="p-2 gap-2 flex items-center">
          <div role="tablist" class="tabs tabs-box">
            <a
              role="tab"
              class="tab"
              :class="{ 'tab-active': tabLanguage === 'html' }"
              @click="tabLanguage = 'html'"
            >
              HTML</a
            >
            <a
              role="tab"
              class="tab"
              :class="{ 'tab-active': tabLanguage === 'css' }"
              @click="tabLanguage = 'css'"
              >CSS</a
            >
            <a
              role="tab"
              class="tab"
              :class="{ 'tab-active': tabLanguage === 'javascript' }"
              @click="tabLanguage = 'javascript'"
              >JS</a
            >
          </div>
          <div class="ml-auto"></div>
          <button
            v-if="!route.params.id"
            @click="showModal = true"
            type="button"
            class="btn btn-outline font-bold"
          >
            <span v-show="isSaving" class="loading loading-spinner loading-sm"></span>
            <Save v-show="!isSaving" class="h-5 w-5" />
            Save
          </button>
          <button type="button" @click="getOutput" class="btn btn-primary font-bold">
            <CirclePlay class="h-5 w-5" />
            Run
          </button>
        </div>

        <!-- monaco Editor -->
        <div class="flex-1 overflow-hidden">
          <div class="h-full w-full py-4 font-mono text-lg bg-[#1e1e1e]">
            <vue-monaco-editor
              v-model:value="code[tabLanguage]"
              theme="vs-dark"
              :options="MONACO_EDITOR_OPTIONS"
              @mount="handleMount"
              :language="tabLanguage"
            />
          </div>
        </div>
      </div>

      <!-- Preview Panel -->
      <div class="h-[calc(100vh-70px)] flex flex-col w-full">
        <iframe
          class="ide w-full h-full bg-stone-900 transition-all ease-in"
          :srcdoc="output"
          sandbox="allow-scripts"
          aria-label="Codebox project preview"
          title="Codebox project preview"
        ></iframe>
      </div>
    </div>
  </div>
  <ModalComponent v-if="showModal" @close="handleSave" title="Save Project" open>
    <div class="form-control mt-4">
      <input type="text" v-model="projectName" placeholder="Project name" class="input w-full" />
    </div>
    <div class="form-control mt-4 flex gap-2">
      <div class="badge-primary badge-secondary badge-error badge-info hidden"></div>
      <div
        v-for="tag in tags"
        :key="tag.id"
        @click="pickTag(tag)"
        :class="`badge cursor-pointer ${'badge-' + tag.variant} ${tagSelected === tag.documentId ? '' : 'badge-outline'}`"
      >
        {{ tag.name }}
      </div>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import ModalComponent from "@/components/shared/ModalComponent.vue";
import { useProjects } from "@/composables/useProject";
import { useTag } from "@/composables/useTag";
import type { Tag } from "@/interfaces/tag";
import { useAuthStore } from "@/stores/auth";
import { CirclePlay, Save } from "lucide-vue-next";
import type { editor as MonacoEditor } from "monaco-editor";
import * as monaco from "monaco-editor";
import { onMounted, ref, shallowRef } from "vue";
import { useRoute, useRouter } from "vue-router";

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  fontSize: 16,
};

const authStore = useAuthStore();
const { createProject, getProjectById } = useProjects();
const { getTagList } = useTag();
const route = useRoute();
const router = useRouter();

const code = ref({
  html: "<h1>hello world!</h1>",
  css: "body{ background: #1c1917;} \nh1 { color: white; }",
  javascript: 'console.log("hello world");',
});

const tabLanguage = ref<"html" | "css" | "javascript">("html");

const showModal = ref(false);
const editor = shallowRef();
const isLoading = ref(false);
const projectName = ref("");

const tags = ref<Tag[]>([]);

const handleMount = (editorInstance: MonacoEditor.IStandaloneCodeEditor) => {
  editor.value = editorInstance;
  // Register a command to save the code using Cmd+S / Ctrl+S
  editor.value.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    console.log("Guardando código:", code.value[tabLanguage.value]);
    getOutput();
  });
};

const output = ref("");
const getOutput = () => {
  output.value = `
    ${code.value.html}
    <style>
     body {
      overflow: hidden;
      background-color: #292524;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    ${code.value.css}
    <\/style>
   <script>
    ${code.value.javascript}
    <\/script>`;
};

const getProject = async () => {
  isLoading.value = true;
  const project = await getProjectById(route.params.id.toString());
  if (project) {
    code.value.html = project.htmlCode;
    code.value.css = project.cssCode;
    code.value.javascript = project.jsCode;
  }
  getOutput();
  isLoading.value = false;
};
onMounted(async () => {
  if (route.params.id) await getProject();
  else {
    tags.value = await getTagList();
    getOutput();
  }
});
const tagSelected = ref("");

const pickTag = (tag: Tag) => {
  tagSelected.value = tag.documentId;
};
const isSaving = ref(false);
const handleSave = async () => {
  if (!authStore.user) return;
  isSaving.value = true;
  showModal.value = false;

  const data = {
    name: projectName.value,
    htmlCode: code.value.html,
    cssCode: code.value.css,
    jsCode: code.value.javascript,
    tag: { connect: [tagSelected.value] },
    author: {
      connect: [
        {
          id: authStore.user.id,
          documentId: authStore.user.documentId,
        },
      ],
    },
  };

  const ok = await createProject({ data });
  isSaving.value = false;
  if (ok) router.push({ name: "home" });
};
</script>
