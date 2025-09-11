<template>
  <div class="menu">
    <user />
    <div class="menu-wrap">
      <div
        class="menu-block"
        v-for="(menu, index) in menusWithPlaylist"
        :key="index"
      >
        <p
          class="menu-block-title"
          v-if="menu.title"
        >
          {{ menu.title }}
        </p>
        <ul class="menu-list">
          <router-link
            v-for="(item, index) in menu.children"
            :key="index"
            :to="item.path"
            class="menu-item"
            v-slot="{ navigate, isActive }"
            custom
          >
            <li
              @click="navigate"
              :class="{ 'menu-item-active': isActive }"
            >
              <Icon
                :size="16"
                :type="item.meta.icon"
                class="iconfont"
              ></Icon>
              <span class="menu-title">{{ item.meta.title }}</span>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import user from "@/components/user/index.vue";
import { computed, ref } from "vue";
import { menuRoutes } from "@/router";
import { useUserStore } from "@/store/user";
const userStore = useUserStore();
//配置菜单
const menus: any = ref([
  {
    type: "root",
    children: menuRoutes,
  },
]);
const menusWithPlaylist = computed(() => {
  return userStore.isLogin && userStore.userMenus
    ? menus.value.concat(userStore.userMenus)
    : menus.value;
});
</script>
<style lang="scss" scoped>
.menu {
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--menu-bgcolor);

  .menu-wrap {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;

    .menu-block {
      margin-bottom: 16px;

      .menu-block-title {
        font-size: $font-size-sm;
        color: var(--font-color-grey2);
        padding-left: 16px;
        margin-bottom: 8px;
      }

      .menu-list {
        .menu-item {
          @include text-ellipsis;
          padding: 12px 18px;
          cursor: pointer;

          &:hover {
            background: var(--menu-item-hover-bg);
          }

          &-active {
            color: $theme-color;
            background: var(--menu-item-active-bg);

            i {
              color: $theme-color;
            }
          }

          .iconfont {
            font-size: $font-size-medium-sm;
          }

          .menu-title {
            font-size: $font-size-medium-sm;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
