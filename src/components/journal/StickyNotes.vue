<script setup>
import { reactive, ref } from "vue";
const colorRef = ref("");
const limitVal = reactive({ pressed: 0, remaining: 200 });
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

const addItemHandler = () => {
  console.log(inputVal.value.length);
  if (inputVal.value.length > 0) {
    list.value.push({
      note: inputVal.value,
      date: `${new Date().getDate()} ${
        monthNames[new Date().getMonth()]
      } ${new Date().getFullYear()}`,
      color: colorRef.value,
    });
    inputVal.value = " ";
  } else {
    alert("empty field");
  }
};
const removeItemHandler = (i) => {
  list.value.splice(i, 1);
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
