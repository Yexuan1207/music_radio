<template>
  <div>playlists</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const PAGE_SIZE = 50;
const activeTabIndex = ref(0);
const playlist = ref([]);
const currentPage = ref(0);
const total = ref(0);
//顶部歌单数据
const topPlaylist = ref([]);
const tabs = ref([
  "全部",
  "欧美",
  "华语",
  "流行",
  "说唱",
  "摇滚",
  "民谣",
  "电子",
  "轻音乐",
  "影视原声",
  "ACG",
  "怀旧",
  "治愈",
  "旅行",
]);
</script>
<style lang="scss" scoped></style>
