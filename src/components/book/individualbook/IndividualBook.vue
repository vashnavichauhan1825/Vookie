<script setup>
import { onMounted, ref, computed, reactive } from "vue";
import { setupCalendar, Calendar, DatePicker } from "v-calendar";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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
import { uploadBytes } from "firebase/storage";

import { VtunifyStore } from "../../../store";
import { db, storageRef, storageApp } from "../../../main";
const detailsList = ref("");
const store = VtunifyStore();
const datepickRef = ref("");
const rateRef = ref("");
const urlRef = ref("");
const index = ref("");
const uidRef = ref(localStorage.getItem("uid"));
const docRef = doc(db, "books", uidRef.value);
const bookRef = ref(localStorage.getItem("book"));
const rating = [8, 6, 4, 2, 0];
const bookList = ref("");
let date = new Date();

const days = ref([]);
// const attri = [
//   {
//     highlight: {
//       start: { fillMode: "outline" },
//       base: { fillMode: "light" },
//       end: { fillMode: "outline" },
//     },
//     dates: { start: new Date(2023, 0, 14), end: new Date(2023, 0, 18) },
//   },
// ];
const startD = computed(() => {
  if (detailsList.value.startDate !== "-") {
    return new Date(detailsList.value.startDate);
  } else {
    return 0;
  }
});
const endD = computed(() => {
  if (detailsList.value.endDate !== "-") {
    return new Date(detailsList.value.endDate);
  } else {
    return 0;
  }
});

const attrs = computed(() => {
  return [
    {
      highlight: {
        start: { fillMode: "outline" },
        base: { fillMode: "light" },
        end: { fillMode: "outline" },
      },
      dates: { start: startD.value, end: endD.value },
    },
  ];
});
// const attrs = ref([
//   {
//     highlight: {
//       start: { fillMode: "outline" },
//       base: { fillMode: "light" },
//       end: { fillMode: "outline" },
//     },
//     dates: { start: new Date(2023, 3, 14), end: new Date(2023, 3, 18) },
//   },
// ]);
onMounted(async () => {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    if (docSnap.data().bookList) {
      bookList.value = docSnap.data().bookList;
      detailsList.value = bookList.value.filter(
        (i) => i.book === bookRef.value
      )[0];
      index.value = bookList.value.findIndex((i) => i.book === bookRef.value);
    }
  }
  if (detailsList.value.ratings !== -1) {
    rateRef.value.childNodes[rating[detailsList.value.ratings]].checked = true;
  } else {
    for (let i = 0; i <= 4; i++) {
      rateRef.value.childNodes[rating[i]].checked = false;
    }
  }

  if (
    detailsList.value.startDate !== "-" &&
    detailsList.value.endDate !== "-"
  ) {
  }
});
const bookauthorHandler = async (e) => {
  bookList.value[index.value].author = e.target.value;
  await updateDoc(docRef, {
    bookList: bookList.value,
  });
};
const bookgenreHandler = async (e) => {
  bookList.value[index.value].genre = e.target.value;
  await updateDoc(docRef, {
    bookList: bookList.value,
  });
};

const ReturnDate = (date) => {
  if (date !== "-") {
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "-" + mm + "-" + yyyy;
    return formattedToday;
  } else return "no";
};
const ratingHandler = async (val) => {
  rateRef.value.childNodes[rating[val]].checked = "true";
  bookList.value[index.value].ratings = val;
  await updateDoc(docRef, {
    bookList: bookList.value,
  });
};
const addListHandler = async (e) => {
  let list = e.target.value;
  if (e.key === "Enter") {
    bookList.value[index.value].Thoughts.push(list);
    e.target.value = "";
    await updateDoc(docRef, {
      bookList: bookList.value,
    });
  }
};
const onDateRangeChange = async (dragVal) => {
  bookList.value[index.value].startDate = dragVal.start.getTime();
  bookList.value[index.value].endDate = dragVal.end.getTime();
  await updateDoc(docRef, {
    bookList: bookList.value,
  });
};
const removeFromList = async (i) => {
  bookList.value[index.value].Thoughts.splice(i, 1);

  await updateDoc(docRef, {
    bookList: bookList.value,
  });
};
const notesHandler = async (e) => {
  bookList.value[index.value].notes = e.target.value;
  await updateDoc(docRef, {
    bookList: bookList.value,
  });
};
const LearningHandler = async (e) => {
  bookList.value[index.value].learnings = e.target.value;
  await updateDoc(docRef, {
    bookList: bookList.value,
  });
};
const bookCoverHandler = async (e) => {
  const file = e.target.files[0];
  urlRef.value = URL.createObjectURL(file);

  var Path = "Test/" + e.target.files[0].name;
  const storageRef_1 = storageRef(storageApp, Path);
  uploadBytes(storageRef_1, file).then(async (snapshot) => {
    var ImageUrl =
      "https://firebasestorage.googleapis.com/v0/b/vookie-fa055.appspot.com/o/" +
      encodeURIComponent(Path) +
      "?alt=media";

    bookList.value[index.value].bookCover = ImageUrl;
    await updateDoc(docRef, {
      bookList: bookList.value,
    });
  });
  detailsList.value = bookList.value.filter((i) => i.book === bookRef.value)[0];
};
</script>

