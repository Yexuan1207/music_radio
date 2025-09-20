<template>
  <div
    class="scroller"
    ref="scrollerRef"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "Scroller",
});
import { nextTick, onMounted, ref, watch } from "vue";
import BScroll from "@better-scroll/core";
import ScrollBar from "@better-scroll/scroll-bar";
import MouseWheel from "@better-scroll/mouse-wheel";

BScroll.use(ScrollBar);
BScroll.use(MouseWheel);

//定义
const scroller = ref<BScroll | null>(null);
const scrollerRef = ref<HTMLDivElement | null>(null);
const props = withDefaults(
  defineProps<{
    data: any[];
    option?: Function;
  }>(),
  {
    data: () => [],
    option: () => ({}),
  }
);
const emit = defineEmits(["init"]);
const defaultOptions = {
  mouseWheel: true,
  scrollY: true,
  scrollbar: true,
  probeType: 3,
};

//方法
//初始化滚屏
const initScroler = async () => {
  await nextTick();
  if (!scroller.value && scrollerRef.value) {
    scroller.value = new BScroll(scrollerRef.value, {
      ...defaultOptions,
      ...props.option,
    });
    emit("init", scroller.value);
  } else {
    scroller.value?.refresh();
  }
};
const getScroller = () => {
  return scroller.value;
};
const refresh = () => {
  scroller.value?.refresh();
};

//暴露方法
defineExpose({
  getScroller,
  refresh
});

//触发
watch(
  () => props.data,
  () => {
    initScroler();
  },
  {
    immediate: true,
    deep: true,
  }
);
onMounted(() => {
  initScroler();
});
</script>
<style lang="scss" scoped>
.scroller {
  position: relative;
  overflow: hidden;
  height: 100%;

  .bscroll-indicator {
    border: none !important;
    background: var(--scrollbar-color) !important;
  }
}
</style>
