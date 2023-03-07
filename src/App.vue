<script setup>
import Landing from "./page/Landing.vue";
import MainPage from "./page/MainPage.vue";
import { storeToRefs } from "pinia";
import { VtunifyStore } from "./store";
const store = VtunifyStore();
const { flag } = storeToRefs(store);
</script>
<template>
  <router-view />
</template>
<style></style>
