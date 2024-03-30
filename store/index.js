import { defineStore } from 'pinia'

export let indexStore = defineStore('indexStore', {
    state() {
        return {
            api_index:process.env.api_index,
            api_user:process.env.api_user,
            api_admin:process.env.api_admin,
        }
    },
    actions: {

    },
})