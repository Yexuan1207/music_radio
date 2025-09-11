<template>
  <div
    class="playlist-detail"
    v-if="playlist?.id"
  >
    <!-- 这里获取ref对后续id更改 回到该页面滚动到顶部 -->
    <DetailHeader
      ref="headerRef"
      :playlist="playlist"
      :songs="songs"
    />
    <div class="tabs-wrap">
      <Tabs
        :tabs="tabs"
        type="theme"
        v-model:active="activeTab"
      ></Tabs>
      <el-input
        v-show="activeTab === SONG_IDX"
        v-model="searchValue"
        @focus="onInputFocus"
        @blur="onInputBlur"
        :class="getInputCls()"
        placeholder="搜索歌单音乐"
        class="input"
        :prefix-icon="Search"
      ></el-input>
    </div>
    <div
      class="empty"
      v-if="searchValue && !filteredSongs.length"
    >
      未能找到和<span class="keyword">"{{ searchValue }}"</span>相关的结果
    </div>
    <SongTable
      v-show="activeTab === SONG_IDX"
      :songs="filteredSongs"
      :heighLightText="searchValue"
    />
    <div
      class="comments"
      v-show="activeTab === COMMENT_IDX"
    >
      <Comments
        :id="id"
        type="playlist"
        @update="onCommentsUpdate"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { getListDetail, getSongDetail } from "@/api";

import DetailHeader from "./header.vue";
import SongTable from "@/components/songTable/index.vue";
import Comments from "@/components/comments/index.vue";

import { Search } from "@element-plus/icons-vue";
import { ElInput } from "element-plus";
import { computed, ref, watch, type ComputedRef } from "vue";
import { useRoute } from "vue-router";
import type { Playlist } from "@/api/song-list/type";
import { createSong } from "@/utils";
import { scrollInto } from "@/utils/dom";

const route = useRoute();

//常量定义
const MAX = 500;
const SONG_IDX = 0;
const COMMENT_IDX = 1;

const id = computed(() => route.params.id as string);

const playlist = ref<Playlist>();
const songs = ref<any[]>([]);
const searchValue = ref<string>("");

const headerRef = ref<InstanceType<typeof DetailHeader>>();
const tabs = ref<string[]>(["歌曲列表", "评论"]);
const activeTab = ref<number>(SONG_IDX);
const inputFocus = ref(false);
//初始化playlist数据
const init = async () => {
  const { playlist: playlistData } = await getListDetail({ id: id.value });
  playlist.value = playlistData;
  await getSongList(playlistData);
};
const getSongList = async (playlistData: Playlist) => {
  const trackIds = playlistData.trackIds.map(({ id }) => id);
  const songDetails = await getSongDetail(trackIds.slice(0, MAX));
  const newSongs = songDetails.songs.map(({ id, name, al, ar, mv, dt }) =>
    createSong({
      id,
      name,
      artists: ar,
      duration: dt,
      mvId: mv,
      albumName: al.name,
      img: al.picUrl,
    })
  );
  songs.value = newSongs;
};

//搜索框内容样式
const onInputFocus = () => {
  inputFocus.value = true;
};
const onInputBlur = () => {
  inputFocus.value = false;
};
const getInputCls = () => {
  return !inputFocus.value ? "inactive" : "";
};

//搜索框返回内容
const filteredSongs = computed(() => {
  return songs.value.filter(({ name, artists, albumName }) => {
    return `${name}${artists}${albumName}`
      .toLowerCase()
      .includes(searchValue.value.toLowerCase());
  });
});
//滚动到顶部
const scorellToHeader = () => {
  //因为header是组件，访问其的时候需要通过.$el获取元素
  if (headerRef.value?.$el) {
    scrollInto(headerRef.value.$el);
  }
};

//子组件返回评论数据
const onCommentsUpdate = (total: number) => {
  tabs.value.splice(COMMENT_IDX, 1, `评论(${total})`);
};
watch(
  id,
  () => {
    searchValue.value = "";
    init();
    scorellToHeader();
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped>
.playlist-detail {
  width: 100%;
  .tabs-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 24px;
    border-bottom: 1px solid var(--border);

    .input {
      width: 150px;
      &:not(:hover) {
        &.inactive {
          :deep(.el-input__wrapper) {
            background-color: transparent !important;
          }
          :deep(.el-input__inner) {
            background-color: transparent !important;
          }
        }
      }
    }
  }

  .empty {
    @include flex-center;
    height: 200px;

    .keyword {
      color: $blue;
    }
  }

  .comments {
    padding: 16px 32px;
  }
}
</style>
