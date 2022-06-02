<template>
  <div class="tissue-list-wrapper">
    <div class="tissue-list-header">
      <div class="th-name">名称</div>
      <div class="th-color">颜色</div>
      <div class="th-size">体积</div>
      <div class="th-visible">
        <button class="tissue-oper" @click="onChangeVisible">
          <img crossorigin="anonymous" class="object-show" src="assets/images/show.svg" v-if="allVisibleState === 1" />
          <img
            crossorigin="anonymous"
            class="object-hide"
            src="assets/images/hide.png"
            v-else-if="allVisibleState === 0"
          />
          <img src="assets/images/halfShow.svg" alt="eye" v-else />
        </button>
      </div>
      <div class="th-delete"></div>
    </div>
    <div class="tissue-list-body">
      <div v-if="tissueList.length === 0" class="empty-text">暂无数据</div>
      <template v-else>
        <tissue-item
          v-for="item in tissueList"
          :key="item.tissueId"
          :tissue="item"
          @changeColor="changeColor"
          @deleteTissue="deleteTissue"
          :selectCellType="selectCellType"
        ></tissue-item>
      </template>
    </div>
    <div class="tissue-list-foot">
      <label class="list-foot-span">不透明度</label>
      <div class="tissue-list-slider">
        <a-slider v-model:value="tissueOpacity" @change="opacityChange" />
      </div>
      <label class="tissue-opacity-span">{{ tissueOpacity + '%' }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'tissue-list',
});
</script>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import TissueItem from './TissueItem.vue';
const props = withDefaults(
  defineProps<{
    tissueList?: Array;
    width?: string;
    height?: string;
  }>(),
  {
    tissueList: [],
    width: '354px',
    height: '',
  },
);
const tissueList = ref(props.tissueList);
const allVisibleState = ref(1);

const cssWidth = props.width;
const cssHeight = props.height;

const tissueOpacity = ref(0);
</script>
<style lang="less" scoped>
@height: 35px;

.tissue-list-wrapper {
  background: #242930;
  color: #c9d3e6;
  width: v-bind(cssWidth);
  border-radius: 4px;

  .tissue-list-header {
    background: #2c3138;
    display: flex;
    border-radius: 4px 4px 0px 0px;
    cursor: pointer;
    align-items: center;

    .th-name {
      flex: 1;
      width: 80px;
      height: @height;
      line-height: @height;
      padding-left: 24px;
    }

    .th-color {
      width: 40px;
      height: 100%;
      line-height: 35px;
      margin-top: 0;
    }
    .th-size {
      width: 100px;
      height: @height;
      line-height: @height;
    }

    .th-visible {
      height: @height;
      line-height: @height;
      width: 40px;

      .tissue-oper {
        float: right;
        padding: 0px;
        height: 35px;
        background: transparent;
        width: 36px;
        margin-right: 18px;
        border: 0;
        img {
          display: inline-block;
          vertical-align: middle;
          width: 24px;
          transform: translateY(-1px);
        }
      }

      .tissue-oper:hover {
        background: #194547;
        box-shadow: 0px 1px 0px 0px rgb(0 0 0 / 50%);
      }
    }
    .th-delete {
      width: 40px;
    }
  }

  .tissue-list-body {
    height: 200px;
    overflow-y: auto;
    .empty-text {
      font-family: MicrosoftYaHei, sans-serif;
      font-size: 14px;
      color: #9ca4b3;
      text-align: center;
      margin-top: 80px;
    }
  }

  .tissue-list-foot {
    padding: 0 0 0 15px;
    height: 50px;
    background: #2c3138;
    box-shadow: inset 0px -1px 0px 0px rgba(0, 0, 0, 0.5);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    .list-foot-span {
      width: 70px;
      height: 50px;
      line-height: 50px;
    }
    .tissue-list-slider {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 50px;
      > div {
        flex: 1;
      }
      :deep(.ant-slider-rail) {
        border-radius: 6px !important;
      }
      :deep(.ant-slider-track) {
        border-radius: 6px !important;
        background-color: transparent !important;
        background-image: linear-gradient(90deg, rgba(4, 133, 111, 0) 0%, #04856f 100%) !important;
      }
    }

    .tissue-opacity-span {
      width: 40px;
      height: 50px;
      line-height: 50px;
      margin-left: 10px;
    }
  }
}

.hide {
  display: none;
}

.disable {
  pointer-events: none;
  opacity: 0.3;
}

.borderStyle {
  border: 1px solid #323843;
}
</style>
