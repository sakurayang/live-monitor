<template>
  <slide left>
    <router-link
      v-for="item in nav"
      :key="item.id"
      :to="{ name: item.name, params: { type: item.type } }"
    >
      <div class="sidebar_item">
        <font-awesome-icon
          class="icon"
          :icon="['fas', item.icon]"
        ></font-awesome-icon>
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
          name: "Index",
          text: "主页",
          type: "Index",
          icon: "home",
          id: 0
        },
        {
          name: "live",
          text: "直播",
          type: "live",
          icon: "broadcast-tower",
          id: 1
        },
        {
          name: "video",
          text: "视频",
          type: "video",
          icon: "tv",
          id: 2
        },
        {
          name: "rank",
          text: "排行",
          type: "rank",
          icon: "list-ol",
          id: 3
        }
      ]
    };
  }
};
</script>
<style scoped>
.bm-menu {
  word-wrap: none !important;
  word-break: keep-all !important;
  overflow-wrap: none !important;
  overflow-x: hidden !important;
}
.sidebar_item {
  cursor: pointer;
  color: white;
  min-width: 72px;
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
