<template>
  <div class="song-card">
    <div class="order-wrap">
      <span class="order">{{ $utils.pad(props.order, 2) }}</span>
    </div>
    <div class="img-wrap">
      <el-image
        lazy
        :src="$utils.getImgUrl(props.img, 120)"
      ></el-image>
      <PlayIcon class="play-icon"></PlayIcon>
    </div>
    <div class="song-content">
      <p class="song-name">{{ props.name }}</p>
      <p class="singer">{{ props.artistsText }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject, ref } from "vue";
import { ElImage } from "element-plus";
const $utils: any = inject("utils");
const props = defineProps<{
  order: number;
  name: string;
  img: string;
  artistsText: string;
}>();
</script>
<style lang="scss" scoped>
.song-card {
  display: flex;
  padding: 8px;
  font-size: $font-size-sm;
  cursor: pointer;
  div {
    flex-shrink: 0;
  }
  &:hover {
    background: var(--light-bgcolor);
  }
  .order-wrap {
    @include flex-center();
    width: 30px;
    margin-right: 8px;
  }
  .img-wrap {
    position: relative;
    width: 60px;
    height: 60px;
    margin-right: 8px;
    .el-image {
      width: 100%;
      height: 100%;
    }
    .play-icon {
      @include abs-center;
    }
  }
  .song-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    overflow: hidden;
    .song-name {
      @include text-ellipsis;
      color: var(--font-color-white);
    }
    .singer {
      @include text-ellipsis;
    }
  }
}
</style>
