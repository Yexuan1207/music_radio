<template>
  <div
    class="loading"
    element-loading-background="transparent"
    element-loading-text="加载中"
    v-loading="props.loading"
    v-show="props.loading"
  ></div>
</template>
<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "PartLoading",
});

const props = defineProps<{
  loading: boolean;
}>();
</script>
<style lang="scss" scoped>
.loading {
  height: 200px;
}
</style>
