<template>
  <div class="search-detail">
    <div
      class="header"
      ref="headerRef"
    >
      <span class="keywords">{{ props.keyword }}</span>
      <span class="found">共搜索到{{ count }}条结果</span>
    </div>
    <div class="tabs-wrap">
      <Tabs
        :tabs="tabs"
        itemClass="search-tab-item"
      />
    </div>
    <el-empty
      class="empty"
      v-if="showEmpty"
      description="暂无数据"
    />
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, provide, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { ElEmpty } from "element-plus";
import { useGlobalStore } from "@/store/global";

const globalStore = useGlobalStore();

const tabs = computed(() => [
  {
    title: "歌曲",
    key: "songs",
    to: `/search/${props.keyword}/songs`,
  },
  {
    title: "歌单",
    key: "playlists",
    to: `/search/${props.keyword}/playlists`,
  },
  {
    title: "MV",
    key: "mvs",
    to: `/search/${props.keyword}/mvs`,
  },
]);
//路由传参
const props = defineProps<{
  keyword: string;
}>();

const count = ref(0);
const headerRef = ref<HTMLDivElement>();
const showEmpty = computed(() => {
  return !globalStore.axiosLoading && count.value === 0;
});

//暴露方法
const onUpdateCount = (num: number) => {
  count.value = num;
};
provide("searchRoot", { onUpdateCount, props, headerRef });
</script>
<style lang="scss" scoped>
.search-detail {
  .header {
    padding: 20px 32px;

    .keywords {
      display: inline-block;
      margin-right: 4px;
      font-size: $font-size-title-lg;
      font-weight: $font-weight-bold;
    }

    .found {
      font-size: $font-size-sm;
      color: var(--font-color-grey-shallow);
      letter-spacing: 2px;
    }
  }

  .tabs-wrap {
    padding: 0 28px;
    border-bottom: 1px solid var(--border);

    :deep(.search-tab-item) {
      font-size: $font-size;
    }
  }
}
</style>
