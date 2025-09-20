<template>
  <div class="horizontal-card">
    <slot name="img-wrap">
      <div class="img-wrap">
        <el-image
          lazy
          :src="$utils.getImgUrl(props.img, 50)"
        ></el-image>
        <slot name="img-mask"></slot>
      </div>
    </slot>
    <div class="content">
      <div class="name">{{ props.name }}</div>
      <div class="desc">
        <slot name="desc">{{ desc }}</slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "Card",
});
import { inject, ref } from "vue";
const $utils: any = inject("utils");
const props = defineProps<{
  img?: string;
  name: string;
  desc?: string;
}>();
</script>
<style lang="scss" scoped>
.horizontal-card {
  display: flex;
  padding: 0 4px;
  cursor: pointer;

  &:hover {
    background: var(--light-bgcolor);
  }

  .img-wrap {
    position: relative;
    @include img-wrap(50px);

    img {
      border-radius: 4px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 8px;
    overflow: hidden;

    .name {
      margin-bottom: 4px;
      font-size: $font-size-medium-sm;
      @include text-ellipsis();
    }

    .desc {
      font-size: $font-size-sm;
      color: var(--font-color-grey-shallow);
      @include text-ellipsis();
    }
  }
}
</style>
