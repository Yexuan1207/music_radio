<template>
  <div class="search-playlists">
    <with-pagination
      :get-data="getSearch"
      :get-data-params="searchParams"
      :limit="50"
      :scrollTarget="searchRoot.headerRef.value"
      :total="playlistsCount"
      @getDataSucess="onGetPlaylists"
    >
      <div class="list-wrap">
        <playlist-card
          :desc="`播放量：${$utils.formatData(item.playCount)}`"
          :img="item.coverImgUrl"
          :name="item.name"
          :id="item.id"
          v-for="item in playlists"
          :key="item.id"
        />
      </div>
    </with-pagination>
  </div>
</template>
<script setup lang="ts">
import { ref, inject, computed } from "vue";
import WithPagination from "@/components/withPagination/index.vue";
import PlaylistCard from "@/components/playlistCard/index.vue";
import { getSearch } from "@/api";
import type { getSearchPlaylistType } from ".";

const SEARCH_TYPE_PLAYLIST = 1000;
const $utils: any = inject("utils");
const searchRoot: any = inject("searchRoot");
const playlists = ref();
const playlistsCount = ref(0);

const searchParams = computed(() => {
  return { keywords: searchRoot.props.keyword, type: SEARCH_TYPE_PLAYLIST };
});

const onGetPlaylists = (data: getSearchPlaylistType) => {
  const {
    result: { playlists: playlistsData, playlistCount: playlistCountData },
  } = data;
  playlists.value = playlistsData;
  playlistsCount.value = playlistCountData;
  searchRoot.onUpdateCount(playlistCountData);
};
</script>
<style lang="scss" scoped>
.search-playlists {
  max-width: 1000px;
  padding: $page-padding;
  margin: auto;

  .list-wrap {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
