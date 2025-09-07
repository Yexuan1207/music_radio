<!-- ConfirmDialog.vue -->
<!-- 当对话框内部发生状态变化时（比如用户点击对话框右上角的关闭按钮）
 Element Plus 的 el-dialog 组件会触发 update:model-value 事件。
 主要是为了同步父组件的状态。 -->

<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="onUpdateVisible"
    :width="width"
    class="confirm-dialog"
    :modal="false"
  >
    <template #title> {{ title || "提示" }}</template>
    <div class="confirm-body">{{ text }}</div>
    <template #footer>
      <el-button
        class="confirm-btn"
        type="primary"
        @click="confirmAndClose"
      >
        确认
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits } from "vue";
import { ElDialog, ElButton } from "element-plus";

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();

interface Props {
  visible: boolean;
  text: string;
  title?: string;
  onConfirm?: () => void;
  width?: string;
}

// 使用 withDefaults 设置默认值（等价于 props.default）
const props = withDefaults(defineProps<Props>(), {
  title: "",
  width: "320px", // 可以使用 rem，如 `toRem(320)`
});

// 同步更新 visible 状态
const onUpdateVisible = (val: boolean) => {
  emit("update:visible", val);
};

// 点击确认按钮
const confirmAndClose = () => {
  props.onConfirm && props.onConfirm();
  emit("update:visible", false);
};
</script>

<style lang="scss" scoped>
.confirm-dialog {
  ::v-deep(.el-dialog__body) {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .confirm-body {
    line-height: 20px;
  }

  .confirm-btn {
    width: 100%;
  }
}
</style>
