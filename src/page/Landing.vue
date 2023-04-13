<script setup>
import { ref } from "vue";
import axios from "axios";
import anime from "animejs";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { VtunifyStore } from "../store";
const boolRef = ref(true);
const store = VtunifyStore();
const { flag } = storeToRefs(store);

const connectHandler = () => {
  store.flagHandler();
};
const blobRef = ref("");
const imgRef = ref("");
onMounted(() => {
  var textWrapper = document.querySelector(".ml3");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );
  anime.timeline({ loop: false }).add({
    targets: ".ml3 .letter",
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i + 1),
  });
  anime({
    targets: blobRef.value,
    translateX: "-30%",
    duration: 5000,
  });
  anime({
    targets: imgRef.value,
    translateX: "-5%",
    duration: 5000,
    rotate: "-10deg",
  });
});
const nextHandler = () => {
  const hash = window.location.hash;
  if (hash) {
    const token = hash.substring(1).split("&")[0].split("=")[1];
    console.log(token);
    const response = axios.get("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const arr = [];
    const val = response.then((data) =>
      data.data.items.map((i) => arr.push(i))
    );

    store.storeData(arr);
    console.log("tran", store.trackList);
  }
};
</script>

<template>
  <div class="flex-row">
    <div class="heading-cont">
      <h1 class="ml3">Vookie</h1>
      <p>Your personal bookshelf on the web ...</p>
      <router-link to="/Journal">
        <div @click="connectHandler" class="relative connect-cont">
          <h2 class="ab btn-connect">Explore</h2>
          <svg
            viewBox="0 0 185 109"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.76285 75.3647C-7.77444 47.2916 20.1208 38.7694 46.5 24.442C61.5413 16.2726 111.598 16.0408 126.5 24.442C154.457 40.2031 182.117 50.5447 169.464 80.0369C156.945 109.217 115.092 77.2702 83.3346 76.3802C53.6516 75.5482 13.1871 103.137 2.76285 75.3647Z"
              fill="#D6925E"
            />

            <path
              class="path"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M115 7C144.662 -8.53409 170.843 14.7636 180.937 33.6857C192.221 54.8395 159.221 63.0328 134 77C105.048 93.0332 86.5095 116.946 55.1483 103.345C15.2696 86.0505 -5.09202 57.4247 13 27C29.3932 -0.5679 44.6616 63.4659 115 7Z"
              stroke="#8F4811"
              stroke-width="2"
            />
          </svg>
        </div>
      </router-link>
    </div>

    <div class="blob-cont">
      <svg
        ref="imgRef"
        viewBox="0 0 655 541"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M249.045 121.682C317.545 118.521 364.482 173.205 416.037 211.386C473.519 253.955 557.249 287.787 560.39 352.258C563.565 417.425 524.166 490.177 458.814 525.029C405.515 553.453 311.985 515.067 249.045 518.298C178.152 521.938 99.2355 562.941 44.239 525.029C-11.5612 486.563 -2.8965 412.325 8.17888 352.258C17.5132 301.633 59.2211 264.437 99.3747 225.999C143.854 183.419 181.869 124.782 249.045 121.682Z"
          fill="#C5DF94"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M298.141 431.062C245.658 406.755 168.228 351.194 145.38 302.177C119.905 247.523 111.035 182.522 135.156 132.46C159.538 81.8566 240.343 69.8754 303.484 68.948C354.98 68.1917 381.377 137.164 429.735 159.25C484.202 184.126 583.92 171.122 609.45 221.278C635.354 272.167 606.384 332.463 573.448 373.648C545.69 408.359 500.225 425.989 454.441 439.455C403.724 454.372 349.609 454.898 298.141 431.062Z"
          stroke="#90A06E"
          stroke-width="7"
        />
      </svg>

      <img
        ref="blobRef"
        class="music-img"
        src="../assets/output-onlinepngtools.png"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap");
@import "./app.scss";
.music-img {
  position: absolute;

  height: 40rem;
  right: 1%;
}
.relative {
  position: relative;
}
.ab {
  position: absolute;
  bottom: 50%;
}
</style>
