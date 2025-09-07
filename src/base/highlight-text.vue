<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "HighlightText",
});

interface Props {
  text: string;
  highlightText: string;
}

const props = defineProps<Props>();

const highlightedText = computed(() => {
  if (!props.highlightText) return props.text;

  const textToMath = props.text.toLowerCase();
  const keyWord = props.highlightText.toLowerCase();
  const matchIndex = textToMath.indexOf(keyWord);

  if (matchIndex === -1) return props.text;

  const beforeStr = props.text.substring(0, matchIndex);
  const hitStr = props.text.substring(matchIndex, matchIndex + keyWord.length);
  const afterStr = props.text.substring(matchIndex + keyWord.length);

  return { beforeStr, hitStr, afterStr };
});
</script>

<template>
  <div>
    <span v-if="typeof highlightedText !== 'string'">
      {{ highlightedText?.beforeStr }}
      <span class="high-light-text">{{ highlightedText?.hitStr }}</span>
      {{ highlightedText?.afterStr }}
    </span>
    <span v-else>{{ props.text }}</span>
  </div>
</template>

<style lang="scss" scoped>
.high-light-text {
  color: $blue;
}
</style>
