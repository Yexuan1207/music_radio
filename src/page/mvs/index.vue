<template>
  <div
    class="mvs"
    ref="pageRef"
  >
    <div class="tabs-wrap">
      <span class="tabs-type">地区：</span>
      <Tabs
        :tabs="areaTabs"
        class="tabs"
        type="split"
        v-model:active="activeAreaTabIndex"
      />
    </div>
    <div class="tabs-wrap">
      <span class="tabs-type">类型：</span>
      <Tabs
        :tabs="typeTabs"
        class="tabs"
        type="split"
        v-model:active="activeTypeTabIndex"
      />
    </div>
    <div class="tabs-wrap">
      <span class="tabs-type">排序：</span>
      <Tabs
        :tabs="sortTabs"
        class="tabs"
        type="split"
        v-model:active="activeSortTabIndex"
      />
    </div>
    <!-- 把处理数据的逻辑全部放到该组件 -->
    <withPagination
      :getData="getAllMvsApi"
      :getDataParams="getDataParams"
      :limit="40"
      :scroll-target="pageRef"
      :total="mvCount"
      @getDataSucess="onGetMvs"
    >
      <ul class="list-wrap">
        <li
          class="list-item"
          v-for="mv in mvs"
          :key="mv.id"
        >
          <MvCard
            :author="mv.artistName"
            :duration="mv.duration"
            :id="mv.id"
            :img="mv.cover"
            :name="mv.name"
            :playCount="mv.playCount"
          ></MvCard>
        </li>
      </ul>
    </withPagination>
  </div>
</template>
<script setup lang="ts">
import { getAllMvsApi } from "@/api";
import { computed, ref } from "vue";
import withPagination from "@/components/withPagination/index.vue";
import MvCard from "@/components/mvCard/index.vue";
import type { MvType, getAllMvsApiType } from "@/api/Mv/type";
const areaTabs = ["全部", "内地", "港台", "欧美", "日本", "韩国"];
const typeTabs = ["全部", "官方版", "原声", "现场版", "网易出品"];
const sortTabs = ["上升最快", "最热", "最新"];

const pageRef = ref<HTMLElement>({} as HTMLElement);
const mvs = ref<MvType[]>([]);
const mvCount = ref(0);
const activeAreaTabIndex = ref(0);
const activeTypeTabIndex = ref(0);
const activeSortTabIndex = ref(0);

const getDataParams = computed(() => {
  return {
    area: areaTabs[activeAreaTabIndex.value],
    order: sortTabs[activeSortTabIndex.value],
    type: typeTabs[activeTypeTabIndex.value],
  };
});

const onGetMvs = (res: getAllMvsApiType) => {
  const { data, count } = res;
  mvs.value = data;
  if (count) {
    mvCount.value = count;
  }
};
</script>
<style lang="scss" scoped>
.mvs {
  padding: $page-padding;
  margin: auto;

  .tabs-wrap {
    margin-bottom: 16px;
    display: flex;
    align-items: center;

    .tabs-type {
      font-size: $font-size-sm;
    }
  }

  @include list(25%);
}
</style>
