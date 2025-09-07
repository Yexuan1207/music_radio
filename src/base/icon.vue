<template>
  <template v-if="backdrop">
    <span class="backdrop">
      <Icon
        :icon="type"
        :style="{ fontSize: size, width: backDropSize, height: backDropSize }"
        :class="getIconColor()"
      />
    </span>
  </template>
  <template v-else>
    <Icon
      :icon="type"
      :style="{ fontSize: size }"
      :class="getIconColor()"
    />
  </template>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { defineEmits } from "vue";
import { toRem } from "@/utils";

const emit = defineEmits();
const props = defineProps({
  size: {
    type: Number,
    default: 16,
  },
  type: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
  // 图标是否有背景
  backdrop: {
    type: Boolean,
    default: false,
  },
});
//背景
const backDropSizeRatio = 1.56;
const backDropSize = toRem(backDropSizeRatio * props.size);

const getIconColor = () => {
  return props.color
    ? `icon-component icon-color-${props.color}`
    : "icon-component";
};
const handleClick = (e: HTMLDivElement) => {
  // emit('click', e)
};
</script>
<script lang="ts">
export default {
  name: "Icon",
};
</script>
<style lang="scss" scoped>
.backdrop {
  display: inline-block;
  @include flex-center;
  border-radius: 50%;
  align-items: center;
  line-height: 12px;
  &:hover {
    background: var(--round-hover-bgcolor);
  }
}

.icon-component {
  cursor: pointer;
}

.icon-color {
  // 通过prop传入这几个字段
  // 可以使用默认的几个颜色
  &-theme {
    color: $theme-color;
  }

  &-white {
    color: $white;
  }

  &-shallow {
    color: var(--font-color-shallow-grey);
  }
}
</style>
