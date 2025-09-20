<template>
  <div id="app">
    <Layout />
    <Player />
    <MiniPlayer />
    <Playlist />
  </div>
</template>
<script setup lang="ts">
import Layout from "./layout/index.vue";
import MiniPlayer from "./components/miniPlayer/index.vue";
import Player from "./components/player/index.vue";
import Playlist from "./components/playlist/index.vue";
</script>
<style lang="scss" scoped>
#app {
  height: 100vh; //height: 100% 父元素没有明确的高度
  background-color: var(--body-bgcolor);
  font-size: $font-size;
  margin: 0 auto;
}
</style>
