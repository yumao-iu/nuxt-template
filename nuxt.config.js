// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt', // needed
    '@pinia-plugin-persistedstate/nuxt',
  ],
  runtimeConfig:{
    public:{
      api_index:process.env.api_index,
      api_admin:process.env.api_admin,
      api_user:process.env.api_user,
    }
  }

})
