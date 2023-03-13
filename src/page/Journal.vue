<script setup>
import { ref } from "vue";
import StickyNotes from "../components/journal/StickyNotes.vue";
import Book from "../components/book/Book.vue";
const selectedMenu = ref(0);
</script>
<template>
  <div class="journal-wrapper">
    <aside>
      <ul>
        <li
          @click="selectedMenu = 0"
          :class="selectedMenu === 0 ? 'bg-tag' : ''"
        >
          Sticky Notes
        </li>
        <li
          @click="selectedMenu = 1"
          :class="selectedMenu === 1 ? 'bg-tag' : ''"
        >
          Book Journal
        </li>
        <li
          @click="selectedMenu = 2"
          :class="selectedMenu === 2 ? 'bg-tag' : ''"
        >
          My Notes
        </li>
      </ul>
    </aside>
    <StickyNotes v-if="selectedMenu === 0" />
    <Book v-else />
  </div>
</template>
<style lang="scss">
@import "./journal.scss";
</style>
