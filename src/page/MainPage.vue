<script setup>
import { onMounted } from "vue";
import { VtunifyStore } from "../store";
const store = VtunifyStore();
onMounted(() => {});
</script>
<template>
  <h1>new page</h1>
  <button @click="store.flagHandler">click me</button>
</template>
<style></style>
