import { defineStore } from 'pinia'

export let storeUser = defineStore('storeUser', {
    state() {
        return {
            token_user:'',
        }
    },
    actions: {
      
    },
    persist: true,
})