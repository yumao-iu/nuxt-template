<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
import api_index from "~/composables/api_index";
await api_index.init();
useHead({
  title: "nuxt3-template",
  meta: [{ name: "description", content: "描述" }],
  link: [
    { rel: "stylesheet", href: "/css/public.css" },
    { rel: "stylesheet", href: "/css/iconfont.css" },
    { rel: "stylesheet", href: "/font_css/result.css" },
  ],
});

</script>