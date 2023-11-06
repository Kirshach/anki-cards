import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../pages/home-page.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../pages/register-page"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../pages/login-page"),
    },
  ],
});

export default router;
