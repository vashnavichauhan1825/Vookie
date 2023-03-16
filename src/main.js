import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMK0nAturvTNtcvE2_bdE-ISd8pKTBQpM",
  authDomain: "vookie-fa055.firebaseapp.com",
  projectId: "vookie-fa055",
  storageBucket: "vookie-fa055.appspot.com",
  messagingSenderId: "748630602838",
  appId: "1:748630602838:web:f56d7bff32778f142fb7f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
createApp(App).use(createPinia()).use(router).mount("#app");
export { db };
