import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../page/Landing.vue") },
    { path: "/Signup", component: () => import("../page/SignUp.vue") },
    { path: "/Login", component: () => import("../page/Login.vue") },
    {
      path: "/Journal",
      component: () => import("../page/Journal.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
const getCurrentUser = () => {
  return new Promise((res, rej) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        res(user);
      },
      rej
    );
  });
};
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("you don't have access !");
      next("/");
    }
  } else {
    next();
  }
});
export default router;
