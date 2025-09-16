<template>
  <div class="volume">
    <Icon
      :size="20"
      :type="getIconType"
      class="icon"
      @click="toggleSilence"
    />
    <div class="progress-wrap">
      <ProgressBar
        :percent="volumePercent"
        :alawaysShowBtn="true"
        @percentChange="onProgressChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
const props = withDefaults(
  defineProps<{
    volume: number;
  }>(),
  {
    volume: 1,
  }
);

const volumePercent = ref(props.volume);
const lastVolume = ref(props.volume);
const eimt = defineEmits(["volumeChange"]);
const getIconType = computed(() => {
  return isSilence.value ? "lucide:volume-x" : "lucide:volume-2";
});

const onProgressChange = (percent: number) => {
  if (percent < 0.05) {
    percent = 0;
  }
  volumePercent.value = percent;
  eimt("volumeChange", percent);
};
const isSilence = computed({
  get() {
    return volumePercent.value === 0;
  },
  set(newValue) {
    //如果为静音则为true 否则为false返回上次静音前的音量
    const target = newValue ? 0 : lastVolume.value;
    if (newValue) {
      //记录当前音量
      lastVolume.value = volumePercent.value;
    }
    volumePercent.value = target;
    onProgressChange(target);
  },
});

const toggleSilence = () => {
  isSilence.value = !isSilence.value;
};
</script>
<style lang="scss" scoped>
.volume {
  display: flex;
  align-items: center;
  width: 150px;

  .icon {
    color: var(--font-color);
    cursor: pointer;
    margin-right: 8px;
  }

  .progress-wrap {
    flex: 1;
  }
}
</style>
