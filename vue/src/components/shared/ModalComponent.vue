<template>
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box border border-white/20">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <slot></slot>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button @click="close" class="btn btn-primary">Accept</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
<script setup lang="ts">
defineProps({
  title: String,
  text: String,
})
const emits = defineEmits(['close'])

const close = () => emits('close')
</script>
