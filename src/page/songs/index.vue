<template>
  <div class="songs">
    <div class="tabs">
      <Tabs
        :tabs="tabs"
        align="right"
        type="small"
        v-model:active="activeTabIndex"
      />
    </div>
    <SongTable :songs="songs" />
  </div>
</template>
<script setup lang="ts">
import { getTopSongsApi } from "@/api";
import { onMounted, ref, watch } from "vue";
import { createSong } from "@/utils";
import SongTable from "@/components/songTable/index.vue";
interface CreatedSong {
  id: number;
  name: string;
  img: string;
  artists: Array<{ name: string }>;
  duration: number;
  albumName?: string;
  url: string;
  artistsText: string;
  durationSecond: number;
  albumId: number;
  mvId: number;
  [key: string]: any;
}
const tabs = [
  { title: "全部", type: 0 },
  { title: "华语", type: 7 },
  { title: "欧美", type: 96 },
  { title: "日本", type: 8 },
  { title: "韩国", type: 16 },
];
let activeTabIndex = ref(0);
const songs = ref<CreatedSong[]>([]);
const getSongs = async () => {
  const { data } = await getTopSongsApi(tabs[activeTabIndex.value].type);
  songs.value = data.map((song) => {
    const {
      id,
      name,
      artists,
      duration,
      mvid,
      album: { picUrl, name: albumName },
    } = song;
    return createSong({
      id,
      name,
      artists,
      duration,
      albumName,
      img: picUrl,
      mvId: mvid,
    });
  });
};

watch(
  () => activeTabIndex.value,
  () => {
    getSongs();
  }
);
onMounted(() => {
  getSongs();
});
</script>
<style lang="scss" scoped>
.songs {
  padding: 12px;

  .header-row {
    display: none;
  }
}
</style>
