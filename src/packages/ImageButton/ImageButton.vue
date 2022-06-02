<template>
  <div class="st-image-button">
    <button class="st-btn" @click="change">
      <img class="st-btn-img" :src="props.imgPath" />
    </button>
    <span class="st-btn-title">{{ props.title }}</span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'image-button',
};
</script>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps<{
  imgPath: '';
  title: '';
  selected: boolean;
}>();
const emits = defineEmits<{
  (e: 'change'): void;
}>();

const change = () => {
  emits('change');
};
</script>

<style lang="less" scoped>
.st-image-button {
  display: inline-block;
  .st-btn {
    height: 50px;
    width: 50px;
    border: 0;
    border-radius: 4px;
    padding: 0;
    background-image: linear-gradient(180deg, #2a2c34 0%, #242830 100%);
    .st-btn-img {
      height: 20px;
      width: 20px;
    }
  }
  .st-btn-title {
    display: block;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #9ca4b3;
    margin-top: 8px;
    text-align: center;
  }
}
</style>
