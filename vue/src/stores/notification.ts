import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationsStore = defineStore('notifications', () => {
  const mssg = ref('')
  const type = ref('success')

  return {
    mssg,
    type,
  }
})
