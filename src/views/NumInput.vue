<template>
  <div>
    <background />
    <div class="checkin">
      <h1 class="title">
        <span v-if="type === 'live'">请输入直播间号</span>
        <span v-else-if="type === 'video'">请输入AV号</span>
        <span v-else-if="type === 'rank'">请输入分区号</span>
        <span v-else>请输入编号</span>
      </h1>
      <input
        :key="type"
        v-model.number="id"
        :placeholder="`请输入数字`"
        type="text"
        class="input"
        autofocus="true"
        @keyup.enter="submit(id)"
      />
    </div>
  </div>
</template>

<script>
import background from "@/components/Background.vue";
export default {
  components: { background },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    type: String
  },
  data: function() {
    let type = this.type;
    let text =
      type === "live"
        ? "房间"
        : type === "video"
        ? "AV"
        : type === "rank"
        ? "分区"
        : "编";
    return {
      text,
      submit: function(id) {
        if (isNaN(id)) {
          this.$noty.error("请检查你的输入<br/>房间号应为数字");
        } else {
          this.$router.push({ path: `/${this.type}/${id}` });
        }
      }
    };
  }
};
</script>

<style scoped>
.checkin {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.title {
  font-size: 6rem;
}
.input {
  color: white;
  border: 0;
  border-bottom: rgb(250, 225, 225) 1.5px solid;
  margin-top: 20px;
  width: 20vw;
  font-size: 1.3rem;
  background: #0000;
}
</style>
