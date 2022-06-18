<template>
  <div class="st-progress-container" v-if="props.visible">
    <div class="st-progress">
      <div class="progress-info">
        {{ props.progressContent }}
      </div>
      <a-progress :percent="props.progressPercent" :showInfo="false"></a-progress>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'st-progress',
});
</script>

<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps<{
  visible: boolean;
  progressContent: string;
  progressPercent: number;
}>();
</script>

<style lang="less">
.st-progress-container {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  z-index: 10000;
  .st-progress {
    position: absolute;
    width: 440px;
    height: 111px;
    top: 50%;
    left: 50%;
    z-index: 99999;
    transform: translateX(-50%);
    text-align: center;
    border-radius: 4px;
    background: rgba(48, 54, 64, 0.8);
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);

    .progress-info {
      margin-top: 35px;
      height: 21px;
      font-size: 16px;
      color: #ffffff;
      font-family: MicrosoftYaHei-Bold, sans-serif;
      text-align: center;
      font-weight: 700;
    }
  }
}
</style>
