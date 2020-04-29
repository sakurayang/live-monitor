<template>
  <div>
    <background />
    <div class="panel">
      <div class="title">
        <div class="subtitle">Bili Monitor</div>
        数据监控室
      </div>
      <div
        v-for="item in feature"
        :key="item.id"
        class="feature"
        :class="item.class"
        @click="push(item.class)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
import background from "@/components/Background.vue";
export default {
  components: { background },
  data: function() {
    clearInterval(window.timer);
    const router = this.$router;
    function push(type) {
      if (type === "live") {
        router.push({ name: "live", params: { type: "live" } });
      } else if (type === "video") {
        router.push({ name: "video", params: { type: "video" } });
      } else if (type === "rank") {
        router.push({ name: "rank", params: { type: "rank" } });
      } else {
        router.go(0);
      }
    }
    return {
      push,
      feature: [
        {
          id: Math.floor(Math.random() * 10000),
          class: "live",
          text: "直播"
        },
        {
          id: Math.floor(Math.random() * 10000),
          class: "video",
          text: "视频"
        },
        {
          id: Math.floor(Math.random() * 10000),
          class: "rank",
          text: "排行"
        }
      ]
    };
  }
};
</script>

<style scoped>
body {
  min-width: 1280px;
  min-height: 720px;
  overflow: hidden;
}
.panel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(255, 255, 255);
  padding: 15px;
  display: grid;
  grid-template:
    "title title title" 2fr
    "live video rank" 1fr
    / auto auto auto;
}
.title {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0%);
  font-weight: bold;
  font-size: 5rem;
  text-align: center;
  grid-area: title;
}
.subtitle {
  font-size: 1rem;
  margin-bottom: -1rem;
}
.video {
  grid-area: video;
}
.live {
  grid-area: live;
}
.rank {
  grid-area: rank;
}
.feature {
  border-radius: 6px;
  margin: 5px;
  padding: 0;
  font-size: 2rem;
  text-anchor: middle;
  text-align: center;
  background-color: #fff7;
  cursor: pointer;
}
.feature:hover {
  box-shadow: 0px 0px 10px 1px #fffa;
  text-shadow: 0px 0px 5px #000a;
}
.feature,
.feature:hover {
  transition-duration: 300ms;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.46, 0.03, 0.52, 0.96);
}
</style>
