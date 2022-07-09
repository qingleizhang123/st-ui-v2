<template>
  <div class="st-colorpicker-box">
    <div class="st-setting-top">
      <span class="st-title">{{ settingTitle }}</span>
      <CloseOutlined class="st-close-icon" @click.stop="closeSetting" />
    </div>
    <div class="st-setting-container">
      <div class="st-setting-color">
        <div class="st-color-picker">
          <a-row type="flex">
            <a-col flex="1 1 20%" v-for="color in props.colorOptions" :key="color">
              <div class="st-color-box" :class="{ selected: color.isSelected }" @click.stop="changeColor(color.id)">
                <div class="st-color-item" :style="{ background: color.color }">
                  <div class="st-initial-color" v-if="color.color === 'rgba(0,0,0,0)'"></div>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'color-picker',
});
</script>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';
const props = defineProps<{
  colorOptions: [];
}>();
const emits = defineEmits<{
  (e: 'changeColor', color: string);
  (e: 'changeSettingOpen', isOpen: boolean): void;
}>();
const settingTitle = '颜色设置';
const colorIndex = 0;

const changeColor = pureColorId => {
  colorPickerList.value.forEach(colorItem => {
    if (pureColorId === colorItem.id) {
      colorItem.isSelected = true;
      emits('changeColor', colorItem.color);
    } else {
      colorItem.isSelected = false;
    }
  });
};

const closeSetting = () => {
  emits('changeSettingOpen', false);
};
</script>

<style lang="less">
.text-common(@family, @size, @font-weight) {
  font-family: @family;
  font-size: @size;
  color: #ffffff;
  letter-spacing: 0;
  font-weight: @font-weight;
}

.st-colorpicker-box {
  position: relative;
  width: 320px;
  background: rgba(21, 24, 28, 0.9);
  box-shadow: 0px 6px 12px 0px rgb(0 0 0 / 50%);
  border-radius: 2px;

  .st-setting-top {
    height: 70px;
    background-image: linear-gradient(180deg, #2b313b 0%, rgba(24, 27, 33, 0) 100%);
    box-shadow: inset 0 1px 0 0 #424959;
    border-radius: 4px 4px 0 0;
    text-align: center;
    .text-common(PingFangSC-Semibold, 18px, 600);

    .st-title {
      position: relative;
      top: 24px;
    }

    .st-close-icon {
      position: absolute;
      top: 24px;
      right: 32px;
      cursor: pointer;
    }
  }

  .st-setting-container {
    padding: 0px 60px 65px 60px;

    .st-setting-color {
      height: auto;
      display: flex;
      flex-direction: column;

      .st-color-picker {
        width: 215px;
        display: inline-block;
        vertical-align: top;

        .st-color-box {
          width: 36px;
          height: 36px;
          border: 1px solid transparent;
          margin-bottom: 2px;

          .st-color-item {
            height: 28px;
            width: 28px;
            margin: 3px;
            border-radius: 2px;
            .st-initial-color {
              width: 100%;
              height: 100%;
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
            }
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
