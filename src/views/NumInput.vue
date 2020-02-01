<template>
  <div>
    <background />
    <div class="checkin">
      <h1 class="title">
        请输入{{
          type === "live"
            ? "房间号"
            : type === "video"
            ? "AV号"
            : type === "rank"
            ? "分区号"
            : "编号"
        }}
      </h1>
      <input
        v-model.number="id"
        placeholder="请输入房间号"
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
  data: function() {
    return {
      type: this.$attrs.type,
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
