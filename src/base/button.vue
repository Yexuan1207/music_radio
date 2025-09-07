<template>
  <div
    @click="onClick"
    class="n-button"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const onClick = () => {};
</script>
<script lang="ts">
export default {
  name: "Nbutton",
};
</script>
<style lang="scss" scoped>
.n-button {
  display: inline-block;
  padding: 5px 16px;
  border: 1px solid var(--button-border-color);
  border-radius: 2px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: var(--button-hover-bgcolor);
  }
}
</style>
