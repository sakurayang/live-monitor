<template>
  <slide left>
    <router-link v-for="item in nav" :key="item.id" :to="item.path">
      <div class="sidebar_item">
        <font-awesome-icon class="icon" :icon="['fas', item.icon]"></font-awesome-icon>
        {{ item.text }}
      </div>
    </router-link>
  </slide>
</template>
<script>
import { Slide } from "vue-burger-menu";
export default {
  name: "Sidebar",
  components: { Slide },
  data: function() {
    return {
      nav: [
        {
          path: "/",
          text: "主页",
          icon: "home",
          id: 0
        },
        {
          path: "/live",
          text: "直播",
          icon: "broadcast-tower",
          id: 1
        },
        {
          path: "/video",
          text: "视频",
          icon: "tv",
          id: 2
        },
        {
          path: "/rank",
          text: "排行",
          icon: "list-ol",
          id: 3
        }
      ]
    };
  }
};
</script>
<style scoped>
.sidebar_item {
  cursor: pointer;
  color: white;
}
.sidebar_item:hover {
  text-shadow: 0px 0px 5px #ea7474;
}
.sidebar_item:hover > .icon {
  color: #ea7474;
}
a,
a:visited {
  color: white;
  text-decoration: none;
}
.router-link-exact-active {
  color: #d44a68 !important;
}
.bm-burger-button {
  z-index: 999 !important;
}
</style>
