<template>
  <div>hello world</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { indexStore } from "~/store";

let route = useRoute();
let router = useRouter();

let api = api_index();
let data =  await api.getInit();
console.log(data);
</script>