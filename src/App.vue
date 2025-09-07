<template>
  <div id="app">
    <Layout />
    <MiniPlayer />
  </div>
</template>
<script setup lang="ts">
import Layout from "./layout/index.vue";
import MiniPlayer from "./components/miniPlayer/index.vue";
</script>
<style lang="scss" scoped>
#app {
  height: 100vh; //height: 100% 父元素没有明确的高度
  background-color: var(--body-bgcolor);
  font-size: $font-size;
}
</style>
