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
import { toast } from "vue3-toastify";
const store = VtunifyStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const auth = getAuth();
const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      store.toastSuccess("Succesfully Registered !");
      router.push("/Signup");
    })
    .catch((error) => {
      if (error.code === "auth/invalid-email") {
        store.toastError("Invalid Email !");
      } else if (error.code === "auth/user-not-found") {
        store.toastError("User not found !");
      } else if (error.code === "auth/missing-email") {
        store.toastError("Missing email !");
      } else if (error.code === "auth/weak-password") {
        store.toastError("Password should be greater than 6 characters !");
      } else {
        store.toastError(error.message);
      }
    });
};

const loggedIn = ref(false);

const signOutHandler = () => {
  signOut(auth).then(() => {
    store.toastSuccess("Logged Out !");
    router.push("/");
  });
};
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((res) => {
      store.toastSuccess("Succesfully Logged In !");
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loggedIn.value = true;
      const uid = user.uid;
      store.setUid(uid);
    } else {
      loggedIn.value = false;
    }
  });
});
</script>
<template>
  <div class="main-wrapper">
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
        <button @click="signInWithGoogle" class="google-btn">
          sign Up With Google <img src="../assets/google.png" />
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "./login.scss";
</style>
