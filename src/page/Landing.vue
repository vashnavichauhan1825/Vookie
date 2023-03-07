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
  //   const clientId = "b573fd6c524f4d2eb7eb61919db46b10";
  //   const redirectUrl = "http://localhost:5173/";
  //   const apiUrl = "https://accounts.spotify.com/authorize";
  //   const scope = [
  //     "user-read-email",
  //     "user-read-private",
  //     "user-read-playback-state",
  //     "user-modify-playback-state",
  //     "user-read-currently-playing",
  //     "user-read-playback-position",
  //     "playlist-read-private",
  //     "playlist-read-collaborative",
  //     "playlist-modify-private",
  //     "playlist-modify-public",
  //     "user-top-read",
  //     "user-library-modify",
  //     "user-library-read",
  //     "user-read-recently-played",
  //   ];
  //   window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
  //     " "
  //   )}&response_type=token&show_dialog=true`;
  //   boolRef.value = !boolRef.value;
  store.flagHandler();
};
const blobRef = ref("");
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
    translateX: -250,
    duration: 5000,
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
  <!-- <h1>happy coding</h1>
  <button >connect</button>
  <button @click="nextHandler">next</button>
  <img src="https://api.spotify.com/v1/tracks/5TfYJ88zB7uLQp4B4hjqbe" />
  <audio
    controls
    src="https://p.scdn.co/mp3-preview/04d5b7f77d478ce3037c89a2d70937315c0e199e?cid=b573fd6c524f4d2eb7eb61919db46b10"
  >
    <a href="/media/cc0-audio/t-rex-roar.mp3"> Download audio </a>
  </audio> -->
  <div class="flex-row">
    <div class="heading-cont">
      <h1 class="ml3">Vookie</h1>
      <p>Everyone has a chapter they don't read out loud...</p>
      <div @click="connectHandler" class="relative connect-cont">
        <h2 class="ab btn-connect">connect</h2>
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
    </div>

    <div class="blob-cont">
      <img
        class="full-sx"
        src="../assets/vecteezy_organic-blob-shapes-hand-drawn-illustration_9668657_364.png"
      />
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

  height: 94vh;
  right: 1%;

  bottom: 0%;
}
.relative {
  position: relative;
}
.ab {
  position: absolute;
  bottom: 50%;
}
</style>
