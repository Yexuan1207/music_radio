<template>
  <div
    v-if="props.total > props.pageSize"
    class="pagination"
  >
    <!-- $attrs 将父组件传递给当前组件但未在props申明的属性和事件 -->
    <el-pagination
      :page-size="props.pageSize"
      :total="props.total"
      layout="pre,pager,next"
      v-bind="$attrs"
    ></el-pagination>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "Pagination",
});
import { ref } from "vue";
import { ElPagination } from "element-plus";
const props = defineProps<{
  pageSize: number;
  total: number;
}>();
</script>
<style lang="scss" scoped>
.pagination {
  text-align: right;
}
</style>