<template>
  <div class="page-wrapper">
    <div class="book-journal-wrapper">
      <div class="book-cover">
        <div class="img-box">
          <img class="book-frame" src="../../../assets/Vector.png" />
          <img class="book-img" :src="detailsList.bookCover" />
          <img class="br-line" src="../../../assets/br-line.png" />
        </div>

        <div class="upload-box">
          <div class="file-input">
            <input
              type="file"
              name="file-input"
              id="file-input"
              class="file-input__input"
              @change="bookCoverHandler"
            />
            <label class="file-input__label" for="file-input">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="upload"
                class="svg-inline--fa fa-upload fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                ></path>
              </svg>
            </label>
          </div>
          <h1>book cover</h1>
        </div>
      </div>

      <div class="upper-cont">
        <div class="book-main-cont">
          <label>Book Name: <input :value="detailsList.book" readonly /></label>
          <label
            >Author Name
            <input :value="detailsList.author" @input="bookauthorHandler"
          /></label>
          <label
            >Genre <input :value="detailsList.genre" @input="bookgenreHandler"
          /></label>
        </div>
        <div class="book-main-cont">
          <div class="rating-cont">
            <div class="rate" ref="rateRef">
              <input type="radio" id="star5" name="rate" value="5" />
              <label for="star5" @click="ratingHandler(4)" title="text"></label>
              <input type="radio" checked id="star4" name="rate" value="4" />
              <label for="star4" title="text" @click="ratingHandler(3)"></label>
              <input type="radio" checked id="star3" name="rate" value="3" />
              <label for="star3" title="text" @click="ratingHandler(2)"></label>
              <input type="radio" id="star2" name="rate" value="2" />
              <label for="star2" title="text" @click="ratingHandler(1)"></label>
              <input type="radio" id="star1" name="rate" value="1" />
              <label for="star1" title="text" @click="ratingHandler(0)"></label>
            </div>
            <div class="date-cont">
              <img src="../../../assets/Layer6.png" />
              <span
                ><h2>Start Date</h2>
                <h1>
                  {{ startD === 0 ? "--/--/--" : startD.toLocaleDateString() }}
                </h1></span
              >
              <span
                ><h2>End Date</h2>
                <h1>
                  {{ endD === 0 ? "--/--/--" : endD.toLocaleDateString() }}
                </h1></span
              >
            </div>
          </div>
        </div>
        <div class="calender-cont">
          <DatePicker
            transparent
            borderless
            :attributes="attrs"
            is-range
            ref="datepickRef"
            @drag="onDateRangeChange"
          />
          <img src="../../../assets/leaf.png" />
        </div>
      </div>
    </div>
    <div class="bottom-cont">
      <div class="notes-cont">
        <img class="note-img" src="../../../assets/Layer12.png" />
        <h1>Notes</h1>
        <textarea
          class="scroll"
          :value="detailsList.notes"
          @change="notesHandler"
        />
      </div>
      <div class="learn-cont">
        <img class="learn-img" src="../../../assets/Layer18.png" />
        <h1>Implement what I Learn !</h1>
        <textarea
          class="scroll"
          :value="detailsList.learnings"
          @change="LearningHandler"
        />
      </div>
      <div class="quote-cont">
        <img class="quote-img" src="../../../assets/Layer10.png" />
        <h1>Favorite Quotes !</h1>
        <ul class="scroll">
          <li
            v-for="(list, i) in detailsList.Thoughts"
            @click="removeFromList(i)"
            :key="i"
          >
            {{ list }}
          </li>
          <li>
            <input class="quote-input" type="text" @keypress="addListHandler" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./individual.scss";
</style>
