<script setup>
import Landing from "./page/Landing.vue";
import SignUp from "./page/SignUp.vue";
import { onMounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { VtunifyStore } from "./store";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const store = VtunifyStore();
// const { flag } = storeToRefs(store);g
const loggedIn = ref(false);
let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loggedIn.value = true;
    } else {
      loggedIn.value = false;
    }
  });
});
const upHere = reactive({
  home: false,
  login: false,
  journal: false,
  signout: false,
});
const signOutHandler = () => {
  signOut(auth).then(() => {
    store.toastSuccess("Logged Out !");
    router.push("/");
  });
  localStorage.removeItem("uid");
};
</script>
<template>
  <nav>
    <router-link to="/">
      <p @mouseover="upHere.home = true" @mouseleave="upHere.home = false">
        Home
        <svg
          v-show="upHere.home"
          viewBox="0 0 119 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="path-nav"
            d="M0 2C90.5418 2 115.059 9.68856 116 13.5328H12.5006L105.381 22"
            stroke="#D6925E"
            stroke-width="3"
          />
        </svg>
      </p>
    </router-link>
    <router-link to="/Journal">
      <p
        @mouseover="upHere.journal = true"
        @mouseleave="upHere.journal = false"
      >
        Journal
        <svg
          v-show="upHere.journal"
          viewBox="0 0 119 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="path-nav"
            d="M0 2C90.5418 2 115.059 9.68856 116 13.5328H12.5006L105.381 22"
            stroke="#D6925E"
            stroke-width="3"
          />
        </svg>
      </p>
    </router-link>
    <router-link v-show="!loggedIn" to="/Login">
      <p @mouseover="upHere.login = true" @mouseleave="upHere.login = false">
        Login
        <svg
          v-show="upHere.login"
          viewBox="0 0 119 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="path-nav"
            d="M0 2C90.5418 2 115.059 9.68856 116 13.5328H12.5006L105.381 22"
            stroke="#D6925E"
            stroke-width="3"
          />
        </svg></p
    ></router-link>
    <p
      @click="signOutHandler"
      v-if="loggedIn"
      @mouseover="upHere.signout = true"
      @mouseleave="upHere.signout = false"
    >
      Sign Out

      <svg
        class="signOut-svg"
        v-show="upHere.signout"
        viewBox="0 0 104 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="path-nav"
          d="M2.22266 2.01593C35.6731 2.01593 68.7882 4.2048 102.223 4.2048"
          stroke="#D6925E"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
    </p>
  </nav>
  <div class="home-wrapper">
    <router-view />
  </div>
</template>
<style lang="scss">
@import "./app.scss";
</style>
