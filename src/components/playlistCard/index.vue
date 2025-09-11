<template>
  <div
    @click="onClickCard"
    class="playlist-card"
  >
    <div class="img-wrap">
      <el-image
        lazy
        :src="$utils.getImgUrl(props.img, 300)"
      ></el-image>
      <div
        class="desc-wrap"
        v-if="props.desc"
      >
        <span class="desc">{{ props.desc }}</span>
      </div>
      <PlayIcon
        :size="36"
        class="play-icon"
      ></PlayIcon>
    </div>
    <p class="name">{{ props.name }}</p>
  </div>
</template>
<script setup lang="ts">
import { inject, ref } from "vue";
import { ElImage } from "element-plus";
import { useRouter } from "vue-router";
import { size } from "lodash-es";
const $utils: any = inject("utils");
const router = useRouter();
const props = defineProps<{
  id: number | string;
  img: string;
  name: string;
  desc: string;
}>();
const onClickCard = () => {
  router.push(`/playlist/${props.id}`);
};
</script>
<style lang="scss" scoped>
.playlist-card {
  position: relative;
  width: calc(20% - 8px);
  margin: 4px;
  margin-bottom: 32px;
  cursor: pointer;
  .img-wrap {
    position: relative;
    width: 100%;
    padding-top: 100%;
    margin-bottom: 8px;
    border-radius: 4px;
    overflow: hidden;
    .el-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      bottom: 0;
      right: 0;
    }
    .desc-wrap {
      position: absolute;
      padding: 6px;
      left: 0;
      right: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.4);
      transform: translateY(-100%);
      transition: all 0.3s;

      .desc {
        color: $white;
        font-size: $font-size-sm;
      }
    }
  }
  .play-icon {
    opacity: 0;
    position: absolute;
    right: 4px;
    bottom: 4px;
    font-size: 24px;
    transition: all 0.3s;
    color: $white;
  }

  &:hover {
    .desc-wrap {
      transform: translateY(0);
    }

    .play-icon {
      opacity: 1;
    }
  }
}

.name {
  font-size: $font-size-sm;
  @include text-ellipsis();
}
</style>
