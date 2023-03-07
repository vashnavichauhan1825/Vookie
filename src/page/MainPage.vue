<script setup>
import { onMounted } from "vue";
import { VtunifyStore } from "../store";
const store = VtunifyStore();
onMounted(() => {
  const clientId = "b573fd6c524f4d2eb7eb61919db46b10";
  const redirectUrl = "http://localhost:5173/";
  const apiUrl = "https://accounts.spotify.com/authorize";
  const scope = [
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-playback-position",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
    "user-top-read",
    "user-library-modify",
    "user-library-read",
    "user-read-recently-played",
  ];
  window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
    " "
  )}&response_type=token&show_dialog=true`;
  boolRef.value = !boolRef.value;
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
});
</script>
<template>
  <h1>new page</h1>
  <button @click="store.flagHandler">click me</button>
</template>
<style></style>
