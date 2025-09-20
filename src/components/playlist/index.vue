<template>
  <el-popover v-model:visible="musicStore.isPlaylistShow">
    <div
      class="playlist"
      v-show="musicStore.isPlaylistShow"
    >
      <Tabs
        :tabs="tabs"
        v-model:active="activeTab"
        align="center"
      />
      <div class="header">
        <p class="total">总共{{ dataSource.length }}首</p>
        <div
          class="remove"
          v-if="dataSource.length"
          @click="clear"
        >
          <Icon type="hugeicons:delete-02" />
          <span class="text">清空</span>
        </div>
      </div>

      <div
        class="song-table-wrap"
        v-if="dataSource.length"
      >
        <SongTable
          :hide-colums="['index', 'img', 'albumName']"
          :songs="dataSource"
        ></SongTable>
      </div>
      <el-empty
        description="你还没有添加任何歌曲"
        v-else
      ></el-empty>
    </div>
  </el-popover>
</template>
<script setup lang="ts">
import useMusicStore from "@/store/music";
import { ElPopover } from "element-plus";
import { computed, ref, watch } from "vue";
import SongTable from "@/components/songTable/index.vue";
import { ElEmpty } from "element-plus";

//定义
const musicStore = useMusicStore();
const tabs = ["播放列表", "历史记录"];
const LIST_TAB = 0;
const HISTORY_TAB = 1;
const activeTab = ref(LIST_TAB);
const reserveDom = null;
//*****************方法*************************** */
//*********************computed**************************** */
const isPlaylist = computed(() => {
  return activeTab.value === LIST_TAB;
});
//歌单or历史记录
const dataSource = computed(() => {
  return isPlaylist.value ? musicStore.playlist : musicStore.playHistory;
});
//清空播放列表
const clear = () => {
  if (isPlaylist.value) {
    musicStore.clearPlaylist();
  } else {
    musicStore.clearHistory();
  }
};

//************************************************* */
//************************************************* */
</script>
<style lang="scss" scoped>
.playlist {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  bottom: $mini-player-height;
  display: flex;
  flex-direction: column;
  background: var(--playlist-bgcolor);
  z-index: $playlist-z-index;
  @include box-shadow;
  //   @include el-table-theme(var(--playlist-bgcolor));
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    margin: 0 20px;
    border-bottom: 1px solid var(--border);
    .total {
      font-size: $font-size-sm;
    }
    .remove {
      @include flex-center;
      cursor: pointer;
      font-size: $font-size-sm;
      .text {
        display: inline-block;
        margin-left: 4px;
      }
    }
  }
  .song-table-wrap {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
