<template>
  <div
    class="progress-bar"
    ref="progressBarRef"
    @click="progressClick"
  >
    <div class="bar-inner">
      <!-- 当前进度 -->
      <div
        class="progress"
        ref="progressRef"
      ></div>
      <!-- 进度条按钮 -->
      <div
        class="progress-btn-wrapper"
        ref="progressBtnRef"
      >
        <div
          :class="{ show: props.alawaysShowBtn }"
          class="progress-btn"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { toCurrentRem } from "@/utils";
defineOptions({
  name: "ProgressBar",
});
const progressBarRef = ref<HTMLDivElement>();
const progressRef = ref<HTMLDivElement>();
const progressBtnRef = ref<HTMLDivElement>();
const props = withDefaults(
  defineProps<{
    percent: number;
    alawaysShowBtn?: boolean;
    disabled?: boolean;
  }>(),
  {
    percent: 0,
    alawaysShowBtn: false,
    disabled: false,
  }
);
const emit = defineEmits(["percentChange"]);
//点击进度条，触发偏移
const progressClick = (e: MouseEvent) => {
  if (props.disabled) return;
  const rect = progressBarRef.value?.getBoundingClientRect();
  // max确保最外层!=0
  const offsetWidth = Math.max(
    0,
    Math.min(e.pageX - rect!.left, progressBarRef.value!.clientWidth)
  );
  _offset(offsetWidth);
  _triggerPercent();
};
const _triggerPercent = () => {
  emit("percentChange", _getPercent());
};
//偏移进度条
const _offset = (offsetWidth: number) => {
  const offsetRem = toCurrentRem(offsetWidth);
  if (progressRef.value) progressRef.value.style.width = `${offsetRem}`;
  if (progressBtnRef.value)
    progressBtnRef.value.style.transform = `translateX(${offsetRem})`;
};
//返回进度%
const _getPercent = () => {
  const barWidth = progressBarRef.value!.clientWidth;
  return progressRef.value!.clientWidth / barWidth;
};

const setProgressOffset = (percent: number) => {
  if (props.percent >= 0) {
    const barWidth = progressBarRef.value!.clientWidth;
    const offsetWidth = barWidth * percent;
    _offset(offsetWidth);
  }
};
onMounted(() => {
  setProgressOffset(props.percent);
});
//父组件传值变化如通过静音按钮改变percent，实时更新进度条
watch(
  () => props.percent,
  (newVal) => {
    setProgressOffset(newVal);
  }
);
</script>
<style lang="scss" scoped>
.progress-bar {
  height: 30px;
  cursor: pointer;
  .bar-inner {
    position: relative;
    top: 14px;
    height: 2px;
    background: var(--progress-bgcolor);
    .progress {
      position: absolute;
      height: 100%;
      background: $theme-color;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -15px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        display: none;
        position: relative;
        top: 8px;
        left: 8px;
        box-sizing: border-box;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: $theme-color;
        &.show {
          display: block;
        }
      }
    }
  }
  &:hover {
    .progress-btn {
      display: block !important;
    }
  }
}
</style>
