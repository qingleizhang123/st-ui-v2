<template>
  <div class="setting-box">
    <div class="setting-top">
      <span class="title">{{ settingTitle }}</span>
      <CloseOutlined class="close-icon" @click.stop="closeSetting" />
    </div>
    <div class="setting-container">
      <div class="setting-color">
        <div class="color-picker">
          <a-row type="flex">
            <a-col flex="1 1 20%" v-for="color in colorPickerList" :key="color">
              <div class="color-box" :class="{ selected: color.isSelected }" @click.stop="changeColor(color.id)">
                <div class="color-item" :style="{ background: color.color }"></div>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import { colorPickerConfig } from '../../config/colorpicker.config';
</script>

<script lang="ts" setup>
export default defineComponent({
  name: 'color-setting',
});
const settingTitle = '颜色设置';
const colorIndex = 0;
const colorPickerList = colorPickerConfig.colorOptions;
</script>

<style lang="less" scoped>
.text-common(@family, @size, @font-weight) {
  font-family: @family;
  font-size: @size;
  color: #ffffff;
  letter-spacing: 0;
  font-weight: @font-weight;
}

.setting-box {
  position: absolute;
  right: 414px;
  top: 350px;
  z-index: 999;
  width: 320px;
  background: rgba(21, 24, 28, 0.9);
  box-shadow: 0px 6px 12px 0px rgb(0 0 0 / 50%);
  border-radius: 2px;

  .setting-top {
    height: 70px;
    background-image: linear-gradient(180deg, #2b313b 0%, rgba(24, 27, 33, 0) 100%);
    box-shadow: inset 0 1px 0 0 #424959;
    border-radius: 4px 4px 0 0;
    text-align: center;
    .text-common(PingFangSC-Semibold, 18px, 600);

    .title {
      position: relative;
      top: 24px;
    }

    .close-icon {
      position: absolute;
      top: 24px;
      right: 32px;
      cursor: pointer;
    }
  }

  .setting-container {
    margin-left: 60px;
    margin-bottom: 64.98px;

    .setting-color {
      height: auto;
      display: flex;
      flex-direction: column;

      .color-picker {
        width: 215px;
        display: inline-block;
        vertical-align: top;

        .color-box {
          width: 36px;
          height: 36px;
          border: 1px solid transparent;
          margin-bottom: 2px;

          .color-item {
            height: 28px;
            width: 28px;
            margin: 3px;
            border-radius: 2px;
          }
        }

        .selected {
          background: rgba(4, 133, 111, 0.2);
          border: 1px solid #69d8c6;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>
