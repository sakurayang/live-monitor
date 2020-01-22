import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index
  },
  {
    path: "/live/:id",
    name: "Live",
    props: route => {
      return {
        id: Number(route.params.id)
      };
    },
    component() {
      return import(/* webpackChunkName: "live" */ "@/views/live/live.vue");
    }
  },
  {
    path: "/live/",
    name: "LiveIndex",
    component() {
      return import(/* webpackChunkName: "live" */ "@/views/live/index.vue");
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
