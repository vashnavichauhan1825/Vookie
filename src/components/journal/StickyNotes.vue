<script setup>
import { reactive, ref, onMounted } from "vue";
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
import { db } from "../../main";
import { VtunifyStore } from "../../store";
const store = VtunifyStore();
const colorRef = ref("");
const notesRef = ref("");
const limitVal = reactive({ pressed: 0, remaining: 200 });
const uidRef = ref(localStorage.getItem("uid"));
const docRef = doc(db, "books", uidRef.value);
onMounted(async () => {
  const docRef = doc(db, "books", uidRef.value);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    if (docSnap.data().notes) {
      list.value = docSnap.data().notes;
    } else {
      await updateDoc(docRef, {
        notesRef: list.value,
      });
    }
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    await setDoc(docRef, {});
    await updateDoc(docRef, {
      notes: list.value,
    });
  }
});
const list = ref([
  {
    note: "Life is either a daring adventure or nothing at all",
    date: "May 21",
    color: "bg-purple",
  },
  {
    note: "In order to write about life first you must live it.",
    date: "Nov 18",
    color: "bg-yellow",
  },
]);
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const inputVal = ref("");
const inputHandler = () => {
  limitVal.pressed = inputVal.value.length;
};

const addItemHandler = async () => {
  if (inputVal.value.length > 0) {
    list.value.push({
      note: inputVal.value,
      date: `${new Date().getDate()} ${
        monthNames[new Date().getMonth()]
      } ${new Date().getFullYear()}`,
      color: colorRef.value,
    });
    await updateDoc(docRef, {
      notes: list.value,
    });
    store.toastSuccess("Sticky added on wall !");
    inputVal.value = " ";
  } else {
    store.toastError("Write something on sticky !");
  }
};
const removeItemHandler = async (i) => {
  list.value.splice(i, 1);
  await updateDoc(docRef, {
    notes: list.value,
  });
};
</script>
<template>
  <div class="sticky-wrapper">
    <div class="flex-row">
      <div class="flex-col">
        <h1>Sticky Wall</h1>
        <div class="flex-row">
          <div>
            <textarea
              v-model="inputVal"
              @input="inputHandler"
              maxlength="200"
              :class="colorRef"
            />
            <div class="detail-cont">
              <div class="color-wrapper">
                <div
                  class="color-box bg-green"
                  @click="colorRef = 'bg-green'"
                ></div>
                <div
                  class="color-box bg-yellow"
                  @click="colorRef = 'bg-yellow'"
                ></div>
                <div
                  class="color-box bg-pink"
                  @click="colorRef = 'bg-pink'"
                ></div>
                <div
                  class="color-box bg-purple"
                  @click="colorRef = 'bg-purple'"
                ></div>
              </div>
              <p>{{ limitVal.pressed + "/" + limitVal.remaining }}</p>
            </div>
          </div>

          <button class="add-btn" @click="addItemHandler">+</button>
        </div>
      </div>
      <div class="hero-sticky"><h1>You Matter !</h1></div>
    </div>
    <div class="sticky-cont" v-if="list.length > 0">
      <div
        v-for="(list, i) in list"
        :key="i"
        :class="['sticky-note', list.color]"
      >
        <p>{{ list.note }}</p>
        <small class="date">{{ list.date }}</small>
        <button class="remove-btn" @click="removeItemHandler(i)">-</button>
      </div>
    </div>
    <div class="sticky-empty" v-else>No Sticky in your wall :(</div>
  </div>
</template>
<style lang="scss">
@import "./sticky.scss";
</style>
