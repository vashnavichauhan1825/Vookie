<script setup>
import { ref, onMounted } from "vue";
import { VtunifyStore } from "../store";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const store = VtunifyStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const auth = getAuth();
const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("successfully registered sign in!");
      console.log(auth.currentUser);
      store.toastSuccess("Logged In !");
      router.push("/");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          store.toastError("Invalid email !");
          break;
        case "auth/user-not-found":
          store.toastError("No account with that email was found !");
          break;
        case "auth/wrong-password":
          store.toastError("Incorrect password");
          break;
        default:
          store.toastError("Email or password was incorrect");
      }
    });
};
const guestLogin = () => {
  signInWithEmailAndPassword(getAuth(), "guestlogin@gmail.com", "guest1234")
    .then((data) => {
      console.log("successfully registered sign in!");
      console.log(auth.currentUser);
      store.toastSuccess("Logged In !");
      router.push("/");
    })
    .catch((error) => {
      store.toastError(error.code);
    });
};
</script>
<template>
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

        <button @click="register">sign In</button>
        <button @click="guestLogin" class="google-btn">
          Login as Guest <img src="../assets/google.png" />
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "./login.scss";
</style>
