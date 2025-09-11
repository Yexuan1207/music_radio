<template>
  <div class="discovery">
    <div class="discovery-content">
      <Banner />
      <NewPlaylists />
      <NewSongs />
      <NewMvs />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Banner from "./banner.vue";
import NewPlaylists from "./newPlaylists.vue";
import NewSongs from "./newSongs.vue";
import NewMvs from "./new-mvs.vue";
</script>
<style lang="scss" scoped>
.discovery {
  padding: 18px 32px;
}
</style>
