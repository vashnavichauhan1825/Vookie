<script setup>
import { ref } from "vue";
import StickyNotes from "../components/journal/StickyNotes.vue";
import Book from "../components/book/Book.vue";
const selectedMenu = ref(0);
const asideRef = ref("");
let flag = true;
const sideToggleHandler = () => {
  if (flag) {
    asideRef.value.style.transform = "translate(0px)";
    flag = false;
    console.log(asideRef.value.classList);
  } else {
    asideRef.value.style.transform = "translate(-150px)";
    flag = true;
  }
};
</script>

<template>
  <div class="journal-wrapper">
    <aside ref="asideRef">
      <img @click="sideToggleHandler" src="../assets/vb.png" />
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
      </ul>
    </aside>
    <div class="content-wrapper">
      <StickyNotes v-if="selectedMenu === 0" />
      <Book v-else />
    </div>
  </div>
</template>
<style lang="scss">
@import "./journal.scss";
</style>
