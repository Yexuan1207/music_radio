<template>
  <div class="layout">
    <LayoutHeader />
    <div class="layout-body">
      <!-- 菜单栏 -->
      <div class="layout-menu">
        <LayoutMenu />
      </div>
      <!-- 内容 -->
      <div
        id="page-content"
        class="content"
      >
        <router-view :class="routerViewCls"></router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LayoutHeader from "./header.vue";
import LayoutMenu from "./menu.vue";
import { layoutCenterNames } from "@/router";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
const routes = useRoute();

const routerViewCls = computed(() => {
  return layoutCenterNames.find((name) => name === routes.name)
    ? "router-view-center"
    : "";
});
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;

  .layout-body {
    display: flex;
    height: calc(100% - #{$header-height});

    .layout-menu {
      // 这个100%已经减去了头部height
      height: calc(100% - #{$mini-player-height});
    }

    .content {
      flex: 1;
      overflow-y: auto;
      min-width: $layout-content-min-width;
      margin-bottom: $mini-player-height;

      .router-view-center {
        max-width: $center-content-max-width;
        margin: auto;
      }
    }
  }
}
</style>
