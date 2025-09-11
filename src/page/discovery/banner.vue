<template>
  <el-carousel
    class="banner-carousel"
    :interval="4000"
    type="card"
  >
    <el-carousel-item
      v-for="banner in banners"
      :key="banner.targetId"
    >
      <img
        :src="$utils.getImgUrl(banner.imageUrl, 1000, 400)"
        class="banner-img"
      />
    </el-carousel-item>
  </el-carousel>
</template>
<script setup lang="ts">
import { getBanner } from "@/api/discovery";
import { inject, onMounted, ref } from "vue";
import type { Banner } from "@/api/discovery/type";

const $utils: any = inject("utils");
const banners = ref<Banner[]>([]);
onMounted(async () => {
  const { banners: bannerData } = await getBanner();
  banners.value = bannerData;
});
</script>
<style lang="scss" scoped>
.banner-carousel {
  :deep(.el-carousel__container) {
    height: 200px;
  }
  .banner-img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}
</style>
