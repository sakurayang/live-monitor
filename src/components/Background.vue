<template>
  <img :src="url" />
</template>

<script>
export default {
  name: "Background",
  props: {
    // eslint-disable-next-line vue/require-default-prop
    url: String
  }
};
</script>

<style scoped>
img {
  position: fixed;
  z-index: -1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  filter: grayscale(60%) blur(3px) hue-rotate(180deg);
}
</style>
