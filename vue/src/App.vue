<script setup lang="ts">
import FooterComponent from './components/shared/FooterComponent.vue'
import NavbarComponent from './components/shared/NavbarComponent.vue'
</script>

<template>
  <NavbarComponent />
  <RouterView />
  <FooterComponent />
</template>

<style scoped></style>
