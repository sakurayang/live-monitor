<template>
  <div>
    <background />
    <div class="checkin">
      <h1 class="title">
        <!--eslint-disable-next-line prettier/prettier-->
        请输入<span :key="type">{{ text }}</span>号
      </h1>
      <input
        :key="type"
        v-model.number="id"
        :placeholder="`请输入${text}号`"
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
    let type = this.$attrs.type;
    let text =
      type === "live"
        ? "房间"
        : type === "video"
        ? "AV"
        : type === "rank"
        ? "分区"
        : "编";
    return {
      type,
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
