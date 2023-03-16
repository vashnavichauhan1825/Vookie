<script setup>
import { onMounted, ref } from "vue";
import { quotesDB } from "../../db/quotes";
import { getFirestore } from "firebase/firestore";
import { VtunifyStore } from "../../store";
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
const randomQuotes = () => {
  const randomNum = Math.floor(Math.random() * quotesDB.length);
  return quotesDB[randomNum];
};
console.log(store.uid);
const quote = randomQuotes();
const bookname = ref("");
const bookList = ref([
  { book: "Think and Grow Rich", color: "pink", rotate: "rotate(0deg)" },
  { book: "Atomic Habits", color: "wheat", rotate: "rotate(-2deg)" },
  { book: "deep work", color: "yellow", rotate: "rotate(-1deg)" },
]);
let listArr = [];
const uidRef = ref(localStorage.getItem("uid"));

const docRef = doc(db, "books", uidRef.value);
onMounted(async () => {
  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  //   bookList.value = docSnap.data().bookList;
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  //   await setDoc(fsRef, {
  //     bookList: bookList.value,
  //   });
  // }

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    if (docSnap.data().bookList) {
      bookList.value = docSnap.data().bookList;
    } else {
      await updateDoc(docRef, {
        bookList: bookList.value,
      });
    }
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    await setDoc(docRef, {});
    await updateDoc(docRef, {
      bookList: bookList.value,
    });
  }
  // const querySnapshot = await getDocs(collection(db, "books"));
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => jjjjj", doc.data().bookList);
  //   listArr = doc.data().bookList;
  //   bookList.value = doc.data().bookList;
  //   console.log(listArr);
  // });
});
const addBookHandler = async () => {
  //   const bookRef = doc(db, "books", store.uid);
  //   setDoc(bookRef, { capital: true }, { merge: true });
  bookList.value.push({
    book: bookname.value,
    color: colorRef.value,
    rotate: `rotate(-${Math.floor(Math.random() * (3 - 0 + 1) + 0)}deg)`,
  });
  await updateDoc(docRef, {
    bookList: bookList.value,
  });

  //   await setDoc(doc(db, "books", store.uid), {
  //     booksList: [
  //       { book: "Think and Grow Rich", color: "pink", rotate: "rotate(0deg)" },
  //       { book: "Atomic Habits", color: "wheat", rotate: "rotate(-2deg)" },
  //     ],
  //     // book: bookname.value,
  //     // color: colorRef.value,
  //     // rotate: `rotate(-${Math.floor(Math.random() * (3 - 0 + 1) + 0)}deg)`,
  //   });
  bookname.value = " ";
};
const colorHandler = (e) => {
  colorRef.value = e.target.value;
};
const removeItemHandler = async (i) => {
  bookList.value.splice(i, 1);
  await updateDoc(docRef, {
    bookList: bookList.value,
  });
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
            <small>{{ book.book }}</small>
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
</template>
<style lang="scss">
@import "./book.scss";
.img-sz {
  width: 100px;
  height: 200px;
}
</style>
