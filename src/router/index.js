import Vue from "vue";
import Route from "vue-route";
import Index from "@/views/Index.vue";

Vue.use(Route);

const routes = [
  {
    path: "/",
    component: Index
  },
  {
    path: "/:id",
    component: () => import("@/views/chart.vue"),
    props: true
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new Route({ mode: "history", routes });

// router.beforeEach();

export default router;
