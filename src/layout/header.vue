<template>
  <div class="header">
    <!-- 路由记录 -->
    <div class="left">
      <div class="history">
        <routes-history></routes-history>
      </div>
    </div>
    <div class="right">
      <!-- 搜索 -->
      <div class="search-wrap">
        <search />
      </div>
      <Theme />
    </div>
  </div>
</template>
<script setup lang="ts">
import Theme from "@/components/theme/theme.vue";
import Search from "@/components/search/index.vue";
import routesHistory from "@/components/routes-history.vue";
import { ref } from "vue";
</script>
<style lang="scss" scoped>
@use "@/style/element-overwrite.scss" as *;

.header {
  display: flex;
  justify-content: space-between;
  height: $header-height;
  background-color: var(--header-bgcolor);
  padding-right: 36px;
  @include el-input-theme(
    var(--header-input-color),
    var(--header-input-bgcolor),
    var(--header-input-placeholder-color)
  );

  ::v-deep(.iconfont) {
    color: var(--header-font-color);
  }

  .left {
    padding: 14px 14px 0 8px;
    display: flex;

    .history {
      margin-left: 65px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .search-wrap {
      margin-right: 16px;
    }
  }
}
</style>
