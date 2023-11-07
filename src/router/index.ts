import { cookie } from "@/shared/cookies";
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
      path: "/cards/add",
      name: "add-cards",
      component: () => import("../pages/add-cards-page.vue"),
      meta: {
        protected: true,
      },
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

router.beforeEach((to, _from, next) => {
  if (to.meta.protected && cookie.get("signed_in") !== "True") {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
