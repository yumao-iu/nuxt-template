import { defineStore } from 'pinia'

export let adminStore = defineStore('adminStore', {
    state() {
        return {
         admin_token:'',
        }
    },
    actions: {
        
    },
    persist: true,
})