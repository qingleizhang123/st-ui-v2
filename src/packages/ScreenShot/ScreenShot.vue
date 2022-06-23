<template>
  <div class="st-image-button">
    <button class="st-btn" :class="{ select: select }" @click="onScreenShot">
      <img class="st-btn-img" :src="props.imgPath" />
    </button>
    <span class="st-btn-title">{{ props.title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'screen-shot',
});
</script>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import domtoimage from 'dom-to-image-more';
import { message } from 'ant-design-vue';
const props = defineProps<{
  imgPath: '';
  title: '';
  select: boolean;
  targetDom: '';
  saveFileName: '';
}>();
const emits = defineEmits<{
  (e: 'update:select', select: boolean | null): void;
}>();

const onScreenShot = () => {
  emits('update:select', true);
  saveHtmlToCanvas(props.saveFileName);
};

const saveHtmlToCanvas = (imageName: string) => {
  domtoimage.toPng(document.querySelector(`${props.targetDom}`)).then(canvas => {
    message.success({ content: '截图成功', duration: 2 });
    const canvasImg = canvas;
    const downloadElement = document.createElement('a');
    downloadElement.href = canvasImg; // 创建下载的链接
    downloadElement.download = imageName;
    downloadElement.style.display = 'none';
    document.body.appendChild(downloadElement);
    downloadElement.click();
    downloadElement.remove();
    window.URL.revokeObjectURL(downloadElement.href); // 释放掉blob对象
  });
};
</script>

<style lang="less">
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
  .select {
    border: 1px solid #69d8c6;
  }
}
</style>
