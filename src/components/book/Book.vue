<script setup>
import { ref } from "vue";
import { quotesDB } from "../../db/quotes";
const colorRef = ref("");
const randomQuotes = () => {
  const randomNum = Math.floor(Math.random() * quotesDB.length);
  return quotesDB[randomNum];
};
const quote = randomQuotes();
const bookname = ref("");
const bookList = ref([{ book: "Think and Grow Rich", color: "pink" }]);
const addBookHandler = () => {
  bookList.value.push({ book: bookname.value, color: colorRef.value });
  console.log(bookList.value);
};
const colorHandler = (e) => {
  colorRef.value = e.target.value;
};
</script>
<template>
  <div>
    <div class="quote-box">
      <h1>{{ quote.quoteText }}</h1>
    </div>
    <div class="book-add-cont">
      <p class="book-h">Add your Book ;)</p>
      <div class="input-box">
        <input class="input-name" v-model="bookname" />
        <span
          >choose your book color :
          <input class="input-clr" type="color" @input="colorHandler"
        /></span>
      </div>
      <button @click="addBookHandler">+</button>
    </div>

    <div class="book-shelf">
      <div
        class="book"
        v-for="(book, i) in bookList"
        :key="i"
        :style="{ 'background-color': book.color }"
      >
        <div class="book-tag">
          <small>{{ book.book }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "./book.scss";
</style>
