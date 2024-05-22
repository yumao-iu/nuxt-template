import { defineStore } from 'pinia'

export let storeAdmin = defineStore('storeAdmin', {
    state() {
        return {
            token_admin: 'token_admin',
        }
    },
    actions: {

    },
    persist: true,
})