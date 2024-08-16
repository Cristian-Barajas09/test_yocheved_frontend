import { isAuthenticated } from "@/shared/services/auth.service";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/shared/views/HomeView.vue"),
      meta: { title: "Home" },
    },
    {
      path: "/students",
      name: "students",
      component: () => import("@/shared/views/StudentsView.vue"),
      meta: { title: "Students" },
    },
    {
      path: "/students/:id",
      name: "student",
      component: () => import("@/shared/views/StudentView.vue"),
      meta: { title: "Student" },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/shared/views/LoginView.vue"),
      meta: { title: "Login" },
    },
    {
      path: "/sessions",
      name: "sessions",
      component: () => import("@/shared/views/SessionsView.vue"),
    },
    {
      path: "/sessions/:id",
      name: "session",
      component: () => import("@/shared/views/SessionView.vue"),
    },
    {
      path: "/templates",
      name: "templates",
      component: () => import("@/shared/views/TemplatesView.vue"),
    },
    {
      path: "/templates/:id",
      name: "template",
      component: () => import("@/shared/views/TemplateView.vue"),
    },
    {
      path: "*",
      name: "not-found",
      component: () => import("@/shared/views/NotFoundView.vue"),
      meta: { title: "Not Found" },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const title = to.meta?.title;
  const auth = await isAuthenticated();

  if (title) {
    document.title = title;
  }

  console.log(!auth && to.name !== "home" && to.name !== "login");

  if (!auth && to.name !== "home" && to.name !== "login") {
    next({ name: "login" });
  }

  if (auth && to.name === "login") {
    next({ name: "home" });
  }

  next();
});

export default router;
