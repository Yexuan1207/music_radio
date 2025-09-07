<template>
  <div
    class="wrapStyle"
    :style="wrapStyle"
  >
    <Icon
      class="play-icon"
      type="material-symbols:play-circle-outline-rounded"
      :size="size"
      color="theme"
    ></Icon>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
defineOptions({
  name: "PlayIcon",
});
const props = withDefaults(
  defineProps<{
    size?: number;
  }>(),
  {
    size: 24,
  }
);

const wrapStyle = computed(() => {
  return { width: `${props.size}px`, height: `${props.size}px` };
});
// const iconSize = computed(() => {
//   const iconSize = props.size * 0.6;
//   return iconSize;
// });
</script>
<style lang="scss" scoped>
.play-icon-wrap {
  @include flex-center();
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);

  .play-icon {
    color: $theme-color;
  }
}
</style>
