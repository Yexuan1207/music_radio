<template>
  <div class="recommend">
    <Title>推荐歌单</Title>
    <div class="list-wrap">
      <playlistCard
        :desc="item.copywriter"
        :id="item.id"
        :img="item.picUrl"
        :name="item.name"
        :key="item.id"
        v-for="item in list"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getPersonalized } from "@/api";
import type { Result } from "@/api/discovery/type";
import playlistCard from "@/components/playlistCard/index.vue";
const list = ref<Result[]>();
onMounted(async () => {
  const { result } = await getPersonalized({ limit: 10 });
  list.value = result;
});
</script>
<style lang="scss" scoped>
.list-wrap {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -4px;
}
</style>
