<template>
  <div class="st-layout">
    <button class="st-layout-btn" @click="changeLayout">
      <img class="st-layout-img" :src="props.imgPath" />
    </button>
    <span class="st-layout-title">{{ props.title }}</span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'layout-switch',
};
</script>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps<{
  imgPath: '';
  title: '';
  layoutName: '';
}>();
const emits = defineEmits<{
  (e: 'changeLayout', layoutName: string): void;
}>();

const changeLayout = () => {
  emits('changeLayout', props.layoutName);
};
</script>

<style lang="less" scoped>
.st-layout {
  display: inline-block;
  .st-layout-btn {
    height: 50px;
    width: 50px;
    border: 0;
    border-radius: 4px;
    padding: 0;
    background-image: linear-gradient(180deg, #2a2c34 0%, #242830 100%);
    .st-layout-img {
      height: 20px;
      width: 20px;
    }
  }
  .st-layout-title {
    display: block;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #9ca4b3;
    margin-top: 8px;
    text-align: center;
  }
}
</style>
