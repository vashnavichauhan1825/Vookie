<script setup>
import { ref, onMounted } from "vue";
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
  <!-- <h1>Create an Account</h1>
  <p><input type="email" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="password" v-model="password" /></p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="signInWithGoogle">Sign In With Google</button></p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <button @click="store.flagHandler">click me</button> -->
  <div class="main-wrapper">
    <div class="signup-box">
      <h1>Welcome Back !</h1>
      <p>
        Don't have an account?
        <router-link to="/Login"><u>Sign up</u></router-link>
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
        <p v-if="errMsg">{{ errMsg }}</p>
        <button @click="register">sign In</button>
        <button class="google-btn">
          Login as Guest <img src="../assets/google.png" />
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "./login.scss";
</style>
