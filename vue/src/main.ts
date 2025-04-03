import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'

import App from './App.vue'
import router from './router'
import Vue3Toastify, { toast, type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(Vue3Toastify, {
  autoClose: 3000,
  theme: 'dark',
  position: toast.POSITION.TOP_RIGHT,
} as ToastContainerOptions)
app.use(VueMonacoEditorPlugin, {
  paths: {
    // You can change the CDN config to load other versions
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs',
  },
})

app.mount('#app')
