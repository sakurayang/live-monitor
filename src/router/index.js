import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index.vue";
import Input from "@/views/NumInput.vue";
Vue.use(VueRouter);

const live_route = [
  {
    path: "/live/:id",
    props: route => {
      return {
        id: Number(route.params.id)
      };
    },
    component() {
      return import(/* webpackChunkName: "live" */ "@/views/live.vue");
    }
  },
  {
    path: "/live/",
    props: { type: "live" },
    component: Input
  }
];

const video_route = [
  {
    path: "/video/:id",
    props: route => {
      return {
        id: Number(route.params.id)
      };
    },
    component() {
      return import(/* webpackChunkName: "video" */ "@/views/live.vue");
    }
  },
  {
    path: "/video/",
    props: { type: "video" },
    component: Input
  }
];

const rank_route = [
  {
    path: "/rank/:id",
    props: route => {
      return {
        id: Number(route.params.id)
      };
    },
    component() {
      return import(/* webpackChunkName: "rank" */ "@/views/live.vue");
    }
  },
  {
    path: "/rank/",
    props: { type: "rank" },
    component: Input
  }
];

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index
  },
  ...live_route,
  ...video_route,
  ...rank_route
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
