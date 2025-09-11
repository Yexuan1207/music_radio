<template>
  <div
    class="mv-card"
    @click="goMv"
  >
    <div class="img-wrap">
      <el-image
        lazy
        :src="$utils.getImgUrl(props.img, 500, 260)"
      ></el-image>
      <!-- 播放数量 -->
      <div
        class="play-count-wrap"
        v-if="props.playCount"
      >
        <Icon type="material-symbols:play-arrow"></Icon>
        {{ $utils.formatData(props.playCount) }}
      </div>
      <!-- 播放图标 -->
      <div class="play-icon-wrap">
        <PlayIcon
          :size="48"
          class="play-icon"
        ></PlayIcon>
      </div>
      <div
        class="duration-wrap"
        v-if="props.duration"
      >
        {{ $utils.formatTime(props.duration / 1000) }}
      </div>
    </div>
    <p
      class="name"
      v-if="props.name"
    >
      {{ props.name }}
    </p>
    <p
      class="author"
      v-if="props.author"
    >
      {{ props.author }}
    </p>
  </div>
</template>
<script setup lang="ts">
import { inject, ref } from "vue";
import { ElImage } from "element-plus";
import { isDef } from "@/utils";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const $utils: any = inject("utils");
const props = defineProps<{
  img?: string;
  duration?: number;
  playCount?: number;
  name?: string;
  author?: string;
  id?: number;
}>();
const goMv = () => {
  if (isDef(props.id)) {
    router.push(`/mv/${props.id}`);
  }
};
</script>
<style lang="scss" scoped>
.mv-card {
  min-width: 140px;
  cursor: pointer;

  .img-wrap {
    position: relative;
    padding-top: 56%;

    .el-image {
      @include abs-stretch();
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }

    .play-icon-wrap {
      @include abs-stretch;

      &:hover {
        .play-icon {
          opacity: 1;
        }
      }

      .play-icon {
        @include abs-center;

        opacity: 0;
        transition: opacity 0.3s;
      }
    }

    .play-count-wrap {
      display: flex;
      align-items: center;
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: $font-size-sm;
      color: $white;

      i {
        display: inline-block;
        margin-right: 4px;
      }
    }

    .duration-wrap {
      position: absolute;
      right: 2px;
      bottom: 2px;
      font-size: $font-size-sm;
      color: $white;
    }
  }

  .name {
    margin-top: 8px;
    @include text-ellipsis;
    font-size: $font-size-sm;
  }

  .author {
    margin-top: 4px;
    @include text-ellipsis;
    font-size: $font-size-sm;
    color: var(--font-color-grey-shallow);
  }
}
</style>
