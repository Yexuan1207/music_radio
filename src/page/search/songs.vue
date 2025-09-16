<template>
  <div
    class="search-songs"
    v-if="searchRoot"
  >
    <!-- 添加v-if条件确保searchRoot和关键词存在时才渲染分页组件 -->
    <with-pagination
      :getData="getSearch"
      :getDataParams="searchParams"
      :limit="30"
      :scrollTarget="searchRoot.headerRef.value"
      :total="songCount"
      @getDataSucess="onGetSearch"
    >
      <div class="table">
        <SongTable
          :songs="songs"
          :heigh-light-text="searchRoot.props.keyword"
        />
      </div>
    </with-pagination>
  </div>
</template>
<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import WithPagination from "@/components/withPagination/index.vue";
import SongTable from "@/components/songTable/index.vue";
import { getSearch } from "@/api";
import type { getSearchSongTyep } from ".";
import { createSong } from "@/utils";

// inject在组件实例创建时就会执行，属于组合式API的初始化阶段
const searchRoot: any = inject("searchRoot");
const songs = ref<any[]>([]);
const songCount = ref(0);
const currentPage = ref(1);

// 修复：从searchRoot.props中获取keyword，而不是直接从searchRoot获取
const searchParams = computed(() => {
  return { keywords: searchRoot.props.keyword };
});
const onGetSearch = (data: getSearchSongTyep) => {
  const {
    result: { songCount: SongCountData, songs: SongsData },
  } = data;
  if (SongCountData) {
    songs.value = SongsData.map((song) => {
      const { id, mvid, name, alias, artists, duration, album } = song;
      return createSong({
        id,
        name,
        alias,
        artists,
        duration,
        mvId: mvid,
        albumName: album.name,
        albumId: album.id,
      });
    });
  }
  songCount.value = SongCountData;
  searchRoot.onUpdateCount(SongCountData);
};
</script>
<style lang="scss" scoped></style>
