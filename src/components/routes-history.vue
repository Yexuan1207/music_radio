<template>
  <div class="routes-history">
    <Icon
      @click="back"
      :size="12"
      class="icon"
      type="si:chevron-left-alt-duotone"
      backdrop
    >
    </Icon>
    <Icon
      @click="forward"
      :size="12"
      type="si:chevron-right-alt-duotone"
      backdrop
    ></Icon>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const back = () => {
  router.back();
};
const forward = () => {
  router.forward();
};
</script>
<style lang="scss" scoped>
.routes-history {
  display: flex;
  align-items: center;

  .icon {
    margin-right: 16px;
  }
}
</style>
