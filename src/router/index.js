import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index.vue";
import Input from "@/views/NumInput.vue";
import idConver from "../utils/idConver";
import Setting from "@/views/setting.vue";

Vue.use(VueRouter);

const building = { template: "<div>Building....</div>" };

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
    },
    meta: {
      title: "直播 - 数据监控室"
    }
  },
  {
    path: "/live/",
    name: "live",
    props: { type: "live" },
    component: Input,
    meta: {
      title: "直播 - 数据监控室"
    }
  }
];

const video_route = [
  {
    path: "/video/:id",
    props: route => {
      let id = String(route.params.id);
      id = isNaN(id) || id.startsWith("BV") ? idConver.bv2av(id) : id;
      return {
        id
      };
    },
    component() {
      return import(/* webpackChunkName: "video" */ "@/views/video.vue");
    },
    meta: {
      title: "视频 - 数据监控室"
    }
  },
  {
    path: "/video/",
    name: "video",
    props: { type: "video" },
    component: Input,
    meta: {
      title: "视频 - 数据监控室"
    }
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
    component: building,
    meta: {
      title: "排行 - 数据监控室"
    }
  },
  {
    path: "/rank/",
    name: "rank",
    props: { type: "rank" },
    component: building,
    meta: {
      title: "排行 - 数据监控室"
    }
  }
];

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: {
      title: "主页 - 数据监控室"
    }
    //	alias: "/index.html"
  },
  {
    path: "/index.html",
    component: Index,
    meta: {
      title: "主页 - 数据监控室"
    }
  },
  {
    path: "/setting",
    name: "Setting",
    component: Setting,
    meta: {
      title: "设置 - 数据监控室"
    }
  },
  ...live_route,
  ...video_route,
  ...rank_route /*,
  {
	path: "/*",
	redirect: "/"
  }*/
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
