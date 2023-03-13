<script setup>
import { onMounted, ref } from "vue";
import { VtunifyStore } from "../store";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "vue-router";
const store = VtunifyStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const register = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("successfully registered !");
      console.log(auth.currentUser);
      router.push("/");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
const loggedIn = ref(false);

const signOutHandler = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((res) => {
      console.log(res.user);
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
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
</script>
<template>
  <!-- <button @click="signOutHandler" v-if="loggedIn">Sign out</button>
  <h1>Create an Account</h1>
  <p><input type="email" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="password" v-model="password" /></p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="signInWithGoogle">Sign In With Google</button></p>
  <router-link to="/wow"><button>click me</button></router-link> -->
  <div class="main-wrapper">
    <!-- <div class="signup-img">
      <img src="../assets/Group.png" />
      <p>
        Start typing, no matter what. The water does not flow until the faucet
        is turned on...
      </p>
    </div> -->

    <div class="signup-box">
      <h1>Create your Account</h1>
      <p>
        Already Logged In ?
        <router-link to="/Signup"><u>Sign In</u></router-link>
      </p>
      <div class="form">
        <div>
          <label> Email : </label>
          <input
            type="email"
            placeholder="Type Email here..."
            v-model="email"
          />
        </div>
        <div>
          <label>Password :</label>
          <input
            type="password"
            placeholder="Type Password here..."
            v-model="password"
          />
        </div>
        <button @click="register">Sign Up</button>
        <button class="google-btn" @click="signInWithGoogle">
          sign Up With Google <img src="../assets/google.png" />
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "./login.scss";
</style>
