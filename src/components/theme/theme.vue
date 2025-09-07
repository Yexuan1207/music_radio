<template>
  <div class="theme">
    <el-popover
      placement="bottom"
      trigger="click"
      width="230"
    >
      <div class="themes">
        <div
          class="theme-item"
          v-for="(themeValue, themeKey, index) in themeMap"
          :key="index"
        >
          <div
            class="theme-icon"
            :style="themeValue.style"
            @click="changeTheme(themeKey as string)"
          ></div>
          <p>{{ themeValue.title }}</p>
        </div>
      </div>
      <template #reference>
        <Icon
          type="ant-design:skin-outlined"
          backdrop
          slot="reference"
          :size="12"
        ></Icon>
      </template>
    </el-popover>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElPopover } from "element-plus";
import storage from "good-storage";
//引入相关样式文件
import variables from "@/style/themes/variables.ts";
import variablesRed from "@/style/themes/variables-red.ts";
import variablesWhite from "@/style/themes/variables-white.ts";

const visible = ref(false);

const THEME_KEY = "__theme__";
const themes = {
  white: "white",
  dark: "dark",
  red: "red",
};
const themeMap = ref({
  [themes.dark]: {
    title: "暗黑",
    //引入相关样式文件
    file: variables,
    style: { backgroundColor: "#202020" },
  },
  [themes.red]: {
    title: "红色",
    //引入相关样式文件
    file: variablesRed,
    style: { backgroundColor: "#D33A31" },
  },
  [themes.white]: {
    title: "白色",
    //引入相关样式文件
    file: variablesWhite,
    style: {
      backgroundColor: "#F6F6F6",
      border: "1px solid #EBEAEA",
    },
  },
});
const changeTheme = (themeKey: string) => {
  storage.set(THEME_KEY, themeKey);
  const theme = themeMap.value[themeKey].file;
  Object.keys(theme).forEach((key) => {
    const value = (theme as any)[key];
    //document.documentElement：获取 HTML 文档的根元素。
    document.documentElement.style.setProperty(key, value);
  });
};

//初始时渲染
onMounted(() => {
  changeTheme(storage.get(THEME_KEY, themes.white));
});
</script>
<style lang="scss" scoped>
.themes {
  @include flex-center;
  .theme-item {
    @include flex-center;
    flex-direction: column;
    margin: 0 8px;
    cursor: pointer;

    .theme-icon {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      margin-bottom: 4px;
    }
  }
}
</style>
