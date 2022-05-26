<template>
  <button class="st-btn" :class="className">
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'st-button',
  props: {
    type: String,
  },
});
</script>

<style scoped></style>
