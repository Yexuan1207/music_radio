<template>
  <div class="search-mvs">
    <with-pagination
      :get-data="getSearch"
      :get-data-params="searchParams"
      :limit="40"
      :scroll-target="searchRoot.headerRef.value"
      :total="mvCount"
      @get-data-sucess="onGetMvs"
    >
      <ul class="list-wrap">
        <li
          class="list-item"
          v-for="mv in mvs"
          :key="mv.id"
        >
          <mv-card
            :author="mv.artistName"
            :duration="mv.duration"
            :id="mv.id"
            :img="mv.cover"
            :name="mv.name"
            :play-count="mv.playCount"
          />
        </li>
      </ul>
    </with-pagination>
  </div>
</template>
<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { getSearch } from "@/api";
import WithPagination from "@/components/withPagination/index.vue";
import type { getSearchMvType, Mv } from ".";
import MvCard from "@/components/mvCard/index.vue";
const SEARCH_TYPE_MV = 1004;
const searchRoot: any = inject("searchRoot");
const mvs = ref<Mv[]>([]);
const mvCount = ref(0);

const searchParams = computed(() => {
  return { keywords: searchRoot.props.keyword, type: SEARCH_TYPE_MV };
});

const onGetMvs = (data: getSearchMvType) => {
  const {
    result: { mvs: mvsData, mvCount: mvCountData },
  } = data;
  mvs.value = mvsData;
  mvCount.value = mvCountData;
  searchRoot.onUpdateCount(mvCountData);
};
</script>
<style lang="scss" scoped>
.search-mvs {
  max-width: 1000px;
  padding: $page-padding;
  margin: auto;

  @include list(25%);
}
</style>
