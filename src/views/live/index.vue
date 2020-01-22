<template>
  <div class="checkin">
    <h1 class="title">请输入房间号</h1>
    <input
      v-model.number="rid"
      placeholder="请输入房间号"
      type="text"
      class="input"
      autofocus="true"
      @keyup.enter="submit(rid)"
    />
  </div>
</template>

<script>
export default {
  methods: {
    submit: function(rid) {
      if (isNaN(rid)) {
        this.$noty.error("请检查你的输入<br/>房间号应为数字");
      } else {
        this.$router.push({ path: `/live/${rid}` });
      }
    }
  }
};
</script>

<style scoped>
.checkin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.title {
  font-size: 6rem;
}
.input {
  border: 0;
  border-bottom: black 1.5px solid;
  margin-top: 20px;
  width: 20vw;
  font-size: 1.3rem;
}
</style>
