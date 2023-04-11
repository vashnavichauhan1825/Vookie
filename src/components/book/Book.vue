<script setup>
import { onMounted, ref } from "vue";
import { quotesDB } from "../../db/quotes";
import { getFirestore } from "firebase/firestore";
import { VtunifyStore } from "../../store";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
// import {  } from "firebase/firestore"
import { db } from "../../main";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
const store = VtunifyStore();
const colorRef = ref("");
const inputKey = ref("");
const randomQuotes = () => {
  const randomNum = Math.floor(Math.random() * quotesDB.length);
  return quotesDB[randomNum];
};

const quote = randomQuotes();
const bookname = ref("");
const bookList = ref([
  {
    book: "Think and Grow Rich",
    color: "pink",
    rotate: "rotate(0deg)",
    bookCover: "happy",
    genre: "Self-help",
    author: "Napolian hill",
    startDate: "2023, 0, 2",
    endDate: "2023, 0, 10",
    ratings: 5,
    Thoughts: ["less but better", "your mind"],
    learnings: "hai apna dil toh awara",
    notes: "ftydytdtydtydtdtttttttttttthhhhhhhhhhhhhhhhhhhhhhhhhh",
  },
  {
    book: "Atomic Habits",
    color: "wheat",
    rotate: "rotate(-2deg)",
    genre: "Self-help",
    bookCover: "happy",
    author: "Napolian hill",
    startDate: "2023, 0, 3",
    endDate: "2023, 0, 10",
    ratings: 5,
    Thoughts: ["less but better", "your mind"],
    learnings: "hai apna dil toh awara",
    notes: "ftydytdtydtydtdtttttttttttthhhhhhhhhhhhhhhhhhhhhhhhhh",
  },
  {
    book: "deep work",
    color: "yellow",
    rotate: "rotate(-1deg)",
    bookCover: "happy",
    startDate: "2023, 0, 6",
    endDate: "2023, 0, 10",
    genre: "Self-help",
    author: "Napolian hill",
    ratings: 5,
    Thoughts: ["less but better", "your mind"],
    learnings: "hai apna dil toh awara",
    notes: "ftydytdtydtydtdtttttttttttthhhhhhhhhhhhhhhhhhhhhhhhhh",
  },
]);
let listArr = [];
const uidRef = ref(localStorage.getItem("uid"));

const docRef = doc(db, "books", uidRef.value);
onMounted(async () => {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    if (docSnap.data().bookList) {
      console.log(docSnap.data().bookList);
      bookList.value = docSnap.data().bookList;
    } else {
      await updateDoc(docRef, {
        bookList: bookList.value,
      });
    }
  } else {
    console.log("No such document!");
    await setDoc(docRef, {});
    await updateDoc(docRef, {
      bookList: bookList.value,
    });
  }
  store.setBookList(bookList.value);
});
const kuchBhi = (abc) => {
  let arr = [];
  let val = abc.toUpperCase().split("");
  console.log(abc.toUpperCase().split(""));

  for (let i = 0; i <= 3; i++) {
    arr.push(val[i] + val[1] + val[2] + val[3]);
    var temp = val[1];
    val[1] = val[2];
    val[2] = temp;
    arr.push(val[i] + val[1] + val[2] + val[3]);
  }
  console.log(arr);
};
kuchBhi("abcd");
const addBookHandler = async () => {
  if (bookname.value !== "") {
    if (colorRef.value.length > 0) {
      bookList.value.push({
        book: bookname.value,
        color: colorRef.value,
        rotate: `rotate(-${Math.floor(Math.random() * (3 - 0 + 1) + 0)}deg)`,
        details: [],
        bookCover: "",
        startDate: "-",
        endDate: "-",
        genre: "",
        author: "",
        ratings: -1,
        Thoughts: [],
        learnings: "",
        notes: "",
      });
      await updateDoc(docRef, {
        bookList: bookList.value,
      });
      store.setBookList(bookList.value);

      store.toastSuccess("Book added on shelf !");
      bookname.value = "";
    } else {
      store.toastError("select color for bookcover !");
    }
  } else {
    store.toastError("Add Name in your book !");
  }
};
const colorHandler = (e) => {
  colorRef.value = e.target.value;
};
const removeItemHandler = async (i) => {
  bookList.value.splice(i, 1);
  await updateDoc(docRef, {
    bookList: bookList.value,
  });
  store.toastSuccess("Book removed from shelf !");
};
const bookSetHandler = (book) => {
  localStorage.setItem("book", book);
};
</script>
<template>
  <div class="book-wrapper">
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
      <button class="book-btn" @click="addBookHandler">+</button>
    </div>

    <div class="book-shelf-cont">
      <div class="book-shelf">
        <div
          class="book"
          v-for="(book, i) in bookList"
          :key="i"
          :style="{ 'background-color': book.color, transform: book.rotate }"
        >
          <div class="book-tag">
            <router-link :to="`/Book/${book.book}`">
              <small @click="bookSetHandler(book.book)">{{ book.book }}</small>
            </router-link>
            <img
              class="bin"
              @click="removeItemHandler(i)"
              src="../../assets/bin.png"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="journal-box">
    <h1 class="line"><i>Your virtual journal , anytime ,anywhere !</i></h1>

    <div class="box">
      <p>
        Welcome to Vookie, your virtual bookshelf and journal where you can
        organize, track and explore your reading journey. Click on book name to
        write journal of your book !
      </p>
    </div>
  </div>
</template>
<style lang="scss">
@import "./book.scss";
.img-sz {
  width: 100px;
  height: 200px;
}
</style>
