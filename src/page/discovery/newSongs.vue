<template>
  <div
    class="new-songs"
    v-if="list?.length"
  >
    <Title>最新音乐</Title>
    <div class="list-wrap">
      <div
        class="list"
        :key="listindex"
        v-for="(list, listindex) in thunkedList"
      >
        <SongCard
          :key="item.id"
          :order="getSongOrder(listindex, index)"
          v-for="(item, index) in list"
          class="song-card"
          v-bind="normalizeSong(item)"
          @click="onClickSong(item)"
        ></SongCard>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getNewSongs } from "@/api";
import SongCard from "@/components/songCard/index.vue";
import type { SongResult } from "@/api/discovery/type";
import { computed, onMounted, ref } from "vue";
import { createSong } from "@/utils";
import useMusicStore from "@/store/music";

const songsLimit = 10;
const musicStore = useMusicStore();
const list = ref<SongResult[]>();

const chunkLimit = ref(Math.ceil(songsLimit / 2));
onMounted(async () => {
  const { result } = await getNewSongs();
  list.value = result;
});

//设置每行的歌曲卡片
const thunkedList = computed(() => {
  return [
    list.value?.slice(0, chunkLimit.value),
    list.value?.slice(chunkLimit.value, songsLimit),
  ];
});

//歌曲编号
const getSongOrder = (listIndx: number, index: number) => {
  return listIndx * chunkLimit.value + index + 1;
};

//格式化歌曲信息
const normalizeSong = (item: SongResult) => {
  const {
    id,
    name,
    song: {
      mvid,
      artists,
      album: { blurPicUrl },
      duration,
    },
  } = item;
  return createSong({
    id,
    name,
    img: blurPicUrl,
    artists,
    duration,
    mvId: mvid,
  });
};
const normalizeSongs = computed(() => {
  return list.value?.map((song) => normalizeSong(song));
});
//点击歌曲
const onClickSong = (item: SongResult) => {
  musicStore.startSong(normalizeSong(item));
  musicStore.setPlaylist(normalizeSongs);
};
</script>
<style lang="scss" scoped>
.new-songs {
  margin-bottom: 36px;
  .list-wrap {
    display: flex;

    .list {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
