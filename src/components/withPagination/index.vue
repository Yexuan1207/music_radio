<!-- 带逻辑的分页组件，返回数据给父组件 -->
<template>
  <div class="with-pagination">
    <slot></slot>
    <div class="pagination-wrap">
      <Pagination
        v-model:current-page="currentPage"
        :page-size="limit"
        :total="total"
        @current-change="onPageChange"
        class="pagination"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { getAllMvsApiType } from "@/api/Mv/type";
import { inject, onMounted, ref, watch } from "vue";
const currentPage = ref(1);
const $utils: any = inject("utils");
const eimt = defineEmits(["getDataSucess", "getDataError"]);
const props = withDefaults(
  defineProps<{
    getData: Function;
    getDataParams: Object;
    limit: number;
    scrollTarget: HTMLElement;
    total: number;
  }>(),
  {
    getDataParams: () => ({}),
    limit: 10,
    total: 0,
  }
);

const onPageChange = async () => {
  try {
    const res = await props.getData({
      limit: props.limit,
      offset: $utils.getPageOffset(props.limit, currentPage.value),
      ...props.getDataParams,
    });
    eimt("getDataSucess", res);
    if (props.scrollTarget) {
      console.log(111);

      $utils.scrollInto(props.scrollTarget);
    }
  } catch (error) {
    eimt("getDataError", error);
  }
};

onMounted(() => {
  onPageChange();
});

watch(
  () => props.getDataParams,
  () => {
    currentPage.value = 1;
    onPageChange();
  },
  {
    deep: true,
  }
);
</script>
<style lang="scss" scoped>
.pagination-wrap {
  margin-top: 16px;
}
</style>
