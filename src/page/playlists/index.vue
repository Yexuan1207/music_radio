<template>
  <div
    class="playlists"
    ref="playlistsRef"
  >
    <!-- 精品歌单推荐 -->
    <div
      class="top-play-list-card"
      v-if="topPlaylist?.id"
    >
      <TopPlaylistCard
        :id="topPlaylist.id"
        :name="topPlaylist.name"
        :img="topPlaylist.coverImgUrl"
        :desc="topPlaylist.description"
      ></TopPlaylistCard>
    </div>
    <div class="tabs">
      <Tabs
        :tabs="tabs"
        aligin="right"
        v-model:active="activeTabIndex"
        type="small"
      ></Tabs>
    </div>
    <div class="playlist-cards">
      <PlaylistCard
        :desc="`播放量：${$utils.formatData(item?.playCount || 0)}`"
        :id="item.id"
        :img="item.coverImgUrl"
        :key="item.id"
        :name="item.name"
        v-for="item in playlists"
      ></PlaylistCard>
    </div>
    <Pagination
      :total="total"
      :pageSize="PAGE_SIZE"
      v-model:current-page="currentPage"
      @change="onPageChange()"
      class="pagination"
    />
  </div>
</template>
<script setup lang="ts">
import { getPlaylistsApi, getTopPlaylistsApi } from "@/api/playlist";
import type { playlist } from "@/api/playlist/type";
import { getPageOffset } from "@/utils";
import { inject, onMounted, ref, watch } from "vue";
import TopPlaylistCard from "@/components/topPlaylistCard/index.vue";
import PlaylistCard from "@/components/playlistCard/index.vue";

const playlistsRef = ref<HTMLElement>();
const $utils: any = inject("utils");
const PAGE_SIZE = 50;
const activeTabIndex = ref(0);
const playlists = ref<playlist[]>([]);
const currentPage = ref(1);
const total = ref(0);
//顶部歌单数据
const topPlaylist = ref<playlist>();
const tabs = ref([
  "全部",
  "欧美",
  "华语",
  "流行",
  "说唱",
  "摇滚",
  "民谣",
  "电子",
  "轻音乐",
  "影视原声",
  "ACG",
  "怀旧",
  "治愈",
  "旅行",
]);

//获取全部数据
const getPlaylists = async () => {
  const { playlists: data, total: num } = await getPlaylistsApi({
    limit: PAGE_SIZE,
    offset: getPageOffset(currentPage.value, PAGE_SIZE),
    cat: tabs.value[activeTabIndex.value],
  });
  playlists.value = data;
  total.value = num;
};

const getTopPlaylists = async () => {
  const { playlists: data } = await getTopPlaylistsApi({
    limt: 1,
    cat: tabs.value[activeTabIndex.value],
  });
  topPlaylist.value = data[0] || {};
};
watch(activeTabIndex, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    currentPage.value = 0;
    initData();
  }
});

const onPageChange = () => {
  initData();
  $utils.scrollInto(playlistsRef.value);
};
const initData = () => {
  getPlaylists();
  getTopPlaylists();
};

onMounted(() => {
  initData();
});
</script>
<style lang="scss" scoped>
.playlists {
  padding: 12px;

  .top-play-list-card {
    margin-bottom: 16px;
  }

  .playlist-cards {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
