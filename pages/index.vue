<template>
  <div>hello world</div>
</template>

<script setup>
import api from "~/axios";
import { storeToRefs } from "pinia";
import { indexStore } from "~/store";

let route = useRoute();
let router = useRouter();

let data = api_index();
data.getInit();
</script>