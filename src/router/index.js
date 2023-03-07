import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../page/Landing.vue") },
    { path: "/Main", component: () => import("../page/MainPage.vue") },
  ],
});

export default router;
