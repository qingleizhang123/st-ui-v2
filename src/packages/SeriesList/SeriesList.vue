<template>
  <div class="series-list-wrapper">
    <div
      v-for="(item, index) of seriesList"
      :key="index"
      class="series-info"
      :class="{ 'select-series': item.IsSelected }"
      @click="onSelectSerie(item)"
    >
      <div class="image-area">
        <img :src="item.Thumbnail" />
        <div class="image-thickness">{{ item.Thickness }}<span>mm</span></div>
        <div class="image-modality">{{ item.Modality }}</div>
        <div class="image-number">{{ item.ImageCount }}</div>
      </div>
      <div class="image-description-space"></div>
      <div class="series-description" :title="item.Description">
        {{ item.Description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'series-list',
});
</script>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
const props = withDefaults(
  defineProps<{
    seriesList?: Array;
    width?: string;
    height?: string;
  }>(),
  {
    seriesList: [],
    width: '354px',
    height: '',
  },
);
const seriesList = ref(props.seriesList);

const cssWidth = props.width;
const cssHeight = props.height;

const emits = defineEmits<{
  (e: 'selectSeries', series): void;
}>();

const onSelectSerie = series => {
  seriesList.value.forEach(item => {
    if (item.index === series.index) {
      item.IsSelected = true;
    } else {
      item.IsSelected = false;
    }
  });
  emits('selectSeries', series);
};
</script>

<style lang="less" scoped>
.series-list-wrapper {
  background: #1f232b;
  border: 1px solid #323843;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 6px;
  padding: 7px;
  width: v-bind(cssWidth);
  overflow-y: hidden;
  overflow-x: auto;
  box-sizing: border-box;
  border-radius: 4px 4px 0px 0px;

  .series-info {
    display: inline-block;
    width: 80px;
    height: 136px;
    box-sizing: border-box;
    background: #000;
    border-radius: 4px;
    vertical-align: top;

    .image-area {
      position: relative;

      .image-modality {
        position: absolute;
        bottom: 0;
        left: 0;
        font-family: MicrosoftYaHei-Bold, sans-serif;
        font-size: 14px;
        color: #ffffff;
        font-weight: 400;
        margin-left: 4px;
        margin-bottom: 6px;
      }

      .image-thickness {
        position: absolute;
        right: 5px;
        top: 5px;
        font-family: MicrosoftYaHei-Bold, sans-serif;
        font-size: 14px;
        color: #ffffff;
        font-weight: 400;
      }

      .image-number {
        position: absolute;
        bottom: 0;
        right: 0;
        font-family: MicrosoftYaHei-Bold, sans-serif;
        font-size: 14px;
        color: #ffffff;
        font-weight: 400;
        margin-right: 4px;
        margin-bottom: 6px;
      }
    }

    img {
      height: 90px;
      width: 100%;
    }

    .image-description-space {
      width: 100%;
      height: 3px;
      background: #41c4e2;
    }

    .series-description {
      text-align: center;
      font-size: 12px;
      color: #ffffff;
      font-weight: 400;
      line-height: 17px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 4px;
      margin-right: 3px;
    }
  }

  .select-series {
    img {
      border-radius: 4px;
      opacity: 0.6;
    }

    background: rgba(4, 133, 111, 0.2);
    border: 1px solid #69d8c6;
    border-radius: 4px;
  }
}
</style>
