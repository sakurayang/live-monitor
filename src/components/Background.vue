<template>
  <div>
    <div class="background" />
    <div class="copyright">
      <a href="https://www.pixiv.net/artworks/68711812">pixiv: 68711812</a>
      <br />mito by
      <a href="https://www.pixiv.net/users/12845810">焦茶 ◆3日目A68a</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "Background"
};
</script>
<style scoped>
.background {
  background-image: url("../assets/bg.webp");
  position: absolute;
  min-height: 720px;
  min-width: 1280px;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background-size: 80% auto;
  background-repeat: no-repeat;
  background-position: center 15%;
  background-color: #e54d6a;
  filter: brightness(55%);
}
.copyright {
  position: absolute;
  color: white;
  left: 10px;
  bottom: 10px;
  background: #0006;
  padding: 3px;
  border-radius: 5px;
  filter: opacity(0.5);
}
.copyright:hover {
  filter: opacity(1);
}
.copyright > a {
  color: white;
  text-decoration: none;
}
</style>
