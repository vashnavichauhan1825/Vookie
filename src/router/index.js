import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../page/Landing.vue") },
    {
      path: "/Signup",
      component: () => import("../page/SignUp.vue"),
      meta: {
        requiresVisitor: true,
      },
    },
    {
      path: "/Login",
      component: () => import("../page/Login.vue"),
      meta: {
        requiresVisitor: true,
      },
    },
    {
      path: "/Journal",
      component: () => import("../page/Journal.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/Journal/:id",
      component: () =>
        import("../components/book/individualbook/IndividualBook.vue"),
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
      next("/SignUp");
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (await getCurrentUser()) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
