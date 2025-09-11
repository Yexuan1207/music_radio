<template>
  <div
    class="video-player"
    ref="playerRef"
  ></div>
</template>
<script setup lang="ts">
defineOptions({
  name: "VideoPlayer",
});
import { toRem } from "@/utils";
import { onMounted, ref, watch } from "vue";
import Player from "xgplayer";
const props = defineProps<{
  url: string;
  poster: string;
}>();

const playerRef = ref<HTMLElement>();
let player: Player | null = null;
const initPlayer = () => {
  if (!props.url) return;
  player = new Player({
    el: playerRef.value,
    url: props.url, // 视频地址
    poster: props.poster, // 视频封面
    videoInit: true, // 初始化显示视频首帧
    preload: "auto", // 预加载视频元数据
    lang: "zh-CN",
    width: "100%",
  });
};
const transferRem = () => {
  if (!player) return;
  player.on("ready", () => {
    if (!playerRef.value) return;

    const videoWrapper = playerRef.value;
    const height = videoWrapper.style.height;
    const remHeight = toRem(Number(height.replace("px", "")));
    videoWrapper.style.height = remHeight;
  });
};
onMounted(() => {
  initPlayer();
  transferRem();
});
watch(
  () => props.url,
  (url, oldUrl) => {
    if (url !== oldUrl) {
      if (!player) {
        initPlayer();
      } else {
        player.src = url;
        player.reload();
      }
    }
  }
);
</script>
<style lang="scss" scoped>
.xgplayer-error {
  display: none;
}
</style>
