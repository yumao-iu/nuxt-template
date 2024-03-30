import { defineStore } from 'pinia'

export let userStore = defineStore('userStore', {
    state() {
        return {
            user_token:'',
        }
    },
    actions: {
      
    },
    persist: true,
})