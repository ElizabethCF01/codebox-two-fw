<template>
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
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import type { editor as MonacoEditor } from "monaco-editor";
import { type PropType, ref } from "vue";

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  fontSize: 16,
};

const props = defineProps({
  tabLanguage: {
    type: String as PropType<"html" | "css" | "javascript">,
    required: true,
  },
  code: {
    type: Object as PropType<{
      html: string;
      css: string;
      javascript: string;
    }>,
    required: true,
  },

  getOutput: {
    type: Function as PropType<() => void>,
    required: true,
  },
});

const editor = ref<MonacoEditor.IStandaloneCodeEditor | null>(null);

const handleMount = (editorInstance: MonacoEditor.IStandaloneCodeEditor) => {
  editor.value = editorInstance;
  editor.value.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    props.getOutput();
  });
};
</script>

