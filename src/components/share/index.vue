<template>
  <Icon
    class="mode-item"
    :size="20"
    @click="onSharePrompClick"
    type="solar:square-share-line-linear"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { confirm } from "@/base/confirm";
import Icon from "@/base/icon.vue";
import { useClipboard } from "@vueuse/core";
const shareIconRef = ref<InstanceType<typeof Icon | null>>(null);
const props = defineProps<{
  shareUrl: string;
}>();

const { copy } = useClipboard({ source: props.shareUrl });
const onSharePrompClick = () => {
  copy();
  confirm("分享链接已经复制到剪贴板，快去和小伙伴一起听歌吧！", () => {});
};
</script>
<style lang="scss" scoped></style>
