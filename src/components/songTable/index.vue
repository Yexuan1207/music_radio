<template>
  <el-table
    class="song-table"
    v-if="songs.length"
    @row-click="onRowClick"
    header-cell-class-name="title-th"
    style="width: 100%"
    :data="songs"
  >
    <el-table-column
      v-for="(column, index) in showColumns"
      :key="index"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      :class-name="column.className"
    >
      <template #default="scope">
        <!-- 序号列 -->
        <div
          class="index-wrap"
          v-if="column.prop === 'index'"
        >
          <Icon
            v-if="isActiveSong(scope.row)"
            class="horn"
            type="material-symbols:volume-up-outline-rounded"
            color="theme"
            :size="20"
          ></Icon>
          <span v-else>{{ pad(scope.$index + 1) }}</span>
        </div>

        <!-- 图片列 -->
        <div
          v-if="column.prop === 'img'"
          class="img-wrap"
        >
          <el-image
            :src="getImgUrl(scope.row.img, 120)"
            lazy
          ></el-image>

          <PlayIcon class="play-icon"></PlayIcon>
        </div>

        <!-- 标题 -->
        <div v-if="column.prop === 'name'">
          <div
            class="song-table-name-cell"
            :style="getActiveStyleText(scope.row)"
          >
            <HighlightText
              class="song-table-name"
              :text="scope.row.name"
              :highlightText="props.heighLightText"
            />
            <!-- 这里添加stop是防止冒泡父组件的点击播放事件 -->
            <Icon
              v-if="scope.row.mvId"
              class="mv-icon"
              @click.stop="onGoMv(scope.row.mvId)"
              color="theme"
              :size="18"
              type="lucide:youtube"
            />
          </div>
          <p v-if="scope.row.alias && scope.row.alias.length">
            <HighlightText
              v-for="(item, index) in scope.row.alias"
              :key="index"
              class="name-desc"
              :text="item"
              :highlightText="props.heighLightText"
            />
          </p>
        </div>

        <!-- 歌手 -->
        <div v-if="column.prop === 'artistsText'">
          <HighlightText
            class="song-table-name"
            :text="scope.row.artistsText"
            :highlightText="props.heighLightText"
          />
        </div>

        <!-- 时长 -->
        <span v-if="column.prop === 'durationSecond'">{{
          formatTime(scope.row.durationSecond)
        }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { ElTable } from "element-plus";
import type { Song } from "./type";
import useMusicStore from "@/store/music";
import { formatTime, getImgUrl, pad } from "@/utils";
import { goMvWidthCheck } from "@/utils";
const musicStore = useMusicStore();
const props = withDefaults(
  defineProps<{
    songs: any[];
    heighLightText?: string;
    hideColums?: string[];
    renderNameDesc?: string;
  }>(),
  {
    heighLightText: "",
  }
);
// const $utils: any = inject("utils");

const columns = [
  {
    prop: "index",
    label: "",
    width: "70",
  },
  {
    prop: "img",
    label: "",
    width: "100",
  },
  {
    prop: "name",
    label: "音乐标题",
    className: "title-td",
  },
  {
    prop: "artistsText",
    label: "歌手",
  },
  {
    prop: "albumName",
    label: "专辑",
  },
  {
    prop: "durationSecond",
    label: "时长",
    width: "100",
  },
];
const showColumns = computed(() => {
  const hideColoums = [...(props.hideColums || [])];
  if (props.songs.length > 0 && !props.songs[0].img) {
    hideColoums.push("img");
  }
  return columns.filter((column) => !hideColoums.includes(column.prop));
});

//index部分 播放
const isActiveSong = (song: Song) => {
  return musicStore.currentSong.id === song.id;
};
//点击每行
const onRowClick = (song: Song) => {
  musicStore.startSong(song);
  musicStore.setPlaylist(props.songs);
};
//点击mv
const onGoMv = (mvId: number) => {
  goMvWidthCheck(mvId);
};
//单元格激活样式
const getActiveStyleText = (row: Song) => {
  if (isActiveSong(row)) {
    return {
      color: "#d33a31", // 使用 $theme-color 的实际值
    };
  }
};
// const tableCellClassName = ({
//   row,
//   columnIndex,
// }: {
//   row: Song;
//   columnIndex: number;
// }) => {
//   let retCls: string[] = [];
//   if (
//     isActiveSong(row) &&
//     columnIndex === showColumns.value.findIndex(({ prop }) => prop === "name")
//   ) {
//     return retCls.push("song-active");
//   }
// };
</script>
<style lang="scss" scoped>
.name-desc {
  display: block;
  margin-top: 8px;
  color: var(--font-color-grey-shallow);
  @include text-ellipsis;
}
.song-table {
  &:hover {
    cursor: pointer;
  }
  .title-th {
    color: var(--font-color-grey2);
    font-weight: normal;
  }

  .title-td {
    color: var(--font-color-white);
  }

  .padding-space {
    padding-left: 24px;
  }

  .song-active {
    color: $theme-color;

    .high-light-text {
      color: $theme-color;
    }
  }

  .index-wrap {
    text-align: center;
    color: var(--font-color-grey-shallow);
  }

  .img-wrap {
    position: relative;
    @include img-wrap(60px);

    img {
      border-radius: 4px;
    }

    .play-icon {
      @include abs-center;
    }
  }

  .high-light-text {
    color: $blue;
  }
  .song-table-name {
    overflow: hidden;
    @include text-ellipsis;
  }
  .song-table-name-cell {
    @include text-ellipsis;
    display: flex;
    align-items: center;
    flex: 0 0 24px;
  }
  .mv-icon {
    width: 24px;
    margin-left: 4px;
  }
}
</style>
