<template>
  <!-- []计算属性名，动态使用align变量（可能是 'left'、'center' 或 'right'） -->
  <ul
    :class="{ [align]: true }"
    class="tab-wrap"
  >
    <template v-if="isRouteMode">
      <router-link
        v-for="(tab, index) in normalizedTabs"
        :key="index"
        :to="tab.to || ''"
        custom
        v-slot="{ navigate, isActive }"
      >
        <li
          class="tab-item"
          ref="routerLinks"
          @click="navigate"
          :style="getItemStyle(tab, index)"
          :class="{ active: isActive, ['activeItemClass']: isActive }"
        >
          <span class="title">{{ tab.title }}</span>
        </li>
      </router-link>
    </template>
    <!-- 无路由跳转状态 -->
    <template v-else>
      <li
        class="tab-item"
        v-for="(tab, index) in normalizedTabs"
        :key="index"
        :class="getItemCls(tab, index)"
        :style="getItemStyle(tab, index)"
        @click="onChangeTab(tab, index)"
      >
        <span class="title">{{ tab.title }}</span>
      </li>
    </template>
  </ul>
</template>
<script setup lang="ts">
import { computed, inject, ref } from "vue";
defineOptions({
  name: "Tabs",
});
const $utils: any = inject("utils");
type Tab = {
  title: string;
  to?: string;
  [key: string]: any;
};
const props = withDefaults(
  defineProps<{
    active?: number;
    tabs: Tab[] | string[];
    align?: "left" | "center" | "right";
    itemClass?: string;
    activeClass?: string;
    itemStyle?: Partial<CSSStyleDeclaration>;
    activeItemStyle?: Partial<CSSStyleDeclaration>;
    type?: "small" | "theme" | "split";
  }>(),
  { align: "left" }
);

const isRouteMode = computed(() => {
  return (
    props.tabs.length &&
    typeof props.tabs[0] !== "string" &&
    $utils.isDef(props.tabs[0]?.to)
  );
});
const emit = defineEmits<{
  (e: "update:active", active: number): void;
}>();
const normalizedTabs = computed((): Tab[] => {
  return typeof props.tabs[0] === "string"
    ? (props.tabs as string[]).map((tab) => ({ title: tab }))
    : (props.tabs as Tab[]);
});
const onChangeTab = (tab: Tab, index: number) => {
  emit("update:active", index);
};
const getItemCls = (tab: Tab, index: number) => {
  const base: string[] = [];
  if (props.itemClass) base.push(props.itemClass);
  if (props.type) base.push(props.type);
  if (isActive(tab, index)) {
    if (props.activeClass) {
      base.push(props.activeClass);
    }
    base.push("active");
  }

  return base.join(" ");
};
const getItemStyle = (tab: Tab, index: number): Record<string, any> => {
  return {
    ...props.itemStyle,
    ...(isActive(tab, index) ? props.activeItemStyle : {}),
  };
};

const isActive = (tab: Tab, index: number) => {
  return props.active === index;
};
</script>
<style lang="scss" scoped>
.tab-wrap {
  display: flex;

  &.center {
    justify-content: center;
  }

  &.right {
    justify-content: flex-end;
  }

  .tab-item {
    padding: 12px 0;
    margin: 0 12px;
    color: var(--tab-item-color);
    font-size: $font-size-medium;
    white-space: nowrap;
    cursor: pointer;

    &.active {
      // 当.tab-item同时有.active类时的样式
      color: var(--tab-item-active-color);

      &:hover {
        color: var(--tab-item-active-color);
      }
    }

    // 对应prop中的type字段
    &.small {
      font-size: $font-size-sm;

      &.active {
        color: $theme-color;
      }
    }

    &.theme {
      font-size: $font-size;

      &.active {
        color: $theme-color;
        border-bottom: 2px solid $theme-color;
        font-weight: $font-weight-bold;
      }
    }

    &.split {
      font-size: $font-size-sm;
      padding: 4px 12px;
      margin: 0 16px;
      border-radius: 999em;

      &.active {
        color: $theme-color;
        background: var(--shallow-theme-bgcolor);
      }

      &:not(:last-child) {
        &::after {
          position: relative;
          left: 28px;
          width: 1px;
          height: 100%;
          background: var(--border);
          display: inline-block;
          vertical-align: middle;
          content: " ";
        }

        .title {
          vertical-align: middle;
        }
      }
    }

    &:hover {
      color: var(--tab-item-hover-color);
    }
  }
}
</style>
