<template>
  <div
    class="new-mvs"
    v-if="mvs?.length"
  >
    <Title>推荐MV</Title>
    <ul class="list-wrap">
      <li
        class="list-item"
        v-for="mv in mvs"
        :key="mv.id"
      >
        <MvCard
          :author="mv.artistName"
          :id="mv.id"
          :img="mv.picUrl"
          :name="mv.name"
          :playCount="mv.playCount"
        ></MvCard>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import MvCard from "@/components/mvCard/index.vue";

import { getPersonalizedMv } from "@/api";
import type { MvsResult } from "@/api/discovery/type";
import { onMounted, ref } from "vue";

const mvs = ref<MvsResult[]>([]);
const getMvs = async () => {
  const { result } = await getPersonalizedMv();
  mvs.value = result;
};
onMounted(() => {
  getMvs();
});
</script>
<style lang="scss" scoped>
.new-mvs {
  @include list(25%);
}
</style>
