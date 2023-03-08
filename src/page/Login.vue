<script setup>
import { onMounted, ref } from "vue";
import { VtunifyStore } from "../store";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const store = VtunifyStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const errMsg = ref();
const register = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("successfully registered sign in!");
      console.log(auth.currentUser);
      router.push("/");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
      }
    });
};
const signInWithGoogle = () => {};
onMounted(() => {});
</script>
<template>
  <h1>Create an Account</h1>
  <p><input type="email" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="password" v-model="password" /></p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="signInWithGoogle">Sign In With Google</button></p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <button @click="store.flagHandler">click me</button>
</template>
<style></style>
